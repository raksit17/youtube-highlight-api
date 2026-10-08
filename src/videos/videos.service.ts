import { Injectable, NotFoundException } from '@nestjs/common';

import { VideosRepository, VideoReviewRow } from './videos.repository';

@Injectable()
export class VideosService {
  constructor(private readonly videosRepository: VideosRepository) {}

  async list(input: { limit?: number; cursor?: string }) {
    const limit = Math.max(1, Math.min(input.limit ?? 20, 100));

    const rows = await this.videosRepository.findPage(limit, input.cursor);

    const hasMore = rows.length > limit;
    const items = hasMore ? rows.slice(0, limit) : rows;

    return {
      items: items.map((video) => this.toResponse(video)),
      nextCursor: hasMore ? items.at(-1)?.id ?? null : null,
    };
  }

  async findOne(id: string) {
    const video = await this.videosRepository.findByIdWithReviewData(id);

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    return this.toResponse(video);
  }

  private toResponse(video: VideoReviewRow) {
    const review = {
      total: video.highlightCandidates.length,
      new: 0,
      approved: 0,
      rejected: 0,
      clipped: 0,
    };

    for (const candidate of video.highlightCandidates) {
      switch (candidate.status) {
        case 'NEW':
        case 'REVIEWING':
          review.new += 1;
          break;
        case 'APPROVED':
          review.approved += 1;
          break;
        case 'REJECTED':
          review.rejected += 1;
          break;
        case 'CLIPPED':
          review.clipped += 1;
          break;
      }
    }

    const highestScore =
      video.highlightCandidates.length > 0
        ? Math.max(
            ...video.highlightCandidates.map((candidate) => candidate.finalScore),
          )
        : null;

    const analyzedAt = video.analysisWindows[0]?.updatedAt ?? null;

    return {
      id: video.id,
      provider: video.provider,
      externalId: video.externalId,
      url: video.url,
      title: video.title,
      channelName: video.channelName,
      thumbnailUrl: video.thumbnailUrl,
      durationMs: video.durationMs ?? 0,
      chatCount: video._count.chatMessages,
      transcriptCount: video._count.transcriptSegments,
      createdAt: video.createdAt.toISOString(),
      analysis: {
        status:
          video._count.analysisWindows > 0 || video.highlightCandidates.length > 0
            ? 'COMPLETED'
            : 'NOT_STARTED',
        candidateCount: video.highlightCandidates.length,
        highestScore,
        analyzedAt: analyzedAt?.toISOString() ?? null,
      },
      review,
    };
  }
}
