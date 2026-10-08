import { BadRequestException, Injectable } from '@nestjs/common';

import { createHash } from 'node:crypto';

import { CollectorPayload } from '../../ingestion/types/collector-payload.type';

import { SourceNormalizer } from '../interfaces/source-normalizer.interface';

import { NormalizedIngestion } from '../normalized/normalized-video.type';

import { YoutubeChatMessage, YoutubeYtdlpPayload } from './youtube-ytdlp.types';

@Injectable()
export class YoutubeYtdlpNormalizer implements SourceNormalizer {
  supports(payload: CollectorPayload<unknown>): boolean {
    return (
      payload.provider === 'youtube' &&
      payload.collector === 'yt-dlp' &&
      (payload.type === 'video' ||
        payload.type === 'transcript' ||
        payload.type === 'chat')
    );
  }

  async normalize(
    payload: CollectorPayload<unknown>,
  ): Promise<NormalizedIngestion> {
    const input = payload as YoutubeYtdlpPayload;

    const data = input.data;

    if (!data.external_id) {
      throw new BadRequestException('data.external_id is required');
    }

    if (!data.url) {
      throw new BadRequestException('data.url is required');
    }

    if (!data.title) {
      throw new BadRequestException('data.title is required');
    }

    // ==============================
    // TRANSCRIPT
    // ==============================

    const transcript = data.subtitles?.transcript;

    const rawTranscriptSegments = transcript?.segments;

    const transcriptProvided =
      payload.type === 'transcript' || Array.isArray(rawTranscriptSegments);

    const transcripts = Array.isArray(rawTranscriptSegments)
      ? rawTranscriptSegments.map((segment, sequence) => ({
          sequence,

          startMs: this.secondsToMs(segment.start),

          endMs: this.secondsToMs(segment.end),

          durationMs: this.secondsToMs(
            segment.duration ?? segment.end - segment.start,
          ),

          text: segment.text,

          language: transcript?.language ?? 'unknown',

          source: transcript?.source ?? 'unknown',

          format: transcript?.format,

          metadata: {
            words:
              segment.words?.map((word) => ({
                startMs: this.secondsToMs(word.start),

                text: word.text,
              })) ?? [],
          },
        }))
      : [];

    // ==============================
    // CHAT
    // ==============================

    const rawChats = data.chat_replay?.messages;

    const chatProvided = payload.type === 'chat' || Array.isArray(rawChats);

    const chats = Array.isArray(rawChats)
      ? rawChats.map((message, sequence) =>
          this.normalizeChat(data.external_id, message, sequence),
        )
      : [];

    console.log({
      payloadType: payload.type,

      hasSubtitles: data.subtitles !== undefined,

      hasTranscript: transcript !== undefined,

      transcriptProvided,

      transcriptSegments: transcripts.length,

      hasChatReplay:
        data.chat_replay !== undefined && data.chat_replay !== null,

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

        durationMs:
          data.media?.duration !== undefined
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

  private normalizeChat(
    videoExternalId: string,
    message: YoutubeChatMessage,
    sequence: number,
  ) {
    const externalId = message.external_id ?? message.id;

    const timestampSeconds =
      message.timestamp_seconds ?? message.timestamp ?? 0;

    const timestampMs = this.secondsToMs(timestampSeconds);

    const authorId = message.author_id ?? message.author?.id;

    const authorName = message.author_name ?? message.author?.name;

    const text = message.message ?? message.text ?? '';

    const dedupeKey =
      externalId ??
      createHash('sha256')
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

      isModerator:
        message.is_moderator ?? message.author?.is_moderator ?? false,

      isOwner: message.is_owner ?? message.author?.is_owner ?? false,

      metadata: message.metadata,
    };
  }

  private secondsToMs(value: number): number {
    return Math.round(value * 1000);
  }

  private fromUnix(value?: number): Date | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    return new Date(value * 1000);
  }

  private parseUploadDate(value?: string): Date | undefined {
    if (!value || !/^\d{8}$/.test(value)) {
      return undefined;
    }

    const year = Number(value.substring(0, 4));

    const month = Number(value.substring(4, 6));

    const day = Number(value.substring(6, 8));

    return new Date(Date.UTC(year, month - 1, day));
  }

  private toBigInt(
    value: number | string | undefined | null,
  ): bigint | undefined {
    if (value === undefined || value === null) {
      return undefined;
    }

    return BigInt(value);
  }
}
