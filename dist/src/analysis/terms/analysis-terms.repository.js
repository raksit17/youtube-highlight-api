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
exports.AnalysisTermsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let AnalysisTermsRepository = class AnalysisTermsRepository {
    prisma;
    batchSize = 1000;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMany(rows) {
        let inserted = 0;
        for (let index = 0; index < rows.length; index += this.batchSize) {
            const batch = rows.slice(index, index + this.batchSize);
            const result = await this.prisma.analysisTermCount.createMany({
                data: batch,
                skipDuplicates: true,
            });
            inserted += result.count;
        }
        return inserted;
    }
};
exports.AnalysisTermsRepository = AnalysisTermsRepository;
exports.AnalysisTermsRepository = AnalysisTermsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalysisTermsRepository);
//# sourceMappingURL=analysis-terms.repository.js.map