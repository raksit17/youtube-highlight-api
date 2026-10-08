import { NormalizedChatMessage } from './normalized-chat.type';
import { NormalizedTranscriptSegment } from './normalized-transcript.type';
export interface NormalizedVideo {
    provider: string;
    externalId: string;
    url: string;
    title: string;
    description?: string;
    channelExternalId?: string;
    channelName?: string;
    channelUrl?: string;
    channelFollowers?: bigint;
    uploadDate?: Date;
    publishedAt?: Date;
    releaseAt?: Date;
    viewCount?: bigint;
    likeCount?: bigint;
    commentCount?: bigint;
    durationMs?: number;
    thumbnailUrl?: string;
    width?: number;
    height?: number;
    fps?: number;
    liveStatus?: string;
    isLive: boolean;
    wasLive: boolean;
    concurrentViewers?: number;
    language?: string;
    availability?: string;
    ageLimit: number;
    tags: string[];
    categories: string[];
    metadata?: Record<string, unknown>;
}
export interface NormalizedIngestion {
    video: NormalizedVideo;
    transcriptProvided: boolean;
    transcripts: NormalizedTranscriptSegment[];
    chatProvided: boolean;
    chats: NormalizedChatMessage[];
}
