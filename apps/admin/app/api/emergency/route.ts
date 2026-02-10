import { NextRequest, NextResponse } from "next/server";
import { getDb, systemConfig } from "@suntimes/shared";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { mode } = await request.json();

    if (typeof mode !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request: mode must be a boolean" },
        { status: 400 }
      );
    }

    const db = getDb();

    await db
      .update(systemConfig)
      .set({ value: mode ? "true" : "false" })
      .where(eq(systemConfig.key, "emergency_mode"));

    return NextResponse.json({ success: true, mode });
  } catch (error) {
    console.error("Error updating emergency mode:", error);
    return NextResponse.json(
      { error: "Failed to update emergency mode" },
      { status: 500 }
    );
  }
}
