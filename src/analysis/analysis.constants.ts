export const ANALYSIS_WINDOW_MS = 15_000;

export const TOP_TERMS_PER_WINDOW = 30;

export const TOP_HIGHLIGHTS = 5;

export const HIGHLIGHT_PRE_ROLL_MS = 5_000;

export const HIGHLIGHT_POST_ROLL_MS = 10_000;

export const MAX_HIGHLIGHT_DURATION_MS = 90_000;

export const CLIP_PRESETS = {
  QUICK: {
    label: '20–45 sec',
    minDurationMs: 20_000,
    defaultDurationMs: 30_000,
    maxDurationMs: 45_000,
    preRollMs: 10_000,
    postRollMs: 20_000,
  },
  CONTEXT: {
    label: '45–90 sec',
    minDurationMs: 45_000,
    defaultDurationMs: 60_000,
    maxDurationMs: 90_000,
    preRollMs: 20_000,
    postRollMs: 40_000,
  },
  STANDARD: {
    label: '2–5 min',
    minDurationMs: 120_000,
    defaultDurationMs: 180_000,
    maxDurationMs: 300_000,
    preRollMs: 60_000,
    postRollMs: 120_000,
  },
  LONG: {
    label: '5–8 min',
    minDurationMs: 300_000,
    defaultDurationMs: 360_000,
    maxDurationMs: 480_000,
    preRollMs: 120_000,
    postRollMs: 240_000,
  },
} as const;

export type ClipPresetName = keyof typeof CLIP_PRESETS;
