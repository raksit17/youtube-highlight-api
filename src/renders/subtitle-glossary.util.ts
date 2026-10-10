/**
 * A compact and extensible glossary for titles/acronyms and context-sensitive
 * school terminology. Protected terms are never inferred from the translation.
 */
export interface ProtectedTerm {
  source: string;
  canonical: string;
}
export interface MaskedTranslation {
  masked: string;
  terms: ProtectedTerm[];
}

const ENTITY_PATTERN = /\bthe\s+divine\s+comedy\b|\bODC\b|\bassignment\b/gi;
const MASK_PATTERN = /ZXQNAME([0-9]+)ZXQ/gi;

export function isAcademicContext(allSourceText: string): boolean {
  return /\b(?:read|reading|book|books|class|classroom|course|school|teacher|literature|homework|studying|study|divine\s+comedy|ODC)\b/i.test(allSourceText);
}

export function maskProtectedTerms(
  text: string,
  fullContext: string,
): MaskedTranslation {
  const terms: ProtectedTerm[] = [];
  const academic = isAcademicContext(fullContext);
  const masked = text.replace(ENTITY_PATTERN, (source) => {
    const normalized = source.toLowerCase().replace(/\s+/g, ' ');
    let canonical: string | null = null;
    if (normalized === 'the divine comedy') canonical = 'The Divine Comedy';
    if (normalized === 'odc') canonical = 'ODC';
    if (normalized === 'assignment' && academic) canonical = 'การบ้าน';
    if (!canonical) return source;
    const index = terms.length;
    terms.push({ source, canonical });
    return 'ZXQNAME' + index + 'ZXQ';
  });
  return { masked, terms };
}

export function restoreProtectedTerms(
  translated: string,
  terms: readonly ProtectedTerm[],
): string | null {
  if (!terms.length) return translated;
  const seen = new Set<number>();
  const restored = translated.replace(MASK_PATTERN, (_, index: string) => {
    const id = Number(index);
    if (!Number.isInteger(id) || id < 0 || id >= terms.length) return _;
    seen.add(id);
    return terms[id].canonical;
  });
  return terms.every((_, index) => seen.has(index)) ? restored : null;
}

/**
 * Only used when MADLAD drops or damages protected placeholders. Translate
 * each non-protected fragment separately, then insert exact original titles.
 * A fallback request is preferable to saving an incorrect translated title.
 */
export async function translateAroundProtectedTerms(
  original: string,
  terms: readonly ProtectedTerm[],
  translate: (fragment: string) => Promise<string>,
): Promise<string> {
  if (!terms.length) return translate(original);
  // The matched terms are recorded in source order; find the exact next match.
  const pieces: string[] = [];
  let cursor = 0;
  for (const term of terms) {
    const at = original.toLowerCase().indexOf(term.source.toLowerCase(), cursor);
    if (at < 0) throw new Error('Unable to locate a protected source phrase');
    const before = original.slice(cursor, at).trim();
    if (before && /[\p{L}\p{N}]/u.test(before)) {
      let prefix = (await translate(before)).trim();
      if (term.canonical === 'การบ้าน' && /\b(?:an|a|the)\s*$/i.test(before)) {
        prefix = prefix
          .replace(/เหมือนกับการ\s*$/u, 'เหมือนจะเป็น')
          .replace(/(?:การ|งาน|หนึ่ง)\s*$/u, '');
      }
      pieces.push(prefix);
    } else if (before) {
      pieces.push(before);
    }
    pieces.push(term.canonical);
    cursor = at + term.source.length;
  }
  const after = original.slice(cursor).trim();
  if (after && /[\p{L}\p{N}]/u.test(after)) {
    pieces.push((await translate(after)).trim());
  } else if (after) {
    pieces.push(after);
  }
  return pieces.join(' ').replace(/\s+([.,!?])/g, '$1').trim();
}

export function polishAcademicThai(
  text: string,
  originalSentence: string,
  fullContext: string,
): string {
  if (!/\bassignment\b/i.test(originalSentence) || !isAcademicContext(fullContext)) {
    return text;
  }
  return text
    .replace(/การ\s*สั่ง\s*งาน|การ\s*มอบหมาย\s*งาน|งานที่ได้รับมอบหมาย/gu, 'การบ้าน')
    .replace(/เหมือนกับการบ้าน/gu, 'เหมือนจะเป็นการบ้าน');
}
