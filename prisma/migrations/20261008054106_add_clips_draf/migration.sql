-- CreateEnum
CREATE TYPE "ClipDraftStatus" AS ENUM ('DRAFT', 'READY', 'EXPORTED');

-- CreateTable
CREATE TABLE "clip_drafts" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "candidateId" TEXT,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "peakMs" INTEGER,
    "title" TEXT,
    "note" TEXT,
    "status" "ClipDraftStatus" NOT NULL DEFAULT 'DRAFT',
    "candidateSnapshot" JSONB,
    "exportedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clip_drafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "clip_drafts_videoId_createdAt_idx" ON "clip_drafts"("videoId", "createdAt");

-- CreateIndex
CREATE INDEX "clip_drafts_candidateId_idx" ON "clip_drafts"("candidateId");

-- CreateIndex
CREATE INDEX "clip_drafts_videoId_status_idx" ON "clip_drafts"("videoId", "status");

-- AddForeignKey
ALTER TABLE "clip_drafts" ADD CONSTRAINT "clip_drafts_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clip_drafts" ADD CONSTRAINT "clip_drafts_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "highlight_candidates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
