import { getDb, venues } from "@suntimes/shared";
import { eq, and, ilike } from "drizzle-orm";

export async function getVenuesByRegion(regionId: string) {
  const db = getDb();
  return db
    .select()
    .from(venues)
    .where(eq(venues.regionId, regionId));
}

export async function getVenueBySlug(slug: string) {
  const db = getDb();
  const results = await db
    .select()
    .from(venues)
    .where(eq(venues.slug, slug))
    .limit(1);
  return results[0] || null;
}

export async function searchVenues(query: string, regionId?: string) {
  const db = getDb();
  const conditions = [ilike(venues.name, `%${query}%`)];
  if (regionId) {
    conditions.push(eq(venues.regionId, regionId));
  }
  return db
    .select()
    .from(venues)
    .where(and(...conditions));
}

export async function getVenuesByType(type: string, regionId?: string) {
  const db = getDb();
  const conditions = [eq(venues.type, type)];
  if (regionId) {
    conditions.push(eq(venues.regionId, regionId));
  }
  return db
    .select()
    .from(venues)
    .where(and(...conditions));
}

export function formatVenueForTweet(venue: {
  name: string;
  suburb: string | null;
  insiderTip: string;
  suntimesRating: string;
}): string {
  const location = venue.suburb ? ` in ${venue.suburb}` : "";
  return `${venue.name}${location} (${venue.suntimesRating}/10) — ${venue.insiderTip}`;
}
