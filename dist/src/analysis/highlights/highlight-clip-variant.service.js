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
exports.HighlightClipVariantService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const analysis_constants_1 = require("../analysis.constants");
const clip_preset_util_1 = require("./clip-preset.util");
let HighlightClipVariantService = class HighlightClipVariantService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async rebuildForVideo(videoId) {
        const [video, candidates] = await Promise.all([
            this.prisma.video.findUniqueOrThrow({
                where: { id: videoId },
                select: { durationMs: true },
            }),
            this.prisma.highlightCandidate.findMany({
                where: { videoId },
                select: {
                    id: true,
                    peakMs: true,
                    endMs: true,
                },
                orderBy: { rank: 'asc' },
            }),
        ]);
        const fallbackDurationMs = candidates.reduce((max, candidate) => Math.max(max, candidate.endMs), 0);
        const videoDurationMs = video.durationMs ?? fallbackDurationMs;
        await this.prisma.highlightClipVariant.deleteMany({
            where: {
                candidate: {
                    videoId,
                },
            },
        });
        if (candidates.length === 0 || videoDurationMs <= 0) {
            return 0;
        }
        const presets = Object.keys(analysis_constants_1.CLIP_PRESETS);
        const rows = candidates.flatMap((candidate) => presets.map((preset) => {
            const range = (0, clip_preset_util_1.buildClipPresetRange)(preset, candidate.peakMs, videoDurationMs);
            return {
                candidateId: candidate.id,
                preset: preset,
                startMs: range.startMs,
                endMs: range.endMs,
                durationMs: range.durationMs,
            };
        }));
        const result = await this.prisma.highlightClipVariant.createMany({
            data: rows,
            skipDuplicates: true,
        });
        return result.count;
    }
};
exports.HighlightClipVariantService = HighlightClipVariantService;
exports.HighlightClipVariantService = HighlightClipVariantService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HighlightClipVariantService);
//# sourceMappingURL=highlight-clip-variant.service.js.map