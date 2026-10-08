import { PrismaService } from '../database/prisma.service';
import { NormalizedTranscriptSegment } from '../normalizers/normalized/normalized-transcript.type';
export declare class TranscriptsRepository {
    private readonly prisma;
    private readonly batchSize;
    constructor(prisma: PrismaService);
    replaceForVideo(videoId: string, segments: NormalizedTranscriptSegment[]): Promise<number>;
}
