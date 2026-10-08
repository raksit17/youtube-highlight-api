"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisWindowService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const analysis_constants_1 = require("../analysis.constants");
const analysis_windows_repository_1 = require("./analysis-windows.repository");
let AnalysisWindowService = class AnalysisWindowService {
    prisma;
    repository;
    constructor(prisma, repository) {
        this.prisma = prisma;
        this.repository = repository;
    }
    async rebuild(videoId) {
        const video = await this.prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            },
            select: {
                durationMs: true,
            },
        });
        const chats = await this.prisma.chatMessage.findMany({
            where: {
                videoId,
            },
            select: {
                timestampMs: true,
                authorId: true,
                authorName: true,
                message: true,
            },
            orderBy: {
                timestampMs: 'asc',
            },
        });
        const transcripts = await this.prisma.transcriptSegment.findMany({
            where: {
                videoId,
            },
            select: {
                startMs: true,
                endMs: true,
                text: true,
            },
            orderBy: {
                startMs: 'asc',
            },
        });
        const maxChatMs = chats.at(-1)?.timestampMs ?? 0;
        const maxTranscriptMs = transcripts.at(-1)?.endMs ?? 0;
        const durationMs = video.durationMs ??
            Math.max(maxChatMs, maxTranscriptMs);
        if (durationMs <= 0) {
            return [];
        }
        const windowCount = Math.ceil(durationMs /
            analysis_constants_1.ANALYSIS_WINDOW_MS);
        const windows = Array.from({
            length: windowCount,
        }, (_, index) => ({
            index,
            startMs: index *
                analysis_constants_1.ANALYSIS_WINDOW_MS,
            endMs: Math.min((index + 1) *
                analysis_constants_1.ANALYSIS_WINDOW_MS, durationMs),
            chats: [],
            transcripts: [],
        }));
        for (const chat of chats) {
            const index = Math.floor(chat.timestampMs /
                analysis_constants_1.ANALYSIS_WINDOW_MS);
            if (windows[index]) {
                windows[index].chats.push(chat);
            }
        }
        for (const transcript of transcripts) {
            const index = Math.floor(transcript.startMs /
                analysis_constants_1.ANALYSIS_WINDOW_MS);
            if (windows[index]) {
                windows[index].transcripts.push(transcript);
            }
        }
        const messageCounts = windows.map((window) => window.chats.length);
        const rows = windows.map((window, index) => {
            const chatCount = window.chats.length;
            const authors = new Set(window.chats.map((chat) => chat.authorId ??
                chat.authorName ??
                'unknown'));
            const chatWordCount = window.chats.reduce((sum, chat) => sum +
                this.countWords(chat.message), 0);
            const transcriptWordCount = window.transcripts.reduce((sum, transcript) => sum +
                this.countWords(transcript.text), 0);
            const laughCount = window.chats.filter((chat) => this.isLaugh(chat.message)).length;
            const emojiCount = window.chats.reduce((sum, chat) => sum +
                this.countEmoji(chat.message), 0);
            const questionCount = window.chats.reduce((sum, chat) => sum +
                (chat.message.match(/\?/g) ?? []).length, 0);
            const exclamationCount = window.chats.reduce((sum, chat) => sum +
                (chat.message.match(/!/g) ?? []).length, 0);
            const capsCount = window.chats.filter((chat) => this.isCaps(chat.message)).length;
            const baseline = this.getBaseline(messageCounts, index);
            const ratio = baseline > 0
                ? chatCount /
                    baseline
                : chatCount > 0
                    ? 1
                    : 0;
            const diversity = chatCount > 0
                ? authors.size /
                    chatCount
                : 0;
            const spikeScore = this.clamp((ratio - 1) *
                30 +
                Math.min(chatCount, 40));
            const reactionScore = this.clamp(laughCount * 3 +
                emojiCount * 1.5 +
                questionCount *
                    0.5 +
                exclamationCount *
                    0.5 +
                capsCount * 2);
            const diversityScore = this.clamp(diversity * 100);
            const transcriptScore = this.clamp(transcriptWordCount *
                1.5);
            return {
                videoId,
                windowIndex: window.index,
                startMs: window.startMs,
                endMs: window.endMs,
                windowSizeMs: analysis_constants_1.ANALYSIS_WINDOW_MS,
                chatMessageCount: chatCount,
                uniqueAuthorCount: authors.size,
                chatWordCount,
                transcriptWordCount,
                emojiCount,
                laughCount,
                questionCount,
                exclamationCount,
                capsCount,
                authorDiversity: diversity,
                baselineMessageCount: baseline,
                messageRatio: ratio,
                spikeScore,
                reactionScore,
                diversityScore,
                transcriptScore,
                termScore: 0,
            };
        });
        await this.repository.deleteForVideo(videoId);
        await this.repository.createMany(rows);
        return this.repository.findForVideo(videoId);
    }
    getBaseline(counts, index) {
        const previous = counts.slice(Math.max(0, index - 8), index);
        if (previous.length === 0) {
            return 0;
        }
        return (previous.reduce((sum, value) => sum + value, 0) /
            previous.length);
    }
    countWords(text) {
        return (text.match(/[\p{L}\p{N}']+/gu) ?? []).length;
    }
    isLaugh(text) {
        return /\b(lol|lmao|rofl|haha+|hehe+|www+|草)\b/i.test(text);
    }
    isCaps(text) {
        const letters = text.replace(/[^a-zA-Z]/g, '');
        return (letters.length >= 4 &&
            letters ===
                letters.toUpperCase());
    }
    countEmoji(text) {
        return (text.match(/\p{Extended_Pictographic}/gu) ?? []).length;
    }
    clamp(value) {
        return Math.max(0, Math.min(100, value));
    }
};
exports.AnalysisWindowService = AnalysisWindowService;
exports.AnalysisWindowService = AnalysisWindowService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        analysis_windows_repository_1.AnalysisWindowsRepository])
], AnalysisWindowService);
//# sourceMappingURL=analysis-window.service.js.map