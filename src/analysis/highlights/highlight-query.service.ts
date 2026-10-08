import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '../../../generated/prisma/client';
import { HighlightStatus } from '../../../generated/prisma/enums';

import { PrismaService } from '../../database/prisma.service';

import {
  CLIP_PRESETS,
  ClipPresetName,
} from '../analysis.constants';

import { buildClipPresetRange } from './clip-preset.util';

const candidateInclude = {
  video: {
    select: {
      durationMs: true,
    },
  },
  clipVariants: {
    select: {
      preset: true,
      startMs: true,
      endMs: true,
      durationMs: true,
    },
  },
  windows: {
    orderBy: {
      position: 'asc',
    },
    include: {
      analysisWindow: {
        include: {
          terms: {
            orderBy: {
              count: 'desc',
            },
            take: 20,
          },
        },
      },
    },
  },
} satisfies Prisma.HighlightCandidateInclude;

type CandidateRow = Prisma.HighlightCandidateGetPayload<{
  include: typeof candidateInclude;
}>;

@Injectable()
export class HighlightQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async listCandidates(
    videoId: string,
    input: {
      limit?: number;
      sort?: string;
    },
  ) {
    const video = await this.prisma.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        id: true,
      },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const limit = Math.max(1, Math.min(input.limit ?? 20, 100));

    const candidates = await this.prisma.highlightCandidate.findMany({
      where: {
        videoId,
      },
      include: candidateInclude,
      orderBy:
        input.sort === 'rank_asc'
          ? [
              {
                rank: 'asc',
              },
              {
                finalScore: 'desc',
              },
            ]
          : {
              finalScore: 'desc',
            },
      take: limit,
    });

    const items = await Promise.all(
      candidates.map((candidate, index) =>
        this.toCandidateResponse(candidate, index + 1),
      ),
    );

    const total = await this.prisma.highlightCandidate.count({
      where: {
        videoId,
      },
    });

    return {
      items,
      total,
    };
  }

  async getContext(
    candidateId: string,
    input: {
      beforeMs?: number;
      afterMs?: number;
      chatLimit?: number;
    },
  ) {
    const candidate = await this.prisma.highlightCandidate.findUnique({
      where: {
        id: candidateId,
      },
      select: {
        id: true,
        videoId: true,
        peakMs: true,
      },
    });

    if (!candidate) {
      throw new NotFoundException('Highlight candidate not found');
    }

    const beforeMs = this.clampInteger(input.beforeMs ?? 20_000, 0, 300_000);
    const afterMs = this.clampInteger(input.afterMs ?? 20_000, 0, 300_000);
    const chatLimit = this.clampInteger(input.chatLimit ?? 100, 1, 500);

    const startMs = Math.max(0, candidate.peakMs - beforeMs);
    const endMs = candidate.peakMs + afterMs;

    const [transcripts, chats, chatTotal] = await Promise.all([
      this.prisma.transcriptSegment.findMany({
        where: {
          videoId: candidate.videoId,
          startMs: {
            lt: endMs,
          },
          endMs: {
            gt: startMs,
          },
        },
        select: {
          startMs: true,
          endMs: true,
          text: true,
        },
        orderBy: {
          startMs: 'asc',
        },
      }),
      this.prisma.chatMessage.findMany({
        where: {
          videoId: candidate.videoId,
          timestampMs: {
            gte: startMs,
            lte: endMs,
          },
        },
        select: {
          timestampMs: true,
          authorName: true,
          message: true,
        },
        orderBy: {
          timestampMs: 'asc',
        },
        take: chatLimit,
      }),
      this.prisma.chatMessage.count({
        where: {
          videoId: candidate.videoId,
          timestampMs: {
            gte: startMs,
            lte: endMs,
          },
        },
      }),
    ]);

    return {
      candidateId: candidate.id,
      peakMs: candidate.peakMs,
      range: {
        startMs,
        endMs,
      },
      transcripts,
      chats,
      chatTotal,
      chatReturned: chats.length,
      truncated: chatTotal > chats.length,
    };
  }

  async getHeatmap(videoId: string, requestedBucketMs?: number) {
    const bucketMs = this.clampInteger(requestedBucketMs ?? 15_000, 1_000, 300_000);

    const video = await this.prisma.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        id: true,
        durationMs: true,
      },
    });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const [windows, candidates] = await Promise.all([
      this.prisma.analysisWindow.findMany({
        where: {
          videoId,
          windowSizeMs: bucketMs,
        },
        select: {
          startMs: true,
          endMs: true,
          chatMessageCount: true,
        },
        orderBy: {
          windowIndex: 'asc',
        },
      }),
      this.prisma.highlightCandidate.findMany({
        where: {
          videoId,
        },
        select: {
          id: true,
          rank: true,
          peakMs: true,
          finalScore: true,
        },
        orderBy: [
          {
            rank: 'asc',
          },
          {
            finalScore: 'desc',
          },
        ],
      }),
    ]);

    const maxMessageCount = windows.reduce(
      (max, window) => Math.max(max, window.chatMessageCount),
      0,
    );

    const durationMs =
      video.durationMs ?? windows.at(-1)?.endMs ?? 0;

    return {
      videoId,
      durationMs,
      bucketMs,
      maxMessageCount,
      buckets: windows.map((window) => ({
        startMs: window.startMs,
        endMs: window.endMs,
        messageCount: window.chatMessageCount,
        normalizedHeat:
          maxMessageCount > 0
            ? window.chatMessageCount / maxMessageCount
            : 0,
      })),
      markers: candidates.map((candidate, index) => ({
        candidateId: candidate.id,
        rank: candidate.rank ?? index + 1,
        peakMs: candidate.peakMs,
        score: candidate.finalScore,
      })),
    };
  }

  async reviewCandidate(
    candidateId: string,
    body: {
      status?: string;
      reason?: string;
    },
  ) {
    const allowedStatuses = new Set([
      HighlightStatus.NEW,
      HighlightStatus.REVIEWING,
      HighlightStatus.APPROVED,
      HighlightStatus.REJECTED,
      HighlightStatus.CLIPPED,
    ]);

    if (!body.status || !allowedStatuses.has(body.status as HighlightStatus)) {
      throw new BadRequestException('Invalid highlight review status');
    }

    const candidate = await this.prisma.highlightCandidate.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!candidate) {
      throw new NotFoundException('Highlight candidate not found');
    }

    const existingReason =
      candidate.reason &&
      typeof candidate.reason === 'object' &&
      !Array.isArray(candidate.reason)
        ? candidate.reason
        : {};

    await this.prisma.highlightCandidate.update({
      where: {
        id: candidateId,
      },
      data: {
        status: body.status as HighlightStatus,
        reason: {
          ...existingReason,
          review: {
            rejectionReason:
              body.status === HighlightStatus.REJECTED
                ? body.reason ?? null
                : null,
          },
        } as Prisma.InputJsonValue,
      },
    });

    const updated = await this.prisma.highlightCandidate.findUnique({
      where: {
        id: candidateId,
      },
      include: candidateInclude,
    });

    if (!updated) {
      throw new NotFoundException('Highlight candidate not found');
    }

    return this.toCandidateResponse(updated, updated.rank ?? 1);
  }

  private async toCandidateResponse(
    candidate: CandidateRow,
    fallbackRank: number,
  ) {
    const chatRows = await this.prisma.chatMessage.findMany({
      where: {
        videoId: candidate.videoId,
        timestampMs: {
          gte: candidate.startMs,
          lte: candidate.endMs,
        },
      },
      select: {
        authorId: true,
        authorName: true,
      },
    });

    const uniqueAuthors = new Set<string>();

    for (const chat of chatRows) {
      const key = chat.authorId ?? chat.authorName;

      if (key) {
        uniqueAuthors.add(key);
      }
    }

    const windows = candidate.windows.map((link) => link.analysisWindow);

    const laughCount = windows.reduce(
      (sum, window) => sum + window.laughCount,
      0,
    );

    const emojiCount = windows.reduce(
      (sum, window) => sum + window.emojiCount,
      0,
    );

    const maxMessageRatio = windows.reduce<number | null>((max, window) => {
      if (window.messageRatio === null) {
        return max;
      }

      return max === null ? window.messageRatio : Math.max(max, window.messageRatio);
    }, null);

    const averageReactionScore =
      windows.length > 0
        ? windows.reduce((sum, window) => sum + window.reactionScore, 0) /
          windows.length
        : 0;

    const averageTranscriptScore =
      windows.length > 0
        ? windows.reduce((sum, window) => sum + window.transcriptScore, 0) /
          windows.length
        : 0;

    const termCounts = new Map<string, number>();

    for (const window of windows) {
      for (const term of window.terms) {
        termCounts.set(
          term.normalizedTerm,
          (termCounts.get(term.normalizedTerm) ?? 0) + term.count,
        );
      }
    }

    const topTerms = [...termCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([term]) => term);

    const messageCount = chatRows.length;
    const uniqueChatters = uniqueAuthors.size;
    const authorRatio =
      messageCount > 0 ? uniqueChatters / messageCount : 1;

    const isPotentialSpam =
      messageCount >= 20 && authorRatio < 0.2;

    const reasonLabel = this.reasonLabel({
      isPotentialSpam,
      laughCount,
      maxMessageRatio,
      uniqueChatters,
      averageReactionScore,
      averageTranscriptScore,
      messageCount,
    });

    const maxWindowMessageCount = windows.reduce(
      (max, window) => Math.max(max, window.chatMessageCount),
      0,
    );

    const reviewReason = this.readReviewReason(candidate.reason);

    return {
      id: candidate.id,
      videoId: candidate.videoId,
      rank: candidate.rank ?? fallbackRank,
      startMs: candidate.startMs,
      peakMs: candidate.peakMs,
      endMs: candidate.endMs,
      finalScore: candidate.finalScore,
      category: candidate.category,
      status: candidate.status,
      summary: candidate.summary,
      rejectionReason: reviewReason,
      clipPresets: this.buildClipPresets(candidate),
      insights: {
        reasonLabel,
        chatIncreasePercent:
          maxMessageRatio === null
            ? null
            : Math.max(0, (maxMessageRatio - 1) * 100),
        messageCount,
        uniqueChatters,
        laughCount,
        emojiCount,
        isPotentialSpam,
        topTerms,
        density: windows.map((window) =>
          maxWindowMessageCount > 0
            ? Math.round(
                (window.chatMessageCount / maxWindowMessageCount) * 100,
              )
            : 0,
        ),
      },
    };
  }

  private buildClipPresets(candidate: CandidateRow) {
    const videoDurationMs =
      candidate.video.durationMs ??
      Math.max(candidate.endMs, candidate.peakMs, 1);

    const presets = Object.keys(CLIP_PRESETS) as ClipPresetName[];

    return Object.fromEntries(
      presets.map((preset) => {
        const stored = candidate.clipVariants.find(
          (variant) => String(variant.preset) === preset,
        );

        const range =
          stored ??
          buildClipPresetRange(
            preset,
            candidate.peakMs,
            videoDurationMs,
          );

        return [
          preset,
          {
            label: CLIP_PRESETS[preset].label,
            startMs: range.startMs,
            endMs: range.endMs,
            durationMs: range.durationMs,
          },
        ];
      }),
    );
  }

  private reasonLabel(input: {
    isPotentialSpam: boolean;
    laughCount: number;
    maxMessageRatio: number | null;
    uniqueChatters: number;
    averageReactionScore: number;
    averageTranscriptScore: number;
    messageCount: number;
  }) {
    if (input.isPotentialSpam) {
      return 'Possible spam';
    }

    if (input.laughCount >= 8) {
      return 'Laughter spike';
    }

    if ((input.maxMessageRatio ?? 0) >= 2.5) {
      return 'Sudden chat burst';
    }

    if (input.uniqueChatters >= 50) {
      return 'Large audience reaction';
    }

    if (input.averageReactionScore >= 70) {
      return 'Strong audience reaction';
    }

    if (input.averageTranscriptScore >= 60 && input.messageCount >= 20) {
      return 'Speech and chat reaction';
    }

    return 'Audience reaction';
  }

  private readReviewReason(reason: Prisma.JsonValue | null) {
    if (!reason || typeof reason !== 'object' || Array.isArray(reason)) {
      return null;
    }

    const review = reason.review;

    if (!review || typeof review !== 'object' || Array.isArray(review)) {
      return null;
    }

    return typeof review.rejectionReason === 'string'
      ? review.rejectionReason
      : null;
  }

  private clampInteger(value: number, min: number, max: number) {
    if (!Number.isFinite(value)) {
      return min;
    }

    return Math.max(min, Math.min(max, Math.trunc(value)));
  }
}
