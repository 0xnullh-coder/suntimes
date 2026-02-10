import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Queensland | Suntimes",
  description:
    "Seven regions, endless stories. Explore Brisbane, the Gold Coast, Sunshine Coast, Tropical North, Whitsundays, Fraser Coast and Outback Queensland with our insider guides.",
};

const REGIONS = [
  {
    id: "brisbane",
    name: "Brisbane",
    tagline: "River city cool",
    description:
      "Queensland's capital has shed its sleepy-town reputation for good. World-class dining along Howard Smith Wharves, rooftop bars in Fortitude Valley, and a thriving arts scene in Woolloongabba. With the 2032 Olympics on the horizon, Brisbane is only getting started.",
    highlights: ["Howard Smith Wharves", "South Bank", "Fortitude Valley"],
    bestFor: "Foodies & culture seekers",
  },
  {
    id: "gold-coast",
    name: "Gold Coast",
    tagline: "More than the glitter strip",
    description:
      "Yes, there are the beaches and the theme parks. But push past Surfers Paradise and you'll find one of Australia's most exciting food scenes, a world-class hinterland, and surf breaks that locals guard jealously. We'll show you where to look.",
    highlights: ["Burleigh Heads", "Tamborine Mountain", "Currumbin"],
    bestFor: "Beach lovers & families",
  },
  {
    id: "sunshine-coast",
    name: "Sunshine Coast",
    tagline: "Laid-back and proud of it",
    description:
      "The Sunshine Coast does things at its own pace, and that's exactly the point. Farm-to-table restaurants in the hinterland, pristine beaches without the crowds, and Noosa — a town that somehow makes relaxation feel like an art form.",
    highlights: ["Noosa", "Maleny", "Mooloolaba"],
    bestFor: "Couples & slow travellers",
  },
  {
    id: "tropical-north-qld",
    name: "Tropical North Queensland",
    tagline: "Where the reef meets the rainforest",
    description:
      "Two World Heritage sites collide in the most spectacular way. Cairns is the gateway, but the real magic is out on the reef, up in the Daintree, or in the surprisingly brilliant restaurant scene that's emerged in Port Douglas. This is bucket-list territory.",
    highlights: ["Great Barrier Reef", "Daintree", "Port Douglas"],
    bestFor: "Adventure seekers & nature lovers",
  },
  {
    id: "whitsundays",
    name: "Whitsundays",
    tagline: "Paradise, no filter needed",
    description:
      "Seventy-four islands, turquoise water that doesn't need a photo filter, and Whitehaven Beach — regularly voted among the world's best. Whether you're sailing, snorkelling, or just floating, the Whitsundays deliver on every promise.",
    highlights: ["Whitehaven Beach", "Heart Reef", "Airlie Beach"],
    bestFor: "Romantics & water lovers",
  },
  {
    id: "fraser-coast",
    name: "Fraser Coast",
    tagline: "Wild and untouched",
    description:
      "Home to K'gari (Fraser Island), the world's largest sand island and a UNESCO World Heritage site. Whale watching from Hervey Bay between July and November is genuinely life-changing. The Fraser Coast is Queensland at its most raw and magnificent.",
    highlights: ["K'gari (Fraser Island)", "Hervey Bay", "Bundaberg"],
    bestFor: "Nature enthusiasts & whale watchers",
  },
  {
    id: "outback-qld",
    name: "Outback Queensland",
    tagline: "Red dirt and real stories",
    description:
      "This is where Australia's story was written — in the dust of Longreach, the opal fields of Winton, and the vast star-filled skies that stretch forever. It's not for everyone, and that's what makes it special. If you want authentic, this is it.",
    highlights: ["Longreach", "Winton", "Birdsville"],
    bestFor: "Road trippers & history buffs",
  },
];

export default function ExplorePage() {
  return (
    <div className="bg-suntimes-sand">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-suntimes-teal via-suntimes-teal/95 to-suntimes-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,166,35,0.15)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore Queensland
          </h1>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-white/80 sm:text-xl">
            Seven regions, endless stories. We&rsquo;ve done the legwork so you
            don&rsquo;t have to.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-suntimes-sand to-transparent" />
      </section>

      {/* Region cards grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {REGIONS.map((region, index) => (
            <Link
              key={region.id}
              href={`/explore/${region.id}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Decorative gradient bar */}
              <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-suntimes-teal via-suntimes-gold to-suntimes-coral opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex flex-col p-6 sm:p-8">
                {/* Region header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-body text-xs font-bold uppercase tracking-widest text-suntimes-teal">
                      {region.tagline}
                    </p>
                    <h2 className="mt-1.5 font-heading text-2xl font-bold text-suntimes-charcoal sm:text-3xl">
                      {region.name}
                    </h2>
                  </div>
                  <div className="flex-shrink-0 rounded-full bg-suntimes-teal/10 p-2.5 transition-colors group-hover:bg-suntimes-teal group-hover:text-white">
                    <ArrowRight className="h-5 w-5 text-suntimes-teal transition-colors group-hover:text-white" />
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 font-body text-sm leading-relaxed text-suntimes-charcoal/70 sm:text-base">
                  {region.description}
                </p>

                {/* Highlights and metadata */}
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-suntimes-gold" />
                    <span className="font-body text-xs text-suntimes-charcoal/60">
                      {region.highlights.join(" \u00B7 ")}
                    </span>
                  </div>
                  <span className="rounded-full bg-suntimes-sand px-3 py-1 font-body text-xs font-medium text-suntimes-charcoal/70">
                    {region.bestFor}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 text-center shadow sm:p-12">
          <h2 className="font-heading text-2xl font-bold text-suntimes-charcoal sm:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-suntimes-charcoal/70">
            Tell us what you&rsquo;re into and we&rsquo;ll point you in the
            right direction. Our AI concierge knows every corner of Queensland.
          </p>
          <Link
            href="/ask"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-suntimes-gold px-8 py-3.5 font-body text-sm font-semibold text-suntimes-charcoal shadow-lg shadow-suntimes-gold/20 transition-all duration-300 hover:bg-yellow-400 hover:shadow-xl hover:-translate-y-0.5"
          >
            Ask us anything
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
