import { PrismaService } from '../../database/prisma.service';
export declare class HighlightClipVariantService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    rebuildForVideo(videoId: string): Promise<number>;
}
