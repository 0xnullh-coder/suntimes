import type { ModelName } from "./client";
import type { Intent } from "../types/intents";

// SONNET: trip_planning, transparency, comparison, threads, >10K followers, complaints, autonomous posts
// HAIKU: everything else
const SONNET_INTENTS: Intent[] = [
  "trip_planning",
  "transparency",
  "comparison",
];

export function selectModel(
  intent: string,
  userFollowers?: number,
  isThread?: boolean,
  isComplaint?: boolean,
  isAutonomousPost?: boolean
): ModelName {
  if (isAutonomousPost) return "sonnet";
  if (isThread) return "sonnet";
  if (isComplaint) return "sonnet";
  if (userFollowers && userFollowers > 10000) return "sonnet";
  if (SONNET_INTENTS.includes(intent as Intent)) return "sonnet";

  return "haiku";
}
