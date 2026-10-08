import { PrismaService } from '../../database/prisma.service';
import { WindowSummariesRepository } from './window-summaries.repository';
export declare class WindowSummaryService {
    private readonly prisma;
    private readonly repository;
    constructor(prisma: PrismaService, repository: WindowSummariesRepository);
    rebuild(videoId: string): Promise<number>;
    private detectCategory;
    private buildSummary;
    private clamp;
}
