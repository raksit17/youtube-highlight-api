import { StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { CreateRenderJobDto } from './dto/create-render-job.dto';
import { RendersService } from './renders.service';
export declare class RendersController {
    private readonly rendersService;
    constructor(rendersService: RendersService);
    create(id: string, dto: CreateRenderJobDto): Promise<{
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
    download(id: string, response: Response): Promise<StreamableFile>;
}
