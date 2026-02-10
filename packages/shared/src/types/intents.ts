export type Intent =
  | "venue_request"
  | "trip_planning"
  | "weather_query"
  | "event_query"
  | "olympics_query"
  | "comparison"
  | "local_tips"
  | "transparency"
  | "general_qld"
  | "feedback"
  | "off_topic";

export interface ClassifiedIntent {
  intent: Intent;
  region: string | null;
  dates: string | null;
  groupType: "solo" | "couple" | "family" | "friends" | null;
  specificity: "vague" | "specific" | "very_specific";
}
