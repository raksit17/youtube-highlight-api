import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  access,
  stat,
} from 'node:fs/promises';

import {
  CreateRenderJobDto,
} from './dto/create-render-job.dto';

import { RenderJobsRepository } from './render-jobs.repository';

import { RenderWorkerService } from './render-worker.service';

@Injectable()
export class RendersService {
  constructor(
    private readonly renderJobsRepository: RenderJobsRepository,
    private readonly renderWorker: RenderWorkerService,
  ) {}

  async createRenderJob(
    clipId: string,
    dto: CreateRenderJobDto,
  ) {
    const clip =
      await this.renderJobsRepository.findClipForRender(
        clipId,
      );

    if (!clip) {
      throw new NotFoundException(
        'Clip draft not found',
      );
    }

    if (
      clip.startMs < 0 ||
      clip.endMs <= clip.startMs
    ) {
      throw new BadRequestException(
        'Clip draft has an invalid start/end range',
      );
    }

    if (
      clip.video.durationMs !==
        null &&
      clip.endMs >
        clip.video.durationMs
    ) {
      throw new BadRequestException(
        'Clip draft endMs exceeds video duration',
      );
    }

    const active =
      await this.renderJobsRepository.findActiveForClip(
        clipId,
      );

    if (active) {
      return this.toResponse(active);
    }

    const job =
      await this.renderJobsRepository.create({
        clipId,
        format: dto.format,
        resolution: dto.resolution,
        mode: dto.mode,
        includeSubtitles:
          dto.includeSubtitles ??
          false,
      });

    setImmediate(() => {
      void this.renderWorker.process(
        job.id,
      );
    });

    return this.toResponse(job);
  }

  async getJob(id: string) {
    const job =
      await this.renderJobsRepository.findById(
        id,
      );

    if (!job) {
      throw new NotFoundException(
        'Render job not found',
      );
    }

    return this.toResponse(job);
  }

  async getDownloadForClip(
    clipId: string,
  ) {
    const job =
      await this.renderJobsRepository.findLatestCompletedForClip(
        clipId,
      );

    if (
      !job ||
      !job.outputPath ||
      !job.outputFilename
    ) {
      throw new NotFoundException(
        'No completed render exists for this clip',
      );
    }

    try {
      await access(job.outputPath);
    } catch {
      throw new NotFoundException(
        'Rendered file is missing from storage',
      );
    }

    const info = await stat(
      job.outputPath,
    );

    return {
      path: job.outputPath,
      filename:
        job.outputFilename,
      size: info.size,
      contentType:
        job.format === 'WEBM'
          ? 'video/webm'
          : 'video/mp4',
    };
  }

  private toResponse(job: {
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
    errorMessage: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: job.id,
      clipId: job.clipId,
      status: job.status,
      progress: job.progress,
      stage: job.stage,
      format: job.format,
      resolution:
        job.resolution,
      mode: job.mode,
      includeSubtitles:
        job.includeSubtitles,
      outputFilename:
        job.outputFilename,
      downloadUrl:
        job.status ===
          'COMPLETED'
          ? `/api/v1/clips/${job.clipId}/download`
          : null,
      errorMessage:
        job.errorMessage,
      startedAt:
        job.startedAt,
      completedAt:
        job.completedAt,
      createdAt:
        job.createdAt,
      updatedAt:
        job.updatedAt,
    };
  }
}
