import { Module } from '@nestjs/common';

import { AnalysisOrchestratorService } from './analysis-orchestrator.service';

import { HighlightCandidateService } from './highlights/highlight-candidate.service';

import { HighlightCandidatesRepository } from './highlights/highlight-candidates.repository';

import { HighlightClipVariantService } from './highlights/highlight-clip-variant.service';

import { HighlightQueryService } from './highlights/highlight-query.service';

import { HighlightsController } from './highlights/highlights.controller';

import { WindowSummaryService } from './summaries/window-summary.service';

import { WindowSummariesRepository } from './summaries/window-summaries.repository';

import { TermExtractorService } from './terms/term-extractor.service';

import { AnalysisTermsRepository } from './terms/analysis-terms.repository';

import { AnalysisWindowService } from './windows/analysis-window.service';

import { AnalysisWindowsRepository } from './windows/analysis-windows.repository';

@Module({
  controllers: [HighlightsController],

  providers: [
    AnalysisOrchestratorService,

    AnalysisWindowService,
    AnalysisWindowsRepository,

    TermExtractorService,
    AnalysisTermsRepository,

    WindowSummaryService,
    WindowSummariesRepository,

    HighlightClipVariantService,
    HighlightCandidateService,
    HighlightCandidatesRepository,

    HighlightQueryService,
  ],

  exports: [
    AnalysisOrchestratorService,
    HighlightClipVariantService,
    HighlightQueryService,
  ],
})
export class AnalysisModule {}
