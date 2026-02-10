"use client";

import { ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface EventFiltersProps {
  regions: FilterOption[];
  categories: FilterOption[];
  onFilterChange: (filters: { region: string; category: string }) => void;
}

export default function EventFilters({
  regions,
  categories,
  onFilterChange,
}: EventFiltersProps) {
  function handleRegionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange({
      region: e.target.value,
      category:
        (document.getElementById("category-filter") as HTMLSelectElement)
          ?.value || "all",
    });
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange({
      region:
        (document.getElementById("region-filter") as HTMLSelectElement)
          ?.value || "all",
      category: e.target.value,
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Region filter */}
      <div className="relative">
        <select
          id="region-filter"
          onChange={handleRegionChange}
          className="appearance-none rounded-lg border border-suntimes-charcoal/15 bg-white py-2.5 pl-4 pr-10 font-body text-sm text-suntimes-charcoal focus:border-suntimes-teal focus:outline-none focus:ring-2 focus:ring-suntimes-teal/20"
        >
          <option value="all">All regions</option>
          {regions.map((region) => (
            <option key={region.value} value={region.value}>
              {region.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-suntimes-charcoal/40" />
      </div>

      {/* Category filter */}
      <div className="relative">
        <select
          id="category-filter"
          onChange={handleCategoryChange}
          className="appearance-none rounded-lg border border-suntimes-charcoal/15 bg-white py-2.5 pl-4 pr-10 font-body text-sm text-suntimes-charcoal focus:border-suntimes-teal focus:outline-none focus:ring-2 focus:ring-suntimes-teal/20"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-suntimes-charcoal/40" />
      </div>
    </div>
  );
}
