import { ClipDraftStatus } from '../../../generated/prisma/enums';
export declare class UpdateClipDraftDto {
    startMs?: number;
    endMs?: number;
    title?: string;
    note?: string;
    status?: ClipDraftStatus;
}
