import { generateResponse, TWITTER_REPLY_PROMPT, selectModel, getDb, itineraries } from "@suntimes/shared";
import { eq } from "drizzle-orm";
import type { ClassifiedIntent } from "@suntimes/shared";
import { selectPortalLink } from "../services/portalLinkSelector";

export async function buildItinerary(
  tweetText: string,
  intent: ClassifiedIntent,
  userFollowers: number = 0
) {
  const db = getDb();
  const region = intent.region || "brisbane";

  const matchingItineraries = await db
    .select()
    .from(itineraries)
    .where(eq(itineraries.regionId, region));

  const itineraryContext =
    matchingItineraries.length > 0
      ? matchingItineraries
          .map(
            (it) =>
              `"${it.title}" (${it.durationDays} days, ${it.targetAudience}, ${it.budgetLevel}): ${it.description}`
          )
          .join("\n")
      : "No pre-built itineraries for this region yet.";

  const model = selectModel(intent.intent, userFollowers);
  const systemPrompt = `${TWITTER_REPLY_PROMPT}\n\nAvailable itineraries for ${region}:\n${itineraryContext}\n\nSuggest the best matching itinerary and include a link to the portal.`;

  const response = await generateResponse(
    model,
    systemPrompt,
    [{ role: "user", content: tweetText }],
    300
  );

  const bestMatch = matchingItineraries[0];
  const portalLink = selectPortalLink(
    intent.intent,
    intent.region,
    bestMatch?.slug
  );

  return {
    text: response.text,
    portalLink,
    model,
    inputTokens: response.inputTokens,
    outputTokens: response.outputTokens,
  };
}
