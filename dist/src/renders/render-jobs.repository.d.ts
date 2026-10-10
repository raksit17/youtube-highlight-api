import { ClipDraftStatus, RenderJobStatus } from '../../generated/prisma/enums';
import { PrismaService } from '../database/prisma.service';
export declare class RenderJobsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findClipForRender(clipId: string): import("../../generated/prisma/models").Prisma__ClipDraftClient<({
        video: {
            id: string;
            externalId: string;
            durationMs: number | null;
        };
    } & {
        videoId: string;
        candidateId: string | null;
        startMs: number;
        endMs: number;
        title: string | null;
        note: string | null;
        status: ClipDraftStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        peakMs: number | null;
        sourcePreset: import("../../generated/prisma/enums").HighlightLengthPreset | null;
        isCustomized: boolean;
        candidateSnapshot: import("@prisma/client/runtime/client").JsonValue | null;
        exportedAt: Date | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findActiveForClip(clipId: string): import("../../generated/prisma/models").Prisma__RenderJobClient<{
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(input: {
        clipId: string;
        format: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
    }): import("../../generated/prisma/models").Prisma__RenderJobClient<{
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findById(id: string): import("../../generated/prisma/models").Prisma__RenderJobClient<({
        clip: {
            videoId: string;
            startMs: number;
            endMs: number;
            status: ClipDraftStatus;
            id: string;
            peakMs: number | null;
        };
    } & {
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findForWorker(id: string): import("../../generated/prisma/models").Prisma__RenderJobClient<({
        clip: {
            video: {
                id: string;
                externalId: string;
                durationMs: number | null;
            };
        } & {
            videoId: string;
            candidateId: string | null;
            startMs: number;
            endMs: number;
            title: string | null;
            note: string | null;
            status: ClipDraftStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            peakMs: number | null;
            sourcePreset: import("../../generated/prisma/enums").HighlightLengthPreset | null;
            isCustomized: boolean;
            candidateSnapshot: import("@prisma/client/runtime/client").JsonValue | null;
            exportedAt: Date | null;
        };
    } & {
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findLatestCompletedForClip(clipId: string): import("../../generated/prisma/models").Prisma__RenderJobClient<{
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    markRunning(id: string): import("../../generated/prisma/models").Prisma__RenderJobClient<{
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateProgress(id: string, progress: number, stage?: string): import("../../generated/prisma/models").Prisma__RenderJobClient<{
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    markCompleted(id: string, clipId: string, outputPath: string, outputFilename: string): Promise<{
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    }>;
    markFailed(id: string, errorMessage: string): import("../../generated/prisma/models").Prisma__RenderJobClient<{
        status: RenderJobStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        format: string;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        clipId: string;
        progress: number;
        stage: string;
        resolution: string;
        mode: string;
        includeSubtitles: boolean;
        outputPath: string | null;
        outputFilename: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
