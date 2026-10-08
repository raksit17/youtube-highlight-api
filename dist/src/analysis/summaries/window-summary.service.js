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
exports.WindowSummaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const window_summaries_repository_1 = require("./window-summaries.repository");
let WindowSummaryService = class WindowSummaryService {
    prisma;
    repository;
    constructor(prisma, repository) {
        this.prisma = prisma;
        this.repository = repository;
    }
    async rebuild(videoId) {
        const windows = await this.prisma.analysisWindow.findMany({
            where: {
                videoId,
            },
            include: {
                terms: {
                    orderBy: {
                        count: 'desc',
                    },
                    take: 10,
                },
            },
            orderBy: {
                windowIndex: 'asc',
            },
        });
        const transcripts = await this.prisma.transcriptSegment.findMany({
            where: {
                videoId,
            },
            orderBy: {
                startMs: 'asc',
            },
        });
        const rows = [];
        for (const window of windows) {
            const transcriptText = transcripts
                .filter((segment) => segment.startMs < window.endMs &&
                segment.endMs > window.startMs)
                .map((segment) => segment.text)
                .join(' ')
                .slice(0, 500);
            const keywords = window.terms
                .slice(0, 5)
                .map((term) => term.normalizedTerm);
            const category = this.detectCategory(window);
            const importanceScore = this.clamp(window.spikeScore * 0.5 +
                window.termScore * 0.3 +
                window.transcriptScore * 0.2);
            const intensityScore = this.clamp(window.reactionScore * 0.6 +
                window.spikeScore * 0.4);
            const noveltyScore = this.clamp(window.termScore * 0.6 + 40);
            const contextScore = this.clamp(Math.min(window.transcriptWordCount * 2, 100));
            const summaryScore = importanceScore * 0.35 +
                intensityScore * 0.3 +
                noveltyScore * 0.2 +
                contextScore * 0.15;
            const summary = this.buildSummary(transcriptText, keywords, category);
            rows.push({
                analysisWindowId: window.id,
                summary,
                topic: keywords.slice(0, 3).join(', ') ||
                    undefined,
                category,
                keywords,
                reactions: {
                    laughCount: window.laughCount,
                    emojiCount: window.emojiCount,
                    questionCount: window.questionCount,
                    exclamationCount: window.exclamationCount,
                    capsCount: window.capsCount,
                },
                events: {
                    spikeScore: window.spikeScore,
                    messageRatio: window.messageRatio,
                },
                importanceScore,
                intensityScore,
                noveltyScore,
                contextScore,
                confidence: transcriptText.length > 0 ||
                    window.chatMessageCount > 0
                    ? 0.8
                    : 0.3,
                summaryScore,
                extractorVersion: 'rule-v1',
            });
        }
        await this.repository.deleteForVideo(videoId);
        await this.repository.createMany(rows);
        return rows.length;
    }
    detectCategory(window) {
        if (window.laughCount >= 5) {
            return 'FUNNY';
        }
        if (window.exclamationCount >= 5 ||
            window.questionCount >= 5) {
            return 'SURPRISE';
        }
        if (window.reactionScore >= 60) {
            return 'REACTION';
        }
        if (window.spikeScore >= 60) {
            return 'CHAT_INTERACTION';
        }
        return 'CONVERSATION';
    }
    buildSummary(transcript, keywords, category) {
        const transcriptPart = transcript ||
            'No transcript available.';
        const keywordPart = keywords.length > 0
            ? ` Top reactions/terms: ${keywords.join(', ')}.`
            : '';
        return `${category}: ${transcriptPart}${keywordPart}`;
    }
    clamp(value) {
        return Math.max(0, Math.min(100, value));
    }
};
exports.WindowSummaryService = WindowSummaryService;
exports.WindowSummaryService = WindowSummaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        window_summaries_repository_1.WindowSummariesRepository])
], WindowSummaryService);
//# sourceMappingURL=window-summary.service.js.map