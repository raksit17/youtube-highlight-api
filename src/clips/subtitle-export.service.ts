import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

type SubtitleFormat = 'srt' | 'vtt';

type Caption = {
  startMs: number;
  endMs: number;
  text: string;
};

/**
 * Generates a standalone subtitle file using TranscriptSegment, with the
 * timestamps rebased to the beginning of the Clip Draft.
 */
@Injectable()
export class SubtitleExportService {
  constructor(private readonly prisma: PrismaService) {}

  async exportForClip(
    clipId: string,
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

    const clip = await this.prisma.clipDraft.findUnique({
      where: { id: clipId },
      select: { id: true, videoId: true, startMs: true, endMs: true },
    });
    if (!clip) {
      throw new NotFoundException('Clip draft not found');
    }

    const rows = await this.prisma.transcriptSegment.findMany({
      where: {
        videoId: clip.videoId,
        startMs: { lt: clip.endMs },
        endMs: { gt: clip.startMs },
      },
      select: {
        startMs: true,
        endMs: true,
        text: true,
        language: true,
        source: true,
      },
      orderBy: [{ startMs: 'asc' }, { sequence: 'asc' }],
    });

    if (rows.length === 0) {
      throw new NotFoundException(
        'No transcript segments in this clip range',
      );
    }

    // Prefer original English captions for translation workflows.
    // Otherwise use the first available language, never relabel as Thai.
    const languages = rows.map((row) => row.language ?? 'und');
    const selectedLanguage =
      language ??
      languages.find((code) => /^en(?:-|$)/i.test(code)) ??
      languages[0];

    const selectedRows = rows.filter((row) => {
      const code = (row.language ?? 'und').toLowerCase();
      return code === selectedLanguage.toLowerCase() ||
        (language !== undefined && code.startsWith(`${language}-`));
    });

    if (selectedRows.length === 0) {
      throw new NotFoundException(
        `No ${selectedLanguage} transcript found in this clip range`,
      );
    }

    // If multiple subtitle sources exist in the same language, take just
    // one track to prevent doubled captions in SRT/VTT.
    const firstSource = selectedRows[0].source ?? 'und';
    const captions = selectedRows
      .filter((row) => (row.source ?? 'und') === firstSource)
      .map((row) => ({
        startMs: Math.max(0, row.startMs - clip.startMs),
        endMs: Math.min(clip.endMs - clip.startMs, row.endMs - clip.startMs),
        text: row.text.replace(/\r/g, '').trim(),
      }))
      .filter((row) => row.text.length > 0 && row.endMs > row.startMs);

    if (captions.length === 0) {
      throw new NotFoundException(
        'No usable subtitle text in this clip range',
      );
    }

    const outputFormat = format as SubtitleFormat;
    const safeLanguage = selectedLanguage
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 20) || 'und';

    return {
      filename: `clip-${clip.id}.${safeLanguage}.${outputFormat}`,
      contentType:
        outputFormat === 'vtt'
          ? 'text/vtt; charset=utf-8'
          : 'application/x-subrip; charset=utf-8',
      language: selectedLanguage,
      content: makeSubtitleFile(captions, outputFormat),
    };
  }
}

export function makeSubtitleFile(
  captions: Caption[],
  format: SubtitleFormat,
): string {
  const blocks = captions.map((caption, index) => {
    const start = formatSubtitleTime(caption.startMs, format);
    const end = formatSubtitleTime(caption.endMs, format);
    return `${index + 1}\n${start} --> ${end}\n${caption.text}`;
  });

  return format === 'vtt'
    ? `WEBVTT\n\n${blocks.join('\n\n')}\n`
    : `${blocks.join('\n\n')}\n`;
}

export function formatSubtitleTime(ms: number, format: SubtitleFormat): string {
  const time = Math.max(0, Math.trunc(ms));
  const hours = Math.floor(time / 3_600_000);
  const minutes = Math.floor((time % 3_600_000) / 60_000);
  const seconds = Math.floor((time % 60_000) / 1000);
  const millis = time % 1000;
  const clock = [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(':');
  return `${clock}${format === 'vtt' ? '.' : ','}${String(millis).padStart(3, '0')}`;
}
