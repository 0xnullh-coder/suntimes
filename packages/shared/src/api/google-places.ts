import { TTLCache } from "./cache";

const PLACES_TTL = 24 * 60 * 60 * 1000; // 24 hours

const nearbyCache = new TTLCache<PlaceResult[]>();
const detailsCache = new TTLCache<PlaceDetails | null>();

export interface PlaceResult {
  placeId: string;
  name: string;
  rating: number;
  userRatingsTotal: number;
  vicinity: string;
  types: string[];
  location: { lat: number; lng: number };
}

export interface PlaceDetails {
  placeId: string;
  name: string;
  formattedAddress: string;
  formattedPhone: string | null;
  website: string | null;
  rating: number;
  userRatingsTotal: number;
  openingHours: string[] | null;
  reviews: Array<{
    author: string;
    rating: number;
    text: string;
  }>;
}

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function searchNearby(
  lat: number,
  lng: number,
  type: string,
  radius: number = 5000
): Promise<PlaceResult[]> {
  const cacheKey = `nearby:${lat}:${lng}:${type}:${radius}`;
  const cached = nearbyCache.get(cacheKey);
  if (cached) return cached;

  if (!API_KEY) {
    console.warn("GOOGLE_PLACES_API_KEY not set — returning empty results");
    return [];
  }

  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    );
    url.searchParams.set("location", `${lat},${lng}`);
    url.searchParams.set("radius", String(radius));
    url.searchParams.set("type", type);
    url.searchParams.set("key", API_KEY);

    const res = await fetch(url.toString(), {
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();

    if (data.status !== "OK") {
      console.warn(`Google Places API: ${data.status}`);
      return [];
    }

    const results: PlaceResult[] = (data.results || []).map(
      (r: Record<string, unknown>) => ({
        placeId: r.place_id as string,
        name: r.name as string,
        rating: (r.rating as number) || 0,
        userRatingsTotal: (r.user_ratings_total as number) || 0,
        vicinity: (r.vicinity as string) || "",
        types: (r.types as string[]) || [],
        location: (
          r.geometry as { location: { lat: number; lng: number } }
        ).location,
      })
    );

    nearbyCache.set(cacheKey, results, PLACES_TTL);
    return results;
  } catch (error) {
    console.warn("Google Places search failed:", error);
    return [];
  }
}

export async function getPlaceDetails(
  placeId: string
): Promise<PlaceDetails | null> {
  const cached = detailsCache.get(placeId);
  if (cached !== null) return cached;

  if (!API_KEY) {
    console.warn("GOOGLE_PLACES_API_KEY not set");
    return null;
  }

  try {
    const url = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json"
    );
    url.searchParams.set("place_id", placeId);
    url.searchParams.set(
      "fields",
      "place_id,name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,opening_hours,reviews"
    );
    url.searchParams.set("key", API_KEY);

    const res = await fetch(url.toString(), {
      signal: AbortSignal.timeout(10000),
    });
    const data = await res.json();

    if (data.status !== "OK") {
      console.warn(`Google Places Details: ${data.status}`);
      return null;
    }

    const r = data.result;
    const details: PlaceDetails = {
      placeId: r.place_id,
      name: r.name,
      formattedAddress: r.formatted_address || "",
      formattedPhone: r.formatted_phone_number || null,
      website: r.website || null,
      rating: r.rating || 0,
      userRatingsTotal: r.user_ratings_total || 0,
      openingHours: r.opening_hours?.weekday_text || null,
      reviews: (r.reviews || []).map(
        (rev: Record<string, unknown>) => ({
          author: rev.author_name as string,
          rating: rev.rating as number,
          text: rev.text as string,
        })
      ),
    };

    detailsCache.set(placeId, details, PLACES_TTL);
    return details;
  } catch (error) {
    console.warn("Google Places details failed:", error);
    return null;
  }
}
