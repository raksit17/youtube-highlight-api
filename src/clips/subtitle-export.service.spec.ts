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
});
