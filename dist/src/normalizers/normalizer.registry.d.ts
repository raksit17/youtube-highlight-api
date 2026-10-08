import { CollectorPayload } from '../ingestion/types/collector-payload.type';
import { SourceNormalizer } from './interfaces/source-normalizer.interface';
import { YoutubeYtdlpNormalizer } from './youtube/youtube-ytdlp.normalizer';
export declare class NormalizerRegistry {
    private readonly normalizers;
    constructor(youtubeYtdlpNormalizer: YoutubeYtdlpNormalizer);
    resolve(payload: CollectorPayload): SourceNormalizer;
}
