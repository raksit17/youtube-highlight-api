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
exports.IngestionRepository = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../database/prisma.service");
let IngestionRepository = class IngestionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.ingestionRun.create({
            data: {
                ...data,
                status: enums_1.IngestionStatus.PROCESSING,
                startedAt: new Date(),
            },
        });
    }
    complete(id, input) {
        return this.prisma.ingestionRun.update({
            where: {
                id,
            },
            data: {
                status: enums_1.IngestionStatus.COMPLETED,
                videoId: input.videoId,
                transcriptCount: input.transcriptCount,
                chatCount: input.chatCount,
                completedAt: new Date(),
            },
        });
    }
    fail(id, error) {
        const message = error instanceof Error ? error.message : String(error);
        return this.prisma.ingestionRun.update({
            where: {
                id,
            },
            data: {
                status: enums_1.IngestionStatus.FAILED,
                errorMessage: message,
                completedAt: new Date(),
            },
        });
    }
};
exports.IngestionRepository = IngestionRepository;
exports.IngestionRepository = IngestionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IngestionRepository);
//# sourceMappingURL=ingestion.repository.js.map