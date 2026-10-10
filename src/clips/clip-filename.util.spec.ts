import { attachmentFilenameHeader, buildClipFilenameStem } from './clip-filename.util';
describe('clip filename naming', () => {
  it('uses an identifiable title, rank, preset and times', () => {
    expect(buildClipFilenameStem({
      videoTitle: 'Raora SPAGHET!', rank: 1, sourcePreset: 'STANDARD',
      startMs: 2_197_000, endMs: 2_377_000,
    })).toBe('Raora_SPAGHET_H01_STANDARD_003637-003937');
  });
  it('marks custom edits and preserves millisecond boundaries', () => {
    expect(buildClipFilenameStem({
      title: 'ทดสอบ / Clip', rank: 2, sourcePreset: 'QUICK',
      isCustomized: true, startMs: 1_200, endMs: 21_234,
    })).toBe('ทดสอบ_Clip_H02_QUICK_CUSTOM_000001200-000021234');
  });
  it('sanitizes path fragments and emits UTF8 disposition', () => {
    expect(buildClipFilenameStem({
      title: '../../funny:moment?', startMs: 0, endMs: 30_000,
    })).toBe('funny_moment_MANUAL_CUSTOM_000000-000030');
    expect(attachmentFilenameHeader('ทดสอบ.en.srt')).toContain("filename*=UTF-8''");
  });
});
