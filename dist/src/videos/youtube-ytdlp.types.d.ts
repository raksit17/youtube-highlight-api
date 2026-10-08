import { CollectorPayload } from '../ingestion/types/collector-payload.type';
export interface YoutubeYtdlpPayload extends CollectorPayload {
    provider: 'youtube';
    collector: 'yt-dlp';
    type: 'video';
    data: YoutubeVideoData;
}
export interface YoutubeVideoData {
    type?: string;
    source?: string;
    external_id: string;
    url: string;
    title: string;
    description?: string;
    channel?: {
        external_id?: string;
        name?: string;
        url?: string;
        followers?: number;
    };
    published?: {
        upload_date?: string;
        timestamp?: number;
        release_timestamp?: number;
    };
    stats?: {
        views?: number;
        likes?: number;
        comments?: number;
    };
    media?: {
        duration?: number;
        duration_string?: string;
        thumbnail?: string;
        width?: number;
        height?: number;
        fps?: number;
    };
    live?: {
        status?: string;
        is_live?: boolean;
        was_live?: boolean;
        concurrent_viewers?: number;
    };
    metadata?: {
        tags?: string[];
        categories?: string[];
        language?: string;
        availability?: string;
        age_limit?: number;
    };
    chapters?: unknown[];
    subtitles?: {
        transcript?: {
            language?: string;
            source?: string;
            format?: string;
            segments?: YoutubeTranscriptSegment[];
        };
    };
    chat_replay?: {
        messages?: YoutubeChatMessage[];
    } | null;
}
export interface YoutubeTranscriptSegment {
    start: number;
    end: number;
    duration?: number;
    text: string;
    words?: Array<{
        start: number;
        text: string;
    }>;
}
export interface YoutubeChatMessage {
    id?: string;
    external_id?: string;
    timestamp?: number;
    timestamp_seconds?: number;
    timestamp_usec?: string | number;
    author_id?: string;
    author_name?: string;
    author?: {
        id?: string;
        name?: string;
        is_member?: boolean;
        is_moderator?: boolean;
        is_owner?: boolean;
    };
    message?: string;
    text?: string;
    type?: string;
    message_type?: string;
    amount?: string;
    amount_raw?: string;
    is_member?: boolean;
    is_moderator?: boolean;
    is_owner?: boolean;
    metadata?: Record<string, unknown>;
}
