import { Injectable } from '@nestjs/common';

import { Prisma } from '../../generated/prisma/client';

import { PrismaService } from '../database/prisma.service';

import { NormalizedTranscriptSegment } from '../normalizers/normalized/normalized-transcript.type';

@Injectable()
export class TranscriptsRepository {
  private readonly batchSize = 1000;

  constructor(private readonly prisma: PrismaService) {}

  async replaceForVideo(
    videoId: string,
    segments: NormalizedTranscriptSegment[],
  ): Promise<number> {
    await this.prisma.transcriptSegment.deleteMany({
      where: {
        videoId,
      },
    });

    let inserted = 0;

    for (let index = 0; index < segments.length; index += this.batchSize) {
      const batch = segments.slice(index, index + this.batchSize);

      const result = await this.prisma.transcriptSegment.createMany({
        data: batch.map((segment) => ({
          videoId,

          sequence: segment.sequence,

          startMs: segment.startMs,

          endMs: segment.endMs,

          durationMs: segment.durationMs,

          text: segment.text,

          language: segment.language,

          source: segment.source,

          format: segment.format,

          metadata: segment.metadata as Prisma.InputJsonValue,
        })),
      });

      inserted += result.count;
    }

    return inserted;
  }
}
