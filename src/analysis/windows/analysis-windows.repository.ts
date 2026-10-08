import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalysisWindowsRepository {
  constructor(private readonly prisma: PrismaService) {}

  deleteForVideo(videoId: string) {
    return this.prisma.analysisWindow.deleteMany({
      where: {
        videoId,
      },
    });
  }

  createMany(
    rows: {
      videoId: string;
      windowIndex: number;
      startMs: number;
      endMs: number;
      windowSizeMs: number;

      chatMessageCount: number;
      uniqueAuthorCount: number;

      chatWordCount: number;
      transcriptWordCount: number;

      emojiCount: number;
      laughCount: number;
      questionCount: number;
      exclamationCount: number;
      capsCount: number;

      authorDiversity: number;

      baselineMessageCount?: number;
      messageRatio?: number;
      zScore?: number;

      spikeScore: number;
      reactionScore: number;
      diversityScore: number;
      transcriptScore: number;
      termScore: number;
    }[],
  ) {
    return this.prisma.analysisWindow.createMany({
      data: rows,
    });
  }

  findForVideo(videoId: string) {
    return this.prisma.analysisWindow.findMany({
      where: {
        videoId,
      },

      orderBy: {
        windowIndex: 'asc',
      },
    });
  }
}
