import { CreateRenderJobDto } from './dto/create-render-job.dto';
import { RenderJobsRepository } from './render-jobs.repository';
import { RenderWorkerService } from './render-worker.service';
export declare class RendersService {
    private readonly renderJobsRepository;
    private readonly renderWorker;
    constructor(renderJobsRepository: RenderJobsRepository, renderWorker: RenderWorkerService);
    createRenderJob(clipId: string, dto: CreateRenderJobDto): Promise<{
        id: string;
        clipId: string;
        status: string;
        progress: number;
        stage: string;
        format: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputFilename: string | null;
        downloadUrl: string | null;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getJob(id: string): Promise<{
        id: string;
        clipId: string;
        status: string;
        progress: number;
        stage: string;
        format: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputFilename: string | null;
        downloadUrl: string | null;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getDownloadForClip(clipId: string): Promise<{
        path: string;
        filename: string;
        size: number;
        contentType: string;
    }>;
    private toResponse;
}
