"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderJobStatus = exports.HighlightStatus = exports.AnalysisTermType = exports.AnalysisTermSource = exports.IngestionStatus = exports.HighlightLengthPreset = exports.ClipDraftStatus = exports.IngestionType = void 0;
exports.IngestionType = {
    API: 'API',
    FILE: 'FILE'
};
exports.ClipDraftStatus = {
    DRAFT: 'DRAFT',
    READY: 'READY',
    EXPORTED: 'EXPORTED'
};
exports.HighlightLengthPreset = {
    QUICK: 'QUICK',
    CONTEXT: 'CONTEXT',
    STANDARD: 'STANDARD',
    LONG: 'LONG'
};
exports.IngestionStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    PARTIAL: 'PARTIAL',
    FAILED: 'FAILED'
};
exports.AnalysisTermSource = {
    CHAT: 'CHAT',
    TRANSCRIPT: 'TRANSCRIPT'
};
exports.AnalysisTermType = {
    WORD: 'WORD',
    PHRASE: 'PHRASE',
    EMOTE: 'EMOTE',
    REACTION: 'REACTION'
};
exports.HighlightStatus = {
    NEW: 'NEW',
    REVIEWING: 'REVIEWING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    CLIPPED: 'CLIPPED'
};
exports.RenderJobStatus = {
    QUEUED: 'QUEUED',
    RUNNING: 'RUNNING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
//# sourceMappingURL=enums.js.map