import { Module } from '@nestjs/common';

import { ClipsController } from './clips.controller';

import { ClipsRepository } from './clips.repository';

import { ClipsService } from './clips.service';
import { SubtitleExportService } from './subtitle-export.service';

@Module({
  controllers: [
    ClipsController,
  ],

  providers: [
    ClipsService,
    ClipsRepository,
    SubtitleExportService,
  ],

  exports: [
    ClipsService,
  ],
})
export class ClipsModule {}