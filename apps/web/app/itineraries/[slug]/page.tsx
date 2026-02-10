import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { getDb, itineraries } from "@suntimes/shared";
import { Clock, Users, DollarSign, MapPin, ArrowRight } from "lucide-react";
import DayTimeline from "@/components/itineraries/DayTimeline";

interface ItineraryDay {
  day: number;
  title: string;
  stops: Array<{
    time: string;
    venueSlug?: string;
    activity: string;
    tip?: string;
    cost?: string;
  }>;
}

interface ItineraryRecord {
  id: string;
  title: string;
  slug: string | null;
  regionId: string | null;
  durationDays: number | null;
  description: string | null;
  targetAudience: string | null;
  budgetLevel: string | null;
  bestSeason: string | null;
  days: unknown;
  totalEstimatedCost: string | null;
  isFeatured: boolean | null;
}

const regionNames: Record<string, string> = {
  brisbane: "Brisbane",
  "gold-coast": "Gold Coast",
  "sunshine-coast": "Sunshine Coast",
  "tropical-north-qld": "Tropical North QLD",
  whitsundays: "Whitsundays",
  "fraser-coast": "Fraser Coast",
  "outback-qld": "Outback QLD",
};

async function getItinerary(slug: string): Promise<ItineraryRecord | null> {
  try {
    const db = getDb();
    const results = await db
      .select()
      .from(itineraries)
      .where(eq(itineraries.slug, slug))
      .limit(1);
    return (results[0] as ItineraryRecord) ?? null;
  } catch (error) {
    console.error("Failed to fetch itinerary:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const itinerary = await getItinerary(params.slug);

  if (!itinerary) {
    return { title: "Itinerary Not Found — Suntimes" };
  }

  return {
    title: `${itinerary.title} — Suntimes Itineraries`,
    description:
      itinerary.description ??
      `A curated ${itinerary.durationDays}-day itinerary for ${regionNames[itinerary.regionId ?? ""] ?? "Queensland"}.`,
  };
}

export default async function ItineraryPage({
  params,
}: {
  params: { slug: string };
}) {
  const itinerary = await getItinerary(params.slug);

  if (!itinerary) {
    notFound();
  }

  const regionName =
    regionNames[itinerary.regionId ?? ""] ?? itinerary.regionId ?? "Queensland";
  const days = (itinerary.days as ItineraryDay[]) ?? [];

  return (
    <div className="min-h-screen bg-suntimes-sand">
      {/* Hero */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <Link
            href="/itineraries"
            className="inline-flex items-center gap-1 font-body text-sm text-suntimes-teal transition-colors hover:text-suntimes-teal/80"
          >
            Itineraries
          </Link>

          <h1 className="mt-4 font-heading text-3xl font-bold text-suntimes-charcoal sm:text-4xl">
            {itinerary.title}
          </h1>

          {itinerary.description && (
            <p className="mt-4 font-body text-base leading-relaxed text-suntimes-charcoal/70 sm:text-lg">
              {itinerary.description}
            </p>
          )}

          {/* Meta strip */}
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-xl bg-suntimes-sand px-5 py-4">
            {/* Region */}
            <div className="flex items-center gap-2 text-suntimes-charcoal/70">
              <MapPin className="h-4 w-4 text-suntimes-teal" />
              <span className="font-body text-sm">{regionName}</span>
            </div>

            <span className="hidden text-suntimes-charcoal/20 sm:inline">|</span>

            {/* Duration */}
            {itinerary.durationDays && (
              <div className="flex items-center gap-2 text-suntimes-charcoal/70">
                <Clock className="h-4 w-4 text-suntimes-teal" />
                <span className="font-body text-sm">
                  {itinerary.durationDays}{" "}
                  {itinerary.durationDays === 1 ? "day" : "days"}
                </span>
              </div>
            )}

            <span className="hidden text-suntimes-charcoal/20 sm:inline">|</span>

            {/* Audience */}
            {itinerary.targetAudience && (
              <div className="flex items-center gap-2 text-suntimes-charcoal/70">
                <Users className="h-4 w-4 text-suntimes-teal" />
                <span className="font-body text-sm">
                  {itinerary.targetAudience}
                </span>
              </div>
            )}

            <span className="hidden text-suntimes-charcoal/20 sm:inline">|</span>

            {/* Budget */}
            {itinerary.budgetLevel && (
              <div className="flex items-center gap-2 text-suntimes-charcoal/70">
                <DollarSign className="h-4 w-4 text-suntimes-teal" />
                <span className="font-body text-sm capitalize">
                  {itinerary.budgetLevel}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {days.length > 0 ? (
            <DayTimeline days={days} />
          ) : (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="font-body text-suntimes-charcoal/60">
                Detailed daily itinerary coming soon. We&apos;re still testing
                every stop.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Total cost + CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Estimated cost */}
              {itinerary.totalEstimatedCost && (
                <div>
                  <p className="font-body text-xs uppercase tracking-wide text-suntimes-charcoal/50">
                    Estimated total cost
                  </p>
                  <p className="mt-1 font-heading text-2xl font-bold text-suntimes-charcoal">
                    {itinerary.totalEstimatedCost}
                  </p>
                  <p className="mt-0.5 font-body text-xs text-suntimes-charcoal/50">
                    Per person, approximate
                  </p>
                </div>
              )}

              {/* CTA */}
              <Link
                href="/ask"
                className="inline-flex items-center gap-2 rounded-lg bg-suntimes-teal px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-suntimes-teal/90"
              >
                Customise this trip
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
