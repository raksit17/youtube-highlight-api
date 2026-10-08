import { CollectorPayload } from '../../ingestion/types/collector-payload.type';
import { SourceNormalizer } from '../interfaces/source-normalizer.interface';
import { NormalizedIngestion } from '../normalized/normalized-video.type';
export declare class YoutubeYtdlpNormalizer implements SourceNormalizer {
    supports(payload: CollectorPayload<unknown>): boolean;
    normalize(payload: CollectorPayload<unknown>): Promise<NormalizedIngestion>;
    private normalizeChat;
    private secondsToMs;
    private fromUnix;
    private parseUploadDate;
    private toBigInt;
}
