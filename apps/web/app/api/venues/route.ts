import { NextRequest, NextResponse } from "next/server";
import { getDb, venues, regions } from "@suntimes/shared";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");
    const type = searchParams.get("type");
    const slug = searchParams.get("slug");

    if (slug) {
      const result = await db
        .select()
        .from(venues)
        .where(eq(venues.slug, slug))
        .limit(1);
      if (result.length === 0) {
        return NextResponse.json({ error: "Venue not found" }, { status: 404 });
      }
      return NextResponse.json(result[0]);
    }

    let query = db.select().from(venues);

    if (region) {
      query = query.where(eq(venues.regionId, region)) as typeof query;
    }

    if (type) {
      query = query.where(eq(venues.type, type)) as typeof query;
    }

    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error("Venues API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch venues" },
      { status: 500 }
    );
  }
}
