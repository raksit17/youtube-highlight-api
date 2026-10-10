import { Injectable, Logger } from '@nestjs/common';

import { spawn } from 'node:child_process';
import {
  access,
  mkdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import {
  join,
  resolve,
} from 'node:path';

import { NotFoundException } from '@nestjs/common';
import { SubtitleExportService } from '../clips/subtitle-export.service';

import {
  RenderFormat,
  RenderMode,
  RenderResolution,
} from './dto/create-render-job.dto';

import { RenderJobsRepository } from './render-jobs.repository';

@Injectable()
export class RenderWorkerService {
  private readonly logger = new Logger(RenderWorkerService.name);

  constructor(
    private readonly subtitleExportService: SubtitleExportService,
    private readonly renderJobsRepository: RenderJobsRepository,
  ) {}

  async process(jobId: string) {
    const job = await this.renderJobsRepository.findForWorker(jobId);

    if (!job) {
      return;
    }

    let subtitlePath: string | undefined;
    let subtitleFilename: string | undefined;
    let outputDirectory: string | undefined;
    let outputPath: string | undefined;

    try {
      await this.renderJobsRepository.markRunning(job.id);

      const sourcePath = await this.findSourceFile(
        job.clip.video.id,
        job.clip.video.externalId,
      );

      outputDirectory = join(resolve(process.env.RENDER_OUTPUT_DIR ?? './storage/renders'), job.id);

      await mkdir(outputDirectory, {
        recursive: true,
      });

      await this.renderJobsRepository.updateProgress(
        job.id,
        10,
        'PREPARING_OUTPUT',
      );

      const extension =
        job.format === RenderFormat.WEBM
          ? 'webm'
          : 'mp4';

      const clipStartMs = job.clipStartMs ?? job.clip.startMs;
      const clipEndMs = job.clipEndMs ?? job.clip.endMs;
      const filenameStem = job.filenameStem ?? `legacy-${job.id}`;
      const outputFilename = `${filenameStem}.${extension}`;

      outputPath = join(
        outputDirectory,
        outputFilename,
      );

      // Keep editable SRT/VTT files with this job's immutable video range.
      try {
        const srt = await this.subtitleExportService.exportForRange(
          job.clip.videoId, clipStartMs, clipEndMs, filenameStem, 'srt',
        );
        const vtt = await this.subtitleExportService.exportForRange(
          job.clip.videoId, clipStartMs, clipEndMs, filenameStem, 'vtt', srt.language,
        );
        subtitleFilename = srt.filename;
        const srtPath = join(outputDirectory, srt.filename);
        await writeFile(srtPath, srt.content, 'utf8');
        await writeFile(join(outputDirectory, vtt.filename), vtt.content, 'utf8');
        if (job.includeSubtitles) subtitlePath = srtPath;
      } catch (error) {
        if (job.includeSubtitles || !(error instanceof NotFoundException)) throw error;
        this.logger.log(`No subtitle sidecar available for render ${job.id}`);
      }

      const args = this.buildFfmpegArgs({
        sourcePath,
        outputPath,
        subtitlePath,
        startMs: clipStartMs,
        endMs: clipEndMs,
        format: job.format as RenderFormat,
        resolution:
          job.resolution as RenderResolution,
        mode: job.mode as RenderMode,
      });

      await this.renderJobsRepository.updateProgress(
        job.id,
        15,
        'RENDERING',
      );

      await this.runFfmpeg(
        job.id,
        args,
        clipEndMs - clipStartMs,
      );

      await access(outputPath);

      await this.renderJobsRepository.updateProgress(
        job.id,
        98,
        'FINALIZING',
      );

      await this.renderJobsRepository.markCompleted(
        job.id,
        job.clip.id,
        outputPath,
        outputFilename,
        subtitleFilename,
      );
    } catch (error) {
      if (outputDirectory) {
        await rm(outputDirectory, { recursive: true, force: true }).catch(() => undefined);
      }

      const message =
        error instanceof Error
          ? error.message
          : String(error);

      this.logger.error(
        `Render job ${job.id} failed: ${message}`,
      );

      await this.renderJobsRepository
        .markFailed(job.id, message.slice(0, 8000))
        .catch(() => undefined);
    }
  }

  private async findSourceFile(
    videoId: string,
    externalId: string,
  ) {
    const sourceDirectory = resolve(
      process.env.VIDEO_SOURCE_DIR ?? './storage/sources',
    );

    const names = [
      externalId,
      videoId,
    ];

    const extensions = [
      '.mp4',
      '.webm',
      '.mkv',
      '.mov',
      '.m4v',
    ];

    for (const name of names) {
      for (const extension of extensions) {
        const path = join(
          sourceDirectory,
          `${name}${extension}`,
        );

        try {
          await access(path);
          return path;
        } catch {
          // Try the next supported source filename.
        }
      }
    }

    throw new Error(
      `Source video not found. Put a local source file in ${sourceDirectory} using the video external ID as the filename, for example ${externalId}.mp4`,
    );
  }

  private buildFfmpegArgs(input: {
    sourcePath: string;
    outputPath: string;
    subtitlePath?: string;
    startMs: number;
    endMs: number;
    format: RenderFormat;
    resolution: RenderResolution;
    mode: RenderMode;
  }) {
    const durationMs =
      input.endMs - input.startMs;

    const args = [
      '-y',
      '-hide_banner',
      '-loglevel',
      'error',
      '-ss',
      this.formatSeconds(input.startMs),
      '-i',
      input.sourcePath,
    ];

    if (input.subtitlePath) {
      args.push(
        '-i',
        input.subtitlePath,
      );
    }

    args.push(
      '-t',
      this.formatSeconds(durationMs),
      '-map',
      '0:v:0',
      '-map',
      '0:a?',
    );

    if (input.subtitlePath) {
      args.push(
        '-map',
        '1:0',
      );
    }

    if (input.mode === RenderMode.FAST) {
      args.push(
        '-c:v',
        'copy',
        '-c:a',
        'copy',
      );
    } else {
      const scaleFilter =
        this.getScaleFilter(
          input.resolution,
        );

      if (scaleFilter) {
        args.push(
          '-vf',
          scaleFilter,
        );
      }

      if (
        input.format ===
        RenderFormat.WEBM
      ) {
        args.push(
          '-c:v',
          'libvpx-vp9',
          '-crf',
          '30',
          '-b:v',
          '0',
          '-c:a',
          'libopus',
          '-b:a',
          '128k',
        );
      } else {
        args.push(
          '-c:v',
          'libx264',
          '-preset',
          'fast',
          '-crf',
          '20',
          '-c:a',
          'aac',
          '-b:a',
          '192k',
        );
      }
    }

    if (input.subtitlePath) {
      args.push(
        '-c:s',
        input.format ===
          RenderFormat.WEBM
          ? 'webvtt'
          : 'mov_text',
      );
    }

    if (
      input.format ===
      RenderFormat.MP4
    ) {
      args.push(
        '-movflags',
        '+faststart',
      );
    }

    args.push(
      '-avoid_negative_ts',
      'make_zero',
      '-progress',
      'pipe:1',
      '-nostats',
      input.outputPath,
    );

    return args;
  }

  private getScaleFilter(
    resolution: RenderResolution,
  ) {
    if (
      resolution ===
      RenderResolution.P1080
    ) {
      return 'scale=1920:1080:force_original_aspect_ratio=decrease:force_divisible_by=2';
    }

    if (
      resolution ===
      RenderResolution.P720
    ) {
      return 'scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2';
    }

    return null;
  }

  private async runFfmpeg(
    jobId: string,
    args: string[],
    durationMs: number,
  ) {
    const ffmpegPath =
      process.env.FFMPEG_PATH ??
      'ffmpeg';

    await new Promise<void>(
      (resolvePromise, rejectPromise) => {
        const child = spawn(
          ffmpegPath,
          args,
          {
            windowsHide: true,
          },
        );

        let stderr = '';
        let progressBuffer = '';
        let lastProgress = 15;

        child.stderr.on(
          'data',
          (chunk: Buffer) => {
            stderr += chunk.toString();

            if (stderr.length > 12000) {
              stderr = stderr.slice(-12000);
            }
          },
        );

        child.stdout.on(
          'data',
          (chunk: Buffer) => {
            progressBuffer +=
              chunk.toString();

            let newlineIndex =
              progressBuffer.indexOf('\n');

            while (newlineIndex >= 0) {
              const line = progressBuffer
                .slice(0, newlineIndex)
                .trim();

              progressBuffer =
                progressBuffer.slice(
                  newlineIndex + 1,
                );

              const separator =
                line.indexOf('=');

              if (separator > 0) {
                const key =
                  line.slice(
                    0,
                    separator,
                  );

                const value =
                  line.slice(
                    separator + 1,
                  );

                if (
                  key ===
                    'out_time_us' ||
                  key ===
                    'out_time_ms'
                ) {
                  const renderedUs =
                    Number(value);

                  if (
                    Number.isFinite(
                      renderedUs,
                    ) &&
                    durationMs > 0
                  ) {
                    const ratio =
                      renderedUs /
                      (durationMs *
                        1000);

                    const progress =
                      Math.max(
                        15,
                        Math.min(
                          95,
                          Math.floor(
                            15 +
                              ratio *
                                80,
                          ),
                        ),
                      );

                    if (
                      progress >=
                      lastProgress + 2
                    ) {
                      lastProgress =
                        progress;

                      void this.renderJobsRepository.updateProgress(
                        jobId,
                        progress,
                        'RENDERING',
                      );
                    }
                  }
                }
              }

              newlineIndex =
                progressBuffer.indexOf(
                  '\n',
                );
            }
          },
        );

        child.on(
          'error',
          (error) => {
            rejectPromise(
              new Error(
                `Unable to start FFmpeg (${ffmpegPath}): ${error.message}`,
              ),
            );
          },
        );

        child.on(
          'close',
          (code) => {
            if (code === 0) {
              resolvePromise();
              return;
            }

            rejectPromise(
              new Error(
                stderr.trim() ||
                  `FFmpeg exited with code ${code ?? 'unknown'}`,
              ),
            );
          },
        );
      },
    );
  }

  private formatSeconds(
    valueMs: number,
  ) {
    return (
      valueMs / 1000
    ).toFixed(3);
  }

}
