import {
  Body, Controller, Get, Param, Post, Query, Res, StreamableFile,
} from '@nestjs/common';
import { createReadStream } from 'node:fs';
import type { Response } from 'express';
import { attachmentFilenameHeader } from '../clips/clip-filename.util';
import { CreateRenderJobDto } from './dto/create-render-job.dto';
import { RendersService } from './renders.service';

@Controller()
export class RendersController {
  constructor(private readonly rendersService: RendersService) {}

  @Post('clips/:id/render')
  create(@Param('id') id: string, @Body() dto: CreateRenderJobDto) {
    return this.rendersService.createRenderJob(id, dto);
  }

  @Get('render-jobs/:id')
  getJob(@Param('id') id: string) {
    return this.rendersService.getJob(id);
  }

  // Backward compatible: latest completed render for a ClipDraft.
  @Get('clips/:id/download')
  async downloadLatest(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.rendersService.getDownloadForClip(id);
    return this.streamFile(response, file);
  }

  // Exact immutable job, so video and subtitles cannot refer to different edits.
  @Get('render-jobs/:id/download')
  async downloadJob(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.rendersService.getDownloadForJob(id);
    return this.streamFile(response, file);
  }

  @Get('render-jobs/:id/subtitles')
  async downloadSubtitles(
    @Param('id') id: string,
    @Query('format') format: string | undefined,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.rendersService.getSubtitleForJob(id, format);
    return this.streamFile(response, file);
  }

  @Get('render-jobs/:id/export')
  async exportMetadata(@Param('id') id: string) {
    return this.rendersService.getExportForJob(id);
  }

  private streamFile(
    response: Response,
    file: { path: string; filename: string; size: number; contentType: string },
  ) {
    response.setHeader('Content-Type', file.contentType);
    response.setHeader('Content-Length', String(file.size));
    response.setHeader('Content-Disposition', attachmentFilenameHeader(file.filename));
    response.setHeader('Cache-Control', 'no-store');
    return new StreamableFile(createReadStream(file.path));
  }
}
