"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisModule = void 0;
const common_1 = require("@nestjs/common");
const analysis_orchestrator_service_1 = require("./analysis-orchestrator.service");
const highlight_candidate_service_1 = require("./highlights/highlight-candidate.service");
const highlight_candidates_repository_1 = require("./highlights/highlight-candidates.repository");
const window_summary_service_1 = require("./summaries/window-summary.service");
const window_summaries_repository_1 = require("./summaries/window-summaries.repository");
const term_extractor_service_1 = require("./terms/term-extractor.service");
const analysis_terms_repository_1 = require("./terms/analysis-terms.repository");
const analysis_window_service_1 = require("./windows/analysis-window.service");
const analysis_windows_repository_1 = require("./windows/analysis-windows.repository");
let AnalysisModule = class AnalysisModule {
};
exports.AnalysisModule = AnalysisModule;
exports.AnalysisModule = AnalysisModule = __decorate([
    (0, common_1.Module)({
        providers: [
            analysis_orchestrator_service_1.AnalysisOrchestratorService,
            analysis_window_service_1.AnalysisWindowService,
            analysis_windows_repository_1.AnalysisWindowsRepository,
            term_extractor_service_1.TermExtractorService,
            analysis_terms_repository_1.AnalysisTermsRepository,
            window_summary_service_1.WindowSummaryService,
            window_summaries_repository_1.WindowSummariesRepository,
            highlight_candidate_service_1.HighlightCandidateService,
            highlight_candidates_repository_1.HighlightCandidatesRepository,
        ],
        exports: [analysis_orchestrator_service_1.AnalysisOrchestratorService],
    })
], AnalysisModule);
//# sourceMappingURL=analysis.module.js.map