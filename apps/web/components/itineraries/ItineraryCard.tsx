import Link from "next/link";
import { Clock, Users, DollarSign, MapPin } from "lucide-react";

interface ItineraryCardProps {
  itinerary: {
    title: string;
    slug: string;
    regionId: string;
    durationDays: number;
    description: string;
    targetAudience: string;
    budgetLevel: string;
    totalEstimatedCost: string;
  };
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

const budgetColors: Record<string, string> = {
  budget: "text-emerald-600",
  moderate: "text-suntimes-gold",
  upscale: "text-orange-600",
  luxury: "text-suntimes-coral",
};

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  const regionName = regionNames[itinerary.regionId] ?? itinerary.regionId;

  return (
    <Link
      href={`/itineraries/${itinerary.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
    >
      {/* Teal accent bar */}
      <div className="h-1.5 w-full bg-suntimes-teal" />

      <div className="flex flex-1 flex-col p-5">
        {/* Region */}
        <div className="flex items-center gap-1.5 text-suntimes-teal">
          <MapPin className="h-3.5 w-3.5" />
          <span className="font-body text-xs font-medium">{regionName}</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 font-heading text-lg font-semibold text-suntimes-charcoal group-hover:text-suntimes-teal">
          {itinerary.title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-suntimes-charcoal/70">
          {itinerary.description}
        </p>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-suntimes-charcoal/8 pt-4">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-suntimes-charcoal/60">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-body text-xs">
              {itinerary.durationDays} {itinerary.durationDays === 1 ? "day" : "days"}
            </span>
          </div>

          {/* Audience */}
          <div className="flex items-center gap-1.5 text-suntimes-charcoal/60">
            <Users className="h-3.5 w-3.5" />
            <span className="font-body text-xs">{itinerary.targetAudience}</span>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-1.5">
            <DollarSign
              className={`h-3.5 w-3.5 ${budgetColors[itinerary.budgetLevel] ?? "text-suntimes-charcoal/60"}`}
            />
            <span
              className={`font-body text-xs font-medium capitalize ${budgetColors[itinerary.budgetLevel] ?? "text-suntimes-charcoal/60"}`}
            >
              {itinerary.budgetLevel}
            </span>
          </div>
        </div>

        {/* Cost */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-body text-xs text-suntimes-charcoal/50">
            Estimated total
          </span>
          <span className="font-body text-sm font-semibold text-suntimes-charcoal">
            {itinerary.totalEstimatedCost}
          </span>
        </div>
      </div>
    </Link>
  );
}
