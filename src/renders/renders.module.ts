import { Module } from '@nestjs/common';

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
  ],
  exports: [
    RendersService,
  ],
})
export class RendersModule {}
