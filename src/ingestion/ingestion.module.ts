import { Module } from '@nestjs/common';

import { ChatsModule } from '../chats/chats.module';

import { NormalizersModule } from '../normalizers/normalizers.module';

import { TranscriptsModule } from '../transcripts/transcripts.module';

import { VideosModule } from '../videos/videos.module';

import { IngestionController } from './ingestion.controller';

import { IngestionRepository } from './ingestion.repository';

import { IngestionService } from './ingestion.service';

import { IngestionValidator } from './ingestion.validator';

import { JsonFileParser } from './parsers/json-file.parser';

import { AnalysisModule } from '../analysis/analysis.module';


@Module({
  imports: [NormalizersModule, VideosModule, TranscriptsModule, ChatsModule,AnalysisModule],

  controllers: [IngestionController],

  providers: [
    IngestionService,
    IngestionRepository,
    IngestionValidator,
    JsonFileParser,
  ],
})
export class IngestionModule {}
