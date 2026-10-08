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
exports.HighlightsController = void 0;
const common_1 = require("@nestjs/common");
const highlight_query_service_1 = require("./highlight-query.service");
let HighlightsController = class HighlightsController {
    highlightQueryService;
    constructor(highlightQueryService) {
        this.highlightQueryService = highlightQueryService;
    }
    listCandidates(videoId, sort, limit) {
        const parsedLimit = limit === undefined ? undefined : Number(limit);
        return this.highlightQueryService.listCandidates(videoId, {
            sort,
            limit: parsedLimit !== undefined && Number.isFinite(parsedLimit)
                ? parsedLimit
                : undefined,
        });
    }
    getHeatmap(videoId, bucketMs) {
        const parsedBucketMs = bucketMs === undefined ? undefined : Number(bucketMs);
        return this.highlightQueryService.getHeatmap(videoId, parsedBucketMs !== undefined && Number.isFinite(parsedBucketMs)
            ? parsedBucketMs
            : undefined);
    }
    getContext(id, beforeMs, afterMs, chatLimit) {
        return this.highlightQueryService.getContext(id, {
            beforeMs: this.parseNumber(beforeMs),
            afterMs: this.parseNumber(afterMs),
            chatLimit: this.parseNumber(chatLimit),
        });
    }
    reviewCandidate(id, body) {
        return this.highlightQueryService.reviewCandidate(id, body);
    }
    parseNumber(value) {
        if (value === undefined) {
            return undefined;
        }
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : undefined;
    }
};
exports.HighlightsController = HighlightsController;
__decorate([
    (0, common_1.Get)('videos/:videoId/candidates'),
    __param(0, (0, common_1.Param)('videoId')),
    __param(1, (0, common_1.Query)('sort')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], HighlightsController.prototype, "listCandidates", null);
__decorate([
    (0, common_1.Get)('videos/:videoId/heatmap'),
    __param(0, (0, common_1.Param)('videoId')),
    __param(1, (0, common_1.Query)('bucketMs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HighlightsController.prototype, "getHeatmap", null);
__decorate([
    (0, common_1.Get)('candidates/:id/context'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('beforeMs')),
    __param(2, (0, common_1.Query)('afterMs')),
    __param(3, (0, common_1.Query)('chatLimit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], HighlightsController.prototype, "getContext", null);
__decorate([
    (0, common_1.Patch)('candidates/:id/review'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], HighlightsController.prototype, "reviewCandidate", null);
exports.HighlightsController = HighlightsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [highlight_query_service_1.HighlightQueryService])
], HighlightsController);
//# sourceMappingURL=highlights.controller.js.map