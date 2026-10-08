import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';

import { createReadStream } from 'node:fs';

import type { Response } from 'express';

import { CreateRenderJobDto } from './dto/create-render-job.dto';

import { RendersService } from './renders.service';

@Controller()
export class RendersController {
  constructor(
    private readonly rendersService: RendersService,
  ) {}

  @Post('clips/:id/render')
  create(
    @Param('id') id: string,
    @Body() dto: CreateRenderJobDto,
  ) {
    return this.rendersService.createRenderJob(
      id,
      dto,
    );
  }

  @Get('render-jobs/:id')
  getJob(
    @Param('id') id: string,
  ) {
    return this.rendersService.getJob(
      id,
    );
  }

  @Get('clips/:id/download')
  async download(
    @Param('id') id: string,
    @Res({ passthrough: true })
    response: Response,
  ) {
    const file =
      await this.rendersService.getDownloadForClip(
        id,
      );

    response.setHeader(
      'Content-Type',
      file.contentType,
    );

    response.setHeader(
      'Content-Length',
      String(file.size),
    );

    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.filename}"`,
    );

    return new StreamableFile(
      createReadStream(file.path),
    );
  }
}
