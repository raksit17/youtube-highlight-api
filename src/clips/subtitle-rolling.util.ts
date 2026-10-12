import type { SubtitleCue } from './subtitle-export.service';

/**
 * yt-dlp/YouTube rolling captions often share a display end timestamp even
 * when their spoken words are several seconds apart. Never use that shared
 * display end as evidence that the earlier phrase is still being spoken.
 */
export type RollingTranscriptRow = {
  startMs: number;
  endMs: number;
  text: string;
  metadata?: unknown;
};

// A fallback estimate for how long a final spoken word might remain visible.
// This is NOT forced alignment; it only prevents stale rolling display windows.
const FINAL_WORD_TAIL_MS = 1200;

function lastWordStartMs(row: RollingTranscriptRow): number | null {
  if (!row.metadata || typeof row.metadata !== 'object' || Array.isArray(row.metadata)) {
    return null;
  }
  const words = (row.metadata as { words?: unknown }).words;
  if (!Array.isArray(words)) return null;

  const validStarts = words.flatMap((word: unknown) => {
    if (!word || typeof word !== 'object' || Array.isArray(word)) return [];
    const ms = (word as { startMs?: unknown }).startMs;
    return typeof ms === 'number' && Number.isFinite(ms) &&
      ms >= row.startMs && ms < row.endMs ? [ms] : [];
  });
  return validStarts.length ? Math.max(...validStarts) : null;
}

/**
 * Normalize absolute VOD timestamps BEFORE clipping/rebasing to a highlight.
 * Keep every distinct spoken cue. For successive (not simultaneous) phrases,
 * cap the older caption at the start of the next one. The last word's start
 * also bounds stale rolling-caption ends even when the next cue lies outside
 * the requested clip. If actual word timings overlap, retain the overlap
 * rather than silently truncate spoken words.
 */
export function normalizeRollingCaptions(
  source: readonly RollingTranscriptRow[],
): SubtitleCue[] {
  const sorted = [...source]
    .filter((row) => Number.isFinite(row.startMs) && Number.isFinite(row.endMs) &&
      row.endMs > row.startMs && row.text.trim().length > 0)
    .sort((a, b) => a.startMs - b.startMs);

  const nextDistinctStarts = new Array<number | null>(sorted.length).fill(null);
  let nextDistinctStart: number | null = null;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (i + 1 < sorted.length && sorted[i + 1].startMs > sorted[i].startMs) {
      nextDistinctStart = sorted[i + 1].startMs;
    }
    nextDistinctStarts[i] = nextDistinctStart;
  }

  return sorted.map((row, index) => {
    const lastWord = lastWordStartMs(row);
    const nextStart = nextDistinctStarts[index];
    let endMs = row.endMs;

    if (lastWord !== null) {
      endMs = Math.min(endMs, lastWord + FINAL_WORD_TAIL_MS);
    }

    // Only trim at the next cue when all known words in this cue begin before it.
    // Otherwise two speakers may genuinely overlap; never remove that speech.
    if (nextStart !== null && (lastWord === null || lastWord < nextStart)) {
      endMs = Math.min(endMs, nextStart);
    }

    return {
      startMs: row.startMs,
      endMs,
      text: row.text.replace(/\r/g, '').trim(),
    };
  }).filter((cue) => cue.endMs > cue.startMs);
}
