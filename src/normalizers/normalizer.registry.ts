import { BadRequestException, Injectable } from '@nestjs/common';

import { CollectorPayload } from '../ingestion/types/collector-payload.type';

import { SourceNormalizer } from './interfaces/source-normalizer.interface';

import { YoutubeYtdlpNormalizer } from './youtube/youtube-ytdlp.normalizer';

@Injectable()
export class NormalizerRegistry {
  private readonly normalizers: SourceNormalizer[];

  constructor(youtubeYtdlpNormalizer: YoutubeYtdlpNormalizer) {
    this.normalizers = [youtubeYtdlpNormalizer];
  }

  resolve(payload: CollectorPayload): SourceNormalizer {
    const normalizer = this.normalizers.find((item) => item.supports(payload));

    if (!normalizer) {
      throw new BadRequestException(
        `Unsupported collector: ${payload.provider}/${payload.collector}/${payload.type}`,
      );
    }

    return normalizer;
  }
}
