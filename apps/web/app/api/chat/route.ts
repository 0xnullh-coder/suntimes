import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PORTAL_CHAT_PROMPT } from "@suntimes/shared";

export const runtime = "nodejs";

// Rate limiting placeholder
// TODO: implement per-user rate limiting via portalUsers.chatQueriesToday

const VENUE_CONTEXT = `
TOP VENUES BY REGION (use these when recommending):

BRISBANE:
- Gauge (South Brisbane) — Modern Australian fine dining, tasting menu, $$$$. Insider tip: book the chef's counter.
- Same Same (Fortitude Valley) — Thai street food, vibrant atmosphere, $$. Insider tip: the pad see ew is the real star.
- Howard Smith Wharves — Waterfront precinct with bars and restaurants under the Story Bridge. Free entry.
- GOMA (South Bank) — Gallery of Modern Art. Free. Insider tip: the rooftop cinema runs in summer.
- Eat Street Northshore — Container market with 100+ food stalls. Friday/Saturday nights, $5 entry.
- Mount Coot-tha Lookout — Best city views, free. Insider tip: go at sunset on a weekday to avoid crowds.
- Lone Pine Koala Sanctuary — World's largest koala sanctuary. Insider tip: early morning feeds are the best.

GOLD COAST:
- Rick Shores (Burleigh Heads) — Asian-influenced seafood, absolute beachfront, $$$. Insider tip: the bug roll is legendary.
- The Collective (Palm Beach) — Brunch spot of dreams. Insider tip: go weekdays, weekends are mayhem.
- Burleigh Head National Park — Coastal walk, free. Insider tip: start from Tallebudgera Creek side for fewer people.
- Currumbin Wildlife Sanctuary — Classic Gold Coast family attraction. Insider tip: the lorikeet feeding at 8am is magic.
- Miami Marketta — Night market with street food and live music. Wednesday and Friday nights.

SUNSHINE COAST:
- Spirit House (Yandina) — Thai in a rainforest setting, $$$. Insider tip: book the cooking school, it's a cracker.
- Noosa Main Beach — One of the best beaches in Australia, free. Insider tip: the Noosa National Park walk starts right there.
- Eumundi Markets — Iconic Wednesday and Saturday markets. Insider tip: go Wednesday for locals, Saturday for the full experience.
- Mooloolaba — Beachside town with great seafood. The Spit is underrated.

TROPICAL NORTH QLD (CAIRNS):
- Ochre Restaurant (Cairns) — Native Australian cuisine with local ingredients, $$$. Insider tip: try the kangaroo.
- Great Barrier Reef day trips — Depart from Cairns or Port Douglas. Insider tip: Quicksilver to the outer reef is worth the extra cost.
- Daintree Rainforest — World Heritage rainforest, various tours. Insider tip: book a night walk for wildlife spotting.
- Cairns Esplanade Lagoon — Free public swimming pool on the waterfront. Perfect for families.
- Rusty's Markets (Cairns) — Fresh tropical produce market. Friday-Sunday. Insider tip: the smoothies are unreal.

WHITSUNDAYS:
- Whitehaven Beach — Consistently rated one of the world's best beaches. Insider tip: Hill Inlet lookout at low tide is the postcard shot.
- Heart Reef scenic flights — See the iconic heart-shaped reef from the air.
- Airlie Beach — Gateway town with a great lagoon and nightlife.

FRASER COAST:
- Fraser Island (K'gari) — World's largest sand island. Insider tip: Lake McKenzie early morning before the tours arrive.
- Hervey Bay whale watching — August to October. Insider tip: humpbacks are more active in the morning.

OUTBACK QLD:
- Longreach — Stockman's Hall of Fame and Qantas Founders Museum. Insider tip: the sunset dinner cruise on the Thomson River is special.
- Winton — Dinosaur country. The Australian Age of Dinosaurs museum is genuinely world-class.
`;

interface ChatRequestBody {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  region?: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The AI concierge is temporarily unavailable. We're sorting it out — check back shortly.",
      },
      { status: 503 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { messages, region } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages are required." },
      { status: 400 }
    );
  }

  // Build system prompt with venue context
  const regionClause = region
    ? `\nThe user is currently browsing the ${region} region. Prioritise recommendations for that area unless they ask about somewhere else.`
    : "";

  const systemPrompt = `${PORTAL_CHAT_PROMPT}${regionClause}\n\nVENUE DATABASE:\n${VENUE_CONTEXT}`;

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          stream.on("text", (text) => {
            controller.enqueue(encoder.encode(text));
          });

          // Wait for the stream to finish
          await stream.finalMessage();
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              "\n\nSorry, we hit a snag mid-answer. Give it another go."
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't reach our AI right now. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
