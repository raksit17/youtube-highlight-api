export declare const IngestionType: {
    readonly API: "API";
    readonly FILE: "FILE";
};
export type IngestionType = (typeof IngestionType)[keyof typeof IngestionType];
export declare const ClipDraftStatus: {
    readonly DRAFT: "DRAFT";
    readonly READY: "READY";
    readonly EXPORTED: "EXPORTED";
};
export type ClipDraftStatus = (typeof ClipDraftStatus)[keyof typeof ClipDraftStatus];
export declare const HighlightLengthPreset: {
    readonly QUICK: "QUICK";
    readonly CONTEXT: "CONTEXT";
    readonly STANDARD: "STANDARD";
    readonly LONG: "LONG";
};
export type HighlightLengthPreset = (typeof HighlightLengthPreset)[keyof typeof HighlightLengthPreset];
export declare const IngestionStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly PARTIAL: "PARTIAL";
    readonly FAILED: "FAILED";
};
export type IngestionStatus = (typeof IngestionStatus)[keyof typeof IngestionStatus];
export declare const AnalysisTermSource: {
    readonly CHAT: "CHAT";
    readonly TRANSCRIPT: "TRANSCRIPT";
};
export type AnalysisTermSource = (typeof AnalysisTermSource)[keyof typeof AnalysisTermSource];
export declare const AnalysisTermType: {
    readonly WORD: "WORD";
    readonly PHRASE: "PHRASE";
    readonly EMOTE: "EMOTE";
    readonly REACTION: "REACTION";
};
export type AnalysisTermType = (typeof AnalysisTermType)[keyof typeof AnalysisTermType];
export declare const HighlightStatus: {
    readonly NEW: "NEW";
    readonly REVIEWING: "REVIEWING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly CLIPPED: "CLIPPED";
};
export type HighlightStatus = (typeof HighlightStatus)[keyof typeof HighlightStatus];
export declare const RenderJobStatus: {
    readonly QUEUED: "QUEUED";
    readonly RUNNING: "RUNNING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type RenderJobStatus = (typeof RenderJobStatus)[keyof typeof RenderJobStatus];
