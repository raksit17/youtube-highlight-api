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
exports.ClipsService = void 0;
const common_1 = require("@nestjs/common");
const clips_repository_1 = require("./clips.repository");
let ClipsService = class ClipsService {
    clipsRepository;
    constructor(clipsRepository) {
        this.clipsRepository = clipsRepository;
    }
    async create(videoId, dto) {
        const video = await this.clipsRepository.findVideoById(videoId);
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        let candidate = null;
        if (dto.candidateId) {
            candidate = await this.clipsRepository.findCandidateForVideo(videoId, dto.candidateId);
            if (!candidate) {
                throw new common_1.NotFoundException('Highlight candidate not found for this video');
            }
        }
        const startMs = dto.startMs ?? candidate?.startMs;
        const endMs = dto.endMs ?? candidate?.endMs;
        if (startMs === undefined || endMs === undefined) {
            throw new common_1.BadRequestException('startMs and endMs are required when candidateId is not provided');
        }
        const peakMs = candidate?.peakMs;
        this.validateRange({
            startMs,
            endMs,
            peakMs,
            durationMs: video.durationMs,
        });
        const candidateSnapshot = candidate
            ? {
                id: candidate.id,
                rank: candidate.rank,
                startMs: candidate.startMs,
                peakMs: candidate.peakMs,
                endMs: candidate.endMs,
                finalScore: candidate.finalScore,
                summaryScore: candidate.summaryScore,
                category: candidate.category,
                summary: candidate.summary,
                status: candidate.status,
            }
            : undefined;
        const clip = await this.clipsRepository.create({
            videoId,
            candidateId: candidate?.id,
            startMs,
            endMs,
            peakMs,
            title: dto.title,
            note: dto.note,
            candidateSnapshot,
        });
        return this.toResponse(clip);
    }
    async findForVideo(videoId) {
        const video = await this.clipsRepository.findVideoById(videoId);
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        const clips = await this.clipsRepository.findByVideoId(videoId);
        return {
            videoId,
            total: clips.length,
            items: clips.map((clip) => ({
                id: clip.id,
                candidateId: clip.candidateId,
                startMs: clip.startMs,
                peakMs: clip.peakMs,
                endMs: clip.endMs,
                durationMs: clip.endMs - clip.startMs,
                title: clip.title,
                note: clip.note,
                status: clip.status,
                candidate: clip.candidate,
                createdAt: clip.createdAt,
                updatedAt: clip.updatedAt,
            })),
        };
    }
    async findOne(id) {
        const clip = await this.clipsRepository.findById(id);
        if (!clip) {
            throw new common_1.NotFoundException('Clip draft not found');
        }
        return {
            id: clip.id,
            videoId: clip.videoId,
            candidateId: clip.candidateId,
            startMs: clip.startMs,
            peakMs: clip.peakMs,
            endMs: clip.endMs,
            durationMs: clip.endMs - clip.startMs,
            title: clip.title,
            note: clip.note,
            status: clip.status,
            candidateSnapshot: clip.candidateSnapshot,
            candidate: clip.candidate,
            video: clip.video,
            createdAt: clip.createdAt,
            updatedAt: clip.updatedAt,
        };
    }
    async update(id, dto) {
        const clip = await this.clipsRepository.findById(id);
        if (!clip) {
            throw new common_1.NotFoundException('Clip draft not found');
        }
        const startMs = dto.startMs ?? clip.startMs;
        const endMs = dto.endMs ?? clip.endMs;
        this.validateRange({
            startMs,
            endMs,
            peakMs: clip.peakMs,
            durationMs: clip.video.durationMs,
        });
        const updated = await this.clipsRepository.update(id, {
            startMs,
            endMs,
            title: dto.title,
            note: dto.note,
            status: dto.status,
        });
        return this.toResponse(updated);
    }
    async remove(id) {
        const clip = await this.clipsRepository.findById(id);
        if (!clip) {
            throw new common_1.NotFoundException('Clip draft not found');
        }
        await this.clipsRepository.delete(id);
        return {
            success: true,
            id,
        };
    }
    async export(id) {
        const clip = await this.clipsRepository.findById(id);
        if (!clip) {
            throw new common_1.NotFoundException('Clip draft not found');
        }
        return {
            version: 1,
            video: {
                id: clip.video.id,
                provider: clip.video.provider,
                externalId: clip.video.externalId,
                url: clip.video.url,
                title: clip.video.title,
                durationMs: clip.video.durationMs,
            },
            clip: {
                id: clip.id,
                title: clip.title,
                startMs: clip.startMs,
                peakMs: clip.peakMs,
                endMs: clip.endMs,
                durationMs: clip.endMs - clip.startMs,
                startSeconds: clip.startMs / 1000,
                peakSeconds: clip.peakMs !== null ? clip.peakMs / 1000 : null,
                endSeconds: clip.endMs / 1000,
                status: clip.status,
            },
            sourceCandidate: clip.candidate
                ? {
                    id: clip.candidate.id,
                    rank: clip.candidate.rank,
                    finalScore: clip.candidate.finalScore,
                    category: clip.candidate.category,
                    summary: clip.candidate.summary,
                }
                : clip.candidateSnapshot,
            exportedAt: new Date().toISOString(),
        };
    }
    validateRange(input) {
        const { startMs, endMs, peakMs, durationMs } = input;
        if (startMs < 0) {
            throw new common_1.BadRequestException('startMs must be greater than or equal to 0');
        }
        if (startMs >= endMs) {
            throw new common_1.BadRequestException('startMs must be less than endMs');
        }
        if (durationMs !== undefined && durationMs !== null && endMs > durationMs) {
            throw new common_1.BadRequestException(`endMs exceeds video duration (${durationMs})`);
        }
        if (peakMs !== undefined &&
            peakMs !== null &&
            (peakMs < startMs || peakMs > endMs)) {
            throw new common_1.BadRequestException('Highlight peak must remain inside clip range');
        }
    }
    toResponse(clip) {
        return {
            id: clip.id,
            videoId: clip.videoId,
            candidateId: clip.candidateId,
            startMs: clip.startMs,
            peakMs: clip.peakMs,
            endMs: clip.endMs,
            durationMs: clip.endMs - clip.startMs,
            title: clip.title,
            note: clip.note,
            status: clip.status,
            createdAt: clip.createdAt,
            updatedAt: clip.updatedAt,
        };
    }
};
exports.ClipsService = ClipsService;
exports.ClipsService = ClipsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clips_repository_1.ClipsRepository])
], ClipsService);
//# sourceMappingURL=clips.service.js.map