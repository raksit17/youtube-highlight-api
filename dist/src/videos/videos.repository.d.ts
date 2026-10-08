import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { NormalizedVideo } from '../normalizers/normalized/normalized-video.type';
export declare class VideosRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsert(video: NormalizedVideo): Prisma.Prisma__VideoClient<{
        url: string;
        title: string;
        id: string;
        provider: string;
        externalId: string;
        description: string | null;
        channelExternalId: string | null;
        channelName: string | null;
        channelUrl: string | null;
        channelFollowers: bigint | null;
        uploadDate: Date | null;
        publishedAt: Date | null;
        releaseAt: Date | null;
        viewCount: bigint | null;
        likeCount: bigint | null;
        commentCount: bigint | null;
        durationMs: number | null;
        thumbnailUrl: string | null;
        width: number | null;
        height: number | null;
        fps: number | null;
        liveStatus: string | null;
        isLive: boolean;
        wasLive: boolean;
        concurrentViewers: number | null;
        language: string | null;
        availability: string | null;
        ageLimit: number;
        tags: string[];
        categories: string[];
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
