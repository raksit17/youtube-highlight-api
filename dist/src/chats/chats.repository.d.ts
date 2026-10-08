import { PrismaService } from '../database/prisma.service';
import { NormalizedChatMessage } from '../normalizers/normalized/normalized-chat.type';
export declare class ChatsRepository {
    private readonly prisma;
    private readonly batchSize;
    constructor(prisma: PrismaService);
    insertMany(videoId: string, messages: NormalizedChatMessage[]): Promise<number>;
}
