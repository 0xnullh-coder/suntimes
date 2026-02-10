"use client";

import { Sun } from "lucide-react";

interface RegionWeather {
  name: string;
  temp: number;
  condition: string;
  emoji: string;
}

const regions: RegionWeather[] = [
  { name: "Brisbane", temp: 28, condition: "Sunny", emoji: "\u2600\uFE0F" },
  { name: "Gold Coast", temp: 27, condition: "Sunny", emoji: "\u2600\uFE0F" },
  { name: "Cairns", temp: 31, condition: "Sunny", emoji: "\u2600\uFE0F" },
];

export default function WeatherStrip() {
  return (
    <section className="bg-suntimes-teal">
      <div className="mx-auto flex max-w-6xl items-center justify-around px-4 py-3">
        <div className="hidden items-center gap-2 sm:flex">
          <Sun className="h-4 w-4 text-suntimes-gold" />
          <span className="font-body text-xs font-medium uppercase tracking-widest text-white/70">
            Right now
          </span>
        </div>

        {regions.map((region) => (
          <div
            key={region.name}
            className="flex items-center gap-2 px-3 py-1"
          >
            <span className="text-base" role="img" aria-label={region.condition}>
              {region.emoji}
            </span>
            <span className="font-body text-sm font-medium text-white">
              {region.name}
            </span>
            <span className="font-body text-sm font-semibold text-suntimes-gold">
              {region.temp}&deg;C
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
