import {
  CLIP_PRESETS,
  ClipPresetName,
} from '../analysis.constants';

export interface ClipPresetRange {
  startMs: number;
  endMs: number;
  durationMs: number;
}

export function buildClipPresetRange(
  preset: ClipPresetName,
  peakMs: number,
  videoDurationMs: number,
): ClipPresetRange {
  const config = CLIP_PRESETS[preset];

  if (videoDurationMs <= 0) {
    return {
      startMs: 0,
      endMs: 0,
      durationMs: 0,
    };
  }

  const safePeakMs = Math.max(
    0,
    Math.min(videoDurationMs, peakMs),
  );

  const targetDurationMs = Math.min(
    config.defaultDurationMs,
    videoDurationMs,
  );

  let startMs = safePeakMs - config.preRollMs;
  let endMs = safePeakMs + config.postRollMs;

  if (startMs < 0) {
    endMs += -startMs;
    startMs = 0;
  }

  if (endMs > videoDurationMs) {
    const overflow = endMs - videoDurationMs;
    endMs = videoDurationMs;
    startMs = Math.max(0, startMs - overflow);
  }

  const currentDurationMs = endMs - startMs;

  if (currentDurationMs < targetDurationMs) {
    const missingMs = targetDurationMs - currentDurationMs;
    const extendBefore = Math.min(startMs, missingMs);

    startMs -= extendBefore;

    const remainingMs = missingMs - extendBefore;

    endMs = Math.min(
      videoDurationMs,
      endMs + remainingMs,
    );
  }

  if (endMs - startMs > targetDurationMs) {
    endMs = startMs + targetDurationMs;
  }

  return {
    startMs,
    endMs,
    durationMs: endMs - startMs,
  };
}
