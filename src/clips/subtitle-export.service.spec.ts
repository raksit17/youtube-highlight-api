import { SubtitleExportService } from './subtitle-export.service';
import { PrismaService } from '../database/prisma.service';

describe('SubtitleExportService', () => {
  const findMany = jest.fn();
  const prisma = {
    transcriptSegment: { findMany },
  } as unknown as PrismaService;
  const service = new SubtitleExportService(prisma);

  beforeEach(() => { findMany.mockReset(); });

  it('matches the video clip range and removes the original VOD offset', async () => {
    findMany.mockResolvedValue([
      { startMs: 2_195_000, endMs: 2_200_000, text: 'Before', language: 'en', source: 'auto' },
      { startMs: 2_375_000, endMs: 2_380_000, text: 'After', language: 'en', source: 'auto' },
    ]);
    const srt = await service.exportForRange(
      'video', 2_197_000, 2_377_000, 'Raora_SPAGHET_H01_STANDARD_003637-003937', 'srt',
    );
    expect(srt.filename).toBe('Raora_SPAGHET_H01_STANDARD_003637-003937.en.srt');
    expect(srt.content).toContain('00:00:00,000 --> 00:00:03,000');
    expect(srt.content).toContain('00:02:58,000 --> 00:03:00,000');

    const vtt = await service.exportForRange(
      'video', 2_197_000, 2_377_000, 'Raora_SPAGHET_H01_STANDARD_003637-003937', 'vtt',
    );
    expect(vtt.filename).toBe('Raora_SPAGHET_H01_STANDARD_003637-003937.en.vtt');
    expect(vtt.content).toContain('WEBVTT\n\n');
    expect(vtt.content).toContain('00:00:00.000 --> 00:00:03.000');
  });

  it('avoids mixing subtitle sources or languages', async () => {
    findMany.mockResolvedValue([
      { startMs: 2_000, endMs: 4_000, text: 'EN', language: 'en', source: 'manual' },
      { startMs: 2_000, endMs: 4_000, text: 'EN AUTO', language: 'en', source: 'auto' },
      { startMs: 2_000, endMs: 4_000, text: 'TH', language: 'th', source: 'manual' },
    ]);
    const output = await service.exportForRange('video', 0, 10_000, 'example', 'srt');
    expect(output.content).toContain('EN');
    expect(output.content).not.toContain('EN AUTO');
    expect(output.content).not.toContain('TH');
  });

  it('does not show a stale Thank you cue instead of Hercules when clipping at 01:37:53', async () => {
    findMany.mockResolvedValue([
      {
        startMs: 5_869_600, endMs: 5_876_840, text: 'Thank you, my friend.',
        language: 'en', source: 'youtube-auto',
        metadata: { words: [
          { startMs: 5_869_600 }, { startMs: 5_869_920 },
          { startMs: 5_870_239 }, { startMs: 5_870_560 },
        ] },
      },
      {
        startMs: 5_872_800, endMs: 5_876_840,
        text: 'Go in the distance like Hercules.',
        language: 'en', source: 'youtube-auto',
        metadata: { words: [
          { startMs: 5_872_800 }, { startMs: 5_872_960 },
          { startMs: 5_873_119 }, { startMs: 5_873_280 },
          { startMs: 5_873_600 }, { startMs: 5_873_840 },
        ] },
      },
      {
        startMs: 5_878_560, endMs: 5_883_040, text: 'A,',
        language: 'en', source: 'youtube-auto',
        metadata: { words: [{ startMs: 5_878_560 }] },
      },
    ]);

    const srt = await service.exportForRange(
      'video', 5_873_000, 5_890_000, 'test-highlight', 'srt',
    );

    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({
      select: expect.objectContaining({ metadata: true }),
    }));
    expect(srt.cues).toEqual([
      { startMs: 0, endMs: 2040, text: 'Go in the distance like Hercules.' },
      { startMs: 5560, endMs: 6760, text: 'A,' },
    ]);
    expect(srt.content).toContain('00:00:00,000 --> 00:00:02,040\nGo in the distance like Hercules.');
    expect(srt.content).not.toContain('Thank you, my friend.');

    const vtt = await service.exportForRange(
      'video', 5_873_000, 5_890_000, 'test-highlight', 'vtt',
    );
    expect(vtt.cues).toEqual(srt.cues);
    expect(vtt.content).toContain('00:00:00.000 --> 00:00:02.040\nGo in the distance like Hercules.');
  });

  it('preserves both phrases when the highlight includes both spoken ranges', async () => {
    findMany.mockResolvedValue([
      {
        startMs: 5869600, endMs: 5876840, text: 'Thank you, my friend.',
        language: 'en', source: 'auto',
        metadata: { words: [{ startMs: 5870560 }] },
      },
      {
        startMs: 5872800, endMs: 5876840,
        text: 'Go in the distance like Hercules.',
        language: 'en', source: 'auto',
        metadata: { words: [{ startMs: 5873840 }] },
      },
    ]);

    const result = await service.exportForRange('video', 5869000, 5880000, 'both', 'srt');
    expect(result.cues.map((cue) => cue.text)).toEqual([
      'Thank you, my friend.',
      'Go in the distance like Hercules.',
    ]);
    expect(result.cues[0].endMs).toBeLessThan(result.cues[1].startMs);
  });
});
