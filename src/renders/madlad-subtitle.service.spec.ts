import { MadladSubtitleService, pairSyncedSubtitles } from './madlad-subtitle.service';
import { makeSubtitleFile } from '../clips/subtitle-export.service';

describe('MadladSubtitleService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('sends user-specified options and preserves exact cue timestamps', async () => {
    const fetchMock = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ translated: 'กรี๊ด' }), { status: 200 }),
    );
    const input = [
      { startMs: 3, endMs: 7450, text: '[screaming]' },
      { startMs: 9000, endMs: 11000, text: '[screaming]' },
    ];
    const service = new MadladSubtitleService();
    const out = await service.translateCues(input);
    expect(fetchMock).toHaveBeenCalledTimes(1); // duplicate cues cached
    expect(fetchMock.mock.calls[0][1]?.method).toBe('POST');
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({
      text: '[screaming]',
      source: 'en',
      target: 'th',
      max_new_tokens: 256,
      num_beams: 2,
    });
    expect(out).toEqual([
      { startMs: 3, endMs: 7450, text: 'กรี๊ด' },
      { startMs: 9000, endMs: 11000, text: 'กรี๊ด' },
    ]);
  });


  it('creates a two-line Thai/English SRT with identical times and sequence', () => {
    const english = [
      { startMs: 33, endMs: 2213, text: 'spectator watches you.' },
      { startMs: 2213, endMs: 4372, text: 'What?' },
    ];
    const thai = [
      { startMs: 33, endMs: 2213, text: 'มีคนที่ไม่พึงประสงค์จ้องมองเราอยู่' },
      { startMs: 2213, endMs: 4372, text: 'หา?' },
    ];
    const output = makeSubtitleFile(pairSyncedSubtitles(english, thai), 'srt');
    expect(output).toContain(
      '1\\n00:00:00,033 --> 00:00:02,213\\nมีคนที่ไม่พึงประสงค์จ้องมองเราอยู่\\nspectator watches you.',
    );
    expect(output).toContain('2\\n00:00:02,213 --> 00:00:04,372\\nหา?\\nWhat?');
    expect(output.match(/-->/g)?.length).toBe(2);
  });

  it('rejects cue timing mismatches instead of silently desynchronizing', () => {
    expect(() => pairSyncedSubtitles(
      [{ startMs: 0, endMs: 1000, text: 'Hello' }],
      [{ startMs: 10, endMs: 1000, text: 'สวัสดี' }],
    )).toThrow('timestamps do not match');
  });

  it('rejoins an English sentence split after "an" before translation', async () => {
    const inputs: string[] = [];
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
      const body = JSON.parse(String(init?.body)) as { text: string };
      inputs.push(body.text);
      const thai = body.text === 'But I remember it was like an assignment.'
        ? 'แต่จำได้ว่ามันเหมือนจะเป็นการบ้าน'
        : 'ฉันจำได้ว่ามันเป็นอะไรสักอย่าง...';
      return new Response(JSON.stringify({ translated: thai }), { status: 200 });
    });

    const original = [
      { startMs: 1579, endMs: 3420, text: 'But I remember it was like an' },
      { startMs: 3420, endMs: 6619, text: 'assignment. I remember it was something...' },
    ];
    const result = await new MadladSubtitleService().translateCues(original);

    expect(inputs).toEqual([
      'But I remember it was like an assignment.',
      'I remember it was something...',
    ]);
    expect(result).toEqual([
      { startMs: 1579, endMs: 3420, text: 'แต่จำได้ว่ามันเหมือนจะเป็น…' },
      {
        startMs: 3420, endMs: 6619,
        text: 'การบ้าน ฉันจำได้ว่ามันเป็นอะไรสักอย่าง...',
      },
    ]);
    const bilingual = makeSubtitleFile(pairSyncedSubtitles(original, result), 'srt');
    expect(bilingual).toContain('00:00:01,579 --> 00:00:03,420');
    expect(bilingual).toContain('00:00:03,420 --> 00:00:06,619');
    expect(bilingual).toContain('การบ้าน ฉันจำได้ว่ามันเป็นอะไรสักอย่าง...\nassignment.');
  });

  it('splits sentences inside one cue but preserves the single cue range', async () => {
    const inputs: string[] = [];
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
      const text = (JSON.parse(String(init?.body)) as { text: string }).text;
      inputs.push(text);
      return new Response(JSON.stringify({
        translated: text === 'Hello.' ? 'สวัสดี' : 'เป็นอย่างไรบ้าง',
      }), { status: 200 });
    });
    const result = await new MadladSubtitleService().translateCues([
      { startMs: 1000, endMs: 3000, text: 'Hello. How are you?' },
    ]);
    expect(inputs).toEqual(['Hello.', 'How are you?']);
    expect(result).toEqual([
      { startMs: 1000, endMs: 3000, text: 'สวัสดี เป็นอย่างไรบ้าง' },
    ]);
  });

  it('does not merge captions separated by a long pause', async () => {
    const inputs: string[] = [];
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
      const text = (JSON.parse(String(init?.body)) as { text: string }).text;
      inputs.push(text);
      return new Response(JSON.stringify({ translated: text }), { status: 200 });
    });
    const result = await new MadladSubtitleService().translateCues([
      { startMs: 0, endMs: 900, text: 'I think' },
      { startMs: 4000, endMs: 5300, text: 'maybe' },
    ]);
    expect(inputs).toEqual(['I think', 'maybe']);
    expect(result.map((cue) => [cue.startMs, cue.endMs])).toEqual([
      [0, 900], [4000, 5300],
    ]);
  });

  it('fails rather than producing fake Thai captions on an empty response', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ translated: '' }), { status: 200 }),
    );
    await expect(new MadladSubtitleService().translateCues([
      { startMs: 0, endMs: 1000, text: 'Hello' },
    ])).rejects.toThrow('empty or invalid');
  });
});
