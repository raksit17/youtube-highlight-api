import { PrismaService } from '../database/prisma.service';
import { RenderJobsRepository } from './render-jobs.repository';
export declare class RenderWorkerService {
    private readonly prisma;
    private readonly renderJobsRepository;
    private readonly logger;
    constructor(prisma: PrismaService, renderJobsRepository: RenderJobsRepository);
    process(jobId: string): Promise<void>;
    private findSourceFile;
    private writeSubtitleFile;
    private buildFfmpegArgs;
    private getScaleFilter;
    private runFfmpeg;
    private formatSeconds;
    private formatSrtTime;
}
