import { Injectable } from '@nestjs/common';

import { HighlightLengthPreset } from '../../../generated/prisma/enums';

import { PrismaService } from '../../database/prisma.service';

import {
  CLIP_PRESETS,
  ClipPresetName,
} from '../analysis.constants';

import { buildClipPresetRange } from './clip-preset.util';

@Injectable()
export class HighlightClipVariantService {
  constructor(private readonly prisma: PrismaService) {}

  async rebuildForVideo(videoId: string) {
    const [video, candidates] = await Promise.all([
      this.prisma.video.findUniqueOrThrow({
        where: { id: videoId },
        select: { durationMs: true },
      }),
      this.prisma.highlightCandidate.findMany({
        where: { videoId },
        select: {
          id: true,
          peakMs: true,
          endMs: true,
        },
        orderBy: { rank: 'asc' },
      }),
    ]);

    const fallbackDurationMs = candidates.reduce(
      (max, candidate) => Math.max(max, candidate.endMs),
      0,
    );

    const videoDurationMs =
      video.durationMs ?? fallbackDurationMs;

    await this.prisma.highlightClipVariant.deleteMany({
      where: {
        candidate: {
          videoId,
        },
      },
    });

    if (candidates.length === 0 || videoDurationMs <= 0) {
      return 0;
    }

    const presets = Object.keys(CLIP_PRESETS) as ClipPresetName[];

    const rows = candidates.flatMap((candidate) =>
      presets.map((preset) => {
        const range = buildClipPresetRange(
          preset,
          candidate.peakMs,
          videoDurationMs,
        );

        return {
          candidateId: candidate.id,
          preset: preset as HighlightLengthPreset,
          startMs: range.startMs,
          endMs: range.endMs,
          durationMs: range.durationMs,
        };
      }),
    );

    const result = await this.prisma.highlightClipVariant.createMany({
      data: rows,
      skipDuplicates: true,
    });

    return result.count;
  }
}
