"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightStatus = exports.AnalysisTermType = exports.AnalysisTermSource = exports.IngestionStatus = exports.IngestionType = void 0;
exports.IngestionType = {
    API: 'API',
    FILE: 'FILE'
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
//# sourceMappingURL=enums.js.map