CREATE TABLE "youtube_metadata_drafts" (
    "id" TEXT NOT NULL,
    "clipId" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "tone" TEXT NOT NULL DEFAULT 'balanced',
    "promptVersion" TEXT NOT NULL DEFAULT 'youtube-metadata-v1',
    "sourceHash" TEXT NOT NULL,
    "sourceStartMs" INTEGER NOT NULL,
    "sourceEndMs" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "titles" JSONB NOT NULL,
    "selectedTitle" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "hashtags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "youtube_metadata_drafts_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "youtube_metadata_drafts_clipId_key" ON "youtube_metadata_drafts"("clipId");
ALTER TABLE "youtube_metadata_drafts" ADD CONSTRAINT "youtube_metadata_drafts_clipId_fkey"
  FOREIGN KEY ("clipId") REFERENCES "clip_drafts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
