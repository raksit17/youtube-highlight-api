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

## Automatic MADLAD subtitle translation

New renders translate the original English subtitle cues through
[raksit17/madlad-api](https://github.com/raksit17/madlad-api) while the render
job is running. MADLAD must be started separately. On a Windows host with
NestJS and MADLAD both running locally, use these Backend `.env` settings:

```dotenv
MADLAD_SUBTITLE_TRANSLATION_ENABLED=true
MADLAD_API_URL=http://localhost:8001/v1/translate
MADLAD_TIMEOUT_MS=60000
```

Each English cue is sent sequentially to `POST /v1/translate` with the exact
JSON fields `{"text":"<subtitle text>","source":"en","target":"th","max_new_tokens":256,"num_beams":2}`.
The API returns `translated`. Duplicate phrases within a clip are cached.
The sequence and exact offsets are preserved from the original SRT; the
bilingual track places **Thai first and English second within each cue**, like
the provided `Raora_TH_EN_synced (2).srt` reference.

In addition to the original `.en.srt` and `.en.vtt`, the backend creates
`.th.srt`, `.th.vtt`, `.th-en.srt`, and `.th-en.vtt`, with the
same render job filename stem. Examples:

```text
Raora_SPAGHET_H01_STANDARD_003637-003937.en.srt
Raora_SPAGHET_H01_STANDARD_003637-003937.th.srt
Raora_SPAGHET_H01_STANDARD_003637-003937.th-en.srt
```

After rendering, query `GET /api/v1/render-jobs/:id` for the
`subtitleLanguages` array (e.g. `["en","th","th-en"]`).
Download the exact track with
`GET /api/v1/render-jobs/:id/subtitles?format=srt&language=th-en`.
For `language=en` the original source-language filename is preserved.

If MADLAD is offline or a translation is empty/invalid, the worker logs a
warning, omits the Thai outputs, and **still exports the video and original
English subtitles**. Translation cannot be reconstructed for old completed
render jobs; start a new render after changing this configuration.

The translation step can be slow: it calls the configured API once per
unique cue using a single sequential queue so that a single-GPU MADLAD
instance is not overloaded. FFmpeg starts once caption generation is done.
Translated subtitles are drafts for human review, especially screams,
proper names and context-dependent lines. They are not embedded into the
MP4 automatically: `includeSubtitles` keeps its original-track behavior.
