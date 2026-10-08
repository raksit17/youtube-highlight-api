import { CollectorPayload } from '../../ingestion/types/collector-payload.type';

import { NormalizedIngestion } from '../normalized/normalized-video.type';

export interface SourceNormalizer {
  supports(
    payload: CollectorPayload<unknown>,
  ): boolean;

  normalize(
    payload: CollectorPayload<unknown>,
  ): Promise<NormalizedIngestion>;
}