import {
  alignSentenceTranslation,
  groupSubtitleSentences,
  findSubtitleOverlaps,
} from './subtitle-context.util';

describe('context-aware subtitle grouping and alignment', () => {
  it('reconstructs sentences across overlapping cues with punctuation mid-cue', () => {
    const sentences = groupSubtitleSentences([
      { startMs: 1579, endMs: 6619, text: 'But I remember it was like an' },
      { startMs: 3420, endMs: 9099, text: 'assignment. I remember it was something...' },
    ]);
    expect(sentences.map((s) => s.text)).toEqual([
      'But I remember it was like an assignment.',
      'I remember it was something...',
    ]);
    expect(sentences[0].parts).toEqual([
      { cueIndex: 0, text: 'But I remember it was like an' },
      { cueIndex: 1, text: 'assignment.' },
    ]);
    expect(sentences[1].parts).toEqual([
      { cueIndex: 1, text: 'I remember it was something...' },
    ]);
  });

  it('keeps the noun at the start of the second Thai cue after an article', () => {
    const parts = [
      { cueIndex: 0, text: 'But I remember it was like an' },
      { cueIndex: 1, text: 'assignment.' },
    ];
    expect(alignSentenceTranslation(
      'แต่จำได้ว่ามันเหมือนจะเป็นการบ้าน', parts,
    )).toEqual(['แต่จำได้ว่ามันเหมือนจะเป็น…', 'การบ้าน']);
  });

  it('does not mix long pauses or standalone action captions', () => {
    const result = groupSubtitleSentences([
      { startMs: 0, endMs: 1100, text: 'I think' },
      { startMs: 3000, endMs: 3600, text: 'maybe' },
      { startMs: 3700, endMs: 4100, text: '[screaming]' },
      { startMs: 4200, endMs: 4900, text: '[screaming]' },
    ]);
    expect(result.map((s) => s.text)).toEqual([
      'I think', 'maybe', '[screaming]', '[screaming]',
    ]);
  });

  it('never splits the word การบ้าน or a protected book title in Thai alignment', () => {
    expect(alignSentenceTranslation(
      'แต่จำได้ว่ามันเหมือนจะเป็นการบ้าน',
      [
        { cueIndex: 3, text: 'But I remember it was like an' },
        { cueIndex: 4, text: 'assignment.' },
      ],
    )).toEqual(['แต่จำได้ว่ามันเหมือนจะเป็น…', 'การบ้าน']);

    const names = alignSentenceTranslation(
      'ฉันไม่รู้ว่าเกิดอะไรขึ้นในเรื่อง The Divine Comedy',
      [
        { cueIndex: 8, text: 'I genuinely do not know what' },
        { cueIndex: 9, text: 'happened in The Divine Comedy' },
      ],
    );
    expect(names.join(' ')).toContain('The Divine Comedy');
    expect(names.every((chunk) => !chunk.includes('The Divine') ||
      chunk.includes('The Divine Comedy'))).toBe(true);
  });

  it('detects overlapping source cues but does not mutate their times', () => {
    const cues = [
      { startMs: 0, endMs: 433, text: 'First' },
      { startMs: 0, endMs: 1579, text: 'Second' },
      { startMs: 433, endMs: 3420, text: '[laughter]' },
    ];
    expect(findSubtitleOverlaps(cues)).toEqual([
      { first: 1, second: 2, overlapMs: 433 },
      { first: 2, second: 3, overlapMs: 1146 },
    ]);
    expect(cues[1].startMs).toBe(0);
  });

  it('keeps a single translated sentence intact for one cue', () => {
    expect(alignSentenceTranslation('สวัสดี', [
      { cueIndex: 0, text: 'Hello.' },
    ])).toEqual(['สวัสดี']);
  });
});
