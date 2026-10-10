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
exports.RenderJobsRepository = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../database/prisma.service");
let RenderJobsRepository = class RenderJobsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findClipForRender(clipId) {
        return this.prisma.clipDraft.findUnique({
            where: {
                id: clipId,
            },
            include: {
                video: {
                    select: {
                        id: true,
                        externalId: true,
                        durationMs: true,
                    },
                },
            },
        });
    }
    findActiveForClip(clipId) {
        return this.prisma.renderJob.findFirst({
            where: {
                clipId,
                status: {
                    in: [
                        enums_1.RenderJobStatus.QUEUED,
                        enums_1.RenderJobStatus.RUNNING,
                    ],
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    create(input) {
        return this.prisma.renderJob.create({
            data: {
                clipId: input.clipId,
                format: input.format,
                resolution: input.resolution,
                mode: input.mode,
                includeSubtitles: input.includeSubtitles,
            },
        });
    }
    findById(id) {
        return this.prisma.renderJob.findUnique({
            where: {
                id,
            },
            include: {
                clip: {
                    select: {
                        id: true,
                        videoId: true,
                        startMs: true,
                        endMs: true,
                        peakMs: true,
                        status: true,
                    },
                },
            },
        });
    }
    findForWorker(id) {
        return this.prisma.renderJob.findUnique({
            where: {
                id,
            },
            include: {
                clip: {
                    include: {
                        video: {
                            select: {
                                id: true,
                                externalId: true,
                                durationMs: true,
                            },
                        },
                    },
                },
            },
        });
    }
    findLatestCompletedForClip(clipId) {
        return this.prisma.renderJob.findFirst({
            where: {
                clipId,
                status: enums_1.RenderJobStatus.COMPLETED,
                outputPath: {
                    not: null,
                },
            },
            orderBy: {
                completedAt: 'desc',
            },
        });
    }
    markRunning(id) {
        return this.prisma.renderJob.update({
            where: {
                id,
            },
            data: {
                status: enums_1.RenderJobStatus.RUNNING,
                progress: 5,
                stage: 'LOCATING_SOURCE',
                startedAt: new Date(),
                completedAt: null,
                errorMessage: null,
            },
        });
    }
    updateProgress(id, progress, stage = 'RENDERING') {
        return this.prisma.renderJob.update({
            where: {
                id,
            },
            data: {
                progress: Math.max(0, Math.min(99, Math.trunc(progress))),
                stage,
            },
        });
    }
    async markCompleted(id, clipId, outputPath, outputFilename) {
        return this.prisma.$transaction(async (tx) => {
            const job = await tx.renderJob.update({
                where: {
                    id,
                },
                data: {
                    status: enums_1.RenderJobStatus.COMPLETED,
                    progress: 100,
                    stage: 'COMPLETED',
                    outputPath,
                    outputFilename,
                    completedAt: new Date(),
                    errorMessage: null,
                },
            });
            await tx.clipDraft.update({
                where: {
                    id: clipId,
                },
                data: {
                    status: enums_1.ClipDraftStatus.EXPORTED,
                    exportedAt: new Date(),
                },
            });
            return job;
        });
    }
    markFailed(id, errorMessage) {
        return this.prisma.renderJob.update({
            where: {
                id,
            },
            data: {
                status: enums_1.RenderJobStatus.FAILED,
                stage: 'FAILED',
                errorMessage,
                completedAt: new Date(),
            },
        });
    }
};
exports.RenderJobsRepository = RenderJobsRepository;
exports.RenderJobsRepository = RenderJobsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RenderJobsRepository);
//# sourceMappingURL=render-jobs.repository.js.map