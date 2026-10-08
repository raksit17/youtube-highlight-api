import { ClipsService } from './clips.service';
import { CreateClipDraftDto } from './dto/create-clip-draft.dto';
import { UpdateClipDraftDto } from './dto/update-clip-draft.dto';
export declare class ClipsController {
    private readonly clipsService;
    constructor(clipsService: ClipsService);
    create(videoId: string, dto: CreateClipDraftDto): Promise<{
        id: string;
        videoId: string;
        candidateId: string | null;
        startMs: number;
        peakMs: number | null;
        endMs: number;
        durationMs: number;
        title: string | null;
        note: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findForVideo(videoId: string): Promise<{
        videoId: string;
        total: number;
        items: {
            id: string;
            candidateId: string | null;
            startMs: number;
            peakMs: number | null;
            endMs: number;
            durationMs: number;
            title: string | null;
            note: string | null;
            status: import("../../generated/prisma/enums").ClipDraftStatus;
            candidate: {
                status: import("../../generated/prisma/enums").HighlightStatus;
                id: string;
                rank: number | null;
                summary: string | null;
                category: string | null;
                finalScore: number;
            } | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        videoId: string;
        candidateId: string | null;
        startMs: number;
        peakMs: number | null;
        endMs: number;
        durationMs: number;
        title: string | null;
        note: string | null;
        status: import("../../generated/prisma/enums").ClipDraftStatus;
        candidateSnapshot: import("@prisma/client/runtime/client").JsonValue;
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
        video: {
            url: string;
            title: string;
            id: string;
            provider: string;
            externalId: string;
            durationMs: number | null;
        };
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateClipDraftDto): Promise<{
        id: string;
        videoId: string;
        candidateId: string | null;
        startMs: number;
        peakMs: number | null;
        endMs: number;
        durationMs: number;
        title: string | null;
        note: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    export(id: string): Promise<{
        version: number;
        video: {
            id: string;
            provider: string;
            externalId: string;
            url: string;
            title: string;
            durationMs: number | null;
        };
        clip: {
            id: string;
            title: string | null;
            startMs: number;
            peakMs: number | null;
            endMs: number;
            durationMs: number;
            startSeconds: number;
            peakSeconds: number | null;
            endSeconds: number;
            status: import("../../generated/prisma/enums").ClipDraftStatus;
        };
        sourceCandidate: import("@prisma/client/runtime/client").JsonValue;
        exportedAt: string;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        id: string;
    }>;
}
