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
var IngestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("node:fs/promises");
const enums_1 = require("../../generated/prisma/enums");
const chats_repository_1 = require("../chats/chats.repository");
const normalizer_registry_1 = require("../normalizers/normalizer.registry");
const transcripts_repository_1 = require("../transcripts/transcripts.repository");
const videos_repository_1 = require("../videos/videos.repository");
const ingestion_repository_1 = require("./ingestion.repository");
const ingestion_validator_1 = require("./ingestion.validator");
const json_file_parser_1 = require("./parsers/json-file.parser");
const analysis_orchestrator_service_1 = require("../analysis/analysis-orchestrator.service");
const common_2 = require("@nestjs/common");
let IngestionService = IngestionService_1 = class IngestionService {
    validator;
    jsonFileParser;
    normalizerRegistry;
    videosRepository;
    transcriptsRepository;
    chatsRepository;
    ingestionRepository;
    analysisOrchestrator;
    logger = new common_2.Logger(IngestionService_1.name);
    constructor(validator, jsonFileParser, normalizerRegistry, videosRepository, transcriptsRepository, chatsRepository, ingestionRepository, analysisOrchestrator) {
        this.validator = validator;
        this.jsonFileParser = jsonFileParser;
        this.normalizerRegistry = normalizerRegistry;
        this.videosRepository = videosRepository;
        this.transcriptsRepository = transcriptsRepository;
        this.chatsRepository = chatsRepository;
        this.ingestionRepository = ingestionRepository;
        this.analysisOrchestrator = analysisOrchestrator;
    }
    async ingestJson(input) {
        const payload = await this.validator.validate(input);
        const res = await this.process(payload, {
            type: enums_1.IngestionType.API,
        });
        let analysis = null;
        if (res) {
            try {
                return await this.analysisOrchestrator.rebuildForVideo(res.video.id);
            }
            catch (error) {
                this.logger.error(`Analysis failed for video ${res.video.id}`, error instanceof Error ? error.stack : String(error));
            }
        }
    }
    async ingestFile(file) {
        try {
            const raw = await this.jsonFileParser.parse(file.path);
            const payload = await this.validator.validate(raw);
            return await this.process(payload, {
                type: enums_1.IngestionType.FILE,
                filename: file.originalname,
                mimeType: file.mimetype,
                sizeBytes: BigInt(file.size),
            });
        }
        finally {
            await (0, promises_1.unlink)(file.path).catch(() => undefined);
        }
    }
    async process(payload, source) {
        const run = await this.ingestionRepository.create({
            type: source.type,
            provider: payload.provider,
            collector: payload.collector,
            dataType: payload.type,
            filename: source.filename,
            mimeType: source.mimeType,
            sizeBytes: source.sizeBytes,
        });
        try {
            const normalizer = this.normalizerRegistry.resolve(payload);
            const normalized = await normalizer.normalize(payload);
            console.log('Normalized Data:', normalized.chatProvided);
            const video = await this.videosRepository.upsert(normalized.video);
            let transcriptCount = 0;
            if (normalized.transcriptProvided) {
                transcriptCount = await this.transcriptsRepository.replaceForVideo(video.id, normalized.transcripts);
            }
            let chatCount = 0;
            if (normalized.chatProvided) {
                console.log('[Ingestion] inserting chats:', normalized.chats.length, 'videoId:', video.id);
                chatCount = await this.chatsRepository.insertMany(video.id, normalized.chats);
            }
            console.log('[Ingestion] inserted chats:', chatCount);
            await this.ingestionRepository.complete(run.id, {
                videoId: video.id,
                transcriptCount,
                chatCount,
            });
            return {
                success: true,
                ingestionId: run.id,
                video: {
                    id: video.id,
                    provider: video.provider,
                    externalId: video.externalId,
                    title: video.title,
                },
                imported: {
                    transcripts: transcriptCount,
                    chats: chatCount,
                },
            };
        }
        catch (error) {
            await this.ingestionRepository.fail(run.id, error);
            throw error;
        }
    }
};
exports.IngestionService = IngestionService;
exports.IngestionService = IngestionService = IngestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ingestion_validator_1.IngestionValidator,
        json_file_parser_1.JsonFileParser,
        normalizer_registry_1.NormalizerRegistry,
        videos_repository_1.VideosRepository,
        transcripts_repository_1.TranscriptsRepository,
        chats_repository_1.ChatsRepository,
        ingestion_repository_1.IngestionRepository,
        analysis_orchestrator_service_1.AnalysisOrchestratorService])
], IngestionService);
//# sourceMappingURL=ingestion.service.js.map