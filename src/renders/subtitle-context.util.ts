import type { SubtitleCue } from '../clips/subtitle-export.service';

export interface SentencePart {
  cueIndex: number;
  text: string;
}
export interface SubtitleSentence {
  text: string;
  parts: SentencePart[];
}

/**
 * Reconstruct sentences across SRT cues. English punctuation can occur
 * in the middle of a cue, so that one cue contributes to two sentences.
 * Gaps and explicit maximums prevent joining unrelated spoken events.
 */
export function groupSubtitleSentences(
  cues: readonly SubtitleCue[],
  maxGapMs = 1200,
): SubtitleSentence[] {
  const sentences: SubtitleSentence[] = [];
  let parts: SentencePart[] = [];
  let previousCue: SubtitleCue | undefined;

  const flush = () => {
    if (!parts.length) return;
    sentences.push({
      text: parts.map((part) => part.text).join(' ').replace(/\s+/g, ' ').trim(),
      parts,
    });
    parts = [];
  };

  for (const [cueIndex, cue] of cues.entries()) {
    const text = cue.text.replace(/\s+/g, ' ').trim();
    if (!text) throw new Error('Cannot translate an empty subtitle cue');

    // Non-speech captions ("[screaming]") should stand alone; also avoid
    // combining a new utterance after a long silent gap.
    const standalone = /^\s*[\[(].+[\])]\s*$/.test(text);
    const previousStandalone = previousCue
      ? /^\s*[\[(].+[\])]\s*$/.test(previousCue.text.trim())
      : false;
    if (parts.length && previousCue && (
      cue.startMs - previousCue.endMs > maxGapMs ||
      cueIndex - parts[0].cueIndex >= 4 ||
      parts.reduce((count, part) => count + part.text.length, 0) + text.length > 320 ||
      standalone || previousStandalone
    )) flush();

    // Sentence endings, including ellipses; only split when followed by
    // whitespace or the end of the cue, never inside decimal numbers.
    const punctuation = /[.!?]+(?:["'\u201d\u2019)\]]+)?(?=\s|$)/g;
    let offset = 0;
    for (const match of text.matchAll(punctuation)) {
      const end = (match.index ?? 0) + match[0].length;
      const chunk = text.slice(offset, end).trim();
      if (chunk) {
        parts.push({ cueIndex, text: chunk });
        flush();
      }
      offset = end;
    }
    const remainder = text.slice(offset).trim();
    if (remainder) parts.push({ cueIndex, text: remainder });
    if (standalone) flush();
    previousCue = cue;
  }
  flush();
  return sentences;
}

function thaiSplitBoundaries(text: string): number[] {
  const indices = new Set<number>();
  const segmenter = new Intl.Segmenter('th', { granularity: 'word' });
  for (const segment of segmenter.segment(text)) {
    indices.add(segment.index);
    indices.add(segment.index + segment.segment.length);
  }
  // Intl word segmentation can merge the predicate and a nominalizer
  // ("เป็นการบ้าน" -> "เป็นการ" + "บ้าน"). A break before "การ"
  // is a useful additional grammatical candidate, not a forced split.
  for (const match of text.matchAll(/เป็น(?=การ)/gu)) {
    indices.add((match.index ?? 0) + match[0].length);
  }
  indices.delete(0);
  indices.delete(text.length);
  return [...indices].filter((index) => index > 0 && index < text.length)
    .sort((left, right) => left - right);
}

/**
 * Approximate text-only subtitle alignment. Sentence translation is done
 * first, then placed at Thai word boundaries in proportions based on
 * the English fragments. This cannot recover speech-level word timings.
 */
export function alignSentenceTranslation(
  translation: string,
  parts: readonly SentencePart[],
): string[] {
  const result = translation.replace(/\s+/g, ' ').trim();
  if (!result) throw new Error('MADLAD returned an empty translation');
  if (parts.length === 1) return [result];

  const boundaries = thaiSplitBoundaries(result);
  const chunks: string[] = [];
  const weights = parts.map((part) => Math.max(1, part.text.trim().length));
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let consumedWeight = 0;
  let start = 0;

  for (let index = 0; index < parts.length - 1; index++) {
    consumedWeight += weights[index];
    const intended = result.length * (consumedWeight / totalWeight);
    const remaining = parts.length - index - 1;
    const valid = boundaries.filter((boundary) =>
      boundary > start && result.length - boundary >= remaining,
    );
    // When an English cue ends with an unfinished article/preposition,
    // prefer the next Thai word boundary so its noun stays in the next cue.
    const articleTail = /\b(?:a|an|the|to)\s*$/i.test(parts[index].text);
    const rightCandidates = articleTail
      ? valid.filter((boundary) => boundary >= intended &&
          boundary - intended <= Math.max(3, result.length * 0.2))
      : [];
    const choices = rightCandidates.length ? rightCandidates : valid;
    const chosen = choices.length
      ? choices.reduce((best, candidate) =>
          Math.abs(candidate - intended) < Math.abs(best - intended) ? candidate : best)
      : -1;
    if (chosen < 0) {
      // Very short translations can have fewer words than source cues.
      // Do not duplicate a translated word or split it in half.
      chunks.push('…');
      continue;
    }
    chunks.push(result.slice(start, chosen).trim() || '…');
    start = chosen;
  }
  chunks.push(result.slice(start).trim() || '…');

  // A trailing article (a/an/the) marks a source phrase continuing in
  // the next cue. Keep its unfinished Thai clause visibly open.
  for (let index = 0; index < parts.length - 1; index++) {
    if (/\b(?:a|an|the|to)\s*$/i.test(parts[index].text) &&
      chunks[index] !== '…' && !/[.!?…]$/.test(chunks[index])) {
      chunks[index] += '…';
    }
  }
  return chunks;
}