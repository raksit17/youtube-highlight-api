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
exports.RendersService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("node:fs/promises");
const create_render_job_dto_1 = require("./dto/create-render-job.dto");
const render_jobs_repository_1 = require("./render-jobs.repository");
const render_worker_service_1 = require("./render-worker.service");
let RendersService = class RendersService {
    renderJobsRepository;
    renderWorker;
    constructor(renderJobsRepository, renderWorker) {
        this.renderJobsRepository = renderJobsRepository;
        this.renderWorker = renderWorker;
    }
    async createRenderJob(clipId, dto) {
        const clip = await this.renderJobsRepository.findClipForRender(clipId);
        if (!clip) {
            throw new common_1.NotFoundException('Clip draft not found');
        }
        if (dto.mode === create_render_job_dto_1.RenderMode.FAST &&
            dto.resolution !== create_render_job_dto_1.RenderResolution.ORIGINAL) {
            throw new common_1.BadRequestException('FAST render mode requires ORIGINAL resolution because stream copy does not resize video');
        }
        if (clip.startMs < 0 ||
            clip.endMs <= clip.startMs) {
            throw new common_1.BadRequestException('Clip draft has an invalid start/end range');
        }
        if (clip.video.durationMs !==
            null &&
            clip.endMs >
                clip.video.durationMs) {
            throw new common_1.BadRequestException('Clip draft endMs exceeds video duration');
        }
        const active = await this.renderJobsRepository.findActiveForClip(clipId);
        if (active) {
            return this.toResponse(active);
        }
        const job = await this.renderJobsRepository.create({
            clipId,
            format: dto.format,
            resolution: dto.resolution,
            mode: dto.mode,
            includeSubtitles: dto.includeSubtitles ??
                false,
        });
        setImmediate(() => {
            void this.renderWorker.process(job.id);
        });
        return this.toResponse(job);
    }
    async getJob(id) {
        const job = await this.renderJobsRepository.findById(id);
        if (!job) {
            throw new common_1.NotFoundException('Render job not found');
        }
        return this.toResponse(job);
    }
    async getDownloadForClip(clipId) {
        const job = await this.renderJobsRepository.findLatestCompletedForClip(clipId);
        if (!job ||
            !job.outputPath ||
            !job.outputFilename) {
            throw new common_1.NotFoundException('No completed render exists for this clip');
        }
        try {
            await (0, promises_1.access)(job.outputPath);
        }
        catch {
            throw new common_1.NotFoundException('Rendered file is missing from storage');
        }
        const info = await (0, promises_1.stat)(job.outputPath);
        return {
            path: job.outputPath,
            filename: job.outputFilename,
            size: info.size,
            contentType: job.format === 'WEBM'
                ? 'video/webm'
                : 'video/mp4',
        };
    }
    toResponse(job) {
        return {
            id: job.id,
            clipId: job.clipId,
            status: job.status,
            progress: job.progress,
            stage: job.stage,
            format: job.format,
            resolution: job.resolution,
            mode: job.mode,
            includeSubtitles: job.includeSubtitles,
            outputFilename: job.outputFilename,
            downloadUrl: job.status ===
                'COMPLETED'
                ? `/api/v1/clips/${job.clipId}/download`
                : null,
            errorMessage: job.errorMessage,
            startedAt: job.startedAt,
            completedAt: job.completedAt,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
        };
    }
};
exports.RendersService = RendersService;
exports.RendersService = RendersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [render_jobs_repository_1.RenderJobsRepository,
        render_worker_service_1.RenderWorkerService])
], RendersService);
//# sourceMappingURL=renders.service.js.map