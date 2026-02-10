import { getDb, events } from "@suntimes/shared";
import { eq } from "drizzle-orm";

export async function getEventsByRegion(regionId: string) {
  const db = getDb();
  return db
    .select()
    .from(events)
    .where(eq(events.regionId, regionId));
}

export async function getUpcomingEvents(regionId?: string) {
  const db = getDb();
  if (regionId) {
    return db
      .select()
      .from(events)
      .where(eq(events.regionId, regionId));
  }
  return db.select().from(events);
}

export async function getSuntimesPicks() {
  const db = getDb();
  return db
    .select()
    .from(events)
    .where(eq(events.isSuntimesPick, true));
}
