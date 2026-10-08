import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';

import { HighlightQueryService } from './highlight-query.service';

@Controller()
export class HighlightsController {
  constructor(
    private readonly highlightQueryService: HighlightQueryService,
  ) {}

  @Get('videos/:videoId/candidates')
  listCandidates(
    @Param('videoId') videoId: string,
    @Query('sort') sort?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit === undefined ? undefined : Number(limit);

    return this.highlightQueryService.listCandidates(videoId, {
      sort,
      limit:
        parsedLimit !== undefined && Number.isFinite(parsedLimit)
          ? parsedLimit
          : undefined,
    });
  }

  @Get('videos/:videoId/heatmap')
  getHeatmap(
    @Param('videoId') videoId: string,
    @Query('bucketMs') bucketMs?: string,
  ) {
    const parsedBucketMs =
      bucketMs === undefined ? undefined : Number(bucketMs);

    return this.highlightQueryService.getHeatmap(
      videoId,
      parsedBucketMs !== undefined && Number.isFinite(parsedBucketMs)
        ? parsedBucketMs
        : undefined,
    );
  }

  @Get('candidates/:id/context')
  getContext(
    @Param('id') id: string,
    @Query('beforeMs') beforeMs?: string,
    @Query('afterMs') afterMs?: string,
    @Query('chatLimit') chatLimit?: string,
  ) {
    return this.highlightQueryService.getContext(id, {
      beforeMs: this.parseNumber(beforeMs),
      afterMs: this.parseNumber(afterMs),
      chatLimit: this.parseNumber(chatLimit),
    });
  }

  @Patch('candidates/:id/review')
  reviewCandidate(
    @Param('id') id: string,
    @Body()
    body: {
      status?: string;
      reason?: string;
    },
  ) {
    return this.highlightQueryService.reviewCandidate(id, body);
  }

  private parseNumber(value?: string) {
    if (value === undefined) {
      return undefined;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : undefined;
  }
}
