import { Module } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { YoutubeMetadataController } from './youtube-metadata.controller';
import { YoutubeMetadataService } from './youtube-metadata.service';

@Module({
  controllers: [YoutubeMetadataController],
  providers: [OllamaService, YoutubeMetadataService],
})
export class YoutubeMetadataModule {}
