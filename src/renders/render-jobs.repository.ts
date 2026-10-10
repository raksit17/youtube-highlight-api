import { Injectable } from '@nestjs/common';

import {
  ClipDraftStatus,
  RenderJobStatus,
} from '../../generated/prisma/enums';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RenderJobsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findClipForRender(clipId: string) {
    return this.prisma.clipDraft.findUnique({
      where: {
        id: clipId,
      },
      include: {
        video: {
          select: {
            id: true,
            externalId: true,
            durationMs: true,
            title: true,
          },
        },
        candidate: { select: { rank: true } },
      },
    });
  }

  findActiveForClip(clipId: string) {
    return this.prisma.renderJob.findFirst({
      where: {
        clipId,
        status: {
          in: [
            RenderJobStatus.QUEUED,
            RenderJobStatus.RUNNING,
          ],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  create(input: {
    clipId: string;
    format: string;
    resolution: string;
    mode: string;
    includeSubtitles: boolean;
    clipStartMs: number;
    clipEndMs: number;
    filenameStem: string;
  }) {
    return this.prisma.renderJob.create({
      data: {
        clipId: input.clipId,
        clipStartMs: input.clipStartMs,
        clipEndMs: input.clipEndMs,
        filenameStem: input.filenameStem,
        format: input.format,
        resolution: input.resolution,
        mode: input.mode,
        includeSubtitles: input.includeSubtitles,
      },
    });
  }

  findById(id: string) {
    return this.prisma.renderJob.findUnique({
      where: {
        id,
      },
      include: {
        clip: {
          select: {
            id: true,
            videoId: true,
            startMs: true,
            endMs: true,
            peakMs: true,
            status: true,
          },
        },
      },
    });
  }

  findForWorker(id: string) {
    return this.prisma.renderJob.findUnique({
      where: {
        id,
      },
      include: {
        clip: {
          include: {
            video: {
              select: {
                id: true,
                externalId: true,
                durationMs: true,
              },
            },
          },
        },
      },
    });
  }

  findLatestCompletedForClip(clipId: string) {
    return this.prisma.renderJob.findFirst({
      where: {
        clipId,
        status: RenderJobStatus.COMPLETED,
        outputPath: {
          not: null,
        },
      },
      orderBy: {
        completedAt: 'desc',
      },
    });
  }

  markRunning(id: string) {
    return this.prisma.renderJob.update({
      where: {
        id,
      },
      data: {
        status: RenderJobStatus.RUNNING,
        progress: 5,
        stage: 'LOCATING_SOURCE',
        startedAt: new Date(),
        completedAt: null,
        errorMessage: null,
      },
    });
  }

  updateProgress(
    id: string,
    progress: number,
    stage = 'RENDERING',
  ) {
    return this.prisma.renderJob.update({
      where: {
        id,
      },
      data: {
        progress: Math.max(0, Math.min(99, Math.trunc(progress))),
        stage,
      },
    });
  }

  async markCompleted(
    id: string,
    clipId: string,
    outputPath: string,
    outputFilename: string,
    subtitleFilename?: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const job = await tx.renderJob.update({
        where: {
          id,
        },
        data: {
          status: RenderJobStatus.COMPLETED,
          progress: 100,
          stage: 'COMPLETED',
          outputPath,
          outputFilename,
          subtitleFilename,
          completedAt: new Date(),
          errorMessage: null,
        },
      });

      await tx.clipDraft.update({
        where: {
          id: clipId,
        },
        data: {
          status: ClipDraftStatus.EXPORTED,
          exportedAt: new Date(),
        },
      });

      return job;
    });
  }

  markFailed(id: string, errorMessage: string) {
    return this.prisma.renderJob.update({
      where: {
        id,
      },
      data: {
        status: RenderJobStatus.FAILED,
        stage: 'FAILED',
        errorMessage,
        completedAt: new Date(),
      },
    });
  }
}
