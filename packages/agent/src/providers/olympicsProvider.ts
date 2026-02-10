import { getDb, olympicsUpdates } from "@suntimes/shared";
import { eq } from "drizzle-orm";

export async function getOlympicsUpdates() {
  const db = getDb();
  return db.select().from(olympicsUpdates);
}

export async function getFeaturedOlympicsUpdates() {
  const db = getDb();
  return db
    .select()
    .from(olympicsUpdates)
    .where(eq(olympicsUpdates.isFeatured, true));
}

export function getOlympicsCountdown(): {
  days: number;
  formatted: string;
} {
  const olympicsDate = new Date("2032-07-23T00:00:00+10:00");
  const now = new Date();
  const diffMs = olympicsDate.getTime() - now.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return {
    days,
    formatted: `${days} days until Brisbane 2032`,
  };
}
