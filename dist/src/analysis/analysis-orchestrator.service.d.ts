import { HighlightCandidateService } from './highlights/highlight-candidate.service';
import { TermExtractorService } from './terms/term-extractor.service';
import { AnalysisWindowService } from './windows/analysis-window.service';
import { WindowSummaryService } from './summaries/window-summary.service';
export declare class AnalysisOrchestratorService {
    private readonly windowService;
    private readonly termService;
    private readonly summaryService;
    private readonly highlightService;
    private readonly logger;
    constructor(windowService: AnalysisWindowService, termService: TermExtractorService, summaryService: WindowSummaryService, highlightService: HighlightCandidateService);
    rebuildForVideo(videoId: string): Promise<{
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
    }>;
}
