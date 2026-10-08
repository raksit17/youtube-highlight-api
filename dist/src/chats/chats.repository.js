"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ChatsRepository = class ChatsRepository {
    prisma;
    batchSize = 1000;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async insertMany(videoId, messages) {
        console.log('[ChatsRepository] received:', messages.length, 'videoId:', videoId);
        if (messages.length === 0) {
            return 0;
        }
        let inserted = 0;
        for (let index = 0; index < messages.length; index += this.batchSize) {
            const batch = messages.slice(index, index + this.batchSize);
            console.log(`[ChatsRepository] batch ${index}-${index + batch.length}`);
            const result = await this.prisma.chatMessage.createMany({
                data: batch.map((message) => ({
                    videoId,
                    externalId: message.externalId,
                    dedupeKey: message.dedupeKey,
                    sequence: message.sequence,
                    timestampMs: message.timestampMs,
                    timestampUsec: message.timestampUsec,
                    authorId: message.authorId,
                    authorName: message.authorName,
                    message: message.message,
                    messageType: message.messageType,
                    amountRaw: message.amountRaw,
                    isMember: message.isMember,
                    isModerator: message.isModerator,
                    isOwner: message.isOwner,
                    metadata: message.metadata
                        ? message.metadata
                        : undefined,
                })),
                skipDuplicates: true,
            });
            console.log('[ChatsRepository] batch inserted:', result.count);
            inserted += result.count;
        }
        const databaseCount = await this.prisma.chatMessage.count({
            where: {
                videoId,
            },
        });
        console.log('[ChatsRepository] total inserted:', inserted);
        console.log('[ChatsRepository] database count:', databaseCount);
        return inserted;
    }
};
exports.ChatsRepository = ChatsRepository;
exports.ChatsRepository = ChatsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatsRepository);
//# sourceMappingURL=chats.repository.js.map