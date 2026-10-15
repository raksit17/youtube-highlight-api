import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHash } from 'node:crypto';
import { PrismaService } from '../database/prisma.service';
import { GenerateYoutubeMetadataDto, UpdateYoutubeMetadataDto } from './dto/youtube-metadata.dto';
import { OllamaService } from './ollama.service';

type TitleOption = { style: string; title: string };
const PROMPT_VERSION = 'youtube-metadata-v1';
const STYLES = ['funny', 'reaction', 'seo', 'curiosity', 'natural'];

function clipText(value: unknown, limit = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, limit) : '';
}

function validateTitle(value: string): string {
  const text = value.trim();
  if (!text || Array.from(text).length > 100) {
    throw new BadRequestException('YouTube title must be 1-100 characters.');
  }
  return text;
}

function validateDescription(value: string): string {
  const text = value.trim();
  if (!text || Buffer.byteLength(text, 'utf8') > 5000) {
    throw new BadRequestException('YouTube description must be 1-5000 UTF-8 bytes.');
  }
  return text;
}

function normalizeHashtags(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values
    .filter((v): v is string => typeof v === 'string')
    .map((v) => '#' + v.replace(/^#+/, '').replace(/[^\p{L}\p{N}_]/gu, ''))
    .filter((v) => v.length > 1 && Array.from(v).length <= 45))).slice(0, 3);
}

function normalizeTags(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim()).filter((v) => v && v.length <= 80))).slice(0, 15);
}

@Injectable()
export class YoutubeMetadataService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ollama: OllamaService,
  ) {}

  listModels() {
    return this.ollama.listModels().then((models) => ({
      models,
      defaultModel: process.env.OLLAMA_MODEL || models.find((name) => /qwen/i.test(name)) || null,
    }));
  }

  private async getClip(clipId: string) {
    const clip = await this.prisma.clipDraft.findUnique({
      where: { id: clipId },
      include: {
        video: {
          select: {
            title: true, url: true, channelName: true, channelUrl: true,
            externalId: true,
          },
        },
        candidate: { select: { summary: true, category: true } },
      },
    });
    if (!clip) throw new NotFoundException('Clip draft not found');
    return clip;
  }

  async get(clipId: string) {
    const clip = await this.getClip(clipId);
    const draft = await this.prisma.youtubeMetadataDraft.findUnique({ where: { clipId } });
    return draft ? {
      ...draft,
      isStale: clip.startMs !== draft.sourceStartMs || clip.endMs !== draft.sourceEndMs,
    } : null;
  }

  async generate(clipId: string, dto: GenerateYoutubeMetadataDto) {
    const clip = await this.getClip(clipId);
    const transcripts = await this.prisma.transcriptSegment.findMany({
      where: {
        videoId: clip.videoId,
        startMs: { lt: clip.endMs },
        endMs: { gt: clip.startMs },
      },
      orderBy: { startMs: 'asc' },
      take: 250,
      select: { startMs: true, endMs: true, text: true, language: true, source: true },
    });

    if (!transcripts.length) {
      throw new BadRequestException('No transcript found for this clip range. Import subtitles first.');
    }

    // Transcript rows are clipped to a bounded context to fit in 8GB GPUs.
    const transcriptLines: Array<{ startMs: number; text: string }> = [];
    let budget = 14000;
    for (const row of transcripts) {
      const text = clipText(row.text, 800);
      if (!text || budget <= 0) break;
      const limited = text.slice(0, budget);
      transcriptLines.push({ startMs: row.startMs, text: limited });
      budget -= limited.length;
    }

    const chats = await this.prisma.chatMessage.findMany({
      where: {
        videoId: clip.videoId,
        timestampMs: { gte: clip.startMs, lte: clip.endMs },
      },
      orderBy: { timestampMs: 'asc' },
      take: 60,
      select: { timestampMs: true, message: true },
    });

    const context = {
      original: {
        title: clip.video.title,
        channelName: clip.video.channelName,
      },
      clip: { startMs: clip.startMs, endMs: clip.endMs },
      highlight: { summary: clip.candidate?.summary ?? null, category: clip.candidate?.category ?? null },
      tone: dto.tone || 'balanced',
      transcript: transcriptLines,
      chatReactions: chats.map((row) => ({
        atMs: row.timestampMs, text: clipText(row.message, 130),
      })),
    };
    const sourceHash = createHash('sha256').update(JSON.stringify(context)).digest('hex');
    const { model, output } = await this.ollama.generate(context, dto.model);

    const titles: TitleOption[] = [];
    const seen = new Set<string>();
    for (const item of output.titles) {
      if (!item || typeof item.title !== 'string') continue;
      const title = item.title.trim();
      if (!title || Array.from(title).length > 100 || seen.has(title)) continue;
      seen.add(title);
      const style = typeof item.style === 'string' && STYLES.includes(item.style) ? item.style : 'natural';
      titles.push({ style, title });
    }
    if (titles.length < 3) {
      throw new BadGatewayException('Qwen generated too few valid and distinct titles. Try again.');
    }

    const hashtags = normalizeHashtags(output.hashtags);
    const tags = normalizeTags(output.tags);
    const body = clipText(output.descriptionBody, 2200);
    const credits = [
      '🎬 Original Stream: ' + clip.video.url,
      '📺 Original Title: ' + clip.video.title,
      ...(clip.video.channelName ? ['🎤 Original Channel: ' + clip.video.channelName] : []),
      ...(clip.video.channelUrl ? ['🔗 Channel: ' + clip.video.channelUrl] : []),
    ];
    const description = validateDescription(
      [body, credits.join('\n'), hashtags.join(' ')].filter(Boolean).join('\n\n'),
    );

    const data = {
      model,
      tone: dto.tone || 'balanced',
      promptVersion: PROMPT_VERSION,
      sourceHash,
      sourceStartMs: clip.startMs,
      sourceEndMs: clip.endMs,
      summary: clipText(output.summary, 1500),
      titles,
      selectedTitle: validateTitle(titles[0].title),
      description,
      hashtags,
      tags,
    };

    const saved = await this.prisma.youtubeMetadataDraft.upsert({
      where: { clipId },
      create: { clipId, ...data },
      update: data,
    });
    return { ...saved, isStale: false };
  }

  async update(clipId: string, dto: UpdateYoutubeMetadataDto) {
    await this.getClip(clipId);
    const existing = await this.prisma.youtubeMetadataDraft.findUnique({ where: { clipId } });
    if (!existing) throw new NotFoundException('Generate YouTube metadata before editing it.');

    const hashtags = dto.hashtags === undefined ? undefined : normalizeHashtags(dto.hashtags);
    const tags = dto.tags === undefined ? undefined : normalizeTags(dto.tags);
    if (tags && Buffer.byteLength(tags.join(','), 'utf8') > 500) {
      throw new BadRequestException('Tags exceed the 500-byte limit.');
    }
    const updated = await this.prisma.youtubeMetadataDraft.update({
      where: { clipId },
      data: {
        selectedTitle: dto.selectedTitle === undefined ? undefined : validateTitle(dto.selectedTitle),
        description: dto.description === undefined ? undefined : validateDescription(dto.description),
        hashtags,
        tags,
      },
    });
    const clip = await this.getClip(clipId);
    return {
      ...updated,
      isStale: clip.startMs !== updated.sourceStartMs || clip.endMs !== updated.sourceEndMs,
    };
  }
}
