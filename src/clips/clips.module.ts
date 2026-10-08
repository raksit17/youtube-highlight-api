import { Module } from '@nestjs/common';

import { ClipsController } from './clips.controller';

import { ClipsRepository } from './clips.repository';

import { ClipsService } from './clips.service';

@Module({
  controllers: [
    ClipsController,
  ],

  providers: [
    ClipsService,
    ClipsRepository,
  ],

  exports: [
    ClipsService,
  ],
})
export class ClipsModule {}