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
exports.CollectorPayloadDto = exports.CollectorSubjectDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CollectorSubjectDto {
    type;
    externalId;
    url;
}
exports.CollectorSubjectDto = CollectorSubjectDto;
__decorate([
    (0, class_validator_1.IsIn)(['video']),
    __metadata("design:type", String)
], CollectorSubjectDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CollectorSubjectDto.prototype, "externalId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CollectorSubjectDto.prototype, "url", void 0);
class CollectorPayloadDto {
    success;
    provider;
    collector;
    type;
    subject;
    data;
}
exports.CollectorPayloadDto = CollectorPayloadDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CollectorPayloadDto.prototype, "success", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CollectorPayloadDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CollectorPayloadDto.prototype, "collector", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['video', 'transcript', 'chat']),
    __metadata("design:type", String)
], CollectorPayloadDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CollectorSubjectDto),
    __metadata("design:type", CollectorSubjectDto)
], CollectorPayloadDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CollectorPayloadDto.prototype, "data", void 0);
//# sourceMappingURL=collector-payload.dto.js.map