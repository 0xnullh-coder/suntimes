import { getDb, tweetLogs } from "@suntimes/shared";
import { eq, sql, and, gte } from "drizzle-orm";

const NON_SEQ_REGIONS = [
  "tropical-north-qld",
  "whitsundays",
  "fraser-coast",
  "outback-qld",
];

export interface RegionalCoverage {
  regionBreakdown: Record<string, number>;
  totalMentions: number;
  nonSeqPercentage: number;
  needsMoreNonSeq: boolean;
}

export async function evaluateRegionalCoverage(
  sinceDaysAgo: number = 7
): Promise<RegionalCoverage> {
  const db = getDb();
  const since = new Date();
  since.setDate(since.getDate() - sinceDaysAgo);

  const results = await db
    .select({
      region: tweetLogs.regionMentioned,
      count: sql<number>`count(*)`.as("count"),
    })
    .from(tweetLogs)
    .where(
      and(
        gte(tweetLogs.createdAt, since),
        eq(tweetLogs.wasSkipped, false)
      )
    )
    .groupBy(tweetLogs.regionMentioned);

  const breakdown: Record<string, number> = {};
  let total = 0;
  let nonSeqCount = 0;

  for (const row of results) {
    const region = row.region || "unknown";
    const count = Number(row.count);
    breakdown[region] = count;
    total += count;
    if (NON_SEQ_REGIONS.includes(region)) {
      nonSeqCount += count;
    }
  }

  const nonSeqPercentage = total > 0 ? (nonSeqCount / total) * 100 : 0;

  return {
    regionBreakdown: breakdown,
    totalMentions: total,
    nonSeqPercentage,
    needsMoreNonSeq: nonSeqPercentage < 30,
  };
}
