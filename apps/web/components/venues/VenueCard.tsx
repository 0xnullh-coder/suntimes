import Link from "next/link";
import PriceLevel from "@/components/shared/PriceLevel";
import SuntimesRating from "@/components/shared/SuntimesRating";
import { MapPin, Quote } from "lucide-react";
import type { PriceLevel as PriceTier } from "@suntimes/shared";

interface VenueCardProps {
  venue: {
    name: string;
    slug: string;
    suburb: string | null;
    type: string;
    priceLevel: string;
    suntimesRating: string | number;
    insiderTip: string;
    description: string;
    tags: string[] | null;
  };
}

const typeLabels: Record<string, string> = {
  restaurant: "Restaurant",
  cafe: "Cafe",
  bar: "Bar",
  attraction: "Attraction",
  beach: "Beach",
  park: "Park",
  market: "Market",
  experience: "Experience",
  accommodation: "Accommodation",
};

const typeBgColors: Record<string, string> = {
  restaurant: "bg-suntimes-coral/10 text-suntimes-coral",
  cafe: "bg-amber-50 text-amber-700",
  bar: "bg-purple-50 text-purple-700",
  attraction: "bg-suntimes-light-teal text-suntimes-teal",
  beach: "bg-sky-50 text-sky-700",
  park: "bg-emerald-50 text-emerald-700",
  market: "bg-orange-50 text-orange-700",
  experience: "bg-rose-50 text-rose-700",
  accommodation: "bg-indigo-50 text-indigo-700",
};

export default function VenueCard({ venue }: VenueCardProps) {
  const rating =
    typeof venue.suntimesRating === "string"
      ? parseFloat(venue.suntimesRating)
      : venue.suntimesRating;

  const tags = venue.tags ?? [];

  return (
    <Link
      href={`/venues/${venue.slug}`}
      className="group flex flex-col rounded-xl bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Card header with type badge and rating */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-xl font-bold text-suntimes-charcoal leading-snug group-hover:text-suntimes-teal transition-colors">
            {venue.name}
          </h3>
          {venue.suburb && (
            <div className="flex items-center gap-1 text-suntimes-charcoal/60">
              <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="font-body text-sm">{venue.suburb}</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0 pt-0.5">
          <SuntimesRating rating={rating} />
        </div>
      </div>

      {/* Type badge and price */}
      <div className="flex items-center gap-2.5 px-5 pt-3">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-body text-xs font-semibold ${
            typeBgColors[venue.type] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {typeLabels[venue.type] ?? venue.type}
        </span>
        <PriceLevel level={venue.priceLevel as PriceTier} />
      </div>

      {/* Description */}
      <p className="px-5 pt-3 font-body text-sm leading-relaxed text-suntimes-charcoal/70 line-clamp-2">
        {venue.description}
      </p>

      {/* Insider tip */}
      <div className="mx-5 mt-3 flex gap-2 rounded-lg bg-suntimes-sand px-3 py-2.5">
        <Quote className="h-4 w-4 flex-shrink-0 text-suntimes-gold mt-0.5" />
        <p className="font-body text-sm italic leading-relaxed text-suntimes-charcoal/80 line-clamp-2">
          {venue.insiderTip}
        </p>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pt-3">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-suntimes-charcoal/5 px-2.5 py-0.5 font-body text-xs text-suntimes-charcoal/60"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="rounded-full px-2 py-0.5 font-body text-xs text-suntimes-charcoal/40">
              +{tags.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Bottom padding */}
      <div className="pb-5" />
    </Link>
  );
}
