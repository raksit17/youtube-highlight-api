import { Module } from '@nestjs/common';

import { VideosRepository } from './videos.repository';

@Module({
  providers: [VideosRepository],

  exports: [VideosRepository],
})
export class VideosModule {}
