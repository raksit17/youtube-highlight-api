import { ClipDraftStatus } from '../../generated/prisma/enums';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
export declare class ClipsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findVideoById(videoId: string): Prisma.Prisma__VideoClient<{
        url: string;
        title: string;
        id: string;
        provider: string;
        externalId: string;
        durationMs: number | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findCandidateForVideo(videoId: string, candidateId: string): Prisma.Prisma__HighlightCandidateClient<{
        startMs: number;
        endMs: number;
        status: import("../../generated/prisma/enums").HighlightStatus;
        id: string;
        videoId: string;
        rank: number | null;
        peakMs: number;
        summary: string | null;
        category: string | null;
        summaryScore: number;
        finalScore: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    create(input: {
        videoId: string;
        candidateId?: string;
        startMs: number;
        endMs: number;
        peakMs?: number;
        title?: string;
        note?: string;
        candidateSnapshot?: Prisma.InputJsonValue;
    }): Prisma.Prisma__ClipDraftClient<{
        candidate: {
            startMs: number;
            endMs: number;
            status: import("../../generated/prisma/enums").HighlightStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            videoId: string;
            rank: number | null;
            peakMs: number;
            summary: string | null;
            category: string | null;
            summaryScore: number;
            spikeScore: number;
            reactionScore: number;
            diversityScore: number;
            transcriptScore: number;
            termScore: number;
            finalScore: number;
            confidence: number | null;
            reason: import("@prisma/client/runtime/client").JsonValue | null;
        } | null;
    } & {
        candidateId: string | null;
        startMs: number;
        endMs: number;
        title: string | null;
        note: string | null;
        status: ClipDraftStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        videoId: string;
        peakMs: number | null;
        candidateSnapshot: import("@prisma/client/runtime/client").JsonValue | null;
        exportedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByVideoId(videoId: string): Prisma.PrismaPromise<({
        candidate: {
            status: import("../../generated/prisma/enums").HighlightStatus;
            id: string;
            rank: number | null;
            summary: string | null;
            category: string | null;
            finalScore: number;
        } | null;
    } & {
        candidateId: string | null;
        startMs: number;
        endMs: number;
        title: string | null;
        note: string | null;
        status: ClipDraftStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        videoId: string;
        peakMs: number | null;
        candidateSnapshot: import("@prisma/client/runtime/client").JsonValue | null;
        exportedAt: Date | null;
    })[]>;
    findById(id: string): Prisma.Prisma__ClipDraftClient<({
        video: {
            url: string;
            title: string;
            id: string;
            provider: string;
            externalId: string;
            durationMs: number | null;
        };
        candidate: {
            startMs: number;
            endMs: number;
            status: import("../../generated/prisma/enums").HighlightStatus;
            id: string;
            rank: number | null;
            peakMs: number;
            summary: string | null;
            category: string | null;
            finalScore: number;
        } | null;
    } & {
        candidateId: string | null;
        startMs: number;
        endMs: number;
        title: string | null;
        note: string | null;
        status: ClipDraftStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        videoId: string;
        peakMs: number | null;
        candidateSnapshot: import("@prisma/client/runtime/client").JsonValue | null;
        exportedAt: Date | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    update(id: string, input: {
        startMs?: number;
        endMs?: number;
        title?: string;
        note?: string;
        status?: ClipDraftStatus;
    }): Prisma.Prisma__ClipDraftClient<{
        candidate: {
            startMs: number;
            endMs: number;
            status: import("../../generated/prisma/enums").HighlightStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            videoId: string;
            rank: number | null;
            peakMs: number;
            summary: string | null;
            category: string | null;
            summaryScore: number;
            spikeScore: number;
            reactionScore: number;
            diversityScore: number;
            transcriptScore: number;
            termScore: number;
            finalScore: number;
            confidence: number | null;
            reason: import("@prisma/client/runtime/client").JsonValue | null;
        } | null;
    } & {
        candidateId: string | null;
        startMs: number;
        endMs: number;
        title: string | null;
        note: string | null;
        status: ClipDraftStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        videoId: string;
        peakMs: number | null;
        candidateSnapshot: import("@prisma/client/runtime/client").JsonValue | null;
        exportedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    delete(id: string): Prisma.Prisma__ClipDraftClient<{
        candidateId: string | null;
        startMs: number;
        endMs: number;
        title: string | null;
        note: string | null;
        status: ClipDraftStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        videoId: string;
        peakMs: number | null;
        candidateSnapshot: import("@prisma/client/runtime/client").JsonValue | null;
        exportedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
