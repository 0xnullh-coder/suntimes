import { generateResponse } from "@suntimes/shared";
import { INTENT_CLASSIFIER_PROMPT } from "@suntimes/shared";
import type { ClassifiedIntent } from "@suntimes/shared";

export async function classifyIntent(
  tweetText: string
): Promise<ClassifiedIntent> {
  const fallback: ClassifiedIntent = {
    intent: "general_qld",
    region: null,
    dates: null,
    groupType: null,
    specificity: "vague",
  };

  try {
    const response = await generateResponse(
      "haiku",
      INTENT_CLASSIFIER_PROMPT,
      [{ role: "user", content: tweetText }],
      256
    );

    const parsed = JSON.parse(response.text);
    return {
      intent: parsed.intent || "general_qld",
      region: parsed.region === "null" ? null : parsed.region || null,
      dates: parsed.dates === "null" ? null : parsed.dates || null,
      groupType:
        parsed.group_type === "null" ? null : parsed.group_type || null,
      specificity: parsed.specificity || "vague",
    };
  } catch (error) {
    console.warn("Intent classification failed:", error);
    return fallback;
  }
}
