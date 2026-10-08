"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFileParser = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("node:fs/promises");
let JsonFileParser = class JsonFileParser {
    async parse(filePath) {
        let raw;
        try {
            raw = await (0, promises_1.readFile)(filePath, 'utf8');
        }
        catch {
            throw new common_1.BadRequestException('Unable to read JSON file');
        }
        try {
            return JSON.parse(raw);
        }
        catch {
            throw new common_1.BadRequestException('Invalid JSON file');
        }
    }
};
exports.JsonFileParser = JsonFileParser;
exports.JsonFileParser = JsonFileParser = __decorate([
    (0, common_1.Injectable)()
], JsonFileParser);
//# sourceMappingURL=json-file.parser.js.map