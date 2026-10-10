import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { ClipsService } from './clips.service';
import { SubtitleExportService } from './subtitle-export.service';
import { attachmentFilenameHeader } from './clip-filename.util';
import type { Response } from 'express';

import { CreateClipDraftDto } from './dto/create-clip-draft.dto';

import { UpdateClipDraftDto } from './dto/update-clip-draft.dto';

@Controller()
export class ClipsController {
  constructor(
    private readonly clipsService: ClipsService,
    private readonly subtitleExportService: SubtitleExportService,
  ) {}

  /**
   * POST
   * /api/v1/videos/:videoId/clips
   */
  @Post('videos/:videoId/clips')
  create(
    @Param('videoId')
    videoId: string,

    @Body()
    dto: CreateClipDraftDto,
  ) {
    return this.clipsService.create(videoId, dto);
  }

  /**
   * GET
   * /api/v1/videos/:videoId/clips
   */
  @Get('videos/:videoId/clips')
  findForVideo(
    @Param('videoId')
    videoId: string,
  ) {
    return this.clipsService.findForVideo(videoId);
  }

  /**
   * GET
   * /api/v1/clips/:id
   */
  @Get('clips/:id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.clipsService.findOne(id);
  }

  /**
   * PATCH
   * /api/v1/clips/:id
   */
  @Patch('clips/:id')
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateClipDraftDto,
  ) {
    return this.clipsService.update(id, dto);
  }


  /**
   * Export an editable subtitle sidecar for the exact Clip Draft range.
   * Available without rendering an MP4 and without a local source video.
   * GET /api/v1/clips/:id/subtitles?format=srt|vtt&language=en
   */
  @Get('clips/:id/subtitles')
  async downloadSubtitles(
    @Param('id') id: string,
    @Query('format') format: string | undefined,
    @Query('language') language: string | undefined,
    @Res({ passthrough: true }) response: Response,
  ) {
    const subtitle = await this.subtitleExportService.exportForClip(
      id,
      format,
      language,
    );

    response.setHeader('Content-Type', subtitle.contentType);
    response.setHeader(
      'Content-Disposition',
      attachmentFilenameHeader(subtitle.filename),
    );
    response.setHeader('Cache-Control', 'no-store');

    return new StreamableFile(Buffer.from(subtitle.content, 'utf8'));
  }

  /**
   * GET
   * /api/v1/clips/:id/export
   */
  @Get('clips/:id/export')
  export(
    @Param('id')
    id: string,
  ) {
    return this.clipsService.export(id);
  }

  /**
   * DELETE
   * /api/v1/clips/:id
   */
  @Delete('clips/:id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.clipsService.remove(id);
  }
}
