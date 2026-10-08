import { PrismaService } from '../../database/prisma.service';
export declare class AnalysisTermsRepository {
    private readonly prisma;
    private readonly batchSize;
    constructor(prisma: PrismaService);
    createMany(rows: {
        analysisWindowId: string;
        source: 'CHAT' | 'TRANSCRIPT';
        type: 'WORD' | 'PHRASE' | 'EMOTE' | 'REACTION';
        term: string;
        normalizedTerm: string;
        count: number;
        score: number;
    }[]): Promise<number>;
}
