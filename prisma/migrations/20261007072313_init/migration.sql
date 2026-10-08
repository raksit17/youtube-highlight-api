-- CreateEnum
CREATE TYPE "IngestionType" AS ENUM ('API', 'FILE');

-- CreateEnum
CREATE TYPE "IngestionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'PARTIAL', 'FAILED');

-- CreateTable
CREATE TABLE "ingestion_runs" (
    "id" TEXT NOT NULL,
    "type" "IngestionType" NOT NULL,
    "status" "IngestionStatus" NOT NULL DEFAULT 'PENDING',
    "provider" TEXT,
    "collector" TEXT,
    "dataType" TEXT,
    "filename" TEXT,
    "mimeType" TEXT,
    "sizeBytes" BIGINT,
    "checksum" TEXT,
    "rawFilePath" TEXT,
    "videoId" TEXT,
    "transcriptCount" INTEGER NOT NULL DEFAULT 0,
    "chatCount" INTEGER NOT NULL DEFAULT 0,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingestion_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "channelExternalId" TEXT,
    "channelName" TEXT,
    "channelUrl" TEXT,
    "channelFollowers" BIGINT,
    "uploadDate" DATE,
    "publishedAt" TIMESTAMP(3),
    "releaseAt" TIMESTAMP(3),
    "viewCount" BIGINT,
    "likeCount" BIGINT,
    "commentCount" BIGINT,
    "durationMs" INTEGER,
    "thumbnailUrl" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "fps" DOUBLE PRECISION,
    "liveStatus" TEXT,
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "wasLive" BOOLEAN NOT NULL DEFAULT false,
    "concurrentViewers" INTEGER,
    "language" TEXT,
    "availability" TEXT,
    "ageLimit" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "categories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transcript_segments" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "language" TEXT,
    "source" TEXT,
    "format" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transcript_segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "externalId" TEXT,
    "dedupeKey" TEXT NOT NULL,
    "sequence" INTEGER,
    "timestampMs" INTEGER NOT NULL,
    "timestampUsec" BIGINT,
    "authorId" TEXT,
    "authorName" TEXT,
    "message" TEXT NOT NULL,
    "messageType" TEXT,
    "amountRaw" TEXT,
    "isMember" BOOLEAN NOT NULL DEFAULT false,
    "isModerator" BOOLEAN NOT NULL DEFAULT false,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ingestion_runs_status_idx" ON "ingestion_runs"("status");

-- CreateIndex
CREATE INDEX "ingestion_runs_type_idx" ON "ingestion_runs"("type");

-- CreateIndex
CREATE INDEX "ingestion_runs_provider_idx" ON "ingestion_runs"("provider");

-- CreateIndex
CREATE INDEX "ingestion_runs_videoId_idx" ON "ingestion_runs"("videoId");

-- CreateIndex
CREATE INDEX "ingestion_runs_createdAt_idx" ON "ingestion_runs"("createdAt");

-- CreateIndex
CREATE INDEX "videos_provider_idx" ON "videos"("provider");

-- CreateIndex
CREATE INDEX "videos_channelExternalId_idx" ON "videos"("channelExternalId");

-- CreateIndex
CREATE INDEX "videos_uploadDate_idx" ON "videos"("uploadDate");

-- CreateIndex
CREATE INDEX "videos_publishedAt_idx" ON "videos"("publishedAt");

-- CreateIndex
CREATE INDEX "videos_createdAt_idx" ON "videos"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "videos_provider_externalId_key" ON "videos"("provider", "externalId");

-- CreateIndex
CREATE INDEX "transcript_segments_videoId_startMs_idx" ON "transcript_segments"("videoId", "startMs");

-- CreateIndex
CREATE INDEX "transcript_segments_videoId_endMs_idx" ON "transcript_segments"("videoId", "endMs");

-- CreateIndex
CREATE INDEX "transcript_segments_videoId_startMs_endMs_idx" ON "transcript_segments"("videoId", "startMs", "endMs");

-- CreateIndex
CREATE UNIQUE INDEX "transcript_segments_videoId_sequence_source_key" ON "transcript_segments"("videoId", "sequence", "source");

-- CreateIndex
CREATE INDEX "chat_messages_videoId_timestampMs_idx" ON "chat_messages"("videoId", "timestampMs");

-- CreateIndex
CREATE INDEX "chat_messages_videoId_timestampUsec_idx" ON "chat_messages"("videoId", "timestampUsec");

-- CreateIndex
CREATE INDEX "chat_messages_authorId_idx" ON "chat_messages"("authorId");

-- CreateIndex
CREATE INDEX "chat_messages_videoId_authorId_idx" ON "chat_messages"("videoId", "authorId");

-- CreateIndex
CREATE INDEX "chat_messages_messageType_idx" ON "chat_messages"("messageType");

-- CreateIndex
CREATE UNIQUE INDEX "chat_messages_videoId_dedupeKey_key" ON "chat_messages"("videoId", "dedupeKey");

-- AddForeignKey
ALTER TABLE "ingestion_runs" ADD CONSTRAINT "ingestion_runs_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transcript_segments" ADD CONSTRAINT "transcript_segments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
