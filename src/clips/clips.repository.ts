import { Injectable } from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';

import {
  ClipDraftStatus,
  HighlightLengthPreset,
} from '../../generated/prisma/enums';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ClipsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findVideoById(videoId: string) {
    return this.prisma.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        id: true,
        provider: true,
        externalId: true,
        url: true,
        title: true,
        durationMs: true,
      },
    });
  }

  findCandidateForVideo(videoId: string, candidateId: string) {
    return this.prisma.highlightCandidate.findFirst({
      where: {
        id: candidateId,
        videoId,
      },
      select: {
        id: true,
        videoId: true,
        rank: true,
        startMs: true,
        peakMs: true,
        endMs: true,
        finalScore: true,
        summaryScore: true,
        category: true,
        summary: true,
        status: true,
        clipVariants: {
          select: {
            preset: true,
            startMs: true,
            endMs: true,
            durationMs: true,
          },
        },
      },
    });
  }

  create(input: {
    videoId: string;
    candidateId?: string;
    startMs: number;
    endMs: number;
    peakMs?: number;
    title?: string;
    note?: string;
    sourcePreset?: HighlightLengthPreset;
    isCustomized?: boolean;
    candidateSnapshot?: Prisma.InputJsonValue;
  }) {
    return this.prisma.clipDraft.create({
      data: {
        videoId: input.videoId,
        candidateId: input.candidateId,
        startMs: input.startMs,
        endMs: input.endMs,
        peakMs: input.peakMs,
        title: input.title,
        note: input.note,
        sourcePreset: input.sourcePreset,
        isCustomized: input.isCustomized ?? false,
        candidateSnapshot: input.candidateSnapshot,
      },
      include: {
        candidate: true,
      },
    });
  }

  findByVideoId(videoId: string) {
    return this.prisma.clipDraft.findMany({
      where: {
        videoId,
      },
      include: {
        candidate: {
          select: {
            id: true,
            rank: true,
            finalScore: true,
            category: true,
            summary: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findById(id: string) {
    return this.prisma.clipDraft.findUnique({
      where: {
        id,
      },
      include: {
        video: {
          select: {
            id: true,
            provider: true,
            externalId: true,
            url: true,
            title: true,
            durationMs: true,
          },
        },
        candidate: {
          select: {
            id: true,
            rank: true,
            startMs: true,
            peakMs: true,
            endMs: true,
            finalScore: true,
            category: true,
            summary: true,
            status: true,
          },
        },
      },
    });
  }

  update(
    id: string,
    input: {
      startMs?: number;
      endMs?: number;
      title?: string;
      note?: string;
      status?: ClipDraftStatus;
      isCustomized?: boolean;
    },
  ) {
    return this.prisma.clipDraft.update({
      where: {
        id,
      },
      data: {
        startMs: input.startMs,
        endMs: input.endMs,
        title: input.title,
        note: input.note,
        status: input.status,
        isCustomized: input.isCustomized,
      },
      include: {
        candidate: true,
      },
    });
  }

  delete(id: string) {
    return this.prisma.clipDraft.delete({
      where: {
        id,
      },
    });
  }
}
