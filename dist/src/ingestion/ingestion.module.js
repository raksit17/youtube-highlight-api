"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionModule = void 0;
const common_1 = require("@nestjs/common");
const chats_module_1 = require("../chats/chats.module");
const normalizers_module_1 = require("../normalizers/normalizers.module");
const transcripts_module_1 = require("../transcripts/transcripts.module");
const videos_module_1 = require("../videos/videos.module");
const ingestion_controller_1 = require("./ingestion.controller");
const ingestion_repository_1 = require("./ingestion.repository");
const ingestion_service_1 = require("./ingestion.service");
const ingestion_validator_1 = require("./ingestion.validator");
const json_file_parser_1 = require("./parsers/json-file.parser");
const analysis_module_1 = require("../analysis/analysis.module");
let IngestionModule = class IngestionModule {
};
exports.IngestionModule = IngestionModule;
exports.IngestionModule = IngestionModule = __decorate([
    (0, common_1.Module)({
        imports: [normalizers_module_1.NormalizersModule, videos_module_1.VideosModule, transcripts_module_1.TranscriptsModule, chats_module_1.ChatsModule, analysis_module_1.AnalysisModule],
        controllers: [ingestion_controller_1.IngestionController],
        providers: [
            ingestion_service_1.IngestionService,
            ingestion_repository_1.IngestionRepository,
            ingestion_validator_1.IngestionValidator,
            json_file_parser_1.JsonFileParser,
        ],
    })
], IngestionModule);
//# sourceMappingURL=ingestion.module.js.map