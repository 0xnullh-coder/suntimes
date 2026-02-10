export interface TweetContext {
  text: string;
  userFollowers: number;
  isFirstTime: boolean;
  hasLocationAndDates: boolean;
  isSpecificQuestion: boolean;
  isTransparency: boolean;
  isComplaint: boolean;
  isSafety: boolean;
  isMedia: boolean;
  isSpam: boolean;
  isOffTopic: boolean;
  isHostile: boolean;
  repliedToday: number;
  isGeneric: boolean;
  ageMinutes: number;
  regionMentioned: string | null;
}

const UNDERSERVED_REGIONS = [
  "fraser-coast",
  "outback-qld",
  "whitsundays",
];

export function calculatePriorityScore(ctx: TweetContext): number {
  let score = 30; // Base score

  // Positive signals
  if (ctx.userFollowers > 10000) score += 25; // premium
  else if (ctx.userFollowers > 1000) score += 10;
  if (ctx.isSpecificQuestion) score += 20;
  if (ctx.hasLocationAndDates) score += 15;
  if (ctx.isFirstTime) score += 10;
  if (
    ctx.regionMentioned &&
    UNDERSERVED_REGIONS.includes(ctx.regionMentioned)
  ) {
    score += 10;
  }

  // Negative signals
  if (ctx.isSpam) score -= 40;
  if (ctx.isOffTopic) score -= 30;
  if (ctx.repliedToday >= 3) score -= 20;
  if (ctx.isGeneric) score -= 15;
  if (ctx.isHostile) score -= 10;
  if (ctx.ageMinutes > 120) score -= 10;

  // Always-reply triggers (override score)
  if (ctx.isTransparency || ctx.isComplaint || ctx.isSafety || ctx.isMedia) {
    score = Math.max(score, 90);
  }

  return Math.max(0, Math.min(100, score));
}
