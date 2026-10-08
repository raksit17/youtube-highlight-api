import { Injectable, Logger } from '@nestjs/common';

import { HighlightCandidateService } from './highlights/highlight-candidate.service';

import { TermExtractorService } from './terms/term-extractor.service';

import { AnalysisWindowService } from './windows/analysis-window.service';

import { WindowSummaryService } from './summaries/window-summary.service';

@Injectable()
export class AnalysisOrchestratorService {
  private readonly logger = new Logger(AnalysisOrchestratorService.name);

  constructor(
    private readonly windowService: AnalysisWindowService,

    private readonly termService: TermExtractorService,

    private readonly summaryService: WindowSummaryService,

    private readonly highlightService: HighlightCandidateService,
  ) {}

  async rebuildForVideo(videoId: string) {
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
}
