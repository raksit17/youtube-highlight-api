import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { buildClipFilenameStem } from './clip-filename.util';

export type SubtitleFormat = 'srt' | 'vtt';
export type SubtitleCue = { startMs: number; endMs: number; text: string };

/** Shared subtitle generator for draft downloads AND immutable render-job sidecars. */
@Injectable()
export class SubtitleExportService {
  constructor(private readonly prisma: PrismaService) {}

  async exportForClip(clipId: string, requestedFormat?: string, requestedLanguage?: string) {
    const clip = await this.prisma.clipDraft.findUnique({
      where: { id: clipId },
      include: {
        video: { select: { title: true } },
        candidate: { select: { rank: true } },
      },
    });
    if (!clip) throw new NotFoundException('Clip draft not found');
    const candidateSnapshot = clip.candidateSnapshot as { rank?: number } | null;
    const stem = buildClipFilenameStem({
      title: clip.title,
      videoTitle: clip.video.title,
      rank: clip.candidate?.rank ?? candidateSnapshot?.rank ?? null,
      sourcePreset: clip.sourcePreset,
      isCustomized: clip.isCustomized,
      startMs: clip.startMs,
      endMs: clip.endMs,
    });
    return this.exportForRange(
      clip.videoId, clip.startMs, clip.endMs, stem, requestedFormat, requestedLanguage,
    );
  }

  async exportForRange(
    videoId: string,
    startMs: number,
    endMs: number,
    filenameStem: string,
    requestedFormat?: string,
    requestedLanguage?: string,
  ) {
    const format = (requestedFormat ?? 'srt').toLowerCase();
    if (format !== 'srt' && format !== 'vtt') {
      throw new BadRequestException('format must be srt or vtt');
    }
    const language = requestedLanguage?.trim().toLowerCase();
    if (language && !/^[a-z0-9-]{1,20}$/.test(language)) {
      throw new BadRequestException('Invalid language code');
    }
    if (startMs < 0 || endMs <= startMs) {
      throw new BadRequestException('Invalid subtitle time range');
    }

    const rows = await this.prisma.transcriptSegment.findMany({
      where: {
        videoId,
        startMs: { lt: endMs },
        endMs: { gt: startMs },
      },
      select: {
        startMs: true, endMs: true, text: true, language: true, source: true,
      },
      orderBy: [{ startMs: 'asc' }, { sequence: 'asc' }],
    });
    if (!rows.length) {
      throw new NotFoundException('No transcript segments in this clip range');
    }

    const languages = rows.map((row) => (row.language ?? 'und').toLowerCase());
    const selectedLanguage = language ??
      languages.find((code) => /^en(?:-|$)/.test(code)) ??
      languages[0];

    const selectedRows = rows.filter((row) => {
      const code = (row.language ?? 'und').toLowerCase();
      return code === selectedLanguage ||
        (language != null && code.startsWith(language + '-'));
    });
    if (!selectedRows.length) {
      throw new NotFoundException('No ' + selectedLanguage + ' transcript in this clip range');
    }

    // Prevent duplicate subtitles from multiple collectors/sources.
    const selectedSource = selectedRows[0].source ?? 'und';
    const captions: SubtitleCue[] = selectedRows
      .filter((row) => (row.source ?? 'und') === selectedSource)
      .map((row) => ({
        startMs: Math.max(0, row.startMs - startMs),
        endMs: Math.min(endMs - startMs, row.endMs - startMs),
        text: row.text.replace(/\r/g, '').trim(),
      }))
      .filter((row) => row.text.length > 0 && row.endMs > row.startMs);
    if (!captions.length) throw new NotFoundException('No usable subtitle text in clip');

    const safeLanguage = selectedLanguage.replace(/[^a-z0-9-]/g, '').slice(0, 20) || 'und';
    return {
      filename: filenameStem + '.' + safeLanguage + '.' + format,
      contentType: format === 'vtt'
        ? 'text/vtt; charset=utf-8'
        : 'application/x-subrip; charset=utf-8',
      language: selectedLanguage,
      cues: captions,
      content: makeSubtitleFile(captions, format as SubtitleFormat),
    };
  }
}

export function makeSubtitleFile(captions: SubtitleCue[], format: SubtitleFormat): string {
  const blocks = captions.map((caption, index) => {
    const start = formatSubtitleTime(caption.startMs, format);
    const end = formatSubtitleTime(caption.endMs, format);
    return String(index + 1) + '\n' + start + ' --> ' + end + '\n' + caption.text;
  });
  return format === 'vtt'
    ? 'WEBVTT\n\n' + blocks.join('\n\n') + '\n'
    : blocks.join('\n\n') + '\n';
}
export function formatSubtitleTime(ms: number, format: SubtitleFormat): string {
  const value = Math.max(0, Math.trunc(ms));
  const clock = [
    Math.floor(value / 3_600_000),
    Math.floor((value % 3_600_000) / 60_000),
    Math.floor((value % 60_000) / 1000),
  ].map((n) => String(n).padStart(2, '0')).join(':');
  return clock + (format === 'vtt' ? '.' : ',') +
    String(value % 1000).padStart(3, '0');
}
