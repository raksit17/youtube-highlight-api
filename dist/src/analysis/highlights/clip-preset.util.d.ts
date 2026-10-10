import { ClipPresetName } from '../analysis.constants';
export interface ClipPresetRange {
    startMs: number;
    endMs: number;
    durationMs: number;
}
export declare function buildClipPresetRange(preset: ClipPresetName, peakMs: number, videoDurationMs: number): ClipPresetRange;
