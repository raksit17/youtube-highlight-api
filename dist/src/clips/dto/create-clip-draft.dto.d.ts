import { HighlightLengthPreset } from '../../../generated/prisma/enums';
export declare class CreateClipDraftDto {
    candidateId?: string;
    preset?: HighlightLengthPreset;
    startMs?: number;
    endMs?: number;
    title?: string;
    note?: string;
}
