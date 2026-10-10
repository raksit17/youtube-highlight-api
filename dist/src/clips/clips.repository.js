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
exports.ClipsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ClipsRepository = class ClipsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findVideoById(videoId) {
        return this.prisma.video.findUnique({
            where: {
                id: videoId,
            },
            select: {
                id: true,
                provider: true,
                externalId: true,
                url: true,
                title: true,
                durationMs: true,
            },
        });
    }
    findCandidateForVideo(videoId, candidateId) {
        return this.prisma.highlightCandidate.findFirst({
            where: {
                id: candidateId,
                videoId,
            },
            select: {
                id: true,
                videoId: true,
                rank: true,
                startMs: true,
                peakMs: true,
                endMs: true,
                finalScore: true,
                summaryScore: true,
                category: true,
                summary: true,
                status: true,
                clipVariants: {
                    select: {
                        preset: true,
                        startMs: true,
                        endMs: true,
                        durationMs: true,
                    },
                },
            },
        });
    }
    create(input) {
        return this.prisma.clipDraft.create({
            data: {
                videoId: input.videoId,
                candidateId: input.candidateId,
                startMs: input.startMs,
                endMs: input.endMs,
                peakMs: input.peakMs,
                title: input.title,
                note: input.note,
                sourcePreset: input.sourcePreset,
                isCustomized: input.isCustomized ?? false,
                candidateSnapshot: input.candidateSnapshot,
            },
            include: {
                candidate: true,
            },
        });
    }
    findByVideoId(videoId) {
        return this.prisma.clipDraft.findMany({
            where: {
                videoId,
            },
            include: {
                candidate: {
                    select: {
                        id: true,
                        rank: true,
                        finalScore: true,
                        category: true,
                        summary: true,
                        status: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    findById(id) {
        return this.prisma.clipDraft.findUnique({
            where: {
                id,
            },
            include: {
                video: {
                    select: {
                        id: true,
                        provider: true,
                        externalId: true,
                        url: true,
                        title: true,
                        durationMs: true,
                    },
                },
                candidate: {
                    select: {
                        id: true,
                        rank: true,
                        startMs: true,
                        peakMs: true,
                        endMs: true,
                        finalScore: true,
                        category: true,
                        summary: true,
                        status: true,
                    },
                },
            },
        });
    }
    update(id, input) {
        return this.prisma.clipDraft.update({
            where: {
                id,
            },
            data: {
                startMs: input.startMs,
                endMs: input.endMs,
                title: input.title,
                note: input.note,
                status: input.status,
                isCustomized: input.isCustomized,
            },
            include: {
                candidate: true,
            },
        });
    }
    delete(id) {
        return this.prisma.clipDraft.delete({
            where: {
                id,
            },
        });
    }
};
exports.ClipsRepository = ClipsRepository;
exports.ClipsRepository = ClipsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClipsRepository);
//# sourceMappingURL=clips.repository.js.map