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
exports.HighlightCandidatesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let HighlightCandidatesRepository = class HighlightCandidatesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    deleteForVideo(videoId) {
        return this.prisma.highlightCandidate.deleteMany({
            where: {
                videoId,
            },
        });
    }
    async replaceTop(videoId, candidates) {
        return this.prisma.$transaction(async (tx) => {
            await tx.highlightCandidate.deleteMany({
                where: {
                    videoId,
                },
            });
            for (const candidate of candidates) {
                const created = await tx.highlightCandidate.create({
                    data: {
                        videoId,
                        rank: candidate.rank,
                        startMs: candidate.startMs,
                        peakMs: candidate.peakMs,
                        endMs: candidate.endMs,
                        summary: candidate.summary,
                        category: candidate.category,
                        summaryScore: candidate.summaryScore,
                        spikeScore: candidate.spikeScore,
                        reactionScore: candidate.reactionScore,
                        diversityScore: candidate.diversityScore,
                        transcriptScore: candidate.transcriptScore,
                        termScore: candidate.termScore,
                        finalScore: candidate.finalScore,
                        confidence: candidate.confidence,
                        reason: candidate.reason,
                    },
                });
                if (candidate.windowIds.length > 0) {
                    await tx.highlightCandidateWindow.createMany({
                        data: candidate.windowIds.map((analysisWindowId, position) => ({
                            highlightCandidateId: created.id,
                            analysisWindowId,
                            position,
                        })),
                    });
                }
            }
        });
    }
};
exports.HighlightCandidatesRepository = HighlightCandidatesRepository;
exports.HighlightCandidatesRepository = HighlightCandidatesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HighlightCandidatesRepository);
//# sourceMappingURL=highlight-candidates.repository.js.map