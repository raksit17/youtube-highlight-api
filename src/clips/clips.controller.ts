import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ClipsService } from './clips.service';

import { CreateClipDraftDto } from './dto/create-clip-draft.dto';

import { UpdateClipDraftDto } from './dto/update-clip-draft.dto';

@Controller()
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

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
