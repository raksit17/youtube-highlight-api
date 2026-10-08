import { CollectorPayload } from './types/collector-payload.type';
export declare class IngestionValidator {
    validate(input: unknown): Promise<CollectorPayload<unknown>>;
}
