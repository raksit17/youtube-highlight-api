import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalysisTermsRepository {
  private readonly batchSize = 1000;

  constructor(private readonly prisma: PrismaService) {}

  async createMany(
    rows: {
      analysisWindowId: string;

      source: 'CHAT' | 'TRANSCRIPT';

      type: 'WORD' | 'PHRASE' | 'EMOTE' | 'REACTION';

      term: string;

      normalizedTerm: string;

      count: number;

      score: number;
    }[],
  ) {
    let inserted = 0;

    for (let index = 0; index < rows.length; index += this.batchSize) {
      const batch = rows.slice(index, index + this.batchSize);

      const result = await this.prisma.analysisTermCount.createMany({
        data: batch,

        skipDuplicates: true,
      });

      inserted += result.count;
    }

    return inserted;
  }
}
