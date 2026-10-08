-- CreateEnum
CREATE TYPE "HighlightLengthPreset" AS ENUM ('QUICK', 'CONTEXT', 'STANDARD', 'LONG');

-- CreateTable
CREATE TABLE "highlight_clip_variants" (
    "id" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "preset" "HighlightLengthPreset" NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "highlight_clip_variants_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "clip_drafts"
ADD COLUMN "sourcePreset" "HighlightLengthPreset",
ADD COLUMN "isCustomized" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "highlight_clip_variants_candidateId_preset_key"
ON "highlight_clip_variants"("candidateId", "preset");

-- CreateIndex
CREATE INDEX "highlight_clip_variants_candidateId_idx"
ON "highlight_clip_variants"("candidateId");

-- AddForeignKey
ALTER TABLE "highlight_clip_variants"
ADD CONSTRAINT "highlight_clip_variants_candidateId_fkey"
FOREIGN KEY ("candidateId") REFERENCES "highlight_candidates"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
