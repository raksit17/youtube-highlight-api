import { ChatsRepository } from '../chats/chats.repository';
import { NormalizerRegistry } from '../normalizers/normalizer.registry';
import { TranscriptsRepository } from '../transcripts/transcripts.repository';
import { VideosRepository } from '../videos/videos.repository';
import { IngestionRepository } from './ingestion.repository';
import { IngestionValidator } from './ingestion.validator';
import { JsonFileParser } from './parsers/json-file.parser';
import { AnalysisOrchestratorService } from '../analysis/analysis-orchestrator.service';
export declare class IngestionService {
    private readonly validator;
    private readonly jsonFileParser;
    private readonly normalizerRegistry;
    private readonly videosRepository;
    private readonly transcriptsRepository;
    private readonly chatsRepository;
    private readonly ingestionRepository;
    private readonly analysisOrchestrator;
    private readonly logger;
    constructor(validator: IngestionValidator, jsonFileParser: JsonFileParser, normalizerRegistry: NormalizerRegistry, videosRepository: VideosRepository, transcriptsRepository: TranscriptsRepository, chatsRepository: ChatsRepository, ingestionRepository: IngestionRepository, analysisOrchestrator: AnalysisOrchestratorService);
    ingestJson(input: unknown): Promise<{
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
    ingestFile(file: Express.Multer.File): Promise<{
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
    private process;
}
