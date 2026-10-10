import { Module } from '@nestjs/common';
import { SubtitleExportService } from '../clips/subtitle-export.service';
import { MadladSubtitleService } from './madlad-subtitle.service';

import { RenderJobsRepository } from './render-jobs.repository';

import { RenderWorkerService } from './render-worker.service';

import { RendersController } from './renders.controller';

import { RendersService } from './renders.service';

@Module({
  controllers: [
    RendersController,
  ],
  providers: [
    RendersService,
    RenderWorkerService,
    RenderJobsRepository,
    SubtitleExportService,
    MadladSubtitleService,
  ],
  exports: [
    RendersService,
  ],
})
export class RendersModule {}
