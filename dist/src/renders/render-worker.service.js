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
var RenderWorkerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderWorkerService = void 0;
const common_1 = require("@nestjs/common");
const node_child_process_1 = require("node:child_process");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const prisma_service_1 = require("../database/prisma.service");
const create_render_job_dto_1 = require("./dto/create-render-job.dto");
const render_jobs_repository_1 = require("./render-jobs.repository");
let RenderWorkerService = RenderWorkerService_1 = class RenderWorkerService {
    prisma;
    renderJobsRepository;
    logger = new common_1.Logger(RenderWorkerService_1.name);
    constructor(prisma, renderJobsRepository) {
        this.prisma = prisma;
        this.renderJobsRepository = renderJobsRepository;
    }
    async process(jobId) {
        const job = await this.renderJobsRepository.findForWorker(jobId);
        if (!job) {
            return;
        }
        let subtitlePath;
        let outputPath;
        try {
            await this.renderJobsRepository.markRunning(job.id);
            const sourcePath = await this.findSourceFile(job.clip.video.id, job.clip.video.externalId);
            const outputDirectory = (0, node_path_1.resolve)(process.env.RENDER_OUTPUT_DIR ?? './storage/renders');
            await (0, promises_1.mkdir)(outputDirectory, {
                recursive: true,
            });
            await this.renderJobsRepository.updateProgress(job.id, 10, 'PREPARING_OUTPUT');
            const extension = job.format === create_render_job_dto_1.RenderFormat.WEBM
                ? 'webm'
                : 'mp4';
            const outputFilename = `clip-${job.clip.id}-${job.id}.${extension}`;
            outputPath = (0, node_path_1.join)(outputDirectory, outputFilename);
            if (job.includeSubtitles) {
                await this.renderJobsRepository.updateProgress(job.id, 12, 'PREPARING_SUBTITLES');
                subtitlePath = (0, node_path_1.join)(outputDirectory, `render-${job.id}.srt`);
                await this.writeSubtitleFile(job.clip.videoId, job.clip.startMs, job.clip.endMs, subtitlePath);
            }
            const args = this.buildFfmpegArgs({
                sourcePath,
                outputPath,
                subtitlePath,
                startMs: job.clip.startMs,
                endMs: job.clip.endMs,
                format: job.format,
                resolution: job.resolution,
                mode: job.mode,
            });
            await this.renderJobsRepository.updateProgress(job.id, 15, 'RENDERING');
            await this.runFfmpeg(job.id, args, job.clip.endMs - job.clip.startMs);
            await (0, promises_1.access)(outputPath);
            await this.renderJobsRepository.updateProgress(job.id, 98, 'FINALIZING');
            await this.renderJobsRepository.markCompleted(job.id, job.clip.id, outputPath, outputFilename);
        }
        catch (error) {
            if (outputPath) {
                await (0, promises_1.unlink)(outputPath).catch(() => undefined);
            }
            const message = error instanceof Error
                ? error.message
                : String(error);
            this.logger.error(`Render job ${job.id} failed: ${message}`);
            await this.renderJobsRepository
                .markFailed(job.id, message.slice(0, 8000))
                .catch(() => undefined);
        }
        finally {
            if (subtitlePath) {
                await (0, promises_1.unlink)(subtitlePath).catch(() => undefined);
            }
        }
    }
    async findSourceFile(videoId, externalId) {
        const sourceDirectory = (0, node_path_1.resolve)(process.env.VIDEO_SOURCE_DIR ?? './storage/sources');
        const names = [
            externalId,
            videoId,
        ];
        const extensions = [
            '.mp4',
            '.webm',
            '.mkv',
            '.mov',
            '.m4v',
        ];
        for (const name of names) {
            for (const extension of extensions) {
                const path = (0, node_path_1.join)(sourceDirectory, `${name}${extension}`);
                try {
                    await (0, promises_1.access)(path);
                    return path;
                }
                catch {
                }
            }
        }
        throw new Error(`Source video not found. Put a local source file in ${sourceDirectory} using the video external ID as the filename, for example ${externalId}.mp4`);
    }
    async writeSubtitleFile(videoId, clipStartMs, clipEndMs, outputPath) {
        const segments = await this.prisma.transcriptSegment.findMany({
            where: {
                videoId,
                startMs: {
                    lt: clipEndMs,
                },
                endMs: {
                    gt: clipStartMs,
                },
            },
            select: {
                startMs: true,
                endMs: true,
                text: true,
            },
            orderBy: {
                startMs: 'asc',
            },
        });
        if (segments.length === 0) {
            throw new Error('Subtitles were requested but no transcript segments exist in the selected clip range');
        }
        const durationMs = clipEndMs - clipStartMs;
        const blocks = segments
            .map((segment, index) => {
            const startMs = Math.max(0, segment.startMs - clipStartMs);
            const endMs = Math.min(durationMs, segment.endMs - clipStartMs);
            if (endMs <= startMs) {
                return null;
            }
            const text = segment.text
                .replace(/\r/g, '')
                .trim();
            if (!text) {
                return null;
            }
            return [
                String(index + 1),
                `${this.formatSrtTime(startMs)} --> ${this.formatSrtTime(endMs)}`,
                text,
                '',
            ].join('\n');
        })
            .filter((block) => block !== null);
        if (blocks.length === 0) {
            throw new Error('Subtitles were requested but no usable transcript text exists in the selected clip range');
        }
        await (0, promises_1.writeFile)(outputPath, blocks.join('\n'), 'utf8');
    }
    buildFfmpegArgs(input) {
        const durationMs = input.endMs - input.startMs;
        const args = [
            '-y',
            '-hide_banner',
            '-loglevel',
            'error',
            '-ss',
            this.formatSeconds(input.startMs),
            '-i',
            input.sourcePath,
        ];
        if (input.subtitlePath) {
            args.push('-i', input.subtitlePath);
        }
        args.push('-t', this.formatSeconds(durationMs), '-map', '0:v:0', '-map', '0:a?');
        if (input.subtitlePath) {
            args.push('-map', '1:0');
        }
        if (input.mode === create_render_job_dto_1.RenderMode.FAST) {
            args.push('-c:v', 'copy', '-c:a', 'copy');
        }
        else {
            const scaleFilter = this.getScaleFilter(input.resolution);
            if (scaleFilter) {
                args.push('-vf', scaleFilter);
            }
            if (input.format ===
                create_render_job_dto_1.RenderFormat.WEBM) {
                args.push('-c:v', 'libvpx-vp9', '-crf', '30', '-b:v', '0', '-c:a', 'libopus', '-b:a', '128k');
            }
            else {
                args.push('-c:v', 'libx264', '-preset', 'fast', '-crf', '20', '-c:a', 'aac', '-b:a', '192k');
            }
        }
        if (input.subtitlePath) {
            args.push('-c:s', input.format ===
                create_render_job_dto_1.RenderFormat.WEBM
                ? 'webvtt'
                : 'mov_text');
        }
        if (input.format ===
            create_render_job_dto_1.RenderFormat.MP4) {
            args.push('-movflags', '+faststart');
        }
        args.push('-avoid_negative_ts', 'make_zero', '-progress', 'pipe:1', '-nostats', input.outputPath);
        return args;
    }
    getScaleFilter(resolution) {
        if (resolution ===
            create_render_job_dto_1.RenderResolution.P1080) {
            return 'scale=1920:1080:force_original_aspect_ratio=decrease:force_divisible_by=2';
        }
        if (resolution ===
            create_render_job_dto_1.RenderResolution.P720) {
            return 'scale=1280:720:force_original_aspect_ratio=decrease:force_divisible_by=2';
        }
        return null;
    }
    async runFfmpeg(jobId, args, durationMs) {
        const ffmpegPath = process.env.FFMPEG_PATH ??
            'ffmpeg';
        await new Promise((resolvePromise, rejectPromise) => {
            const child = (0, node_child_process_1.spawn)(ffmpegPath, args, {
                windowsHide: true,
            });
            let stderr = '';
            let progressBuffer = '';
            let lastProgress = 15;
            child.stderr.on('data', (chunk) => {
                stderr += chunk.toString();
                if (stderr.length > 12000) {
                    stderr = stderr.slice(-12000);
                }
            });
            child.stdout.on('data', (chunk) => {
                progressBuffer +=
                    chunk.toString();
                let newlineIndex = progressBuffer.indexOf('\n');
                while (newlineIndex >= 0) {
                    const line = progressBuffer
                        .slice(0, newlineIndex)
                        .trim();
                    progressBuffer =
                        progressBuffer.slice(newlineIndex + 1);
                    const separator = line.indexOf('=');
                    if (separator > 0) {
                        const key = line.slice(0, separator);
                        const value = line.slice(separator + 1);
                        if (key ===
                            'out_time_us' ||
                            key ===
                                'out_time_ms') {
                            const renderedUs = Number(value);
                            if (Number.isFinite(renderedUs) &&
                                durationMs > 0) {
                                const ratio = renderedUs /
                                    (durationMs *
                                        1000);
                                const progress = Math.max(15, Math.min(95, Math.floor(15 +
                                    ratio *
                                        80)));
                                if (progress >=
                                    lastProgress + 2) {
                                    lastProgress =
                                        progress;
                                    void this.renderJobsRepository.updateProgress(jobId, progress, 'RENDERING');
                                }
                            }
                        }
                    }
                    newlineIndex =
                        progressBuffer.indexOf('\n');
                }
            });
            child.on('error', (error) => {
                rejectPromise(new Error(`Unable to start FFmpeg (${ffmpegPath}): ${error.message}`));
            });
            child.on('close', (code) => {
                if (code === 0) {
                    resolvePromise();
                    return;
                }
                rejectPromise(new Error(stderr.trim() ||
                    `FFmpeg exited with code ${code ?? 'unknown'}`));
            });
        });
    }
    formatSeconds(valueMs) {
        return (valueMs / 1000).toFixed(3);
    }
    formatSrtTime(valueMs) {
        const totalMs = Math.max(0, Math.trunc(valueMs));
        const hours = Math.floor(totalMs / 3_600_000);
        const minutes = Math.floor((totalMs % 3_600_000) /
            60_000);
        const seconds = Math.floor((totalMs % 60_000) /
            1000);
        const milliseconds = totalMs % 1000;
        return [
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0'),
        ].join(':') +
            ',' +
            String(milliseconds).padStart(3, '0');
    }
};
exports.RenderWorkerService = RenderWorkerService;
exports.RenderWorkerService = RenderWorkerService = RenderWorkerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        render_jobs_repository_1.RenderJobsRepository])
], RenderWorkerService);
//# sourceMappingURL=render-worker.service.js.map