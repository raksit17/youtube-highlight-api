-- CreateEnum
CREATE TYPE "RenderJobStatus" AS ENUM ('QUEUED', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "render_jobs" (
    "id" TEXT NOT NULL,
    "clipId" TEXT NOT NULL,
    "status" "RenderJobStatus" NOT NULL DEFAULT 'QUEUED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "stage" TEXT NOT NULL DEFAULT 'QUEUED',
    "format" TEXT NOT NULL,
    "resolution" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "includeSubtitles" BOOLEAN NOT NULL DEFAULT false,
    "outputPath" TEXT,
    "outputFilename" TEXT,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "render_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "render_jobs_clipId_createdAt_idx" ON "render_jobs"("clipId", "createdAt");

-- CreateIndex
CREATE INDEX "render_jobs_status_createdAt_idx" ON "render_jobs"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "render_jobs"
ADD CONSTRAINT "render_jobs_clipId_fkey"
FOREIGN KEY ("clipId") REFERENCES "clip_drafts"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
