import { IngestionStatus, IngestionType } from '../../generated/prisma/enums';
import { PrismaService } from '../database/prisma.service';
export declare class IngestionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: {
        type: IngestionType;
        provider: string;
        collector: string;
        dataType: string;
        filename?: string;
        mimeType?: string;
        sizeBytes?: bigint;
    }): import("../../generated/prisma/models").Prisma__IngestionRunClient<{
        status: IngestionStatus;
        id: string;
        provider: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        videoId: string | null;
        type: IngestionType;
        collector: string | null;
        dataType: string | null;
        filename: string | null;
        mimeType: string | null;
        sizeBytes: bigint | null;
        checksum: string | null;
        rawFilePath: string | null;
        transcriptCount: number;
        chatCount: number;
        errorCode: string | null;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    complete(id: string, input: {
        videoId: string;
        transcriptCount: number;
        chatCount: number;
    }): import("../../generated/prisma/models").Prisma__IngestionRunClient<{
        status: IngestionStatus;
        id: string;
        provider: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        videoId: string | null;
        type: IngestionType;
        collector: string | null;
        dataType: string | null;
        filename: string | null;
        mimeType: string | null;
        sizeBytes: bigint | null;
        checksum: string | null;
        rawFilePath: string | null;
        transcriptCount: number;
        chatCount: number;
        errorCode: string | null;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    fail(id: string, error: unknown): import("../../generated/prisma/models").Prisma__IngestionRunClient<{
        status: IngestionStatus;
        id: string;
        provider: string | null;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
        videoId: string | null;
        type: IngestionType;
        collector: string | null;
        dataType: string | null;
        filename: string | null;
        mimeType: string | null;
        sizeBytes: bigint | null;
        checksum: string | null;
        rawFilePath: string | null;
        transcriptCount: number;
        chatCount: number;
        errorCode: string | null;
        errorMessage: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
