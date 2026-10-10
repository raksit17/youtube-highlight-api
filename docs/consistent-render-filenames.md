# Consistent render filenames

Each new Render Job takes an immutable snapshot of the Clip Draft's start, end,
title, preset, customization flag and highlight rank. The user-visible stem is:

```text
Raora_SPAGHET_H01_STANDARD_003637-003937
```

The finished video and its optional caption sidecars use matching names:

```text
Raora_SPAGHET_H01_STANDARD_003637-003937.mp4
Raora_SPAGHET_H01_STANDARD_003637-003937.en.srt
Raora_SPAGHET_H01_STANDARD_003637-003937.en.vtt
Raora_SPAGHET_H01_STANDARD_003637-003937.json
```

Internally files are stored below `RENDER_OUTPUT_DIR/<renderJobId>/`
to avoid collisions. IDs are not exposed in the filename.

## Endpoints

- `POST /api/v1/clips/:id/render` – creates a job and locks its snapshot.
- `GET /api/v1/render-jobs/:id` – returns filenameStem and outputFilename.
- `GET /api/v1/render-jobs/:id/download` – downloads that exact video.
- `GET /api/v1/render-jobs/:id/subtitles?format=srt|vtt` – downloads
  the corresponding persisted subtitles, if transcript data existed.
- `GET /api/v1/render-jobs/:id/export` – matching snapshot metadata.
- `GET /api/v1/clips/:id/subtitles` – separately exports the current
  draft range, **not necessarily matching an older rendered MP4**.

Sidecar timing is rebased to 00:00:00 at the snapshot start. When subtitles
exist, SRT and VTT are persisted even if `includeSubtitles=false`.
`includeSubtitles=true` additionally embeds a subtitle stream in the video.

A FAST render can land near keyframes and therefore may not be frame-accurate.
Use ACCURATE for video/subtitle alignment.

## Database migration

After pulling the Backend updates, run:

```bash
npx prisma migrate deploy
npx prisma generate
npm run build
npm test -- --runInBand
```

Older RenderJob records have nullable snapshot columns and have no persistent
subtitle sidecars; re-render a clip to get paired SRT and VTT downloads.
