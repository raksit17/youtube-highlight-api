import { Prisma } from '../../../generated/prisma/client';
import { PrismaService } from '../../database/prisma.service';
export declare class WindowSummariesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    deleteForVideo(videoId: string): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createMany(rows: {
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
    }[]): Prisma.PrismaPromise<Prisma.BatchPayload>;
}
