import Link from "next/link";
import { ArrowRight, Star, MapPin, Search } from "lucide-react";

import Hero from "../components/home/Hero";
import WeatherStrip from "../components/home/WeatherStrip";
import RegionGrid from "../components/home/RegionGrid";
import OlympicsCountdown from "../components/home/OlympicsCountdown";

/* ------------------------------------------------------------------ */
/*  Featured Picks — hardcoded editorial venue cards                   */
/* ------------------------------------------------------------------ */

interface FeaturedVenue {
  slug: string;
  name: string;
  category: string;
  region: string;
  blurb: string;
  rating: number;
}

const featuredPicks: FeaturedVenue[] = [
  {
    slug: "rick-shores-burleigh",
    name: "Rick Shores",
    category: "Restaurant",
    region: "Burleigh Heads",
    blurb:
      "Pan-Asian flavours right on the beach. The bug roll is legendary, and the sunset views are unbeatable.",
    rating: 4.8,
  },
  {
    slug: "felons-brewing-co",
    name: "Felons Brewing Co.",
    category: "Brewery",
    region: "Howard Smith Wharves, Brisbane",
    blurb:
      "Cold craft beer under the Story Bridge. Best riverside setting in Brisbane, no contest.",
    rating: 4.6,
  },
  {
    slug: "sailaway-port-douglas",
    name: "Sailaway Port Douglas",
    category: "Experience",
    region: "Port Douglas",
    blurb:
      "Small-group reef and snorkelling tours from Port Douglas. The Low Isles trip is pure magic.",
    rating: 4.9,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* ---- Hero ---- */}
      <Hero />

      {/* ---- Weather Strip ---- */}
      <WeatherStrip />

      {/* ---- Featured Picks ---- */}
      <section className="bg-suntimes-sand px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-14 text-center">
            <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-suntimes-coral">
              Editor&rsquo;s Picks
            </span>
            <h2 className="font-heading text-4xl font-bold text-suntimes-charcoal sm:text-5xl">
              This Week&rsquo;s Favourites
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-body text-base text-suntimes-charcoal/60">
              Hand-picked by locals who actually live here. No sponsored
              placements, ever.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPicks.map((venue) => (
              <article
                key={venue.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-suntimes-charcoal/5 ring-1 ring-suntimes-charcoal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-suntimes-coral/10 hover:ring-suntimes-coral/20"
              >
                {/* Colour banner — mimics a photo placeholder */}
                <div className="relative h-44 bg-gradient-to-br from-suntimes-teal to-suntimes-charcoal">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(245,166,35,0.2)_0%,transparent_70%)]" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-body text-xs font-semibold text-suntimes-teal backdrop-blur-sm">
                    {venue.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-1 flex items-center gap-1.5 text-suntimes-charcoal/50">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="font-body text-xs font-medium">
                      {venue.region}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-suntimes-charcoal">
                    {venue.name}
                  </h3>

                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-suntimes-charcoal/70">
                    {venue.blurb}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-suntimes-gold text-suntimes-gold" />
                      <span className="font-body text-sm font-semibold text-suntimes-charcoal">
                        {venue.rating}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 font-body text-sm font-semibold text-suntimes-teal transition-colors group-hover:text-suntimes-coral">
                      Read more
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Region Grid ---- */}
      <div className="bg-suntimes-sand">
        {/* Subtle divider */}
        <div className="mx-auto max-w-5xl border-t border-suntimes-charcoal/5" />
      </div>
      <RegionGrid />

      {/* ---- Olympics Countdown ---- */}
      <OlympicsCountdown />

      {/* ---- Ask CTA ---- */}
      <section className="relative overflow-hidden bg-gradient-to-br from-suntimes-charcoal to-suntimes-teal px-6 py-24 lg:py-32">
        {/* Decorative glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-suntimes-gold/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Got a question about{" "}
            <span className="bg-gradient-to-r from-suntimes-gold to-yellow-300 bg-clip-text text-transparent">
              Queensland?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-body text-lg text-white/70">
            Where to eat, what to see, where the locals go — ask our AI-powered
            concierge anything and get answers in seconds.
          </p>

          <Link
            href="/ask"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-suntimes-gold px-8 py-4 font-body text-base font-semibold text-suntimes-charcoal shadow-lg shadow-suntimes-gold/25 transition-all duration-300 hover:bg-yellow-400 hover:shadow-xl hover:shadow-suntimes-gold/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Ask us anything
          </Link>
        </div>
      </section>
    </main>
  );
}
