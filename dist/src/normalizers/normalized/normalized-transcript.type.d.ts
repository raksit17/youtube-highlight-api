export interface NormalizedTranscriptSegment {
    sequence: number;
    startMs: number;
    endMs: number;
    durationMs: number;
    text: string;
    language: string;
    source: string;
    format?: string;
    metadata?: Record<string, unknown>;
}
