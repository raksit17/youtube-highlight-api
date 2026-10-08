import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateClipDraftDto } from './dto/create-clip-draft.dto';

import { UpdateClipDraftDto } from './dto/update-clip-draft.dto';

import { ClipsRepository } from './clips.repository';

@Injectable()
export class ClipsService {
  constructor(private readonly clipsRepository: ClipsRepository) {}

  async create(videoId: string, dto: CreateClipDraftDto) {
    const video = await this.clipsRepository.findVideoById(videoId);

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    let candidate: Awaited<
      ReturnType<ClipsRepository['findCandidateForVideo']>
    > | null = null;

    if (dto.candidateId) {
      candidate = await this.clipsRepository.findCandidateForVideo(
        videoId,
        dto.candidateId,
      );

      if (!candidate) {
        throw new NotFoundException(
          'Highlight candidate not found for this video',
        );
      }
    }

    /*
     * ถ้ามี candidate:
     * ใช้ start/end จาก Candidate เป็น default
     *
     * ถ้า Frontend ส่ง startMs/endMs มา
     * ให้ override ค่า Candidate ได้
     */
    const startMs = dto.startMs ?? candidate?.startMs;

    const endMs = dto.endMs ?? candidate?.endMs;

    if (startMs === undefined || endMs === undefined) {
      throw new BadRequestException(
        'startMs and endMs are required when candidateId is not provided',
      );
    }

    const peakMs = candidate?.peakMs;

    this.validateRange({
      startMs,

      endMs,

      peakMs,

      durationMs: video.durationMs,
    });

    const candidateSnapshot = candidate
      ? {
          id: candidate.id,

          rank: candidate.rank,

          startMs: candidate.startMs,

          peakMs: candidate.peakMs,

          endMs: candidate.endMs,

          finalScore: candidate.finalScore,

          summaryScore: candidate.summaryScore,

          category: candidate.category,

          summary: candidate.summary,

          status: candidate.status,
        }
      : undefined;

    const clip = await this.clipsRepository.create({
      videoId,

      candidateId: candidate?.id,

      startMs,

      endMs,

      peakMs,

      title: dto.title,

      note: dto.note,

      candidateSnapshot,
    });

    return this.toResponse(clip);
  }

  async findForVideo(videoId: string) {
    const video = await this.clipsRepository.findVideoById(videoId);

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const clips = await this.clipsRepository.findByVideoId(videoId);

    return {
      videoId,

      total: clips.length,

      items: clips.map((clip) => ({
        id: clip.id,

        candidateId: clip.candidateId,

        startMs: clip.startMs,

        peakMs: clip.peakMs,

        endMs: clip.endMs,

        durationMs: clip.endMs - clip.startMs,

        title: clip.title,

        note: clip.note,

        status: clip.status,

        candidate: clip.candidate,

        createdAt: clip.createdAt,

        updatedAt: clip.updatedAt,
      })),
    };
  }

  async findOne(id: string) {
    const clip = await this.clipsRepository.findById(id);

    if (!clip) {
      throw new NotFoundException('Clip draft not found');
    }

    return {
      id: clip.id,

      videoId: clip.videoId,

      candidateId: clip.candidateId,

      startMs: clip.startMs,

      peakMs: clip.peakMs,

      endMs: clip.endMs,

      durationMs: clip.endMs - clip.startMs,

      title: clip.title,

      note: clip.note,

      status: clip.status,

      candidateSnapshot: clip.candidateSnapshot,

      candidate: clip.candidate,

      video: clip.video,

      createdAt: clip.createdAt,

      updatedAt: clip.updatedAt,
    };
  }

  async update(id: string, dto: UpdateClipDraftDto) {
    const clip = await this.clipsRepository.findById(id);

    if (!clip) {
      throw new NotFoundException('Clip draft not found');
    }

    const startMs = dto.startMs ?? clip.startMs;

    const endMs = dto.endMs ?? clip.endMs;

    /*
     * ถ้า Draft ถูกสร้างจาก Candidate
     * peakMs จะยังถูกใช้สำหรับ validation
     */
    this.validateRange({
      startMs,

      endMs,

      peakMs: clip.peakMs,

      durationMs: clip.video.durationMs,
    });

    const updated = await this.clipsRepository.update(id, {
      startMs,

      endMs,

      title: dto.title,

      note: dto.note,

      status: dto.status,
    });

    return this.toResponse(updated);
  }

  async remove(id: string) {
    const clip = await this.clipsRepository.findById(id);

    if (!clip) {
      throw new NotFoundException('Clip draft not found');
    }

    await this.clipsRepository.delete(id);

    return {
      success: true,

      id,
    };
  }

  async export(id: string) {
    const clip = await this.clipsRepository.findById(id);

    if (!clip) {
      throw new NotFoundException('Clip draft not found');
    }

    return {
      version: 1,

      video: {
        id: clip.video.id,

        provider: clip.video.provider,

        externalId: clip.video.externalId,

        url: clip.video.url,

        title: clip.video.title,

        durationMs: clip.video.durationMs,
      },

      clip: {
        id: clip.id,

        title: clip.title,

        startMs: clip.startMs,

        peakMs: clip.peakMs,

        endMs: clip.endMs,

        durationMs: clip.endMs - clip.startMs,

        startSeconds: clip.startMs / 1000,

        peakSeconds: clip.peakMs !== null ? clip.peakMs / 1000 : null,

        endSeconds: clip.endMs / 1000,

        status: clip.status,
      },

      sourceCandidate: clip.candidate
        ? {
            id: clip.candidate.id,

            rank: clip.candidate.rank,

            finalScore: clip.candidate.finalScore,

            category: clip.candidate.category,

            summary: clip.candidate.summary,
          }
        : clip.candidateSnapshot,

      exportedAt: new Date().toISOString(),
    };
  }

  private validateRange(input: {
    startMs: number;

    endMs: number;

    peakMs?: number | null;

    durationMs?: number | null;
  }) {
    const { startMs, endMs, peakMs, durationMs } = input;

    if (startMs < 0) {
      throw new BadRequestException(
        'startMs must be greater than or equal to 0',
      );
    }

    if (startMs >= endMs) {
      throw new BadRequestException('startMs must be less than endMs');
    }

    if (durationMs !== undefined && durationMs !== null && endMs > durationMs) {
      throw new BadRequestException(
        `endMs exceeds video duration (${durationMs})`,
      );
    }

    /*
     * ถ้าผู้ใช้ trim clip จน Peak หลุดออกไป
     * ถือว่าไม่ valid
     */
    if (
      peakMs !== undefined &&
      peakMs !== null &&
      (peakMs < startMs || peakMs > endMs)
    ) {
      throw new BadRequestException(
        'Highlight peak must remain inside clip range',
      );
    }
  }

  private toResponse(clip: {
    id: string;
    videoId: string;
    candidateId: string | null;
    startMs: number;
    peakMs: number | null;
    endMs: number;
    title: string | null;
    note: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: clip.id,

      videoId: clip.videoId,

      candidateId: clip.candidateId,

      startMs: clip.startMs,

      peakMs: clip.peakMs,

      endMs: clip.endMs,

      durationMs: clip.endMs - clip.startMs,

      title: clip.title,

      note: clip.note,

      status: clip.status,

      createdAt: clip.createdAt,

      updatedAt: clip.updatedAt,
    };
  }
}
