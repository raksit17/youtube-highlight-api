import { HighlightQueryService } from './highlight-query.service';
export declare class HighlightsController {
    private readonly highlightQueryService;
    constructor(highlightQueryService: HighlightQueryService);
    listCandidates(videoId: string, sort?: string, limit?: string): Promise<{
        items: {
            id: string;
            videoId: string;
            rank: number;
            startMs: number;
            peakMs: number;
            endMs: number;
            finalScore: number;
            category: string | null;
            status: import("../../../generated/prisma/enums").HighlightStatus;
            summary: string | null;
            rejectionReason: string | null;
            clipPresets: {
                [k: string]: {
                    label: "20–45 sec" | "45–90 sec" | "2–5 min" | "5–8 min";
                    startMs: number;
                    endMs: number;
                    durationMs: number;
                };
            };
            insights: {
                reasonLabel: string;
                chatIncreasePercent: number | null;
                messageCount: number;
                uniqueChatters: number;
                laughCount: number;
                emojiCount: number;
                isPotentialSpam: boolean;
                topTerms: string[];
                density: number[];
            };
        }[];
        total: number;
    }>;
    getHeatmap(videoId: string, bucketMs?: string): Promise<{
        videoId: string;
        durationMs: number;
        bucketMs: number;
        maxMessageCount: number;
        buckets: {
            startMs: number;
            endMs: number;
            messageCount: number;
            normalizedHeat: number;
        }[];
        markers: {
            candidateId: string;
            rank: number;
            peakMs: number;
            score: number;
        }[];
    }>;
    getContext(id: string, beforeMs?: string, afterMs?: string, chatLimit?: string): Promise<{
        candidateId: string;
        peakMs: number;
        range: {
            startMs: number;
            endMs: number;
        };
        transcripts: {
            startMs: number;
            endMs: number;
            text: string;
        }[];
        chats: {
            timestampMs: number;
            authorName: string | null;
            message: string;
        }[];
        chatTotal: number;
        chatReturned: number;
        truncated: boolean;
    }>;
    reviewCandidate(id: string, body: {
        status?: string;
        reason?: string;
    }): Promise<{
        id: string;
        videoId: string;
        rank: number;
        startMs: number;
        peakMs: number;
        endMs: number;
        finalScore: number;
        category: string | null;
        status: import("../../../generated/prisma/enums").HighlightStatus;
        summary: string | null;
        rejectionReason: string | null;
        clipPresets: {
            [k: string]: {
                label: "20–45 sec" | "45–90 sec" | "2–5 min" | "5–8 min";
                startMs: number;
                endMs: number;
                durationMs: number;
            };
        };
        insights: {
            reasonLabel: string;
            chatIncreasePercent: number | null;
            messageCount: number;
            uniqueChatters: number;
            laughCount: number;
            emojiCount: number;
            isPotentialSpam: boolean;
            topTerms: string[];
            density: number[];
        };
    }>;
    private parseNumber;
}
