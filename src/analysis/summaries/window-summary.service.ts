import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { WindowSummariesRepository } from './window-summaries.repository';

type WindowSummaryRow = {
  analysisWindowId: string;

  summary: string;

  topic?: string;

  category?: string;

  keywords?: unknown;

  reactions?: unknown;

  events?: unknown;

  importanceScore: number;

  intensityScore: number;

  noveltyScore: number;

  contextScore: number;

  confidence: number;

  summaryScore: number;

  extractorVersion: string;
};

@Injectable()
export class WindowSummaryService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly repository: WindowSummariesRepository,
  ) {}

  async rebuild(videoId: string) {
    const windows = await this.prisma.analysisWindow.findMany({
      where: {
        videoId,
      },

      include: {
        terms: {
          orderBy: {
            count: 'desc',
          },

          take: 10,
        },
      },

      orderBy: {
        windowIndex: 'asc',
      },
    });

    const transcripts = await this.prisma.transcriptSegment.findMany({
      where: {
        videoId,
      },

      orderBy: {
        startMs: 'asc',
      },
    });

    const rows: WindowSummaryRow[] = [];

    for (const window of windows) {
      const transcriptText = transcripts
        .filter(
          (segment) =>
            segment.startMs < window.endMs &&
            segment.endMs > window.startMs,
        )
        .map((segment) => segment.text)
        .join(' ')
        .slice(0, 500);

      const keywords = window.terms
        .slice(0, 5)
        .map((term) => term.normalizedTerm);

      const category = this.detectCategory(window);

      const importanceScore = this.clamp(
        window.spikeScore * 0.5 +
          window.termScore * 0.3 +
          window.transcriptScore * 0.2,
      );

      const intensityScore = this.clamp(
        window.reactionScore * 0.6 +
          window.spikeScore * 0.4,
      );

      const noveltyScore = this.clamp(
        window.termScore * 0.6 + 40,
      );

      const contextScore = this.clamp(
        Math.min(
          window.transcriptWordCount * 2,
          100,
        ),
      );

      const summaryScore =
        importanceScore * 0.35 +
        intensityScore * 0.3 +
        noveltyScore * 0.2 +
        contextScore * 0.15;

      const summary = this.buildSummary(
        transcriptText,
        keywords,
        category,
      );

      rows.push({
        analysisWindowId: window.id,

        summary,

        topic:
          keywords.slice(0, 3).join(', ') ||
          undefined,

        category,

        keywords,

        reactions: {
          laughCount:
            window.laughCount,

          emojiCount:
            window.emojiCount,

          questionCount:
            window.questionCount,

          exclamationCount:
            window.exclamationCount,

          capsCount:
            window.capsCount,
        },

        events: {
          spikeScore:
            window.spikeScore,

          messageRatio:
            window.messageRatio,
        },

        importanceScore,

        intensityScore,

        noveltyScore,

        contextScore,

        confidence:
          transcriptText.length > 0 ||
          window.chatMessageCount > 0
            ? 0.8
            : 0.3,

        summaryScore,

        extractorVersion:
          'rule-v1',
      });
    }

    await this.repository.deleteForVideo(
      videoId,
    );

    await this.repository.createMany(
      rows,
    );

    return rows.length;
  }

  private detectCategory(window: {
    laughCount: number;
    reactionScore: number;
    spikeScore: number;
    questionCount: number;
    exclamationCount: number;
  }) {
    if (window.laughCount >= 5) {
      return 'FUNNY';
    }

    if (
      window.exclamationCount >= 5 ||
      window.questionCount >= 5
    ) {
      return 'SURPRISE';
    }

    if (window.reactionScore >= 60) {
      return 'REACTION';
    }

    if (window.spikeScore >= 60) {
      return 'CHAT_INTERACTION';
    }

    return 'CONVERSATION';
  }

  private buildSummary(
    transcript: string,
    keywords: string[],
    category: string,
  ) {
    const transcriptPart =
      transcript ||
      'No transcript available.';

    const keywordPart =
      keywords.length > 0
        ? ` Top reactions/terms: ${keywords.join(', ')}.`
        : '';

    return `${category}: ${transcriptPart}${keywordPart}`;
  }

  private clamp(value: number) {
    return Math.max(
      0,
      Math.min(100, value),
    );
  }
}