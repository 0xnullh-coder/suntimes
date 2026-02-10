import { generateResponse } from "@suntimes/shared";

const TRANSPARENCY_PROMPT = `You are Suntimes — Queensland's tourism insider.
Someone is asking about how Suntimes works, whether it's AI, etc.

RULES:
- Always "we" not "I"
- Be honest, casual, and warm
- We ARE AI-powered (Claude by Anthropic) but curated by real Queensland locals
- We use AI tools for speed — edited by humans for taste
- Our venue data is curated by locals — not scraped from Google
- Our insider tips come from real experiences
- We don't accept paid placements
- We're transparent about being AI-assisted
- Australian English, under 280 characters
- Maximum 1 emoji`;

export async function handleTransparency(
  tweetText: string
): Promise<{
  text: string;
  inputTokens: number;
  outputTokens: number;
}> {
  // Always use Sonnet for transparency
  const response = await generateResponse(
    "sonnet",
    TRANSPARENCY_PROMPT,
    [{ role: "user", content: tweetText }],
    300
  );

  return {
    text: response.text,
    inputTokens: response.inputTokens,
    outputTokens: response.outputTokens,
  };
}
