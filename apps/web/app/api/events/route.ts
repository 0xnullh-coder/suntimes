import { NextRequest, NextResponse } from "next/server";
import { getDb, events } from "@suntimes/shared";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");
    const category = searchParams.get("category");

    let query = db.select().from(events);

    if (region) {
      query = query.where(eq(events.regionId, region)) as typeof query;
    }

    if (category) {
      query = query.where(eq(events.category, category)) as typeof query;
    }

    const results = await query;
    return NextResponse.json(results);
  } catch (error) {
    console.error("Events API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
