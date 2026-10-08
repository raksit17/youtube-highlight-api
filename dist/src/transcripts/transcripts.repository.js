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
exports.TranscriptsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let TranscriptsRepository = class TranscriptsRepository {
    prisma;
    batchSize = 1000;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async replaceForVideo(videoId, segments) {
        await this.prisma.transcriptSegment.deleteMany({
            where: {
                videoId,
            },
        });
        let inserted = 0;
        for (let index = 0; index < segments.length; index += this.batchSize) {
            const batch = segments.slice(index, index + this.batchSize);
            const result = await this.prisma.transcriptSegment.createMany({
                data: batch.map((segment) => ({
                    videoId,
                    sequence: segment.sequence,
                    startMs: segment.startMs,
                    endMs: segment.endMs,
                    durationMs: segment.durationMs,
                    text: segment.text,
                    language: segment.language,
                    source: segment.source,
                    format: segment.format,
                    metadata: segment.metadata,
                })),
            });
            inserted += result.count;
        }
        return inserted;
    }
};
exports.TranscriptsRepository = TranscriptsRepository;
exports.TranscriptsRepository = TranscriptsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TranscriptsRepository);
//# sourceMappingURL=transcripts.repository.js.map