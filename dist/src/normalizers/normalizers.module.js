"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizersModule = void 0;
const common_1 = require("@nestjs/common");
const normalizer_registry_1 = require("./normalizer.registry");
const youtube_ytdlp_normalizer_1 = require("./youtube/youtube-ytdlp.normalizer");
let NormalizersModule = class NormalizersModule {
};
exports.NormalizersModule = NormalizersModule;
exports.NormalizersModule = NormalizersModule = __decorate([
    (0, common_1.Module)({
        providers: [youtube_ytdlp_normalizer_1.YoutubeYtdlpNormalizer, normalizer_registry_1.NormalizerRegistry],
        exports: [normalizer_registry_1.NormalizerRegistry],
    })
], NormalizersModule);
//# sourceMappingURL=normalizers.module.js.map