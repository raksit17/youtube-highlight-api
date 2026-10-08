import { Injectable } from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';

import { PrismaService } from '../database/prisma.service';

import { NormalizedVideo } from '../normalizers/normalized/normalized-video.type';

export const videoReviewInclude = {
  _count: {
    select: {
      chatMessages: true,
      transcriptSegments: true,
      analysisWindows: true,
    },
  },
  highlightCandidates: {
    select: {
      status: true,
      finalScore: true,
      updatedAt: true,
    },
    orderBy: {
      finalScore: 'desc',
    },
  },
  analysisWindows: {
    select: {
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 1,
  },
} satisfies Prisma.VideoInclude;

export type VideoReviewRow = Prisma.VideoGetPayload<{
  include: typeof videoReviewInclude;
}>;

@Injectable()
export class VideosRepository {
  constructor(private readonly prisma: PrismaService) {}

  upsert(video: NormalizedVideo) {
    return this.prisma.video.upsert({
      where: {
        provider_externalId: {
          provider: video.provider,
          externalId: video.externalId,
        },
      },
      create: {
        provider: video.provider,
        externalId: video.externalId,
        url: video.url,
        title: video.title,
        description: video.description,
        channelExternalId: video.channelExternalId,
        channelName: video.channelName,
        channelUrl: video.channelUrl,
        channelFollowers: video.channelFollowers,
        uploadDate: video.uploadDate,
        publishedAt: video.publishedAt,
        releaseAt: video.releaseAt,
        viewCount: video.viewCount,
        likeCount: video.likeCount,
        commentCount: video.commentCount,
        durationMs: video.durationMs,
        thumbnailUrl: video.thumbnailUrl,
        width: video.width,
        height: video.height,
        fps: video.fps,
        liveStatus: video.liveStatus,
        isLive: video.isLive,
        wasLive: video.wasLive,
        concurrentViewers: video.concurrentViewers,
        language: video.language,
        availability: video.availability,
        ageLimit: video.ageLimit,
        tags: video.tags,
        categories: video.categories,
        metadata: video.metadata as Prisma.InputJsonValue,
      },
      update: {
        url: video.url,
        title: video.title,
        description: video.description,
        channelExternalId: video.channelExternalId,
        channelName: video.channelName,
        channelUrl: video.channelUrl,
        channelFollowers: video.channelFollowers,
        uploadDate: video.uploadDate,
        publishedAt: video.publishedAt,
        releaseAt: video.releaseAt,
        viewCount: video.viewCount,
        likeCount: video.likeCount,
        commentCount: video.commentCount,
        durationMs: video.durationMs,
        thumbnailUrl: video.thumbnailUrl,
        width: video.width,
        height: video.height,
        fps: video.fps,
        liveStatus: video.liveStatus,
        isLive: video.isLive,
        wasLive: video.wasLive,
        concurrentViewers: video.concurrentViewers,
        language: video.language,
        availability: video.availability,
        ageLimit: video.ageLimit,
        tags: video.tags,
        categories: video.categories,
        metadata: video.metadata as Prisma.InputJsonValue,
      },
    });
  }

  findPage(limit: number, cursor?: string) {
    return this.prisma.video.findMany({
      take: limit + 1,
      ...(cursor
        ? {
            cursor: {
              id: cursor,
            },
            skip: 1,
          }
        : {}),
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
        },
      ],
      include: videoReviewInclude,
    });
  }

  findByIdWithReviewData(id: string) {
    return this.prisma.video.findUnique({
      where: {
        id,
      },
      include: videoReviewInclude,
    });
  }

  findBySource(provider: string, externalId: string) {
    return this.prisma.video.findUnique({
      where: {
        provider_externalId: {
          provider,
          externalId,
        },
      },
    });
  }
}
