import { Injectable } from '@nestjs/common';
import type { SubtitleCue } from '../clips/subtitle-export.service';
import { alignSentenceTranslation, groupSubtitleSentences } from './subtitle-context.util';
import {
  maskProtectedTerms,
  polishAcademicThai,
  restoreProtectedTerms,
  translateAroundProtectedTerms,
} from './subtitle-glossary.util';

type MadladResponse = { translated?: unknown };

@Injectable()
export class MadladSubtitleService {
  get enabled(): boolean {
    return process.env.MADLAD_SUBTITLE_TRANSLATION_ENABLED !== 'false';
  }

  /**
   * Translate reconstructed sentences, not isolated subtitle chunks.
   * Never change source cue timings; translated cue boundaries are estimates.
   */
  async translateCues(
    englishCues: readonly SubtitleCue[],
    onProgress?: (done: number, total: number) => Promise<void>,
  ): Promise<SubtitleCue[]> {
    if (!englishCues.length) return [];

    const sentences = groupSubtitleSentences(englishCues);
    const fullContext = englishCues.map((cue) => cue.text).join(' ');
    const cache = new Map<string, string>();
    const perCue: string[][] = englishCues.map(() => []);

    for (const [index, sentence] of sentences.entries()) {
      let translated = cache.get(sentence.text);
      if (translated === undefined) {
        translated = await this.translateWithGlossary(sentence.text, fullContext);
        cache.set(sentence.text, translated);
      }

      const aligned = alignSentenceTranslation(translated, sentence.parts);
      for (const [partIndex, part] of sentence.parts.entries()) {
        perCue[part.cueIndex].push(aligned[partIndex]);
      }

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
      if (!text) throw new Error('Subtitle alignment produced an empty cue at ' + index);
      return { startMs: cue.startMs, endMs: cue.endMs, text };
    });
  }

  private async translateWithGlossary(text: string, fullContext: string): Promise<string> {
    // Stage directions require fixed, concise translations, not literal
    // dictionary senses such as 'boat' for the English command 'skip'.
    const effects: Record<string, string> = {
      '[laughter]': '[เสียงหัวเราะ]',
      '[music]': '[เสียงดนตรี]',
      '[screaming]': '[เสียงกรี๊ด]',
      '[applause]': '[เสียงปรบมือ]',
      'skip.': 'ข้ามไป',
    };
    const effect = effects[text.trim().toLowerCase()];
    if (effect) return effect;

    const protectedInput = maskProtectedTerms(text, fullContext);
    let translation: string;

    if (!protectedInput.terms.length) {
      translation = await this.translateOne(text);
    } else {
      // Keep names and educational terms unchanged through MADLAD.
      const response = await this.translateOne(protectedInput.masked);
      const restored = restoreProtectedTerms(response, protectedInput.terms);
      translation = restored ?? await translateAroundProtectedTerms(
        text,
        protectedInput.terms,
        (fragment) => this.translateOne(fragment),
      );
    }

    const polished = polishAcademicThai(translation, text, fullContext);
    return polished.replace(
      /(?:ใน\s*)?(?:บทละครตลก|ละครตลก|เรื่องตลก)\s*(?=The Divine Comedy)/gu,
      'ในเรื่อง ',
    );
  }

  private async translateOne(text: string): Promise<string> {
    const endpoint = process.env.MADLAD_API_URL || 'http://localhost:8001/v1/translate';
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
      throw new Error('MADLAD HTTP ' + response.status + ': ' + details);
    }

    const result = (await response.json()) as MadladResponse;
    if (typeof result.translated !== 'string' || !result.translated.trim()) {
      throw new Error('MADLAD returned an empty or invalid translation');
    }
    return result.translated.replace(/\s*\r?\n\s*/g, ' ').trim();
  }
}

/** Thai line first, English line second; no timestamp modification. */
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
