/** User-visible file names share one stable stem; private storage uses render job IDs. */
export interface ClipFilenameInput {
  title?: string | null;
  videoTitle?: string | null;
  rank?: number | null;
  sourcePreset?: string | null;
  isCustomized?: boolean;
  startMs: number;
  endMs: number;
}
export function safeFilePart(value: string, limit = 58): string {
  return [...value.normalize('NFKC')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '_')
    .replace(/^_+|_+$/g, '')]
    .slice(0, limit).join('').replace(/_+$/g, '') || 'Untitled';
}
export function timePart(ms: number): string {
  const value = Math.max(0, Math.trunc(ms));
  const clock = [
    Math.floor(value / 3_600_000),
    Math.floor((value % 3_600_000) / 60_000),
    Math.floor((value % 60_000) / 1000),
  ].map((n) => String(n).padStart(2, '0')).join('');
  const millis = value % 1000;
  return millis ? clock + String(millis).padStart(3, '0') : clock;
}
export function buildClipFilenameStem(input: ClipFilenameInput): string {
  const title = safeFilePart(input.title?.trim() || input.videoTitle?.trim() || 'Highlight');
  const rank = input.rank == null ? 'MANUAL' : 'H' + String(input.rank).padStart(2, '0');
  const preset = safeFilePart((input.sourcePreset || 'CUSTOM').toUpperCase(), 20);
  const label = input.isCustomized && preset !== 'CUSTOM' ? preset + '_CUSTOM' : preset;
  return [title, rank, label, timePart(input.startMs) + '-' + timePart(input.endMs)].join('_');
}
export function attachmentFilenameHeader(filename: string): string {
  const ascii = filename.replace(/[^\x20-\x7E]/g, '_').replace(/["\\;]/g, '_');
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}
