"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeYtdlpNormalizer = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
let YoutubeYtdlpNormalizer = class YoutubeYtdlpNormalizer {
    supports(payload) {
        return (payload.provider === 'youtube' &&
            payload.collector === 'yt-dlp' &&
            (payload.type === 'video' ||
                payload.type === 'transcript' ||
                payload.type === 'chat'));
    }
    async normalize(payload) {
        const input = payload;
        const data = input.data;
        if (!data.external_id) {
            throw new common_1.BadRequestException('data.external_id is required');
        }
        if (!data.url) {
            throw new common_1.BadRequestException('data.url is required');
        }
        if (!data.title) {
            throw new common_1.BadRequestException('data.title is required');
        }
        const transcript = data.subtitles?.transcript;
        const rawTranscriptSegments = transcript?.segments;
        const transcriptProvided = payload.type === 'transcript' || Array.isArray(rawTranscriptSegments);
        const transcripts = Array.isArray(rawTranscriptSegments)
            ? rawTranscriptSegments.map((segment, sequence) => ({
                sequence,
                startMs: this.secondsToMs(segment.start),
                endMs: this.secondsToMs(segment.end),
                durationMs: this.secondsToMs(segment.duration ?? segment.end - segment.start),
                text: segment.text,
                language: transcript?.language ?? 'unknown',
                source: transcript?.source ?? 'unknown',
                format: transcript?.format,
                metadata: {
                    words: segment.words?.map((word) => ({
                        startMs: this.secondsToMs(word.start),
                        text: word.text,
                    })) ?? [],
                },
            }))
            : [];
        const rawChats = data.chat_replay?.messages;
        const chatProvided = payload.type === 'chat' || Array.isArray(rawChats);
        const chats = Array.isArray(rawChats)
            ? rawChats.map((message, sequence) => this.normalizeChat(data.external_id, message, sequence))
            : [];
        console.log({
            payloadType: payload.type,
            hasSubtitles: data.subtitles !== undefined,
            hasTranscript: transcript !== undefined,
            transcriptProvided,
            transcriptSegments: transcripts.length,
            hasChatReplay: data.chat_replay !== undefined && data.chat_replay !== null,
            chatProvided,
            chatMessages: chats.length,
        });
        return {
            video: {
                provider: 'youtube',
                externalId: data.external_id,
                url: data.url,
                title: data.title,
                description: data.description,
                channelExternalId: data.channel?.external_id,
                channelName: data.channel?.name,
                channelUrl: data.channel?.url,
                channelFollowers: this.toBigInt(data.channel?.followers),
                uploadDate: this.parseUploadDate(data.published?.upload_date),
                publishedAt: this.fromUnix(data.published?.timestamp),
                releaseAt: this.fromUnix(data.published?.release_timestamp),
                viewCount: this.toBigInt(data.stats?.views),
                likeCount: this.toBigInt(data.stats?.likes),
                commentCount: this.toBigInt(data.stats?.comments),
                durationMs: data.media?.duration !== undefined
                    ? this.secondsToMs(data.media.duration)
                    : undefined,
                thumbnailUrl: data.media?.thumbnail,
                width: data.media?.width,
                height: data.media?.height,
                fps: data.media?.fps,
                liveStatus: data.live?.status,
                isLive: data.live?.is_live ?? false,
                wasLive: data.live?.was_live ?? false,
                concurrentViewers: data.live?.concurrent_viewers ?? 0,
                language: data.metadata?.language,
                availability: data.metadata?.availability,
                ageLimit: data.metadata?.age_limit ?? 0,
                tags: data.metadata?.tags ?? [],
                categories: data.metadata?.categories ?? [],
                metadata: {
                    chapters: data.chapters ?? [],
                },
            },
            transcriptProvided,
            transcripts,
            chatProvided,
            chats,
        };
    }
    normalizeChat(videoExternalId, message, sequence) {
        const externalId = message.external_id ?? message.id;
        const timestampSeconds = message.timestamp_seconds ?? message.timestamp ?? 0;
        const timestampMs = this.secondsToMs(timestampSeconds);
        const authorId = message.author_id ?? message.author?.id;
        const authorName = message.author_name ?? message.author?.name;
        const text = message.message ?? message.text ?? '';
        const dedupeKey = externalId ??
            (0, node_crypto_1.createHash)('sha256')
                .update([videoExternalId, timestampMs, authorId ?? '', text].join('|'))
                .digest('hex');
        return {
            externalId,
            dedupeKey,
            sequence,
            timestampMs,
            timestampUsec: this.toBigInt(message.timestamp_usec),
            authorId,
            authorName,
            message: text,
            messageType: message.message_type ?? message.type,
            amountRaw: message.amount_raw ?? message.amount,
            isMember: message.is_member ?? message.author?.is_member ?? false,
            isModerator: message.is_moderator ?? message.author?.is_moderator ?? false,
            isOwner: message.is_owner ?? message.author?.is_owner ?? false,
            metadata: message.metadata,
        };
    }
    secondsToMs(value) {
        return Math.round(value * 1000);
    }
    fromUnix(value) {
        if (value === undefined || value === null) {
            return undefined;
        }
        return new Date(value * 1000);
    }
    parseUploadDate(value) {
        if (!value || !/^\d{8}$/.test(value)) {
            return undefined;
        }
        const year = Number(value.substring(0, 4));
        const month = Number(value.substring(4, 6));
        const day = Number(value.substring(6, 8));
        return new Date(Date.UTC(year, month - 1, day));
    }
    toBigInt(value) {
        if (value === undefined || value === null) {
            return undefined;
        }
        return BigInt(value);
    }
};
exports.YoutubeYtdlpNormalizer = YoutubeYtdlpNormalizer;
exports.YoutubeYtdlpNormalizer = YoutubeYtdlpNormalizer = __decorate([
    (0, common_1.Injectable)()
], YoutubeYtdlpNormalizer);
//# sourceMappingURL=youtube-ytdlp.normalizer.js.map