import { HighlightStatus } from '../../../generated/prisma/enums';
import { PrismaService } from '../../database/prisma.service';
export declare class HighlightQueryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listCandidates(videoId: string, input: {
        limit?: number;
        sort?: string;
    }): Promise<{
        items: {
            id: string;
            videoId: string;
            rank: number;
            startMs: number;
            peakMs: number;
            endMs: number;
            finalScore: number;
            category: string | null;
            status: HighlightStatus;
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
    getContext(candidateId: string, input: {
        beforeMs?: number;
        afterMs?: number;
        chatLimit?: number;
    }): Promise<{
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
    getHeatmap(videoId: string, requestedBucketMs?: number): Promise<{
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
    reviewCandidate(candidateId: string, body: {
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
        status: HighlightStatus;
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
    private toCandidateResponse;
    private buildClipPresets;
    private reasonLabel;
    private readReviewReason;
    private clampInteger;
}
