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
exports.ClipsController = void 0;
const common_1 = require("@nestjs/common");
const clips_service_1 = require("./clips.service");
const create_clip_draft_dto_1 = require("./dto/create-clip-draft.dto");
const update_clip_draft_dto_1 = require("./dto/update-clip-draft.dto");
let ClipsController = class ClipsController {
    clipsService;
    constructor(clipsService) {
        this.clipsService = clipsService;
    }
    create(videoId, dto) {
        return this.clipsService.create(videoId, dto);
    }
    findForVideo(videoId) {
        return this.clipsService.findForVideo(videoId);
    }
    findOne(id) {
        return this.clipsService.findOne(id);
    }
    update(id, dto) {
        return this.clipsService.update(id, dto);
    }
    export(id) {
        return this.clipsService.export(id);
    }
    remove(id) {
        return this.clipsService.remove(id);
    }
};
exports.ClipsController = ClipsController;
__decorate([
    (0, common_1.Post)('videos/:videoId/clips'),
    __param(0, (0, common_1.Param)('videoId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_clip_draft_dto_1.CreateClipDraftDto]),
    __metadata("design:returntype", void 0)
], ClipsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('videos/:videoId/clips'),
    __param(0, (0, common_1.Param)('videoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClipsController.prototype, "findForVideo", null);
__decorate([
    (0, common_1.Get)('clips/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClipsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('clips/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_clip_draft_dto_1.UpdateClipDraftDto]),
    __metadata("design:returntype", void 0)
], ClipsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('clips/:id/export'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClipsController.prototype, "export", null);
__decorate([
    (0, common_1.Delete)('clips/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClipsController.prototype, "remove", null);
exports.ClipsController = ClipsController = __decorate([
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [clips_service_1.ClipsService])
], ClipsController);
//# sourceMappingURL=clips.controller.js.map