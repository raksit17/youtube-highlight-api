"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermExtractorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const analysis_constants_1 = require("../analysis.constants");
const analysis_terms_repository_1 = require("./analysis-terms.repository");
let TermExtractorService = class TermExtractorService {
    prisma;
    repository;
    stopWords = new Set([
        'the',
        'a',
        'an',
        'is',
        'are',
        'was',
        'were',
        'to',
        'of',
        'and',
        'or',
        'in',
        'on',
        'for',
        'it',
        'this',
        'that',
        'i',
        'you',
        'we',
        'they',
    ]);
    constructor(prisma, repository) {
        this.prisma = prisma;
        this.repository = repository;
    }
    async rebuild(videoId) {
        const windows = await this.prisma.analysisWindow.findMany({
            where: {
                videoId,
            },
            orderBy: {
                windowIndex: 'asc',
            },
        });
        const chats = await this.prisma.chatMessage.findMany({
            where: {
                videoId,
            },
            select: {
                timestampMs: true,
                message: true,
            },
        });
        const transcripts = await this.prisma.transcriptSegment.findMany({
            where: {
                videoId,
            },
            select: {
                startMs: true,
                text: true,
            },
        });
        const chatBuckets = new Map();
        const transcriptBuckets = new Map();
        for (const chat of chats) {
            const index = Math.floor(chat.timestampMs / analysis_constants_1.ANALYSIS_WINDOW_MS);
            this.addText(chatBuckets, index, chat.message);
        }
        for (const segment of transcripts) {
            const index = Math.floor(segment.startMs / analysis_constants_1.ANALYSIS_WINDOW_MS);
            this.addText(transcriptBuckets, index, segment.text);
        }
        const rows = [];
        for (const window of windows) {
            const chatTerms = this.getTopTerms(chatBuckets.get(window.windowIndex));
            const transcriptTerms = this.getTopTerms(transcriptBuckets.get(window.windowIndex));
            for (const [term, count] of chatTerms) {
                rows.push({
                    analysisWindowId: window.id,
                    source: 'CHAT',
                    type: 'WORD',
                    term,
                    normalizedTerm: term,
                    count,
                    score: Math.min(100, count * 5),
                });
            }
            for (const [term, count] of transcriptTerms) {
                rows.push({
                    analysisWindowId: window.id,
                    source: 'TRANSCRIPT',
                    type: 'WORD',
                    term,
                    normalizedTerm: term,
                    count,
                    score: Math.min(100, count * 5),
                });
            }
            const termScore = this.calculateTermScore(chatTerms, transcriptTerms);
            await this.prisma.analysisWindow.update({
                where: {
                    id: window.id,
                },
                data: {
                    termScore,
                },
            });
        }
        return this.repository.createMany(rows);
    }
    addText(buckets, index, text) {
        let bucket = buckets.get(index);
        if (!bucket) {
            bucket = new Map();
            buckets.set(index, bucket);
        }
        const terms = this.tokenize(text);
        for (const term of terms) {
            bucket.set(term, (bucket.get(term) ?? 0) + 1);
        }
    }
    tokenize(text) {
        return (text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? []).filter((term) => term.length >= 2 && !this.stopWords.has(term));
    }
    getTopTerms(terms) {
        if (!terms) {
            return [];
        }
        return [...terms.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, analysis_constants_1.TOP_TERMS_PER_WINDOW);
    }
    calculateTermScore(chat, transcript) {
        const chatTop = chat.slice(0, 5).reduce((sum, [, count]) => sum + count, 0);
        const transcriptTop = transcript
            .slice(0, 5)
            .reduce((sum, [, count]) => sum + count, 0);
        return Math.min(100, chatTop * 4 + transcriptTop * 2);
    }
};
exports.TermExtractorService = TermExtractorService;
exports.TermExtractorService = TermExtractorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        analysis_terms_repository_1.AnalysisTermsRepository])
], TermExtractorService);
//# sourceMappingURL=term-extractor.service.js.map