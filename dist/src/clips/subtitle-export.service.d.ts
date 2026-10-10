import { PrismaService } from '../database/prisma.service';
type SubtitleFormat = 'srt' | 'vtt';
type Caption = {
    startMs: number;
    endMs: number;
    text: string;
};
export declare class SubtitleExportService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    exportForClip(clipId: string, requestedFormat?: string, requestedLanguage?: string): Promise<{
        filename: string;
        contentType: string;
        language: string;
        content: string;
    }>;
}
export declare function makeSubtitleFile(captions: Caption[], format: SubtitleFormat): string;
export declare function formatSubtitleTime(ms: number, format: SubtitleFormat): string;
export {};
