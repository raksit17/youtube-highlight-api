import { PrismaService } from '../../database/prisma.service';
import { AnalysisTermsRepository } from './analysis-terms.repository';
export declare class TermExtractorService {
    private readonly prisma;
    private readonly repository;
    private readonly stopWords;
    constructor(prisma: PrismaService, repository: AnalysisTermsRepository);
    rebuild(videoId: string): Promise<number>;
    private addText;
    private tokenize;
    private getTopTerms;
    private calculateTermScore;
}
