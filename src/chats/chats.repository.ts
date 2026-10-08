import { Injectable } from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';

import { PrismaService } from '../database/prisma.service';

import { NormalizedChatMessage } from '../normalizers/normalized/normalized-chat.type';

@Injectable()
export class ChatsRepository {
  private readonly batchSize = 1000;

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async insertMany(
    videoId: string,
    messages: NormalizedChatMessage[],
  ): Promise<number> {
    console.log(
      '[ChatsRepository] received:',
      messages.length,
      'videoId:',
      videoId,
    );

    if (messages.length === 0) {
      return 0;
    }

    let inserted = 0;

    for (
      let index = 0;
      index < messages.length;
      index += this.batchSize
    ) {
      const batch = messages.slice(
        index,
        index + this.batchSize,
      );

      console.log(
        `[ChatsRepository] batch ${index}-${index + batch.length}`,
      );

      const result =
        await this.prisma.chatMessage.createMany({
          data: batch.map((message) => ({
            videoId,

            externalId:
              message.externalId,

            dedupeKey:
              message.dedupeKey,

            sequence:
              message.sequence,

            timestampMs:
              message.timestampMs,

            timestampUsec:
              message.timestampUsec,

            authorId:
              message.authorId,

            authorName:
              message.authorName,

            message:
              message.message,

            messageType:
              message.messageType,

            amountRaw:
              message.amountRaw,

            isMember:
              message.isMember,

            isModerator:
              message.isModerator,

            isOwner:
              message.isOwner,

            metadata:
              message.metadata
                ? (message.metadata as Prisma.InputJsonValue)
                : undefined,
          })),

          skipDuplicates: true,
        });

      console.log(
        '[ChatsRepository] batch inserted:',
        result.count,
      );

      inserted += result.count;
    }

    const databaseCount =
      await this.prisma.chatMessage.count({
        where: {
          videoId,
        },
      });

    console.log(
      '[ChatsRepository] total inserted:',
      inserted,
    );

    console.log(
      '[ChatsRepository] database count:',
      databaseCount,
    );

    return inserted;
  }
}