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
exports.RendersController = void 0;
const common_1 = require("@nestjs/common");
const node_fs_1 = require("node:fs");
const create_render_job_dto_1 = require("./dto/create-render-job.dto");
const renders_service_1 = require("./renders.service");
let RendersController = class RendersController {
    rendersService;
    constructor(rendersService) {
        this.rendersService = rendersService;
    }
    create(id, dto) {
        return this.rendersService.createRenderJob(id, dto);
    }
    getJob(id) {
        return this.rendersService.getJob(id);
    }
    async download(id, response) {
        const file = await this.rendersService.getDownloadForClip(id);
        response.setHeader('Content-Type', file.contentType);
        response.setHeader('Content-Length', String(file.size));
        response.setHeader('Content-Disposition', `attachment; filename="${file.filename}"`);
        return new common_1.StreamableFile((0, node_fs_1.createReadStream)(file.path));
    }
};
exports.RendersController = RendersController;
__decorate([
    (0, common_1.Post)('clips/:id/render'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_render_job_dto_1.CreateRenderJobDto]),
    __metadata("design:returntype", void 0)
], RendersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('render-jobs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RendersController.prototype, "getJob", null);
__decorate([
    (0, common_1.Get)('clips/:id/download'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RendersController.prototype, "download", null);
exports.RendersController = RendersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [renders_service_1.RendersService])
], RendersController);
//# sourceMappingURL=renders.controller.js.map