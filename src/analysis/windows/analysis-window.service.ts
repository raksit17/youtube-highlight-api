import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

import { ANALYSIS_WINDOW_MS } from '../analysis.constants';

import { AnalysisWindowsRepository } from './analysis-windows.repository';

@Injectable()
export class AnalysisWindowService {
  constructor(
    private readonly prisma: PrismaService,

    private readonly repository:
      AnalysisWindowsRepository,
  ) {}

  async rebuild(
    videoId: string,
  ) {
    const video =
      await this.prisma.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },

        select: {
          durationMs: true,
        },
      });

    const chats =
      await this.prisma.chatMessage.findMany({
        where: {
          videoId,
        },

        select: {
          timestampMs: true,
          authorId: true,
          authorName: true,
          message: true,
        },

        orderBy: {
          timestampMs: 'asc',
        },
      });

    const transcripts =
      await this.prisma.transcriptSegment.findMany({
        where: {
          videoId,
        },

        select: {
          startMs: true,
          endMs: true,
          text: true,
        },

        orderBy: {
          startMs: 'asc',
        },
      });

    const maxChatMs =
      chats.at(-1)?.timestampMs ?? 0;

    const maxTranscriptMs =
      transcripts.at(-1)?.endMs ?? 0;

    const durationMs =
      video.durationMs ??
      Math.max(
        maxChatMs,
        maxTranscriptMs,
      );

    if (durationMs <= 0) {
      return [];
    }

    const windowCount =
      Math.ceil(
        durationMs /
          ANALYSIS_WINDOW_MS,
      );

    const windows = Array.from(
      {
        length: windowCount,
      },
      (_, index) => ({
        index,

        startMs:
          index *
          ANALYSIS_WINDOW_MS,

        endMs: Math.min(
          (index + 1) *
            ANALYSIS_WINDOW_MS,

          durationMs,
        ),

        chats: [] as typeof chats,

        transcripts:
          [] as typeof transcripts,
      }),
    );

    for (const chat of chats) {
      const index =
        Math.floor(
          chat.timestampMs /
            ANALYSIS_WINDOW_MS,
        );

      if (windows[index]) {
        windows[index].chats.push(
          chat,
        );
      }
    }

    for (
      const transcript of transcripts
    ) {
      const index =
        Math.floor(
          transcript.startMs /
            ANALYSIS_WINDOW_MS,
        );

      if (windows[index]) {
        windows[
          index
        ].transcripts.push(
          transcript,
        );
      }
    }

    const messageCounts =
      windows.map(
        (window) =>
          window.chats.length,
      );

    const rows =
      windows.map(
        (window, index) => {
          const chatCount =
            window.chats.length;

          const authors =
            new Set(
              window.chats.map(
                (chat) =>
                  chat.authorId ??
                  chat.authorName ??
                  'unknown',
              ),
            );

          const chatWordCount =
            window.chats.reduce(
              (sum, chat) =>
                sum +
                this.countWords(
                  chat.message,
                ),
              0,
            );

          const transcriptWordCount =
            window.transcripts.reduce(
              (sum, transcript) =>
                sum +
                this.countWords(
                  transcript.text,
                ),
              0,
            );

          const laughCount =
            window.chats.filter(
              (chat) =>
                this.isLaugh(
                  chat.message,
                ),
            ).length;

          const emojiCount =
            window.chats.reduce(
              (sum, chat) =>
                sum +
                this.countEmoji(
                  chat.message,
                ),
              0,
            );

          const questionCount =
            window.chats.reduce(
              (sum, chat) =>
                sum +
                (
                  chat.message.match(
                    /\?/g,
                  ) ?? []
                ).length,
              0,
            );

          const exclamationCount =
            window.chats.reduce(
              (sum, chat) =>
                sum +
                (
                  chat.message.match(
                    /!/g,
                  ) ?? []
                ).length,
              0,
            );

          const capsCount =
            window.chats.filter(
              (chat) =>
                this.isCaps(
                  chat.message,
                ),
            ).length;

          const baseline =
            this.getBaseline(
              messageCounts,
              index,
            );

          const ratio =
            baseline > 0
              ? chatCount /
                baseline
              : chatCount > 0
                ? 1
                : 0;

          const diversity =
            chatCount > 0
              ? authors.size /
                chatCount
              : 0;

          const spikeScore =
            this.clamp(
              (ratio - 1) *
                30 +
                Math.min(
                  chatCount,
                  40,
                ),
            );

          const reactionScore =
            this.clamp(
              laughCount * 3 +
                emojiCount * 1.5 +
                questionCount *
                  0.5 +
                exclamationCount *
                  0.5 +
                capsCount * 2,
            );

          const diversityScore =
            this.clamp(
              diversity * 100,
            );

          const transcriptScore =
            this.clamp(
              transcriptWordCount *
                1.5,
            );

          return {
            videoId,

            windowIndex:
              window.index,

            startMs:
              window.startMs,

            endMs:
              window.endMs,

            windowSizeMs:
              ANALYSIS_WINDOW_MS,

            chatMessageCount:
              chatCount,

            uniqueAuthorCount:
              authors.size,

            chatWordCount,

            transcriptWordCount,

            emojiCount,

            laughCount,

            questionCount,

            exclamationCount,

            capsCount,

            authorDiversity:
              diversity,

            baselineMessageCount:
              baseline,

            messageRatio:
              ratio,

            spikeScore,

            reactionScore,

            diversityScore,

            transcriptScore,

            termScore: 0,
          };
        },
      );

    await this.repository.deleteForVideo(
      videoId,
    );

    await this.repository.createMany(
      rows,
    );

    return this.repository.findForVideo(
      videoId,
    );
  }

  private getBaseline(
    counts: number[],
    index: number,
  ) {
    const previous =
      counts.slice(
        Math.max(
          0,
          index - 8,
        ),
        index,
      );

    if (
      previous.length === 0
    ) {
      return 0;
    }

    return (
      previous.reduce(
        (sum, value) =>
          sum + value,
        0,
      ) /
      previous.length
    );
  }

  private countWords(
    text: string,
  ) {
    return (
      text.match(
        /[\p{L}\p{N}']+/gu,
      ) ?? []
    ).length;
  }

  private isLaugh(
    text: string,
  ) {
    return /\b(lol|lmao|rofl|haha+|hehe+|www+|草)\b/i.test(
      text,
    );
  }

  private isCaps(
    text: string,
  ) {
    const letters =
      text.replace(
        /[^a-zA-Z]/g,
        '',
      );

    return (
      letters.length >= 4 &&
      letters ===
        letters.toUpperCase()
    );
  }

  private countEmoji(
    text: string,
  ) {
    return (
      text.match(
        /\p{Extended_Pictographic}/gu,
      ) ?? []
    ).length;
  }

  private clamp(
    value: number,
  ) {
    return Math.max(
      0,
      Math.min(100, value),
    );
  }
}