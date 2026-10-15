import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { GenerateYoutubeMetadataDto, UpdateYoutubeMetadataDto } from './dto/youtube-metadata.dto';
import { YoutubeMetadataService } from './youtube-metadata.service';

@Controller()
export class YoutubeMetadataController {
  constructor(private readonly metadata: YoutubeMetadataService) {}

  @Get('ai/ollama/models')
  models() {
    return this.metadata.listModels();
  }

  @Get('clips/:clipId/youtube-metadata')
  get(@Param('clipId') clipId: string) {
    return this.metadata.get(clipId);
  }

  @Post('clips/:clipId/youtube-metadata/generate')
  generate(@Param('clipId') clipId: string, @Body() dto: GenerateYoutubeMetadataDto) {
    return this.metadata.generate(clipId, dto);
  }

  @Patch('clips/:clipId/youtube-metadata')
  update(@Param('clipId') clipId: string, @Body() dto: UpdateYoutubeMetadataDto) {
    return this.metadata.update(clipId, dto);
  }
}
