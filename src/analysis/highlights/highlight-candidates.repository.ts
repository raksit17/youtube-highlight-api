import { Injectable } from '@nestjs/common';

import { Prisma } from '../../../generated/prisma/client';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class HighlightCandidatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  deleteForVideo(videoId: string) {
    return this.prisma.highlightCandidate.deleteMany({
      where: {
        videoId,
      },
    });
  }

  async replaceTop(
    videoId: string,

    candidates: {
      rank: number;

      startMs: number;
      peakMs: number;
      endMs: number;

      summary: string;

      category?: string;

      summaryScore: number;
      spikeScore: number;
      reactionScore: number;
      diversityScore: number;
      transcriptScore: number;
      termScore: number;

      finalScore: number;

      confidence: number;

      reason: unknown;

      windowIds: string[];
    }[],
  ) {
    return this.prisma.$transaction(async (tx) => {
      await tx.highlightCandidate.deleteMany({
        where: {
          videoId,
        },
      });

      for (const candidate of candidates) {
        const created = await tx.highlightCandidate.create({
          data: {
            videoId,

            rank: candidate.rank,

            startMs: candidate.startMs,

            peakMs: candidate.peakMs,

            endMs: candidate.endMs,

            summary: candidate.summary,

            category: candidate.category,

            summaryScore: candidate.summaryScore,

            spikeScore: candidate.spikeScore,

            reactionScore: candidate.reactionScore,

            diversityScore: candidate.diversityScore,

            transcriptScore: candidate.transcriptScore,

            termScore: candidate.termScore,

            finalScore: candidate.finalScore,

            confidence: candidate.confidence,

            reason: candidate.reason as Prisma.InputJsonValue,
          },
        });

        if (candidate.windowIds.length > 0) {
          await tx.highlightCandidateWindow.createMany({
            data: candidate.windowIds.map((analysisWindowId, position) => ({
              highlightCandidateId: created.id,

              analysisWindowId,

              position,
            })),
          });
        }
      }
    });
  }
}
