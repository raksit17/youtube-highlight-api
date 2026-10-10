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
exports.CreateRenderJobDto = exports.RenderMode = exports.RenderResolution = exports.RenderFormat = void 0;
const class_validator_1 = require("class-validator");
var RenderFormat;
(function (RenderFormat) {
    RenderFormat["MP4"] = "MP4";
    RenderFormat["WEBM"] = "WEBM";
})(RenderFormat || (exports.RenderFormat = RenderFormat = {}));
var RenderResolution;
(function (RenderResolution) {
    RenderResolution["ORIGINAL"] = "ORIGINAL";
    RenderResolution["P1080"] = "1080P";
    RenderResolution["P720"] = "720P";
})(RenderResolution || (exports.RenderResolution = RenderResolution = {}));
var RenderMode;
(function (RenderMode) {
    RenderMode["ACCURATE"] = "ACCURATE";
    RenderMode["FAST"] = "FAST";
})(RenderMode || (exports.RenderMode = RenderMode = {}));
class CreateRenderJobDto {
    format = RenderFormat.MP4;
    resolution = RenderResolution.P1080;
    mode = RenderMode.ACCURATE;
    includeSubtitles = false;
}
exports.CreateRenderJobDto = CreateRenderJobDto;
__decorate([
    (0, class_validator_1.IsEnum)(RenderFormat),
    __metadata("design:type", String)
], CreateRenderJobDto.prototype, "format", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(RenderResolution),
    __metadata("design:type", String)
], CreateRenderJobDto.prototype, "resolution", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(RenderMode),
    __metadata("design:type", String)
], CreateRenderJobDto.prototype, "mode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], CreateRenderJobDto.prototype, "includeSubtitles", void 0);
//# sourceMappingURL=create-render-job.dto.js.map