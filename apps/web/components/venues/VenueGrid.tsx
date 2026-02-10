"use client";

import { useState } from "react";
import VenueCard from "./VenueCard";

interface VenueData {
  name: string;
  slug: string;
  suburb: string | null;
  type: string;
  priceLevel: string;
  suntimesRating: string | number;
  insiderTip: string;
  description: string;
  tags: string[] | null;
}

interface VenueGridProps {
  venues: VenueData[];
  filterOptions?: string[];
}

const DEFAULT_FILTERS = [
  { key: "all", label: "All" },
  { key: "restaurant", label: "Restaurants" },
  { key: "cafe", label: "Cafes" },
  { key: "bar", label: "Bars" },
  { key: "attraction", label: "Attractions" },
  { key: "market", label: "Markets" },
];

export default function VenueGrid({ venues, filterOptions }: VenueGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Build filter list from provided options or use defaults
  const filters = filterOptions
    ? [
        { key: "all", label: "All" },
        ...filterOptions.map((opt) => ({
          key: opt,
          label: opt.charAt(0).toUpperCase() + opt.slice(1) + "s",
        })),
      ]
    : DEFAULT_FILTERS;

  // Only show filter tabs that have matching venues (plus "All")
  const typesPresent = new Set(venues.map((v) => v.type));
  const visibleFilters = filters.filter(
    (f) => f.key === "all" || typesPresent.has(f.key)
  );

  const filteredVenues =
    activeFilter === "all"
      ? venues
      : venues.filter((v) => v.type === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      {visibleFilters.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {visibleFilters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-suntimes-teal text-white shadow-sm"
                    : "bg-suntimes-charcoal/5 text-suntimes-charcoal/70 hover:bg-suntimes-charcoal/10 hover:text-suntimes-charcoal"
                }`}
              >
                {filter.label}
                <span
                  className={`ml-1.5 text-xs ${
                    isActive
                      ? "text-white/70"
                      : "text-suntimes-charcoal/40"
                  }`}
                >
                  {filter.key === "all"
                    ? venues.length
                    : venues.filter((v) => v.type === filter.key).length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Venue grid */}
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVenues.map((venue) => (
            <VenueCard key={venue.slug} venue={venue} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-suntimes-charcoal/20 py-16 text-center">
          <p className="font-body text-suntimes-charcoal/50">
            No venues match this filter yet. Check back soon &mdash; we&rsquo;re
            always adding new spots.
          </p>
        </div>
      )}
    </div>
  );
}
