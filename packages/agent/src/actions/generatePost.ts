import { generateResponse, TWITTER_REPLY_PROMPT, getDb, venues, regions } from "@suntimes/shared";
import { eq } from "drizzle-orm";

// Pillar rotation: gastronomy 30%, events 25%, destinations 20%, olympics 15%, community 10%
const PILLARS = [
  { name: "gastronomy", weight: 30 },
  { name: "events", weight: 25 },
  { name: "destinations", weight: 20 },
  { name: "olympics", weight: 15 },
  { name: "community", weight: 10 },
] as const;

// Regional balance: non-SEQ >= 30%
const NON_SEQ_REGIONS = [
  "tropical-north-qld",
  "whitsundays",
  "fraser-coast",
  "outback-qld",
];

type Pillar = (typeof PILLARS)[number]["name"];

export function selectPillar(): Pillar {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const pillar of PILLARS) {
    cumulative += pillar.weight;
    if (rand <= cumulative) return pillar.name;
  }
  return "gastronomy";
}

export function selectRegion(): string {
  // 30% chance of non-SEQ region
  if (Math.random() < 0.3) {
    return NON_SEQ_REGIONS[
      Math.floor(Math.random() * NON_SEQ_REGIONS.length)
    ];
  }
  const seqRegions = ["brisbane", "gold-coast", "sunshine-coast"];
  return seqRegions[Math.floor(Math.random() * seqRegions.length)];
}

export async function generateAutonomousPost(): Promise<{
  text: string;
  pillar: string;
  region: string;
  inputTokens: number;
  outputTokens: number;
} | null> {
  const pillar = selectPillar();
  const regionId = selectRegion();

  const db = getDb();
  const regionVenues = await db
    .select()
    .from(venues)
    .where(eq(venues.regionId, regionId));

  const regionData = await db
    .select()
    .from(regions)
    .where(eq(regions.id, regionId))
    .limit(1);

  if (regionVenues.length === 0) return null;

  const randomVenue =
    regionVenues[Math.floor(Math.random() * regionVenues.length)];

  const context = `Pillar: ${pillar}\nRegion: ${regionData[0]?.name || regionId}\nFeatured venue: ${randomVenue.name} in ${randomVenue.suburb} — ${randomVenue.insiderTip}\nRating: ${randomVenue.suntimesRating}/10\nType: ${randomVenue.type}`;

  const systemPrompt = `${TWITTER_REPLY_PROMPT}\n\nYou are writing an autonomous post (not a reply). Create an engaging tweet about Queensland tourism.\n\nContext:\n${context}\n\nRules:\n- This is a standalone post, not a reply\n- Be opinionated and specific\n- Reference the venue/region naturally\n- Under 280 characters`;

  const response = await generateResponse(
    "sonnet",
    systemPrompt,
    [{ role: "user", content: `Write a ${pillar} tweet about ${regionData[0]?.name || regionId}` }],
    300
  );

  return {
    text: response.text,
    pillar,
    region: regionId,
    inputTokens: response.inputTokens,
    outputTokens: response.outputTokens,
  };
}
