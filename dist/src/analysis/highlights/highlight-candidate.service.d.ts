import { PrismaService } from '../../database/prisma.service';
import { HighlightCandidatesRepository } from './highlight-candidates.repository';
import { HighlightClipVariantService } from './highlight-clip-variant.service';
export declare class HighlightCandidateService {
    private readonly prisma;
    private readonly repository;
    private readonly clipVariantService;
    constructor(prisma: PrismaService, repository: HighlightCandidatesRepository, clipVariantService: HighlightClipVariantService);
    rebuild(videoId: string): Promise<{
        rank: number;
        startMs: number;
        peakMs: number;
        endMs: number;
        summary: string;
        category: string | undefined;
        summaryScore: number;
        spikeScore: number;
        reactionScore: number;
        diversityScore: number;
        transcriptScore: number;
        termScore: number;
        finalScore: number;
        confidence: number;
        reason: {
            sourceWindows: {
                startMs: number;
                endMs: number;
                summaryScore: number | undefined;
                spikeScore: number;
            }[];
        };
        windowIds: string[];
    }[]>;
    private windowScore;
    private average;
}
