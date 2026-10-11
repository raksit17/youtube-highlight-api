import { parseSyncedSrt, rebaseCuesToHighlight } from './subtitle-sync.util';

describe('highlight subtitle synchronization timeline', () => {
  it('parses ffsubsync SRT output including multiline text and CRLF', () => {
    const input =
      '1\r\n00:00:02,000 --> 00:00:03,500\r\nHello!\r\nHi!\r\n\r\n' +
      '2\r\n00:00:07,200 --> 00:00:08,000\r\nSecond line\r\n';
    expect(parseSyncedSrt(input)).toEqual([
      { startMs: 2000, endMs: 3500, text: 'Hello!\nHi!' },
      { startMs: 7200, endMs: 8000, text: 'Second line' },
    ]);
  });

  it('converts context timestamps to clip time without changing cue text', () => {
    const contextCues = [
      { startMs: 14000, endMs: 16800, text: 'At the boundary' },
      { startMs: 17500, endMs: 19500, text: 'Next line' },
    ];
    // Highlight begins 15s into the padded context and runs for 3 seconds.
    expect(rebaseCuesToHighlight(contextCues, 15000, 3000)).toEqual([
      { startMs: 0, endMs: 1800, text: 'At the boundary' },
      { startMs: 2500, endMs: 3000, text: 'Next line' },
    ]);
  });

  it('drops fully-outside cues after applying the alignment offset', () => {
    expect(rebaseCuesToHighlight([
      { startMs: 0, endMs: 3000, text: 'too early' },
      { startMs: 14000, endMs: 17000, text: 'visible' },
      { startMs: 21000, endMs: 22000, text: 'too late' },
    ], 15000, 4000)).toEqual([
      { startMs: 0, endMs: 2000, text: 'visible' },
    ]);
  });
});
