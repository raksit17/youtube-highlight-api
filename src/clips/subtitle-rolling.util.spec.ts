import { normalizeRollingCaptions } from './subtitle-rolling.util';

describe('normalizeRollingCaptions (yt-dlp rolling captions)', () => {
  it('uses word starts to end a stale cue before the next spoken phrase', () => {
    const captions = normalizeRollingCaptions([
      {
        startMs: 5_869_600, endMs: 5_876_840,
        text: 'Thank you, my friend.',
        metadata: { words: [
          { startMs: 5_869_600, text: 'Thank' },
          { startMs: 5_869_920, text: ' you,' },
          { startMs: 5_870_239, text: ' my' },
          { startMs: 5_870_560, text: ' friend.' },
        ] },
      },
      {
        startMs: 5_872_800, endMs: 5_876_840,
        text: 'Go in the distance like Hercules.',
        metadata: { words: [
          { startMs: 5_872_800, text: 'Go' },
          { startMs: 5_872_960, text: ' in' },
          { startMs: 5_873_119, text: ' the' },
          { startMs: 5_873_280, text: ' distance' },
          { startMs: 5_873_600, text: ' like' },
          { startMs: 5_873_840, text: ' Hercules.' },
        ] },
      },
      {
        startMs: 5_878_560, endMs: 5_883_040,
        text: 'A,',
        metadata: { words: [{ startMs: 5_878_560, text: 'A,' }] },
      },
    ]);

    expect(captions).toEqual([
      { startMs: 5_869_600, endMs: 5_871_760, text: 'Thank you, my friend.' },
      { startMs: 5_872_800, endMs: 5_875_040, text: 'Go in the distance like Hercules.' },
      { startMs: 5_878_560, endMs: 5_879_760, text: 'A,' },
    ]);
  });

  it('caps stale rolling ends without words, but never drops the later phrase', () => {
    expect(normalizeRollingCaptions([
      { startMs: 1000, endMs: 8000, text: 'Previous' },
      { startMs: 3000, endMs: 8000, text: 'Next' },
    ])).toEqual([
      { startMs: 1000, endMs: 3000, text: 'Previous' },
      { startMs: 3000, endMs: 8000, text: 'Next' },
    ]);
  });

  it('retains true overlapping word timing instead of silently deleting words', () => {
    const result = normalizeRollingCaptions([
      {
        startMs: 1000, endMs: 5000, text: 'Speaker one continues',
        metadata: { words: [{ startMs: 1000 }, { startMs: 3500 }] },
      },
      {
        startMs: 3000, endMs: 4000, text: 'Speaker two',
        metadata: { words: [{ startMs: 3000 }] },
      },
    ]);
    expect(result[0]).toEqual({
      startMs: 1000, endMs: 4700, text: 'Speaker one continues',
    });
    expect(result[1]).toEqual({
      startMs: 3000, endMs: 4000, text: 'Speaker two',
    });
  });

  it('preserves original end times when the displayed cue already ends before the estimate', () => {
    expect(normalizeRollingCaptions([
      { startMs: 1000, endMs: 1600, text: 'Short', metadata: { words: [{ startMs: 1400 }] } },
    ])).toEqual([{ startMs: 1000, endMs: 1600, text: 'Short' }]);
  });
});
