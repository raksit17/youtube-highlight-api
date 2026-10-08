import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import {
  ANALYSIS_WINDOW_MS,
  TOP_TERMS_PER_WINDOW,
} from '../analysis.constants';

import { AnalysisTermsRepository } from './analysis-terms.repository';

@Injectable()
export class TermExtractorService {
  private readonly stopWords = new Set([
    'the',
    'a',
    'an',
    'is',
    'are',
    'was',
    'were',
    'to',
    'of',
    'and',
    'or',
    'in',
    'on',
    'for',
    'it',
    'this',
    'that',
    'i',
    'you',
    'we',
    'they',
  ]);

  constructor(
    private readonly prisma: PrismaService,

    private readonly repository: AnalysisTermsRepository,
  ) {}

  async rebuild(videoId: string) {
    const windows = await this.prisma.analysisWindow.findMany({
      where: {
        videoId,
      },

      orderBy: {
        windowIndex: 'asc',
      },
    });

    const chats = await this.prisma.chatMessage.findMany({
      where: {
        videoId,
      },

      select: {
        timestampMs: true,

        message: true,
      },
    });

    const transcripts = await this.prisma.transcriptSegment.findMany({
      where: {
        videoId,
      },

      select: {
        startMs: true,
        text: true,
      },
    });

    const chatBuckets = new Map<number, Map<string, number>>();

    const transcriptBuckets = new Map<number, Map<string, number>>();

    for (const chat of chats) {
      const index = Math.floor(chat.timestampMs / ANALYSIS_WINDOW_MS);

      this.addText(chatBuckets, index, chat.message);
    }

    for (const segment of transcripts) {
      const index = Math.floor(segment.startMs / ANALYSIS_WINDOW_MS);

      this.addText(transcriptBuckets, index, segment.text);
    }

    const rows: {
      analysisWindowId: string;
      source: 'CHAT' | 'TRANSCRIPT';
      type: 'WORD';
      term: string;
      normalizedTerm: string;
      count: number;
      score: number;
    }[] = [];

    for (const window of windows) {
      const chatTerms = this.getTopTerms(chatBuckets.get(window.windowIndex));

      const transcriptTerms = this.getTopTerms(
        transcriptBuckets.get(window.windowIndex),
      );

      for (const [term, count] of chatTerms) {
        rows.push({
          analysisWindowId: window.id,

          source: 'CHAT',

          type: 'WORD',

          term,

          normalizedTerm: term,

          count,

          score: Math.min(100, count * 5),
        });
      }

      for (const [term, count] of transcriptTerms) {
        rows.push({
          analysisWindowId: window.id,

          source: 'TRANSCRIPT',

          type: 'WORD',

          term,

          normalizedTerm: term,

          count,

          score: Math.min(100, count * 5),
        });
      }

      const termScore = this.calculateTermScore(chatTerms, transcriptTerms);

      await this.prisma.analysisWindow.update({
        where: {
          id: window.id,
        },

        data: {
          termScore,
        },
      });
    }

    return this.repository.createMany(rows);
  }

  private addText(
    buckets: Map<number, Map<string, number>>,

    index: number,

    text: string,
  ) {
    let bucket = buckets.get(index);

    if (!bucket) {
      bucket = new Map();

      buckets.set(index, bucket);
    }

    const terms = this.tokenize(text);

    for (const term of terms) {
      bucket.set(term, (bucket.get(term) ?? 0) + 1);
    }
  }

  private tokenize(text: string) {
    return (text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? []).filter(
      (term) => term.length >= 2 && !this.stopWords.has(term),
    );
  }

  private getTopTerms(
    terms: Map<string, number> | undefined,
  ): [string, number][] {
    if (!terms) {
      return [];
    }

    return [...terms.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, TOP_TERMS_PER_WINDOW);
  }

  private calculateTermScore(
    chat: [string, number][],

    transcript: [string, number][],
  ) {
    const chatTop = chat.slice(0, 5).reduce((sum, [, count]) => sum + count, 0);

    const transcriptTop = transcript
      .slice(0, 5)
      .reduce((sum, [, count]) => sum + count, 0);

    return Math.min(100, chatTop * 4 + transcriptTop * 2);
  }
}
