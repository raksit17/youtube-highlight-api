import { Module } from '@nestjs/common';

import { VideosController } from './videos.controller';

import { VideosRepository } from './videos.repository';

import { VideosService } from './videos.service';

@Module({
  controllers: [VideosController],

  providers: [VideosService, VideosRepository],

  exports: [VideosService, VideosRepository],
})
export class VideosModule {}
