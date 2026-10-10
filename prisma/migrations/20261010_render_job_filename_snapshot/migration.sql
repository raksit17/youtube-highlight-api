ALTER TABLE "render_jobs"
  ADD COLUMN "clipStartMs" INTEGER,
  ADD COLUMN "clipEndMs" INTEGER,
  ADD COLUMN "filenameStem" TEXT,
  ADD COLUMN "subtitleFilename" TEXT;
