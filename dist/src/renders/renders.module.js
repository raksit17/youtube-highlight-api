"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RendersModule = void 0;
const common_1 = require("@nestjs/common");
const render_jobs_repository_1 = require("./render-jobs.repository");
const render_worker_service_1 = require("./render-worker.service");
const renders_controller_1 = require("./renders.controller");
const renders_service_1 = require("./renders.service");
let RendersModule = class RendersModule {
};
exports.RendersModule = RendersModule;
exports.RendersModule = RendersModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            renders_controller_1.RendersController,
        ],
        providers: [
            renders_service_1.RendersService,
            render_worker_service_1.RenderWorkerService,
            render_jobs_repository_1.RenderJobsRepository,
        ],
        exports: [
            renders_service_1.RendersService,
        ],
    })
], RendersModule);
//# sourceMappingURL=renders.module.js.map