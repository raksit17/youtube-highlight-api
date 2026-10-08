import { CollectorPayload } from '../../ingestion/types/collector-payload.type';
export interface YoutubeYtdlpPayload extends CollectorPayload<YoutubeVideoData> {
    provider: 'youtube';
    collector: 'yt-dlp';
    type: 'video';
}
export interface YoutubeVideoData {
    type?: string;
    source?: string;
    external_id: string;
    url: string;
    title: string;
    description?: string;
    channel?: YoutubeChannelData;
    published?: YoutubePublishedData;
    stats?: YoutubeStatsData;
    media?: YoutubeMediaData;
    live?: YoutubeLiveData;
    metadata?: YoutubeMetadataData;
    chapters?: YoutubeChapterData[];
    subtitles?: YoutubeSubtitlesData;
    chat_replay?: YoutubeChatReplayData | null;
    formats?: unknown[] | null;
}
export interface YoutubeChannelData {
    external_id?: string;
    name?: string;
    url?: string;
    followers?: number;
}
export interface YoutubePublishedData {
    upload_date?: string;
    timestamp?: number;
    release_timestamp?: number;
}
export interface YoutubeStatsData {
    views?: number;
    likes?: number;
    comments?: number;
}
export interface YoutubeMediaData {
    duration?: number;
    duration_string?: string;
    thumbnail?: string;
    width?: number;
    height?: number;
    fps?: number;
}
export interface YoutubeLiveData {
    status?: string;
    is_live?: boolean;
    was_live?: boolean;
    concurrent_viewers?: number | null;
}
export interface YoutubeMetadataData {
    tags?: string[];
    categories?: string[];
    language?: string;
    availability?: string;
    age_limit?: number;
}
export interface YoutubeChapterData {
    start_time?: number;
    end_time?: number;
    title?: string;
}
export interface YoutubeSubtitlesData {
    manual?: Record<string, YoutubeSubtitleFormat[]>;
    automatic?: Record<string, YoutubeSubtitleFormat[]>;
    transcript?: YoutubeTranscriptData;
}
export interface YoutubeSubtitleFormat {
    ext?: string;
    url?: string;
    name?: string;
}
export interface YoutubeTranscriptData {
    language?: string;
    source?: string;
    format?: string;
    segments?: YoutubeTranscriptSegment[];
}
export interface YoutubeTranscriptSegment {
    start: number;
    end: number;
    duration?: number;
    text: string;
    words?: YoutubeTranscriptWord[];
}
export interface YoutubeTranscriptWord {
    start: number;
    text: string;
}
export interface YoutubeChatReplayData {
    messages?: YoutubeChatMessage[];
}
export interface YoutubeChatMessage {
    id?: string;
    external_id?: string;
    timestamp?: number;
    timestamp_seconds?: number;
    timestamp_usec?: string | number;
    author_id?: string;
    author_name?: string;
    author?: YoutubeChatAuthor;
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
export interface YoutubeChatAuthor {
    id?: string;
    name?: string;
    is_member?: boolean;
    is_moderator?: boolean;
    is_owner?: boolean;
}
