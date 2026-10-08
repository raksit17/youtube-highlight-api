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
exports.HighlightCandidateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const analysis_constants_1 = require("../analysis.constants");
const highlight_candidates_repository_1 = require("./highlight-candidates.repository");
let HighlightCandidateService = class HighlightCandidateService {
    prisma;
    repository;
    constructor(prisma, repository) {
        this.prisma = prisma;
        this.repository = repository;
    }
    async rebuild(videoId) {
        const video = await this.prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            },
            select: {
                durationMs: true,
            },
        });
        const windows = await this.prisma.analysisWindow.findMany({
            where: {
                videoId,
                summary: {
                    isNot: null,
                },
            },
            include: {
                summary: true,
            },
            orderBy: {
                windowIndex: 'asc',
            },
        });
        const interesting = windows.filter((window) => (window.summary?.summaryScore ?? 0) >= 55 ||
            window.spikeScore >= 65 ||
            window.reactionScore >= 70);
        const groups = [];
        for (const window of interesting) {
            const lastGroup = groups.at(-1);
            const lastWindow = lastGroup?.at(-1);
            if (!lastGroup ||
                !lastWindow ||
                window.windowIndex > lastWindow.windowIndex + 1 ||
                window.endMs - lastGroup[0].startMs > analysis_constants_1.MAX_HIGHLIGHT_DURATION_MS) {
                groups.push([window]);
                continue;
            }
            lastGroup.push(window);
        }
        const candidates = groups.map((group) => {
            const peak = [...group].sort((a, b) => this.windowScore(b) - this.windowScore(a))[0];
            const summaryScore = this.average(group.map((window) => window.summary?.summaryScore ?? 0));
            const spikeScore = Math.max(...group.map((window) => window.spikeScore));
            const reactionScore = this.average(group.map((window) => window.reactionScore));
            const diversityScore = this.average(group.map((window) => window.diversityScore));
            const transcriptScore = this.average(group.map((window) => window.transcriptScore));
            const termScore = this.average(group.map((window) => window.termScore));
            const finalScore = summaryScore * 0.45 +
                spikeScore * 0.25 +
                reactionScore * 0.15 +
                diversityScore * 0.1 +
                transcriptScore * 0.05;
            const rawStart = group[0].startMs - analysis_constants_1.HIGHLIGHT_PRE_ROLL_MS;
            const rawEnd = group.at(-1).endMs + analysis_constants_1.HIGHLIGHT_POST_ROLL_MS;
            const startMs = Math.max(0, rawStart);
            const endMs = Math.min(video.durationMs ?? rawEnd, rawEnd);
            const summary = group
                .map((window) => window.summary?.summary)
                .filter(Boolean)
                .join(' ')
                .slice(0, 1500);
            return {
                startMs,
                peakMs: Math.floor((peak.startMs + peak.endMs) / 2),
                endMs,
                summary,
                category: peak.summary?.category ?? undefined,
                summaryScore,
                spikeScore,
                reactionScore,
                diversityScore,
                transcriptScore,
                termScore,
                finalScore,
                confidence: Math.min(1, finalScore / 100),
                reason: {
                    sourceWindows: group.map((window) => ({
                        startMs: window.startMs,
                        endMs: window.endMs,
                        summaryScore: window.summary?.summaryScore,
                        spikeScore: window.spikeScore,
                    })),
                },
                windowIds: group.map((window) => window.id),
            };
        });
        const top5 = candidates
            .sort((a, b) => b.finalScore - a.finalScore)
            .slice(0, analysis_constants_1.TOP_HIGHLIGHTS)
            .map((candidate, index) => ({
            ...candidate,
            rank: index + 1,
        }));
        await this.repository.replaceTop(videoId, top5);
        return top5;
    }
    windowScore(window) {
        return ((window.summary?.summaryScore ?? 0) * 0.5 +
            window.spikeScore * 0.3 +
            window.reactionScore * 0.2);
    }
    average(values) {
        if (values.length === 0) {
            return 0;
        }
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }
};
exports.HighlightCandidateService = HighlightCandidateService;
exports.HighlightCandidateService = HighlightCandidateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        highlight_candidates_repository_1.HighlightCandidatesRepository])
], HighlightCandidateService);
//# sourceMappingURL=highlight-candidate.service.js.map