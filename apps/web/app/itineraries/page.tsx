import type { Metadata } from "next";
import ItineraryCard from "@/components/itineraries/ItineraryCard";

export const metadata: Metadata = {
  title: "Queensland Itineraries — Suntimes",
  description:
    "We've planned the trips so you don't have to. Every stop tested, every tip earned. Curated Queensland itineraries.",
};

const itineraries = [
  {
    title: "The Ultimate Brisbane Weekend",
    slug: "ultimate-brisbane-weekend",
    regionId: "brisbane",
    durationDays: 2,
    description:
      "Two packed days hitting Brisbane's best — from South Bank brekkie to Howard Smith Wharves sunset drinks, with GOMA and a hinterland detour thrown in. We've done this one a dozen times and it still slaps.",
    targetAudience: "Couples",
    budgetLevel: "moderate",
    totalEstimatedCost: "$450-$600",
  },
  {
    title: "Gold Coast Beyond the Beach",
    slug: "gold-coast-beyond-the-beach",
    regionId: "gold-coast",
    durationDays: 3,
    description:
      "Everyone does Surfers — we're taking you to the real Gold Coast. Burleigh food scene, Tallebudgera Creek, hinterland waterfalls and that sunset at Rick Shores. Three days, zero tourist traps.",
    targetAudience: "Friends",
    budgetLevel: "moderate",
    totalEstimatedCost: "$700-$950",
  },
  {
    title: "Cairns & the Reef: Family Adventure",
    slug: "cairns-reef-family-adventure",
    regionId: "tropical-north-qld",
    durationDays: 5,
    description:
      "Five days exploring Tropical North QLD with kids in tow. The Reef, Daintree, Kuranda railway, Cairns Esplanade lagoon — all the big hitters with realistic timing for little legs.",
    targetAudience: "Families",
    budgetLevel: "moderate",
    totalEstimatedCost: "$2,200-$2,800",
  },
  {
    title: "Sunshine Coast Slow Down",
    slug: "sunshine-coast-slow-down",
    regionId: "sunshine-coast",
    durationDays: 4,
    description:
      "Four days of Sunshine Coast at its best: Noosa National Park, Eumundi Markets, Glass House Mountains and Spirit House for dinner. This is the one when you need to properly switch off.",
    targetAudience: "Couples",
    budgetLevel: "upscale",
    totalEstimatedCost: "$1,400-$1,800",
  },
  {
    title: "Whitsundays Sailing Escape",
    slug: "whitsundays-sailing-escape",
    regionId: "whitsundays",
    durationDays: 3,
    description:
      "Three days on the water: Whitehaven Beach, Hill Inlet at low tide, snorkelling the fringing reefs and sleeping on a yacht. This is the trip that ruins you for all other holidays.",
    targetAudience: "Couples",
    budgetLevel: "upscale",
    totalEstimatedCost: "$1,800-$2,400",
  },
];

export default function ItinerariesPage() {
  return (
    <div className="min-h-screen bg-suntimes-sand">
      {/* Hero section */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-3xl font-bold text-suntimes-charcoal sm:text-4xl lg:text-5xl">
            Queensland Itineraries
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base text-suntimes-charcoal/70 sm:text-lg">
            We&apos;ve planned the trips so you don&apos;t have to. Every stop
            tested, every tip earned.
          </p>
        </div>
      </section>

      {/* Itinerary grid */}
      <section className="px-4 py-10 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {itineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.slug} itinerary={itinerary} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
