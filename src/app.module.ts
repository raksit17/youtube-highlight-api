import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { ClipsModule } from './clips/clips.module';
import { DatabaseModule } from './database/database.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { NormalizersModule } from './normalizers/normalizers.module';
import { TranscriptsModule } from './transcripts/transcripts.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    IngestionModule,
    NormalizersModule,
    VideosModule,
    TranscriptsModule,
    ChatsModule,
    ClipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
