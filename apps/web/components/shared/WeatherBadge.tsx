import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind, Thermometer } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WeatherBadgeProps {
  temp: number;
  condition: string;
  regionName: string;
}

function getWeatherIcon(condition: string): LucideIcon {
  const lower = condition.toLowerCase();
  if (lower.includes("thunder") || lower.includes("storm")) return CloudLightning;
  if (lower.includes("snow") || lower.includes("hail")) return CloudSnow;
  if (lower.includes("rain") || lower.includes("shower")) return CloudRain;
  if (lower.includes("drizzle")) return CloudDrizzle;
  if (lower.includes("wind")) return Wind;
  if (lower.includes("cloud") || lower.includes("overcast")) return Cloud;
  if (lower.includes("sun") || lower.includes("clear") || lower.includes("fine")) return Sun;
  return Thermometer;
}

export default function WeatherBadge({ temp, condition, regionName }: WeatherBadgeProps) {
  const Icon = getWeatherIcon(condition);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-lg bg-suntimes-light-teal px-3 py-1.5"
      title={`${regionName}: ${temp}\u00B0C, ${condition}`}
    >
      <Icon className="h-4 w-4 text-suntimes-teal" />
      <span className="font-body text-sm font-semibold text-suntimes-charcoal">
        {temp}&deg;C
      </span>
      <span className="font-body text-xs text-suntimes-charcoal/60">
        {condition}
      </span>
    </div>
  );
}
