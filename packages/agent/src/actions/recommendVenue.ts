import { generateResponse, TWITTER_REPLY_PROMPT, selectModel } from "@suntimes/shared";
import type { ClassifiedIntent } from "@suntimes/shared";
import { getVenuesByRegion, getVenuesByType } from "../providers/venueProvider";
import { selectPortalLink } from "../services/portalLinkSelector";

export async function recommendVenue(
  tweetText: string,
  intent: ClassifiedIntent,
  userFollowers: number = 0
) {
  const region = intent.region || "brisbane";
  const venuesList = await getVenuesByRegion(region);

  if (venuesList.length === 0) {
    return null;
  }

  // Build context from DB venues
  const venueContext = venuesList
    .map(
      (v) =>
        `${v.name} (${v.type}, ${v.suburb}, ${v.suntimesRating}/10): ${v.insiderTip}`
    )
    .join("\n");

  const model = selectModel(intent.intent, userFollowers);
  const systemPrompt = `${TWITTER_REPLY_PROMPT}\n\nAvailable venues in ${region}:\n${venueContext}`;

  const response = await generateResponse(
    model,
    systemPrompt,
    [{ role: "user", content: tweetText }],
    300
  );

  const portalLink = selectPortalLink(intent.intent, intent.region);

  return {
    text: response.text,
    portalLink,
    model,
    inputTokens: response.inputTokens,
    outputTokens: response.outputTokens,
  };
}
