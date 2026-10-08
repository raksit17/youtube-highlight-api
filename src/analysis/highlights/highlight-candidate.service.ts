import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import {
  HIGHLIGHT_POST_ROLL_MS,
  HIGHLIGHT_PRE_ROLL_MS,
  MAX_HIGHLIGHT_DURATION_MS,
  TOP_HIGHLIGHTS,
} from '../analysis.constants';

import { HighlightCandidatesRepository } from './highlight-candidates.repository';

import { HighlightClipVariantService } from './highlight-clip-variant.service';

@Injectable()
export class HighlightCandidateService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly repository: HighlightCandidatesRepository,

    private readonly clipVariantService: HighlightClipVariantService,
  ) {}

  async rebuild(videoId: string) {
    const video = await this.prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },

      select: {
        durationMs: true,
      },
    });

    const windows = await this.prisma.analysisWindow.findMany({
      where: {
        videoId,

        summary: {
          isNot: null,
        },
      },

      include: {
        summary: true,
      },

      orderBy: {
        windowIndex: 'asc',
      },
    });

    const interesting = windows.filter(
      (window) =>
        (window.summary?.summaryScore ?? 0) >= 55 ||
        window.spikeScore >= 65 ||
        window.reactionScore >= 70,
    );

    const groups: (typeof interesting)[] = [];

    for (const window of interesting) {
      const lastGroup = groups.at(-1);

      const lastWindow = lastGroup?.at(-1);

      if (
        !lastGroup ||
        !lastWindow ||
        window.windowIndex > lastWindow.windowIndex + 1 ||
        window.endMs - lastGroup[0].startMs > MAX_HIGHLIGHT_DURATION_MS
      ) {
        groups.push([window]);

        continue;
      }

      lastGroup.push(window);
    }

    const candidates = groups.map((group) => {
      const peak = [...group].sort(
        (a, b) => this.windowScore(b) - this.windowScore(a),
      )[0];

      const summaryScore = this.average(
        group.map((window) => window.summary?.summaryScore ?? 0),
      );

      const spikeScore = Math.max(...group.map((window) => window.spikeScore));

      const reactionScore = this.average(
        group.map((window) => window.reactionScore),
      );

      const diversityScore = this.average(
        group.map((window) => window.diversityScore),
      );

      const transcriptScore = this.average(
        group.map((window) => window.transcriptScore),
      );

      const termScore = this.average(group.map((window) => window.termScore));

      const finalScore =
        summaryScore * 0.45 +
        spikeScore * 0.25 +
        reactionScore * 0.15 +
        diversityScore * 0.1 +
        transcriptScore * 0.05;

      const rawStart = group[0].startMs - HIGHLIGHT_PRE_ROLL_MS;

      const rawEnd = group.at(-1)!.endMs + HIGHLIGHT_POST_ROLL_MS;

      const startMs = Math.max(0, rawStart);

      const endMs = Math.min(
        video.durationMs ?? rawEnd,

        rawEnd,
      );

      const summary = group
        .map((window) => window.summary?.summary)
        .filter(Boolean)
        .join(' ')
        .slice(0, 1500);

      return {
        startMs,

        peakMs: Math.floor((peak.startMs + peak.endMs) / 2),

        endMs,

        summary,

        category: peak.summary?.category ?? undefined,

        summaryScore,

        spikeScore,

        reactionScore,

        diversityScore,

        transcriptScore,

        termScore,

        finalScore,

        confidence: Math.min(1, finalScore / 100),

        reason: {
          sourceWindows: group.map((window) => ({
            startMs: window.startMs,

            endMs: window.endMs,

            summaryScore: window.summary?.summaryScore,

            spikeScore: window.spikeScore,
          })),
        },

        windowIds: group.map((window) => window.id),
      };
    });

    const top5 = candidates
      .sort((a, b) => b.finalScore - a.finalScore)
      .slice(0, TOP_HIGHLIGHTS)
      .map((candidate, index) => ({
        ...candidate,

        rank: index + 1,
      }));

    await this.repository.replaceTop(videoId, top5);

    await this.clipVariantService.rebuildForVideo(videoId);

    return top5;
  }

  private windowScore(window: {
    spikeScore: number;
    reactionScore: number;

    summary: {
      summaryScore: number;
    } | null;
  }) {
    return (
      (window.summary?.summaryScore ?? 0) * 0.5 +
      window.spikeScore * 0.3 +
      window.reactionScore * 0.2
    );
  }

  private average(values: number[]) {
    if (values.length === 0) {
      return 0;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }
}
