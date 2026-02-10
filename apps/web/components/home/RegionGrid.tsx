import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface Region {
  id: string;
  name: string;
  description: string;
}

const regions: Region[] = [
  {
    id: "brisbane",
    name: "Brisbane",
    description:
      "Skip the tourist traps \u2014 James Street and Howard Smith Wharves are where it\u2019s at.",
  },
  {
    id: "gold-coast",
    name: "Gold Coast",
    description:
      "Burleigh Heads is the real heart. Incredible food, best headland walk in QLD.",
  },
  {
    id: "sunshine-coast",
    name: "Sunshine Coast",
    description:
      "The real Sunshine Coast is the hinterland \u2014 Maleny, Montville, Eumundi.",
  },
  {
    id: "tropical-north-qld",
    name: "Tropical North Queensland",
    description:
      "Port Douglas is where you want to stay. The Daintree is like nowhere else.",
  },
  {
    id: "whitsundays",
    name: "Whitsundays",
    description:
      "Whitehaven Beach really is that good. Hill Inlet at high tide is the shot.",
  },
  {
    id: "fraser-coast",
    name: "Fraser Coast",
    description:
      "Whale watching capital of Australia. K\u2019gari is a must-visit.",
  },
  {
    id: "outback-qld",
    name: "Outback Queensland",
    description: "Longreach and Winton are bucket-list Australia.",
  },
];

/** Accent colour per card index — cycles through the brand palette */
const accentColors = [
  "bg-suntimes-teal",
  "bg-suntimes-gold",
  "bg-suntimes-coral",
  "bg-suntimes-teal",
  "bg-suntimes-gold",
  "bg-suntimes-coral",
  "bg-suntimes-teal",
];

export default function RegionGrid() {
  return (
    <section className="bg-suntimes-sand px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-suntimes-teal">
            Regions
          </span>
          <h2 className="font-heading text-4xl font-bold text-suntimes-charcoal sm:text-5xl">
            Explore Queensland
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base text-suntimes-charcoal/60">
            Seven distinct regions, each with their own character. Tap in for
            local-level intel.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {regions.map((region, idx) => (
            <Link
              key={region.id}
              href={`/explore/${region.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md shadow-suntimes-charcoal/5 ring-1 ring-suntimes-charcoal/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-suntimes-teal/10 hover:ring-suntimes-teal/20"
            >
              {/* Colour accent bar */}
              <div className={`h-1.5 w-full ${accentColors[idx]}`} />

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-suntimes-teal" />
                  <h3 className="font-heading text-xl font-semibold text-suntimes-charcoal">
                    {region.name}
                  </h3>
                </div>

                <p className="flex-1 font-body text-sm leading-relaxed text-suntimes-charcoal/70">
                  {region.description}
                </p>

                <div className="mt-5 flex items-center gap-1 font-body text-sm font-semibold text-suntimes-teal transition-colors group-hover:text-suntimes-gold">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
