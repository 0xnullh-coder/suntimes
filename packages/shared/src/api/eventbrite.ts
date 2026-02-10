import { TTLCache } from "./cache";

const EVENTS_TTL = 12 * 60 * 60 * 1000; // 12 hours

const eventsSearchCache = new TTLCache<EventbriteEvent[]>();

export interface EventbriteEvent {
  id: string;
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string | null;
  venueName: string | null;
  address: string | null;
  category: string | null;
  isFree: boolean;
  price: string | null;
}

const API_KEY = process.env.EVENTBRITE_API_KEY;

export async function searchEvents(
  lat: number,
  lng: number,
  dateFrom: string,
  dateTo: string,
  category?: string
): Promise<EventbriteEvent[]> {
  const cacheKey = `events:${lat}:${lng}:${dateFrom}:${dateTo}:${category || "all"}`;
  const cached = eventsSearchCache.get(cacheKey);
  if (cached) return cached;

  if (!API_KEY) {
    console.warn("EVENTBRITE_API_KEY not set — returning empty results");
    return [];
  }

  try {
    const url = new URL(
      "https://www.eventbriteapi.com/v3/events/search/"
    );
    url.searchParams.set("location.latitude", String(lat));
    url.searchParams.set("location.longitude", String(lng));
    url.searchParams.set("location.within", "50km");
    url.searchParams.set("start_date.range_start", dateFrom);
    url.searchParams.set("start_date.range_end", dateTo);
    if (category) {
      url.searchParams.set("categories", category);
    }
    url.searchParams.set("expand", "venue");

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.warn(`Eventbrite API returned ${res.status}`);
      return [];
    }

    const data = await res.json();
    const results: EventbriteEvent[] = (data.events || []).map(
      (e: Record<string, unknown>) => {
        const name = e.name as { text: string } | undefined;
        const desc = e.description as { text: string } | undefined;
        const start = e.start as { utc: string } | undefined;
        const end = e.end as { utc: string } | undefined;
        const venue = e.venue as Record<string, unknown> | undefined;
        const address = venue?.address as Record<string, string> | undefined;

        return {
          id: e.id as string,
          name: name?.text || "Untitled",
          description: desc?.text || "",
          url: (e.url as string) || "",
          startDate: start?.utc || "",
          endDate: end?.utc || null,
          venueName: (venue?.name as string) || null,
          address: address?.localized_address_display || null,
          category: null,
          isFree: (e.is_free as boolean) || false,
          price: (e.is_free as boolean) ? "Free" : null,
        };
      }
    );

    eventsSearchCache.set(cacheKey, results, EVENTS_TTL);
    return results;
  } catch (error) {
    console.warn("Eventbrite search failed:", error);
    return [];
  }
}
