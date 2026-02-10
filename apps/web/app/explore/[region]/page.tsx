import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getDb,
  venues,
  regions,
  events,
  itineraries,
} from "@suntimes/shared";
import { eq } from "drizzle-orm";
import VenueGrid from "@/components/venues/VenueGrid";
import {
  Sun,
  Thermometer,
  Droplets,
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  MessageCircle,
  Route,
} from "lucide-react";

interface RegionPageProps {
  params: { region: string };
}

// Hardcoded weather while BOM integration is pending
const WEATHER_DATA: Record<
  string,
  { temp: number; condition: string; humidity: number; bestMonths: string }
> = {
  brisbane: {
    temp: 28,
    condition: "Sunny",
    humidity: 62,
    bestMonths: "Mar-May, Sep-Nov",
  },
  "gold-coast": {
    temp: 27,
    condition: "Partly Cloudy",
    humidity: 68,
    bestMonths: "Apr-Jun, Sep-Nov",
  },
  "sunshine-coast": {
    temp: 27,
    condition: "Sunny",
    humidity: 65,
    bestMonths: "Apr-Jun, Sep-Nov",
  },
  "tropical-north-qld": {
    temp: 31,
    condition: "Humid & Warm",
    humidity: 78,
    bestMonths: "May-Oct (dry season)",
  },
  whitsundays: {
    temp: 29,
    condition: "Warm & Clear",
    humidity: 72,
    bestMonths: "Jun-Oct",
  },
  "fraser-coast": {
    temp: 26,
    condition: "Clear",
    humidity: 60,
    bestMonths: "Jul-Nov (whale season)",
  },
  "outback-qld": {
    temp: 34,
    condition: "Hot & Dry",
    humidity: 25,
    bestMonths: "Apr-Sep (winter)",
  },
};

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const db = getDb();
  const [region] = await db
    .select()
    .from(regions)
    .where(eq(regions.id, params.region))
    .limit(1);

  if (!region) {
    return { title: "Region Not Found | Suntimes" };
  }

  return {
    title: `${region.name} Travel Guide | Suntimes`,
    description:
      region.insiderSummary ??
      `Discover the best of ${region.name} with Suntimes. Local recommendations, insider tips, and curated guides.`,
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const db = getDb();

  // Fetch region data
  const [region] = await db
    .select()
    .from(regions)
    .where(eq(regions.id, params.region))
    .limit(1);

  if (!region) {
    notFound();
  }

  // Fetch venues, events, and itineraries in parallel
  const [regionVenues, regionEvents, regionItineraries] = await Promise.all([
    db.select().from(venues).where(eq(venues.regionId, region.id)),
    db.select().from(events).where(eq(events.regionId, region.id)),
    db.select().from(itineraries).where(eq(itineraries.regionId, region.id)),
  ]);

  const weather = WEATHER_DATA[region.id] ?? {
    temp: 26,
    condition: "Pleasant",
    humidity: 55,
    bestMonths: "Year-round",
  };

  return (
    <div className="bg-suntimes-sand">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-suntimes-teal via-suntimes-teal/95 to-suntimes-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,166,35,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,107,107,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 font-body text-sm text-white/50">
            <Link
              href="/explore"
              className="transition-colors hover:text-white/80"
            >
              Explore
            </Link>
            <span>/</span>
            <span className="text-white/70">{region.name}</span>
          </nav>

          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {region.name}
          </h1>

          {region.insiderSummary && (
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-white/80 sm:text-xl">
              {region.insiderSummary}
            </p>
          )}

          {!region.insiderSummary && region.description && (
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-white/80 sm:text-xl">
              {region.description}
            </p>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-suntimes-sand to-transparent" />
      </section>

      {/* Weather section */}
      <section className="mx-auto max-w-7xl px-4 -mt-8 relative z-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow sm:p-8">
          <h2 className="font-body text-xs font-bold uppercase tracking-widest text-suntimes-charcoal/50">
            Current conditions
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-suntimes-gold/10 p-2.5">
                <Sun className="h-5 w-5 text-suntimes-gold" />
              </div>
              <div>
                <p className="font-body text-xs text-suntimes-charcoal/50">
                  Weather
                </p>
                <p className="font-body text-sm font-semibold text-suntimes-charcoal">
                  {weather.condition}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-suntimes-coral/10 p-2.5">
                <Thermometer className="h-5 w-5 text-suntimes-coral" />
              </div>
              <div>
                <p className="font-body text-xs text-suntimes-charcoal/50">
                  Temperature
                </p>
                <p className="font-body text-sm font-semibold text-suntimes-charcoal">
                  {weather.temp}&deg;C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-suntimes-teal/10 p-2.5">
                <Droplets className="h-5 w-5 text-suntimes-teal" />
              </div>
              <div>
                <p className="font-body text-xs text-suntimes-charcoal/50">
                  Humidity
                </p>
                <p className="font-body text-sm font-semibold text-suntimes-charcoal">
                  {weather.humidity}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-2.5">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-body text-xs text-suntimes-charcoal/50">
                  Best time to visit
                </p>
                <p className="font-body text-sm font-semibold text-suntimes-charcoal">
                  {region.bestTimeToVisit ?? weather.bestMonths}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venues section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-bold text-suntimes-charcoal">
            Our picks in {region.name}
          </h2>
          <p className="mt-2 font-body text-suntimes-charcoal/60">
            Every spot personally vetted. No pay-for-play, no sponsored listings.
          </p>
        </div>

        {regionVenues.length > 0 ? (
          <VenueGrid venues={regionVenues} />
        ) : (
          <div className="rounded-xl border border-dashed border-suntimes-charcoal/20 py-16 text-center">
            <p className="font-body text-suntimes-charcoal/50">
              We&rsquo;re still scouting this region. Venue recommendations
              coming soon.
            </p>
          </div>
        )}
      </section>

      {/* Events section */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-bold text-suntimes-charcoal">
            Upcoming events
          </h2>
          <p className="mt-2 font-body text-suntimes-charcoal/60">
            What&rsquo;s happening in {region.name} right now and in the weeks
            ahead.
          </p>
        </div>

        {regionEvents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regionEvents.slice(0, 6).map((event) => (
              <div
                key={event.id}
                className="flex flex-col rounded-xl bg-white p-5 shadow transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-lg bg-suntimes-coral/10 p-2">
                    <Calendar className="h-4 w-4 text-suntimes-coral" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-bold text-suntimes-charcoal leading-snug">
                      {event.name}
                    </h3>
                    {event.startDate && (
                      <p className="mt-1 flex items-center gap-1 font-body text-xs text-suntimes-charcoal/50">
                        <Clock className="h-3 w-3" />
                        {new Date(event.startDate).toLocaleDateString("en-AU", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    {event.venueName && (
                      <p className="mt-0.5 flex items-center gap-1 font-body text-xs text-suntimes-charcoal/50">
                        <MapPin className="h-3 w-3" />
                        {event.venueName}
                      </p>
                    )}
                  </div>
                </div>

                {event.description && (
                  <p className="mt-3 font-body text-sm leading-relaxed text-suntimes-charcoal/70 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="rounded-full bg-suntimes-charcoal/5 px-2.5 py-0.5 font-body text-xs font-medium capitalize text-suntimes-charcoal/60">
                    {event.category}
                  </span>
                  {event.price && (
                    <span className="font-body text-sm font-semibold text-suntimes-teal">
                      {event.price}
                    </span>
                  )}
                </div>

                {event.isSuntimesPick && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-suntimes-gold/10 px-3 py-1.5">
                    <Sun className="h-3.5 w-3.5 text-suntimes-gold" />
                    <span className="font-body text-xs font-semibold text-suntimes-gold">
                      Suntimes Pick
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-suntimes-charcoal/20 py-16 text-center">
            <p className="font-body text-suntimes-charcoal/50">
              No upcoming events listed yet. We&rsquo;re on it.
            </p>
          </div>
        )}
      </section>

      {/* Itineraries section */}
      {regionItineraries.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-heading text-3xl font-bold text-suntimes-charcoal">
              Curated itineraries
            </h2>
            <p className="mt-2 font-body text-suntimes-charcoal/60">
              Tried-and-tested trip plans from people who actually live here.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regionItineraries.slice(0, 3).map((itinerary) => (
              <div
                key={itinerary.id}
                className="group flex flex-col rounded-xl bg-white p-6 shadow transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-lg bg-suntimes-teal/10 p-2">
                    <Route className="h-5 w-5 text-suntimes-teal" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-suntimes-charcoal leading-snug">
                      {itinerary.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {itinerary.durationDays && (
                        <span className="font-body text-xs text-suntimes-charcoal/50">
                          {itinerary.durationDays}{" "}
                          {itinerary.durationDays === 1 ? "day" : "days"}
                        </span>
                      )}
                      {itinerary.budgetLevel && (
                        <>
                          <span className="text-suntimes-charcoal/20">
                            &middot;
                          </span>
                          <span className="font-body text-xs capitalize text-suntimes-charcoal/50">
                            {itinerary.budgetLevel}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {itinerary.description && (
                  <p className="mt-3 font-body text-sm leading-relaxed text-suntimes-charcoal/70 line-clamp-3">
                    {itinerary.description}
                  </p>
                )}

                {itinerary.targetAudience && (
                  <p className="mt-auto pt-4 font-body text-xs text-suntimes-charcoal/40">
                    Perfect for: {itinerary.targetAudience}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ask CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-br from-suntimes-teal to-suntimes-teal/90 p-8 text-center shadow-lg sm:p-12">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <MessageCircle className="h-7 w-7 text-white" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Ask about {region.name}
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-white/75">
            &ldquo;Where should we eat near the beach?&rdquo; &ldquo;What&rsquo;s
            on this weekend?&rdquo; Ask us anything &mdash; our AI concierge has
            local knowledge baked in.
          </p>
          <Link
            href="/ask"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-suntimes-gold px-8 py-3.5 font-body text-sm font-semibold text-suntimes-charcoal shadow-lg shadow-black/10 transition-all duration-300 hover:bg-yellow-400 hover:shadow-xl hover:-translate-y-0.5"
          >
            Ask us anything
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
