import type { SubtitleCue } from '../clips/subtitle-export.service';

function parseSrtTimestamp(value: string): number {
  const match = /^(\d+):(\d{2}):(\d{2})[,.](\d{3})$/.exec(value);
  if (!match) throw new Error('Invalid SRT timestamp: ' + value);
  return (
    Number(match[1]) * 3_600_000 +
    Number(match[2]) * 60_000 +
    Number(match[3]) * 1000 +
    Number(match[4])
  );
}

/** Parse ffsubsync's SRT output while preserving multiline cue text. */
export function parseSyncedSrt(content: string): SubtitleCue[] {
  const blocks = content.replace(/^\uFEFF/, '').replace(/\r/g, '').trim().split(/\n\s*\n/);
  const cues: SubtitleCue[] = [];

  for (const block of blocks) {
    const lines = block.split('\n');
    const lineIndex = lines.findIndex((line) =>
      /^\d+:\d{2}:\d{2}[,.]\d{3}\s*-->/.test(line.trim()),
    );
    if (lineIndex < 0) continue;

    const match = /^(\d+:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d+:\d{2}:\d{2}[,.]\d{3})/.exec(lines[lineIndex].trim());
    if (!match) continue;
    const text = lines.slice(lineIndex + 1).join('\n').trim();
    const startMs = parseSrtTimestamp(match[1]);
    const endMs = parseSrtTimestamp(match[2]);
    if (text && endMs > startMs) cues.push({ startMs, endMs, text });
  }
  return cues.sort((a, b) => a.startMs - b.startMs);
}

/** Convert synced context-relative cues into the final highlight's 0-based timeline. */
export function rebaseCuesToHighlight(
  contextCues: readonly SubtitleCue[],
  highlightStartsAtContextMs: number,
  highlightDurationMs: number,
): SubtitleCue[] {
  if (highlightStartsAtContextMs < 0 || highlightDurationMs <= 0) {
    throw new Error('Invalid highlight timeline');
  }

  return contextCues
    .map((cue) => ({
      startMs: Math.max(0, cue.startMs - highlightStartsAtContextMs),
      endMs: Math.min(highlightDurationMs, cue.endMs - highlightStartsAtContextMs),
      text: cue.text,
    }))
    .filter((cue) => cue.endMs > cue.startMs && cue.text.trim().length > 0);
}
