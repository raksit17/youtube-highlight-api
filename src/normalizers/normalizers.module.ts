import { Module } from '@nestjs/common';

import { NormalizerRegistry } from './normalizer.registry';

import { YoutubeYtdlpNormalizer } from './youtube/youtube-ytdlp.normalizer';

@Module({
  providers: [YoutubeYtdlpNormalizer, NormalizerRegistry],

  exports: [NormalizerRegistry],
})
export class NormalizersModule {}
