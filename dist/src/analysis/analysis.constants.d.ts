export declare const ANALYSIS_WINDOW_MS = 15000;
export declare const TOP_TERMS_PER_WINDOW = 30;
export declare const TOP_HIGHLIGHTS = 5;
export declare const HIGHLIGHT_PRE_ROLL_MS = 5000;
export declare const HIGHLIGHT_POST_ROLL_MS = 10000;
export declare const MAX_HIGHLIGHT_DURATION_MS = 90000;
export declare const CLIP_PRESETS: {
    readonly QUICK: {
        readonly label: "20–45 sec";
        readonly minDurationMs: 20000;
        readonly defaultDurationMs: 30000;
        readonly maxDurationMs: 45000;
        readonly preRollMs: 10000;
        readonly postRollMs: 20000;
    };
    readonly CONTEXT: {
        readonly label: "45–90 sec";
        readonly minDurationMs: 45000;
        readonly defaultDurationMs: 60000;
        readonly maxDurationMs: 90000;
        readonly preRollMs: 20000;
        readonly postRollMs: 40000;
    };
    readonly STANDARD: {
        readonly label: "2–5 min";
        readonly minDurationMs: 120000;
        readonly defaultDurationMs: 180000;
        readonly maxDurationMs: 300000;
        readonly preRollMs: 60000;
        readonly postRollMs: 120000;
    };
    readonly LONG: {
        readonly label: "5–8 min";
        readonly minDurationMs: 300000;
        readonly defaultDurationMs: 360000;
        readonly maxDurationMs: 480000;
        readonly preRollMs: 120000;
        readonly postRollMs: 240000;
    };
};
export type ClipPresetName = keyof typeof CLIP_PRESETS;
