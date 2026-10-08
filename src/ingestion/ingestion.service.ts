import { Injectable } from '@nestjs/common';

import { unlink } from 'node:fs/promises';

import { IngestionType } from '../../generated/prisma/enums';

import { ChatsRepository } from '../chats/chats.repository';

import { NormalizerRegistry } from '../normalizers/normalizer.registry';

import { TranscriptsRepository } from '../transcripts/transcripts.repository';

import { VideosRepository } from '../videos/videos.repository';

import { IngestionRepository } from './ingestion.repository';

import { IngestionValidator } from './ingestion.validator';

import { JsonFileParser } from './parsers/json-file.parser';

import { CollectorPayload } from './types/collector-payload.type';
import { AnalysisOrchestratorService } from '../analysis/analysis-orchestrator.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class IngestionService {
private readonly logger = new Logger(IngestionService.name);
  constructor(
    private readonly validator: IngestionValidator,

    private readonly jsonFileParser: JsonFileParser,

    private readonly normalizerRegistry: NormalizerRegistry,

    private readonly videosRepository: VideosRepository,

    private readonly transcriptsRepository: TranscriptsRepository,

    private readonly chatsRepository: ChatsRepository,

    private readonly ingestionRepository: IngestionRepository,

    private readonly analysisOrchestrator: AnalysisOrchestratorService,
  ) {}

  async ingestJson(input: unknown) {
    const payload = await this.validator.validate(input);

    const res = await this.process(payload, {
      type: IngestionType.API,
    });

    let analysis: Awaited<
      ReturnType<AnalysisOrchestratorService['rebuildForVideo']>
    > | null = null;

    if (res) {
      try {
       return await this.analysisOrchestrator.rebuildForVideo(res.video.id);
      } catch (error) {
        this.logger.error(
          `Analysis failed for video ${res.video.id}`,
          error instanceof Error ? error.stack : String(error),
        );
      }
    }
  }

  async ingestFile(file: Express.Multer.File) {
    try {
      const raw = await this.jsonFileParser.parse(file.path);

      const payload = await this.validator.validate(raw);

      return await this.process(payload, {
        type: IngestionType.FILE,

        filename: file.originalname,

        mimeType: file.mimetype,

        sizeBytes: BigInt(file.size),
      });
    } finally {
      await unlink(file.path).catch(() => undefined);
    }
  }

  private async process(
    payload: CollectorPayload<unknown>,
    source: {
      type: IngestionType;

      filename?: string;

      mimeType?: string;

      sizeBytes?: bigint;
    },
  ) {
    const run = await this.ingestionRepository.create({
      type: source.type,

      provider: payload.provider,

      collector: payload.collector,

      dataType: payload.type,

      filename: source.filename,

      mimeType: source.mimeType,

      sizeBytes: source.sizeBytes,
    });

    try {
      const normalizer = this.normalizerRegistry.resolve(payload);

      const normalized = await normalizer.normalize(payload);
      console.log('Normalized Data:', normalized.chatProvided);
      const video = await this.videosRepository.upsert(normalized.video);

      let transcriptCount = 0;

      if (normalized.transcriptProvided) {
        transcriptCount = await this.transcriptsRepository.replaceForVideo(
          video.id,
          normalized.transcripts,
        );
      }

      let chatCount = 0;

      if (normalized.chatProvided) {
        console.log(
          '[Ingestion] inserting chats:',
          normalized.chats.length,
          'videoId:',
          video.id,
        );
        chatCount = await this.chatsRepository.insertMany(
          video.id,
          normalized.chats,
        );
      }
      console.log('[Ingestion] inserted chats:', chatCount);
      await this.ingestionRepository.complete(run.id, {
        videoId: video.id,

        transcriptCount,

        chatCount,
      });

      return {
        success: true,

        ingestionId: run.id,

        video: {
          id: video.id,

          provider: video.provider,

          externalId: video.externalId,

          title: video.title,
        },

        imported: {
          transcripts: transcriptCount,

          chats: chatCount,
        },
      };
    } catch (error) {
      await this.ingestionRepository.fail(run.id, error);

      throw error;
    }
  }
}
