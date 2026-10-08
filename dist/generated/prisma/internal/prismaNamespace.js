"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.JsonNullValueFilter = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.HighlightCandidateWindowScalarFieldEnum = exports.HighlightCandidateScalarFieldEnum = exports.WindowSummaryScalarFieldEnum = exports.AnalysisTermCountScalarFieldEnum = exports.AnalysisWindowScalarFieldEnum = exports.ChatMessageScalarFieldEnum = exports.TranscriptSegmentScalarFieldEnum = exports.VideoScalarFieldEnum = exports.IngestionRunScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.10.0",
    engine: "0edf323efd1d98336f3f0a68684b56f689b900d3"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    IngestionRun: 'IngestionRun',
    Video: 'Video',
    TranscriptSegment: 'TranscriptSegment',
    ChatMessage: 'ChatMessage',
    AnalysisWindow: 'AnalysisWindow',
    AnalysisTermCount: 'AnalysisTermCount',
    WindowSummary: 'WindowSummary',
    HighlightCandidate: 'HighlightCandidate',
    HighlightCandidateWindow: 'HighlightCandidateWindow'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.IngestionRunScalarFieldEnum = {
    id: 'id',
    type: 'type',
    status: 'status',
    provider: 'provider',
    collector: 'collector',
    dataType: 'dataType',
    filename: 'filename',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    checksum: 'checksum',
    rawFilePath: 'rawFilePath',
    videoId: 'videoId',
    transcriptCount: 'transcriptCount',
    chatCount: 'chatCount',
    errorCode: 'errorCode',
    errorMessage: 'errorMessage',
    metadata: 'metadata',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.VideoScalarFieldEnum = {
    id: 'id',
    provider: 'provider',
    externalId: 'externalId',
    url: 'url',
    title: 'title',
    description: 'description',
    channelExternalId: 'channelExternalId',
    channelName: 'channelName',
    channelUrl: 'channelUrl',
    channelFollowers: 'channelFollowers',
    uploadDate: 'uploadDate',
    publishedAt: 'publishedAt',
    releaseAt: 'releaseAt',
    viewCount: 'viewCount',
    likeCount: 'likeCount',
    commentCount: 'commentCount',
    durationMs: 'durationMs',
    thumbnailUrl: 'thumbnailUrl',
    width: 'width',
    height: 'height',
    fps: 'fps',
    liveStatus: 'liveStatus',
    isLive: 'isLive',
    wasLive: 'wasLive',
    concurrentViewers: 'concurrentViewers',
    language: 'language',
    availability: 'availability',
    ageLimit: 'ageLimit',
    tags: 'tags',
    categories: 'categories',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TranscriptSegmentScalarFieldEnum = {
    id: 'id',
    videoId: 'videoId',
    sequence: 'sequence',
    startMs: 'startMs',
    endMs: 'endMs',
    durationMs: 'durationMs',
    text: 'text',
    language: 'language',
    source: 'source',
    format: 'format',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ChatMessageScalarFieldEnum = {
    id: 'id',
    videoId: 'videoId',
    externalId: 'externalId',
    dedupeKey: 'dedupeKey',
    sequence: 'sequence',
    timestampMs: 'timestampMs',
    timestampUsec: 'timestampUsec',
    authorId: 'authorId',
    authorName: 'authorName',
    message: 'message',
    messageType: 'messageType',
    amountRaw: 'amountRaw',
    isMember: 'isMember',
    isModerator: 'isModerator',
    isOwner: 'isOwner',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.AnalysisWindowScalarFieldEnum = {
    id: 'id',
    videoId: 'videoId',
    windowIndex: 'windowIndex',
    startMs: 'startMs',
    endMs: 'endMs',
    windowSizeMs: 'windowSizeMs',
    chatMessageCount: 'chatMessageCount',
    uniqueAuthorCount: 'uniqueAuthorCount',
    chatWordCount: 'chatWordCount',
    transcriptWordCount: 'transcriptWordCount',
    emojiCount: 'emojiCount',
    laughCount: 'laughCount',
    questionCount: 'questionCount',
    exclamationCount: 'exclamationCount',
    capsCount: 'capsCount',
    authorDiversity: 'authorDiversity',
    baselineMessageCount: 'baselineMessageCount',
    messageRatio: 'messageRatio',
    zScore: 'zScore',
    spikeScore: 'spikeScore',
    reactionScore: 'reactionScore',
    diversityScore: 'diversityScore',
    transcriptScore: 'transcriptScore',
    termScore: 'termScore',
    features: 'features',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AnalysisTermCountScalarFieldEnum = {
    id: 'id',
    analysisWindowId: 'analysisWindowId',
    source: 'source',
    type: 'type',
    term: 'term',
    normalizedTerm: 'normalizedTerm',
    count: 'count',
    score: 'score',
    createdAt: 'createdAt'
};
exports.WindowSummaryScalarFieldEnum = {
    id: 'id',
    analysisWindowId: 'analysisWindowId',
    summary: 'summary',
    topic: 'topic',
    category: 'category',
    keywords: 'keywords',
    reactions: 'reactions',
    events: 'events',
    keyTranscript: 'keyTranscript',
    keyChat: 'keyChat',
    importanceScore: 'importanceScore',
    intensityScore: 'intensityScore',
    noveltyScore: 'noveltyScore',
    contextScore: 'contextScore',
    confidence: 'confidence',
    summaryScore: 'summaryScore',
    extractorVersion: 'extractorVersion',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.HighlightCandidateScalarFieldEnum = {
    id: 'id',
    videoId: 'videoId',
    rank: 'rank',
    startMs: 'startMs',
    peakMs: 'peakMs',
    endMs: 'endMs',
    summary: 'summary',
    category: 'category',
    summaryScore: 'summaryScore',
    spikeScore: 'spikeScore',
    reactionScore: 'reactionScore',
    diversityScore: 'diversityScore',
    transcriptScore: 'transcriptScore',
    termScore: 'termScore',
    finalScore: 'finalScore',
    confidence: 'confidence',
    reason: 'reason',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.HighlightCandidateWindowScalarFieldEnum = {
    highlightCandidateId: 'highlightCandidateId',
    analysisWindowId: 'analysisWindowId',
    position: 'position'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map