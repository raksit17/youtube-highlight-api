import { IngestionService } from './ingestion.service';
export declare class IngestionController {
    private readonly ingestionService;
    constructor(ingestionService: IngestionService);
    ingestJson(body: unknown): Promise<{
        windows: number;
        terms: number;
        summaries: number;
        highlights: {
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
        }[];
    } | undefined>;
    ingestFile(file?: Express.Multer.File): Promise<{
        success: boolean;
        ingestionId: string;
        video: {
            id: string;
            provider: string;
            externalId: string;
            title: string;
        };
        imported: {
            transcripts: number;
            chats: number;
        };
    }>;
}
