import type { Intent } from "@suntimes/shared";

const UTM_PARAMS = "?utm_source=twitter&utm_medium=reply";

export function selectPortalLink(
  intent: Intent,
  region?: string | null,
  itinerarySlug?: string | null,
  siteUrl: string = "https://suntimes.nullh.xyz"
): string {
  const base = siteUrl.replace(/\/$/, "");

  switch (intent) {
    case "venue_request":
    case "local_tips":
      if (region) return `${base}/explore/${region}${UTM_PARAMS}`;
      return `${base}/explore${UTM_PARAMS}`;

    case "trip_planning":
      if (itinerarySlug)
        return `${base}/itineraries/${itinerarySlug}${UTM_PARAMS}`;
      if (region)
        return `${base}/itineraries?region=${region}${UTM_PARAMS.replace("?", "&")}`;
      return `${base}/itineraries${UTM_PARAMS}`;

    case "event_query":
      if (region)
        return `${base}/events?region=${region}${UTM_PARAMS.replace("?", "&")}`;
      return `${base}/events${UTM_PARAMS}`;

    case "olympics_query":
      return `${base}/2032${UTM_PARAMS}`;

    case "weather_query":
      if (region) return `${base}/explore/${region}${UTM_PARAMS}`;
      return `${base}${UTM_PARAMS}`;

    case "comparison":
    case "general_qld":
    case "transparency":
    case "feedback":
    default:
      return `${base}/ask${UTM_PARAMS}`;
  }
}
