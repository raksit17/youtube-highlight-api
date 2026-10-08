import { VideosService } from './videos.service';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    list(limit?: string, cursor?: string): Promise<{
        items: {
            id: string;
            provider: string;
            externalId: string;
            url: string;
            title: string;
            channelName: string | null;
            thumbnailUrl: string | null;
            durationMs: number;
            chatCount: number;
            transcriptCount: number;
            createdAt: string;
            analysis: {
                status: string;
                candidateCount: number;
                highestScore: number | null;
                analyzedAt: string;
            };
            review: {
                total: number;
                new: number;
                approved: number;
                rejected: number;
                clipped: number;
            };
        }[];
        nextCursor: string | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        provider: string;
        externalId: string;
        url: string;
        title: string;
        channelName: string | null;
        thumbnailUrl: string | null;
        durationMs: number;
        chatCount: number;
        transcriptCount: number;
        createdAt: string;
        analysis: {
            status: string;
            candidateCount: number;
            highestScore: number | null;
            analyzedAt: string;
        };
        review: {
            total: number;
            new: number;
            approved: number;
            rejected: number;
            clipped: number;
        };
    }>;
}
