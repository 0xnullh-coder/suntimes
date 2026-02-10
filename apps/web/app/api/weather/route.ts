import { NextRequest, NextResponse } from "next/server";
import { getCurrentWeather } from "@suntimes/shared";

export const runtime = "nodejs";

const REGION_STATIONS: Record<string, string> = {
  brisbane: "IDQ65388",
  "gold-coast": "IDQ65395",
  "sunshine-coast": "IDQ65362",
  "tropical-north-qld": "IDQ65268",
  whitsundays: "IDQ65316",
  "fraser-coast": "IDQ65354",
  "outback-qld": "IDQ65404",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region");

    if (region && REGION_STATIONS[region]) {
      const weather = await getCurrentWeather(REGION_STATIONS[region]);
      return NextResponse.json({ [region]: weather });
    }

    // Return weather for key regions
    const results: Record<string, unknown> = {};
    const keyRegions = ["brisbane", "gold-coast", "tropical-north-qld"];

    await Promise.all(
      keyRegions.map(async (r) => {
        results[r] = await getCurrentWeather(REGION_STATIONS[r]);
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
