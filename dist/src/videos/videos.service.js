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
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const videos_repository_1 = require("./videos.repository");
let VideosService = class VideosService {
    videosRepository;
    constructor(videosRepository) {
        this.videosRepository = videosRepository;
    }
    async list(input) {
        const limit = Math.max(1, Math.min(input.limit ?? 20, 100));
        const rows = await this.videosRepository.findPage(limit, input.cursor);
        const hasMore = rows.length > limit;
        const items = hasMore ? rows.slice(0, limit) : rows;
        return {
            items: items.map((video) => this.toResponse(video)),
            nextCursor: hasMore ? items.at(-1)?.id ?? null : null,
        };
    }
    async findOne(id) {
        const video = await this.videosRepository.findByIdWithReviewData(id);
        if (!video) {
            throw new common_1.NotFoundException('Video not found');
        }
        return this.toResponse(video);
    }
    toResponse(video) {
        const review = {
            total: video.highlightCandidates.length,
            new: 0,
            approved: 0,
            rejected: 0,
            clipped: 0,
        };
        for (const candidate of video.highlightCandidates) {
            switch (candidate.status) {
                case 'NEW':
                case 'REVIEWING':
                    review.new += 1;
                    break;
                case 'APPROVED':
                    review.approved += 1;
                    break;
                case 'REJECTED':
                    review.rejected += 1;
                    break;
                case 'CLIPPED':
                    review.clipped += 1;
                    break;
            }
        }
        const highestScore = video.highlightCandidates.length > 0
            ? Math.max(...video.highlightCandidates.map((candidate) => candidate.finalScore))
            : null;
        const analyzedAt = video.analysisWindows[0]?.updatedAt ?? null;
        return {
            id: video.id,
            provider: video.provider,
            externalId: video.externalId,
            url: video.url,
            title: video.title,
            channelName: video.channelName,
            thumbnailUrl: video.thumbnailUrl,
            durationMs: video.durationMs ?? 0,
            chatCount: video._count.chatMessages,
            transcriptCount: video._count.transcriptSegments,
            createdAt: video.createdAt.toISOString(),
            analysis: {
                status: video._count.analysisWindows > 0 || video.highlightCandidates.length > 0
                    ? 'COMPLETED'
                    : 'NOT_STARTED',
                candidateCount: video.highlightCandidates.length,
                highestScore,
                analyzedAt: analyzedAt?.toISOString() ?? null,
            },
            review,
        };
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [videos_repository_1.VideosRepository])
], VideosService);
//# sourceMappingURL=videos.service.js.map