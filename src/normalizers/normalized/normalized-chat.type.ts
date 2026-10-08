export interface NormalizedChatMessage {
  externalId?: string;

  dedupeKey: string;

  sequence?: number;

  timestampMs: number;

  timestampUsec?: bigint;

  authorId?: string;

  authorName?: string;

  message: string;

  messageType?: string;

  amountRaw?: string;

  isMember: boolean;

  isModerator: boolean;

  isOwner: boolean;

  metadata?: Record<string, unknown>;
}
