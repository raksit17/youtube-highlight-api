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
exports.SubtitleExportService = void 0;
exports.makeSubtitleFile = makeSubtitleFile;
exports.formatSubtitleTime = formatSubtitleTime;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let SubtitleExportService = class SubtitleExportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportForClip(clipId, requestedFormat, requestedLanguage) {
        const format = (requestedFormat ?? 'srt').toLowerCase();
        if (format !== 'srt' && format !== 'vtt') {
            throw new common_1.BadRequestException('format must be srt or vtt');
        }
        const language = requestedLanguage?.trim().toLowerCase();
        if (language && !/^[a-z0-9-]{1,20}$/.test(language)) {
            throw new common_1.BadRequestException('Invalid language code');
        }
        const clip = await this.prisma.clipDraft.findUnique({
            where: { id: clipId },
            select: { id: true, videoId: true, startMs: true, endMs: true },
        });
        if (!clip) {
            throw new common_1.NotFoundException('Clip draft not found');
        }
        const rows = await this.prisma.transcriptSegment.findMany({
            where: {
                videoId: clip.videoId,
                startMs: { lt: clip.endMs },
                endMs: { gt: clip.startMs },
            },
            select: {
                startMs: true,
                endMs: true,
                text: true,
                language: true,
                source: true,
            },
            orderBy: [{ startMs: 'asc' }, { sequence: 'asc' }],
        });
        if (rows.length === 0) {
            throw new common_1.NotFoundException('No transcript segments in this clip range');
        }
        const languages = rows.map((row) => row.language ?? 'und');
        const selectedLanguage = language ??
            languages.find((code) => /^en(?:-|$)/i.test(code)) ??
            languages[0];
        const selectedRows = rows.filter((row) => {
            const code = (row.language ?? 'und').toLowerCase();
            return code === selectedLanguage.toLowerCase() ||
                (language !== undefined && code.startsWith(`${language}-`));
        });
        if (selectedRows.length === 0) {
            throw new common_1.NotFoundException(`No ${selectedLanguage} transcript found in this clip range`);
        }
        const firstSource = selectedRows[0].source ?? 'und';
        const captions = selectedRows
            .filter((row) => (row.source ?? 'und') === firstSource)
            .map((row) => ({
            startMs: Math.max(0, row.startMs - clip.startMs),
            endMs: Math.min(clip.endMs - clip.startMs, row.endMs - clip.startMs),
            text: row.text.replace(/\r/g, '').trim(),
        }))
            .filter((row) => row.text.length > 0 && row.endMs > row.startMs);
        if (captions.length === 0) {
            throw new common_1.NotFoundException('No usable subtitle text in this clip range');
        }
        const outputFormat = format;
        const safeLanguage = selectedLanguage
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 20) || 'und';
        return {
            filename: `clip-${clip.id}.${safeLanguage}.${outputFormat}`,
            contentType: outputFormat === 'vtt'
                ? 'text/vtt; charset=utf-8'
                : 'application/x-subrip; charset=utf-8',
            language: selectedLanguage,
            content: makeSubtitleFile(captions, outputFormat),
        };
    }
};
exports.SubtitleExportService = SubtitleExportService;
exports.SubtitleExportService = SubtitleExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubtitleExportService);
function makeSubtitleFile(captions, format) {
    const blocks = captions.map((caption, index) => {
        const start = formatSubtitleTime(caption.startMs, format);
        const end = formatSubtitleTime(caption.endMs, format);
        return `${index + 1}\n${start} --> ${end}\n${caption.text}`;
    });
    return format === 'vtt'
        ? `WEBVTT\n\n${blocks.join('\n\n')}\n`
        : `${blocks.join('\n\n')}\n`;
}
function formatSubtitleTime(ms, format) {
    const time = Math.max(0, Math.trunc(ms));
    const hours = Math.floor(time / 3_600_000);
    const minutes = Math.floor((time % 3_600_000) / 60_000);
    const seconds = Math.floor((time % 60_000) / 1000);
    const millis = time % 1000;
    const clock = [hours, minutes, seconds]
        .map((value) => String(value).padStart(2, '0'))
        .join(':');
    return `${clock}${format === 'vtt' ? '.' : ','}${String(millis).padStart(3, '0')}`;
}
//# sourceMappingURL=subtitle-export.service.js.map