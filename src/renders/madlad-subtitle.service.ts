import { Injectable } from '@nestjs/common';
import type { SubtitleCue } from '../clips/subtitle-export.service';
import { alignSentenceTranslation, groupSubtitleSentences } from './subtitle-context.util';

type MadladResponse = { translated?: unknown };

/**
 * Calls the user's locally hosted MADLAD API with explicit generation options.
 * The API translates text only; timestamps and cue ordering never change.
 */
@Injectable()
export class MadladSubtitleService {
  get enable  async translateCues(
    englishCues: readonly SubtitleCue[],
    onProgress?: (done: number, total: number) => Promise<void>,
  ): Promise<SubtitleCue[]> {
    if (!englishCues.length) return [];

    const sentences = groupSubtitleSentences(englishCues);
    const cache = new Map<string, string>();
    const perCue: string[][] = englishCues.map(() => []);

    for (const [index, sentence] of sentences.entries()) {
      let translated = cache.get(sentence.text);
      if (!translated) {
        translated = await this.translateOne(sentence.text);
        cache.set(sentence.text, translated);
      }

      const aligned = alignSentenceTranslation(translated, sentence.parts);
      for (const [partIndex, part] of sentence.parts.entries()) {
        perCue[part.cueIndex].push(aligned[partIndex]);
      }

      // Keep the existing render-progress contract (done/total = source cues).
      if (onProgress && ((index + 1) % 5 === 0 || index === sentences.length - 1)) {
        const done = Math.min(
          englishCues.length,
          Math.ceil(((index + 1) / sentences.length) * englishCues.length),
        );
        await onProgress(done, englishCues.length);
      }
    }

    return englishCues.map((cue, index) => {
      const text = perCue[index].join(' ').replace(/\s+/g, ' ').trim();
      if (!text) throw new Error('Subtitle alignment produced an empty cue');
      return { startMs: cue.startMs, endMs: cue.endMs, text };
    });
  }

     await onProgress(index + 1, englishCues.length);
      }
    }
    return output;
  }

  private async translateOne(text: string): Promise<string> {
    const endpoint =
      process.env.MADLAD_API_URL || 'http://localhost:8001/v1/translate';
    const configuredTimeout = Number(process.env.MADLAD_TIMEOUT_MS ?? '60000');
    const timeoutMs = Number.isFinite(configuredTimeout)
      ? Math.max(1000, Math.min(configuredTimeout, 300000))
      : 60000;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        source: 'en',
        target: 'th',
        max_new_tokens: 256,
        num_beams: 2,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      const details = (await response.text().catch(() => '')).slice(0, 300);
      throw new Error(`MADLAD HTTP ${response.status}: ${details}`);
    }

    const result: MadladResponse = (await response.json()) as MadladResponse;
    if (typeof result.translated !== 'string' || !result.translated.trim()) {
      throw new Error('MADLAD returned an empty or invalid translation');
    }
    return result.translated.replace(/\s*\r?\n\s*/g, ' ').trim();
  }
}

/** Like Raora_TH_EN_synced.srt: one caption, Thai line first, English below. */
export function pairSyncedSubtitles(
  english: readonly SubtitleCue[],
  thai: readonly SubtitleCue[],
): SubtitleCue[] {
  if (english.length !== thai.length) {
    throw new Error('MADLAD subtitle count does not match the original');
  }
  return english.map((original, index) => {
    const translated = thai[index];
    if (translated.startMs !== original.startMs || translated.endMs !== original.endMs) {
      throw new Error('MADLAD subtitle timestamps do not match the original');
    }
    return {
      startMs: original.startMs,
      endMs: original.endMs,
      text: translated.text.replace(/\s*\r?\n\s*/g, ' ').trim() + '\n' +
        original.text.replace(/\s*\r?\n\s*/g, ' ').trim(),
    };
  });
}
