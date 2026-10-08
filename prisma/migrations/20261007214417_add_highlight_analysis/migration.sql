-- CreateEnum
CREATE TYPE "AnalysisTermSource" AS ENUM ('CHAT', 'TRANSCRIPT');

-- CreateEnum
CREATE TYPE "AnalysisTermType" AS ENUM ('WORD', 'PHRASE', 'EMOTE', 'REACTION');

-- CreateEnum
CREATE TYPE "HighlightStatus" AS ENUM ('NEW', 'REVIEWING', 'APPROVED', 'REJECTED', 'CLIPPED');

-- CreateTable
CREATE TABLE "analysis_windows" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "windowIndex" INTEGER NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "windowSizeMs" INTEGER NOT NULL,
    "chatMessageCount" INTEGER NOT NULL DEFAULT 0,
    "uniqueAuthorCount" INTEGER NOT NULL DEFAULT 0,
    "chatWordCount" INTEGER NOT NULL DEFAULT 0,
    "transcriptWordCount" INTEGER NOT NULL DEFAULT 0,
    "emojiCount" INTEGER NOT NULL DEFAULT 0,
    "laughCount" INTEGER NOT NULL DEFAULT 0,
    "questionCount" INTEGER NOT NULL DEFAULT 0,
    "exclamationCount" INTEGER NOT NULL DEFAULT 0,
    "capsCount" INTEGER NOT NULL DEFAULT 0,
    "authorDiversity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "baselineMessageCount" DOUBLE PRECISION,
    "messageRatio" DOUBLE PRECISION,
    "zScore" DOUBLE PRECISION,
    "spikeScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reactionScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "diversityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "transcriptScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "termScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "features" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analysis_windows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analysis_term_counts" (
    "id" TEXT NOT NULL,
    "analysisWindowId" TEXT NOT NULL,
    "source" "AnalysisTermSource" NOT NULL,
    "type" "AnalysisTermType" NOT NULL DEFAULT 'WORD',
    "term" TEXT NOT NULL,
    "normalizedTerm" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analysis_term_counts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "window_summaries" (
    "id" TEXT NOT NULL,
    "analysisWindowId" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "topic" TEXT,
    "category" TEXT,
    "keywords" JSONB,
    "reactions" JSONB,
    "events" JSONB,
    "keyTranscript" JSONB,
    "keyChat" JSONB,
    "importanceScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "intensityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "noveltyScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "contextScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "summaryScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "extractorVersion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "window_summaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "highlight_candidates" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "rank" INTEGER,
    "startMs" INTEGER NOT NULL,
    "peakMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "summary" TEXT,
    "category" TEXT,
    "summaryScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "spikeScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reactionScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "diversityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "transcriptScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "termScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "finalScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "confidence" DOUBLE PRECISION,
    "reason" JSONB,
    "status" "HighlightStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "highlight_candidates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "highlight_candidate_windows" (
    "highlightCandidateId" TEXT NOT NULL,
    "analysisWindowId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "highlight_candidate_windows_pkey" PRIMARY KEY ("highlightCandidateId","analysisWindowId")
);

-- CreateIndex
CREATE INDEX "analysis_windows_videoId_startMs_idx" ON "analysis_windows"("videoId", "startMs");

-- CreateIndex
CREATE INDEX "analysis_windows_videoId_spikeScore_idx" ON "analysis_windows"("videoId", "spikeScore");

-- CreateIndex
CREATE INDEX "analysis_windows_videoId_windowIndex_idx" ON "analysis_windows"("videoId", "windowIndex");

-- CreateIndex
CREATE UNIQUE INDEX "analysis_windows_videoId_windowSizeMs_windowIndex_key" ON "analysis_windows"("videoId", "windowSizeMs", "windowIndex");

-- CreateIndex
CREATE INDEX "analysis_term_counts_analysisWindowId_idx" ON "analysis_term_counts"("analysisWindowId");

-- CreateIndex
CREATE INDEX "analysis_term_counts_normalizedTerm_idx" ON "analysis_term_counts"("normalizedTerm");

-- CreateIndex
CREATE INDEX "analysis_term_counts_analysisWindowId_count_idx" ON "analysis_term_counts"("analysisWindowId", "count");

-- CreateIndex
CREATE UNIQUE INDEX "analysis_term_counts_analysisWindowId_source_type_normalize_key" ON "analysis_term_counts"("analysisWindowId", "source", "type", "normalizedTerm");

-- CreateIndex
CREATE UNIQUE INDEX "window_summaries_analysisWindowId_key" ON "window_summaries"("analysisWindowId");

-- CreateIndex
CREATE INDEX "window_summaries_summaryScore_idx" ON "window_summaries"("summaryScore");

-- CreateIndex
CREATE INDEX "window_summaries_category_idx" ON "window_summaries"("category");

-- CreateIndex
CREATE INDEX "highlight_candidates_videoId_finalScore_idx" ON "highlight_candidates"("videoId", "finalScore");

-- CreateIndex
CREATE INDEX "highlight_candidates_videoId_status_idx" ON "highlight_candidates"("videoId", "status");

-- CreateIndex
CREATE INDEX "highlight_candidates_videoId_startMs_idx" ON "highlight_candidates"("videoId", "startMs");

-- CreateIndex
CREATE UNIQUE INDEX "highlight_candidates_videoId_rank_key" ON "highlight_candidates"("videoId", "rank");

-- CreateIndex
CREATE INDEX "highlight_candidate_windows_analysisWindowId_idx" ON "highlight_candidate_windows"("analysisWindowId");

-- AddForeignKey
ALTER TABLE "analysis_windows" ADD CONSTRAINT "analysis_windows_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analysis_term_counts" ADD CONSTRAINT "analysis_term_counts_analysisWindowId_fkey" FOREIGN KEY ("analysisWindowId") REFERENCES "analysis_windows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "window_summaries" ADD CONSTRAINT "window_summaries_analysisWindowId_fkey" FOREIGN KEY ("analysisWindowId") REFERENCES "analysis_windows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "highlight_candidates" ADD CONSTRAINT "highlight_candidates_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "highlight_candidate_windows" ADD CONSTRAINT "highlight_candidate_windows_highlightCandidateId_fkey" FOREIGN KEY ("highlightCandidateId") REFERENCES "highlight_candidates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "highlight_candidate_windows" ADD CONSTRAINT "highlight_candidate_windows_analysisWindowId_fkey" FOREIGN KEY ("analysisWindowId") REFERENCES "analysis_windows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
