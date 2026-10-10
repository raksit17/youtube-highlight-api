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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const node_crypto_1 = require("node:crypto");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const multer_1 = require("multer");
const ingestion_service_1 = require("./ingestion.service");
let IngestionController = class IngestionController {
    ingestionService;
    constructor(ingestionService) {
        this.ingestionService = ingestionService;
    }
    async ingestJson(body) {
        return await this.ingestionService.ingestJson(body);
    }
    ingestFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('JSON file is required');
        }
        return this.ingestionService.ingestFile(file);
    }
};
exports.IngestionController = IngestionController;
__decorate([
    (0, common_1.Post)('json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IngestionController.prototype, "ingestJson", null);
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (_request, _file, callback) => {
                const directory = './tmp/imports';
                (0, node_fs_1.mkdirSync)(directory, {
                    recursive: true,
                });
                callback(null, directory);
            },
            filename: (_request, file, callback) => {
                callback(null, `${(0, node_crypto_1.randomUUID)()}${(0, node_path_1.extname)(file.originalname)}`);
            },
        }),
        limits: {
            fileSize: 500 * 1024 * 1024,
        },
        fileFilter: (_request, file, callback) => {
            const isJson = file.mimetype === 'application/json' ||
                (0, node_path_1.extname)(file.originalname).toLowerCase() === '.json';
            if (!isJson) {
                return callback(new common_1.BadRequestException('Only JSON files are allowed'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IngestionController.prototype, "ingestFile", null);
exports.IngestionController = IngestionController = __decorate([
    (0, common_1.Controller)('ingestion'),
    __metadata("design:paramtypes", [ingestion_service_1.IngestionService])
], IngestionController);
//# sourceMappingURL=ingestion.controller.js.map