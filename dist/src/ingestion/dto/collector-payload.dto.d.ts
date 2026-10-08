export declare class CollectorSubjectDto {
    type: 'video';
    externalId: string;
    url?: string;
}
export declare class CollectorPayloadDto {
    success: boolean;
    provider: string;
    collector: string;
    type: 'video' | 'transcript' | 'chat';
    subject: CollectorSubjectDto;
    data: Record<string, unknown>;
}
