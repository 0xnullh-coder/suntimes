import { getDb, tweetLogs } from "@suntimes/shared";

export interface ContentQualityMetrics {
  totalReplies: number;
  avgResponseTimeMs: number;
  avgPriorityScore: number;
  modelBreakdown: Record<string, number>;
  totalCostUsd: number;
  skippedCount: number;
  flaggedCount: number;
}

export async function logTweetInteraction(data: {
  tweetId: string;
  userHandle: string;
  userFollowers: number;
  originalText: string;
  intent: string;
  priorityScore: number;
  regionMentioned?: string;
  responseText?: string;
  responseTweetId?: string;
  modelUsed?: string;
  tokensInput?: number;
  tokensOutput?: number;
  llmCostUsd?: number;
  portalLink?: string;
  responseTimeMs?: number;
  wasSkipped?: boolean;
  skipReason?: string;
  wasFlagged?: boolean;
  flagReason?: string;
  isAutonomousPost?: boolean;
}) {
  const db = getDb();
  await db.insert(tweetLogs).values({
    tweetId: data.tweetId,
    userHandle: data.userHandle,
    userFollowers: data.userFollowers,
    originalText: data.originalText,
    intent: data.intent,
    priorityScore: data.priorityScore,
    regionMentioned: data.regionMentioned || null,
    responseText: data.responseText || null,
    responseTweetId: data.responseTweetId || null,
    modelUsed: data.modelUsed || null,
    tokensInput: data.tokensInput || null,
    tokensOutput: data.tokensOutput || null,
    llmCostUsd: data.llmCostUsd?.toString() || null,
    portalLink: data.portalLink || null,
    responseTimeMs: data.responseTimeMs || null,
    wasSkipped: data.wasSkipped || false,
    skipReason: data.skipReason || null,
    wasFlagged: data.wasFlagged || false,
    flagReason: data.flagReason || null,
    isAutonomousPost: data.isAutonomousPost || false,
  });
}
