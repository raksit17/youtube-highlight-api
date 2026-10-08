import { Prisma } from '../../../generated/prisma/client';
import { PrismaService } from '../../database/prisma.service';
export declare class HighlightCandidatesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    deleteForVideo(videoId: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
    replaceTop(videoId: string, candidates: {
        rank: number;
        startMs: number;
        peakMs: number;
        endMs: number;
        summary: string;
        category?: string;
        summaryScore: number;
        spikeScore: number;
        reactionScore: number;
        diversityScore: number;
        transcriptScore: number;
        termScore: number;
        finalScore: number;
        confidence: number;
        reason: unknown;
        windowIds: string[];
    }[]): Promise<void>;
}
