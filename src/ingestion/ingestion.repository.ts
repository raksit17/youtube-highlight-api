import { Injectable } from '@nestjs/common';

import { IngestionStatus, IngestionType } from '../../generated/prisma/enums';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class IngestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    type: IngestionType;

    provider: string;

    collector: string;

    dataType: string;

    filename?: string;

    mimeType?: string;

    sizeBytes?: bigint;
  }) {
    return this.prisma.ingestionRun.create({
      data: {
        ...data,

        status: IngestionStatus.PROCESSING,

        startedAt: new Date(),
      },
    });
  }

  complete(
    id: string,
    input: {
      videoId: string;

      transcriptCount: number;

      chatCount: number;
    },
  ) {
    return this.prisma.ingestionRun.update({
      where: {
        id,
      },

      data: {
        status: IngestionStatus.COMPLETED,

        videoId: input.videoId,

        transcriptCount: input.transcriptCount,

        chatCount: input.chatCount,

        completedAt: new Date(),
      },
    });
  }

  fail(id: string, error: unknown) {
    const message = error instanceof Error ? error.message : String(error);

    return this.prisma.ingestionRun.update({
      where: {
        id,
      },

      data: {
        status: IngestionStatus.FAILED,

        errorMessage: message,

        completedAt: new Date(),
      },
    });
  }
}
