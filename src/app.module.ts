import { ClipsModule } from './clips/clips.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { NormalizersModule } from './normalizers/normalizers.module';
import { VideosModule } from './videos/videos.module';
import { TranscriptsModule } from './transcripts/transcripts.module';
import { ChatsModule } from './chats/chats.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ClipsModule,
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
