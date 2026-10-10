import {
  alignSentenceTranslation,
  groupSubtitleSentences,
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

  it('keeps a single translated sentence intact for one cue', () => {
    expect(alignSentenceTranslation('สวัสดี', [
      { cueIndex: 0, text: 'Hello.' },
    ])).toEqual(['สวัสดี']);
  });
});
