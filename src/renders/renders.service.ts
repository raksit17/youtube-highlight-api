import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { access, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { buildClipFilenameStem } from '../clips/clip-filename.util';

import {
  CreateRenderJobDto,
  RenderMode,
  RenderResolution,
} from './dto/create-render-job.dto';

import { RenderJobsRepository } from './render-jobs.repository';

import { RenderWorkerService } from './render-worker.service';

@Injectable()
export class RendersService {
  constructor(
    private readonly renderJobsRepository: RenderJobsRepository,
    private readonly renderWorker: RenderWorkerService,
  ) {}

  async createRenderJob(
    clipId: string,
    dto: CreateRenderJobDto,
  ) {
    const clip =
      await this.renderJobsRepository.findClipForRender(
        clipId,
      );

    if (!clip) {
      throw new NotFoundException(
        'Clip draft not found',
      );
    }

    if (
      dto.mode === RenderMode.FAST &&
      dto.resolution !== RenderResolution.ORIGINAL
    ) {
      throw new BadRequestException(
        'FAST render mode requires ORIGINAL resolution because stream copy does not resize video',
      );
    }

    if (
      clip.startMs < 0 ||
      clip.endMs <= clip.startMs
    ) {
      throw new BadRequestException(
        'Clip draft has an invalid start/end range',
      );
    }

    if (
      clip.video.durationMs !==
        null &&
      clip.endMs >
        clip.video.durationMs
    ) {
      throw new BadRequestException(
        'Clip draft endMs exceeds video duration',
      );
    }

    const active =
      await this.renderJobsRepository.findActiveForClip(
        clipId,
      );

    if (active) {
      return this.toResponse(active);
    }

    const candidateSnapshot = clip.candidateSnapshot as { rank?: number } | null;
    const filenameStem = buildClipFilenameStem({
      title: clip.title,
      videoTitle: clip.video.title,
      rank: clip.candidate?.rank ?? candidateSnapshot?.rank ?? null,
      sourcePreset: clip.sourcePreset,
      isCustomized: clip.isCustomized,
      startMs: clip.startMs,
      endMs: clip.endMs,
    });

    const job =
      await this.renderJobsRepository.create({
        clipId,
        clipStartMs: clip.startMs,
        clipEndMs: clip.endMs,
        filenameStem,
        format: dto.format,
        resolution: dto.resolution,
        mode: dto.mode,
        includeSubtitles:
          dto.includeSubtitles ??
          false,
      });

    setImmediate(() => {
      void this.renderWorker.process(
        job.id,
      );
    });

    return this.toResponse(job);
  }

  async getJob(id: string) {
    const job =
      await this.renderJobsRepository.findById(
        id,
      );

    if (!job) {
      throw new NotFoundException(
        'Render job not found',
      );
    }

    return this.toResponse(job);
  }


  async getDownloadForClip(clipId: string) {
    const job = await this.renderJobsRepository.findLatestCompletedForClip(clipId);
    if (!job) throw new NotFoundException('No completed render exists for this clip');
    return this.renderedFile(job);
  }

  async getDownloadForJob(jobId: string) {
    const job = await this.renderJobsRepository.findById(jobId);
    if (!job || job.status !== 'COMPLETED') {
      throw new NotFoundException('Completed render job not found');
    }
    return this.renderedFile(job);
  }

  async getSubtitleForJob(jobId: string, format = 'srt') {
    if (format !== 'srt' && format !== 'vtt') {
      throw new BadRequestException('format must be srt or vtt');
    }
    const job = await this.renderJobsRepository.findById(jobId);
    if (!job || job.status !== 'COMPLETED' || !job.outputPath ||
      !job.subtitleFilename) {
      throw new NotFoundException('No subtitle sidecar for this render job');
    }
    const filename = job.subtitleFilename.replace(/\.srt$/, '.' + format);
    const path = join(dirname(job.outputPath), filename);
    try { await access(path); } catch {
      throw new NotFoundException('Rendered subtitle file is missing');
    }
    const info = await stat(path);
    return {
      path, filename, size: info.size,
      contentType: format === 'srt'
        ? 'application/x-subrip; charset=utf-8'
        : 'text/vtt; charset=utf-8',
    };
  }

  async getExportForJob(jobId: string) {
    const job = await this.renderJobsRepository.findById(jobId);
    if (!job || job.status !== 'COMPLETED') {
      throw new NotFoundException('Completed render job not found');
    }
    return {
      filenameStem: job.filenameStem ?? job.outputFilename?.replace(/\.[^.]+$/, ''),
      renderJobId: job.id,
      clipId: job.clipId,
      startMs: job.clipStartMs,
      endMs: job.clipEndMs,
      durationMs: job.clipStartMs != null && job.clipEndMs != null
        ? job.clipEndMs - job.clipStartMs : null,
      format: job.format,
      videoFilename: job.outputFilename,
      subtitleFilename: job.subtitleFilename,
      completedAt: job.completedAt,
    };
  }

  private async renderedFile(job: {
    outputPath: string | null;
    outputFilename: string | null;
    format: string;
  }) {
    if (!job.outputPath || !job.outputFilename) {
      throw new NotFoundException('Rendered video file not found');
    }
    try { await access(job.outputPath); } catch {
      throw new NotFoundException('Rendered file is missing from storage');
    }
    const info = await stat(job.outputPath);
    return {
      path: job.outputPath,
      filename: job.outputFilename,
      size: info.size,
      contentType: job.format === 'WEBM' ? 'video/webm' : 'video/mp4',
    };
  }

  private toResponse(job: {
    id: string;
    clipId: string;
    status: string;
    progress: number;
    stage: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles: boolean;
    outputFilename: string | null;
    filenameStem: string | null;
    subtitleFilename: string | null;
    clipStartMs: number | null;
    clipEndMs: number | null;
    errorMessage: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: job.id,
      clipId: job.clipId,
      status: job.status,
      progress: job.progress,
      stage: job.stage,
      format: job.format,
      resolution:
        job.resolution,
      mode: job.mode,
      includeSubtitles:
        job.includeSubtitles,
      outputFilename: job.outputFilename,
      filenameStem: job.filenameStem,
      subtitleFilename: job.subtitleFilename,
      clipStartMs: job.clipStartMs,
      clipEndMs: job.clipEndMs,
      downloadUrl:
        job.status ===
          'COMPLETED'
          ? `/api/v1/clips/${job.clipId}/download`
          : null,
      errorMessage:
        job.errorMessage,
      startedAt:
        job.startedAt,
      completedAt:
        job.completedAt,
      createdAt:
        job.createdAt,
      updatedAt:
        job.updatedAt,
    };
  }
}
