import { Injectable } from '@nestjs/common';

import { Prisma } from '../../../generated/prisma/client';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WindowSummariesRepository {
  constructor(
    private readonly prisma:
      PrismaService,
  ) {}

  deleteForVideo(
    videoId: string,
  ) {
    return this.prisma.windowSummary.deleteMany(
      {
        where: {
          analysisWindow: {
            videoId,
          },
        },
      },
    );
  }

  createMany(
    rows: {
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

      extractorVersion:
        string;
    }[],
  ) {
    return this.prisma.windowSummary.createMany(
      {
        data: rows.map(
          (row) => ({
            ...row,

            keywords:
              row.keywords as Prisma.InputJsonValue,

            reactions:
              row.reactions as Prisma.InputJsonValue,

            events:
              row.events as Prisma.InputJsonValue,
          }),
        ),
      },
    );
  }
}