import { Injectable, Logger } from '@nestjs/common';
import { spawn } from 'node:child_process';
import { readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { SubtitleExportService, type SubtitleCue } from '../clips/subtitle-export.service';
import { parseSyncedSrt, rebaseCuesToHighlight } from './subtitle-sync.util';

type SyncInput = {
  videoId: string;
  sourcePath: string;
  workDirectory: string;
  filenameStem: string;
  language: string;
  startMs: number;
  endMs: number;
  videoDurationMs: number | null;
};

@Injectable()
export class SubtitleSyncService {
  private readonly logger = new Logger(SubtitleSyncService.name);

  constructor(private readonly subtitleExportService: SubtitleExportService) {}

  /**
   * Compare original yt-dlp captions with speech in the SAME local media file
   * that the render worker will trim. Use padded context to retain boundary cues.
   * Do not persist sync offsets in the source transcript database.
   */
  async syncHighlight(input: SyncInput): Promise<SubtitleCue[]> {
    const configured = Number(process.env.SUBTITLE_SYNC_CONTEXT_SECONDS ?? '15');
    const contextPaddingMs = Number.isFinite(configured)
      ? Math.round(Math.max(3, Math.min(configured, 60)) * 1000)
      : 15_000;

    const contextStartMs = Math.max(0, input.startMs - contextPaddingMs);
    const contextEndMs = Math.min(
      input.videoDurationMs ?? Number.POSITIVE_INFINITY,
      input.endMs + contextPaddingMs,
    );
    if (contextEndMs <= contextStartMs) throw new Error('Invalid subtitle synchronization context');

    const context = await this.subtitleExportService.exportForRange(
      input.videoId, contextStartMs, contextEndMs,
      input.filenameStem + '-sync-context', 'srt', input.language,
    );
    if (context.cues.length < 3) {
      throw new Error('Subtitle sync needs at least 3 source cues in the highlight context');
    }

    const originalPath = join(input.workDirectory, '__sync_original.srt');
    const audioPath = join(input.workDirectory, '__sync_audio.wav');
    const alignedPath = join(input.workDirectory, '__sync_aligned.srt');
    const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg';
    const ffsubsyncPath = process.env.FFSUBSYNC_PATH || 'ffs';
    const rangeSeconds = ((contextEndMs - contextStartMs) / 1000).toFixed(3);

    try {
      await writeFile(originalPath, context.content, 'utf8');

      await this.runCommand(ffmpegPath, [
        '-y', '-hide_banner', '-loglevel', 'error',
        '-ss', (contextStartMs / 1000).toFixed(3),
        '-i', input.sourcePath,
        '-t', rangeSeconds,
        '-map', '0:a:0', '-vn',
        '-ac', '1', '-ar', '16000', '-c:a', 'pcm_s16le',
        audioPath,
      ], 'FFmpeg audio extraction');

      const offsetSeconds = (contextPaddingMs / 1000).toFixed(3);
      const syncLog = await this.runCommand(ffsubsyncPath, [
        audioPath, '-i', originalPath, '-o', alignedPath,
        '--no-fix-framerate',
        '--max-offset-seconds', offsetSeconds,
        '--skip-sync-on-low-quality',
        '--quality-max-offset-seconds', offsetSeconds,
      ], 'ffsubsync');

      // ffsubsync can exit 0 and write the UNMODIFIED SRT on a rejected match.
      // Do not label that fallback as a successfully synchronized subtitle.
      if (/low-quality alignment|leaving subtitles unmodified/i.test(syncLog)) {
        throw new Error('Automatic subtitle alignment was low-confidence; review subtitle timing manually');
      }

      const synced = parseSyncedSrt(await readFile(alignedPath, 'utf8'));
      const cues = rebaseCuesToHighlight(
        synced,
        input.startMs - contextStartMs,
        input.endMs - input.startMs,
      );
      if (!cues.length) throw new Error('Automatic synchronization produced no subtitles inside the highlight');
      const foundOffset = /offset seconds:\s*([+-]?\d+(?:\.\d+)?)/i.exec(syncLog);
      this.logger.log(
        'Synchronized highlight ' + input.filenameStem +
        (foundOffset ? ' (detected offset ' + foundOffset[1] + 's)' : '') +
        ', ' + cues.length + ' cues',
      );
      return cues;
    } finally {
      await Promise.all([originalPath, audioPath, alignedPath].map((path) =>
        rm(path, { force: true }).catch(() => undefined),
      ));
    }
  }

  private async runCommand(command: string, args: string[], step: string): Promise<string> {
    const configured = Number(process.env.SUBTITLE_SYNC_TIMEOUT_MS ?? '300000');
    const timeoutMs = Number.isFinite(configured)
      ? Math.max(1000, Math.min(configured, 900000))
      : 300000;

    return new Promise<string>((resolve, reject) => {
      const child = spawn(command, args, { windowsHide: true });
      let output = '';
      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        child.kill();
      }, timeoutMs);

      child.stderr.on('data', (chunk: Buffer) => {
        output = (output + chunk.toString()).slice(-16000);
      });
      child.stdout.on('data', (chunk: Buffer) => {
        output = (output + chunk.toString()).slice(-16000);
      });
      child.on('error', (error) => {
        clearTimeout(timeout);
        reject(new Error(step + ' could not start (' + command + '): ' + error.message));
      });
      child.on('close', (code) => {
        clearTimeout(timeout);
        if (timedOut) {
          reject(new Error(step + ' timed out after ' + timeoutMs + ' ms'));
        } else if (code !== 0) {
          reject(new Error(step + ' failed: ' + (output.trim() || 'exit code ' + String(code))));
        } else {
          resolve(output);
        }
      });
    });
  }
}
