"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const chats_module_1 = require("./chats/chats.module");
const clips_module_1 = require("./clips/clips.module");
const database_module_1 = require("./database/database.module");
const ingestion_module_1 = require("./ingestion/ingestion.module");
const normalizers_module_1 = require("./normalizers/normalizers.module");
const renders_module_1 = require("./renders/renders.module");
const transcripts_module_1 = require("./transcripts/transcripts.module");
const videos_module_1 = require("./videos/videos.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            ingestion_module_1.IngestionModule,
            normalizers_module_1.NormalizersModule,
            videos_module_1.VideosModule,
            transcripts_module_1.TranscriptsModule,
            chats_module_1.ChatsModule,
            clips_module_1.ClipsModule,
            renders_module_1.RendersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map