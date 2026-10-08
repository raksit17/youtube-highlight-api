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
var AnalysisOrchestratorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisOrchestratorService = void 0;
const common_1 = require("@nestjs/common");
const highlight_candidate_service_1 = require("./highlights/highlight-candidate.service");
const term_extractor_service_1 = require("./terms/term-extractor.service");
const analysis_window_service_1 = require("./windows/analysis-window.service");
const window_summary_service_1 = require("./summaries/window-summary.service");
let AnalysisOrchestratorService = AnalysisOrchestratorService_1 = class AnalysisOrchestratorService {
    windowService;
    termService;
    summaryService;
    highlightService;
    logger = new common_1.Logger(AnalysisOrchestratorService_1.name);
    constructor(windowService, termService, summaryService, highlightService) {
        this.windowService = windowService;
        this.termService = termService;
        this.summaryService = summaryService;
        this.highlightService = highlightService;
    }
    async rebuildForVideo(videoId) {
        this.logger.log(`Starting analysis: ${videoId}`);
        const windows = await this.windowService.rebuild(videoId);
        this.logger.log(`Windows: ${windows.length}`);
        const terms = await this.termService.rebuild(videoId);
        this.logger.log(`Terms inserted: ${terms}`);
        const summaries = await this.summaryService.rebuild(videoId);
        this.logger.log(`Summaries: ${summaries}`);
        const highlights = await this.highlightService.rebuild(videoId);
        this.logger.log(`Highlights: ${highlights.length}`);
        return {
            windows: windows.length,
            terms,
            summaries,
            highlights,
        };
    }
};
exports.AnalysisOrchestratorService = AnalysisOrchestratorService;
exports.AnalysisOrchestratorService = AnalysisOrchestratorService = AnalysisOrchestratorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [analysis_window_service_1.AnalysisWindowService,
        term_extractor_service_1.TermExtractorService,
        window_summary_service_1.WindowSummaryService,
        highlight_candidate_service_1.HighlightCandidateService])
], AnalysisOrchestratorService);
//# sourceMappingURL=analysis-orchestrator.service.js.map