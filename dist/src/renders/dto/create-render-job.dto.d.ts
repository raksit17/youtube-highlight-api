export declare enum RenderFormat {
    MP4 = "MP4",
    WEBM = "WEBM"
}
export declare enum RenderResolution {
    ORIGINAL = "ORIGINAL",
    P1080 = "1080P",
    P720 = "720P"
}
export declare enum RenderMode {
    ACCURATE = "ACCURATE",
    FAST = "FAST"
}
export declare class CreateRenderJobDto {
    format: RenderFormat;
    resolution: RenderResolution;
    mode: RenderMode;
    includeSubtitles: boolean;
}
