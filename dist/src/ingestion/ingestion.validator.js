"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionValidator = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const collector_payload_dto_1 = require("./dto/collector-payload.dto");
let IngestionValidator = class IngestionValidator {
    async validate(input) {
        if (typeof input !== 'object' || input === null) {
            throw new common_1.BadRequestException('Payload must be a JSON object');
        }
        const dto = (0, class_transformer_1.plainToInstance)(collector_payload_dto_1.CollectorPayloadDto, input);
        const errors = await (0, class_validator_1.validate)(dto, {
            whitelist: true,
            forbidNonWhitelisted: false,
        });
        if (errors.length > 0) {
            throw new common_1.BadRequestException({
                message: 'Invalid collector payload',
                errors: errors.map((error) => ({
                    property: error.property,
                    constraints: error.constraints ?? {},
                    children: error.children ?? [],
                })),
            });
        }
        if (!dto.success) {
            throw new common_1.BadRequestException('Collector result was not successful');
        }
        return dto;
    }
};
exports.IngestionValidator = IngestionValidator;
exports.IngestionValidator = IngestionValidator = __decorate([
    (0, common_1.Injectable)()
], IngestionValidator);
//# sourceMappingURL=ingestion.validator.js.map