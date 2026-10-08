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
exports.VideosRepository = exports.videoReviewInclude = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
exports.videoReviewInclude = {
    _count: {
        select: {
            chatMessages: true,
            transcriptSegments: true,
            analysisWindows: true,
        },
    },
    highlightCandidates: {
        select: {
            status: true,
            finalScore: true,
            updatedAt: true,
        },
        orderBy: {
            finalScore: 'desc',
        },
    },
    analysisWindows: {
        select: {
            updatedAt: true,
        },
        orderBy: {
            updatedAt: 'desc',
        },
        take: 1,
    },
};
let VideosRepository = class VideosRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    upsert(video) {
        return this.prisma.video.upsert({
            where: {
                provider_externalId: {
                    provider: video.provider,
                    externalId: video.externalId,
                },
            },
            create: {
                provider: video.provider,
                externalId: video.externalId,
                url: video.url,
                title: video.title,
                description: video.description,
                channelExternalId: video.channelExternalId,
                channelName: video.channelName,
                channelUrl: video.channelUrl,
                channelFollowers: video.channelFollowers,
                uploadDate: video.uploadDate,
                publishedAt: video.publishedAt,
                releaseAt: video.releaseAt,
                viewCount: video.viewCount,
                likeCount: video.likeCount,
                commentCount: video.commentCount,
                durationMs: video.durationMs,
                thumbnailUrl: video.thumbnailUrl,
                width: video.width,
                height: video.height,
                fps: video.fps,
                liveStatus: video.liveStatus,
                isLive: video.isLive,
                wasLive: video.wasLive,
                concurrentViewers: video.concurrentViewers,
                language: video.language,
                availability: video.availability,
                ageLimit: video.ageLimit,
                tags: video.tags,
                categories: video.categories,
                metadata: video.metadata,
            },
            update: {
                url: video.url,
                title: video.title,
                description: video.description,
                channelExternalId: video.channelExternalId,
                channelName: video.channelName,
                channelUrl: video.channelUrl,
                channelFollowers: video.channelFollowers,
                uploadDate: video.uploadDate,
                publishedAt: video.publishedAt,
                releaseAt: video.releaseAt,
                viewCount: video.viewCount,
                likeCount: video.likeCount,
                commentCount: video.commentCount,
                durationMs: video.durationMs,
                thumbnailUrl: video.thumbnailUrl,
                width: video.width,
                height: video.height,
                fps: video.fps,
                liveStatus: video.liveStatus,
                isLive: video.isLive,
                wasLive: video.wasLive,
                concurrentViewers: video.concurrentViewers,
                language: video.language,
                availability: video.availability,
                ageLimit: video.ageLimit,
                tags: video.tags,
                categories: video.categories,
                metadata: video.metadata,
            },
        });
    }
    findPage(limit, cursor) {
        return this.prisma.video.findMany({
            take: limit + 1,
            ...(cursor
                ? {
                    cursor: {
                        id: cursor,
                    },
                    skip: 1,
                }
                : {}),
            orderBy: [
                {
                    createdAt: 'desc',
                },
                {
                    id: 'desc',
                },
            ],
            include: exports.videoReviewInclude,
        });
    }
    findByIdWithReviewData(id) {
        return this.prisma.video.findUnique({
            where: {
                id,
            },
            include: exports.videoReviewInclude,
        });
    }
    findBySource(provider, externalId) {
        return this.prisma.video.findUnique({
            where: {
                provider_externalId: {
                    provider,
                    externalId,
                },
            },
        });
    }
};
exports.VideosRepository = VideosRepository;
exports.VideosRepository = VideosRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VideosRepository);
//# sourceMappingURL=videos.repository.js.map