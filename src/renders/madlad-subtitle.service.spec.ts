import { MadladSubtitleService, pairSyncedSubtitles } from './madlad-subtitle.service';
import { makeSubtitleFile } from '../clips/subtitle-export.service';

describe('MadladSubtitleService', () => {
  afterEach(() => jest.restoreAllMocks());

  it('uses the requested generation config for normal sentences', async () => {
    const request = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ translated: 'สวัสดี' }), { status: 200 }),
    );
    const original = [
      { startMs: 100, endMs: 1100, text: 'Hello.' },
      { startMs: 2000, endMs: 3000, text: 'Hello.' },
    ];
    const translated = await new MadladSubtitleService().translateCues(original);
    expect(request).toHaveBeenCalledTimes(1);
    expect(JSON.parse(String(request.mock.calls[0][1]?.body))).toEqual({
      text: 'Hello.', source: 'en', target: 'th',
      max_new_tokens: 256, num_beams: 2,
    });
    expect(translated).toEqual([
      { startMs: 100, endMs: 1100, text: 'สวัสดี' },
      { startMs: 2000, endMs: 3000, text: 'สวัสดี' },
    ]);
  });

  it('translates complete assignment sentence and preserves homework as a unit', async () => {
    const requests: string[] = [];
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, options) => {
      const { text } = JSON.parse(String(options?.body)) as { text: string };
      requests.push(text);
      return new Response(JSON.stringify({
        translated: text.includes('ZXQNAME')
          ? 'แต่จำได้ว่ามันเหมือนจะเป็น ZXQNAME0ZXQ'
          : 'ฉันจำได้ว่ามันเป็นอะไรสักอย่าง...',
      }), { status: 200 });
    });
    const english = [
      { startMs: 1579, endMs: 6619, text: 'But I remember it was like an' },
      { startMs: 3420, endMs: 9099, text: 'assignment. I remember it was something...' },
      { startMs: 9099, endMs: 14000, text: 'we also had to read a book.' },
    ];
    const thai = await new MadladSubtitleService().translateCues(english);
    expect(requests.some((text) =>
      text === 'But I remember it was like an ZXQNAME0ZXQ.',
    )).toBe(true);
    expect(thai[1].text).toContain('การบ้าน');
    expect(thai[0].text).not.toContain('การบ้าน');
    expect(thai.map((c) => [c.startMs, c.endMs])).toEqual(
      english.map((c) => [c.startMs, c.endMs]),
    );
  });

  it('protects The Divine Comedy and ODC inside a 14-cue transcript', async () => {
    const english = [
      { startMs: 0, endMs: 433, text: 'skip. So, I actually don\'t know what' },
      { startMs: 0, endMs: 1579, text: 'what happened. I just didn\'t do it.' },
      { startMs: 433, endMs: 3420, text: '[laughter]' },
      { startMs: 1579, endMs: 6619, text: 'But I remember it was like an' },
      { startMs: 3420, endMs: 9099, text: 'assignment. I remember it was something' },
      { startMs: 6619, endMs: 13980, text: 'that we had to do, but we were supposed' },
      { startMs: 9099, endMs: 16860, text: 'to do, but I just I just didn\'t.' },
      { startMs: 13980, endMs: 19260, text: 'So yeah, we were supposed to do that but' },
      { startMs: 16860, endMs: 22703, text: 'I genuinely don\'t know what what' },
      { startMs: 19260, endMs: 23500, text: 'happened in the divine comedy.' },
      { startMs: 22703, endMs: 26780, text: '[music]' },
      { startMs: 23500, endMs: 29900, text: 'I might I might have an idea of it. Also' },
      { startMs: 26780, endMs: 30000, text: 'we were um we also had to read the ODC' },
      { startMs: 29900, endMs: 30000, text: 'as well' },
    ];
    const requests: string[] = [];
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
      const body = JSON.parse(String(init?.body)) as { text: string };
      requests.push(body.text);
      let translated = 'ฉันคิดว่าคงเป็นอะไรบางอย่างที่เราต้องทำ';
      if (body.text.includes('But I remember it was like an ZXQNAME')) {
        translated = 'แต่จำได้ว่ามันเหมือนจะเป็นZXQNAME0ZXQ';
      } else if (body.text.includes('happened in ZXQNAME')) {
        translated = 'ฉันไม่รู้จริง ๆ ว่าเกิดอะไรขึ้นในเรื่อง ZXQNAME0ZXQ';
      } else if (body.text.includes('read the ZXQNAME')) {
        translated = 'พวกเรายังต้องอ่าน ZXQNAME0ZXQ ด้วยเหมือนกัน';
      }
      return new Response(JSON.stringify({ translated }), { status: 200 });
    });

    const thai = await new MadladSubtitleService().translateCues(english);
    expect(requests.some((text) => text.includes('But I remember it was like an ZXQNAME'))).toBe(true);
    expect(requests.some((text) => text.includes('happened in ZXQNAME'))).toBe(true);
    expect(requests.some((text) => text.includes('read the ZXQNAME'))).toBe(true);
    expect(thai).toHaveLength(14);
    expect(thai.map((cue) => [cue.startMs, cue.endMs]))
      .toEqual(english.map((cue) => [cue.startMs, cue.endMs]));
    expect(thai[2].text).toBe('[เสียงหัวเราะ]');
    expect(thai[10].text).toBe('[เสียงดนตรี]');
    expect(thai.map((cue) => cue.text).join(' ')).toContain('The Divine Comedy');
    expect(thai.map((cue) => cue.text).join(' ')).toContain('ODC');
    expect(thai.map((cue) => cue.text).join(' ')).not.toContain('ละครตลก');
    expect(thai.map((cue) => cue.text).join(' ')).toContain('การบ้าน');
    const bilingual = makeSubtitleFile(pairSyncedSubtitles(english, thai), 'srt');
    expect(bilingual).toContain('00:00:01,579 --> 00:00:06,619');
  });

  it('uses a deterministic fallback when MADLAD drops protected markers', async () => {
    const texts: string[] = [];
    jest.spyOn(globalThis, 'fetch').mockImplementation(async (_url, init) => {
      const text = (JSON.parse(String(init?.body)) as { text: string }).text;
      texts.push(text);
      return new Response(JSON.stringify({
        translated: text.includes('ZXQNAME')
          ? 'เกิดอะไรขึ้นในละครตลก'
          : 'เกิดอะไรขึ้นใน',
      }), { status: 200 });
    });
    const output = await new MadladSubtitleService().translateCues([
      { startMs: 0, endMs: 3000, text: 'What happened in the Divine Comedy?' },
    ]);
    expect(texts.length).toBeGreaterThan(1);
    expect(output[0].text).toContain('The Divine Comedy');
    expect(output[0].text).not.toContain('ละครตลก');
  });

  it('still rejects empty MADLAD translations', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ translated: '' }), { status: 200 }),
    );
    await expect(new MadladSubtitleService().translateCues([
      { startMs: 0, endMs: 1000, text: 'Hello.' },
    ])).rejects.toThrow('empty or invalid');
  });
});
