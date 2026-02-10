import { DollarSign } from "lucide-react";

type PriceTier = "free" | "budget" | "moderate" | "upscale" | "luxury";

interface PriceLevelProps {
  level: PriceTier;
}

const tierConfig: Record<PriceTier, { count: number; label: string }> = {
  free: { count: 0, label: "Free" },
  budget: { count: 1, label: "Budget" },
  moderate: { count: 2, label: "Moderate" },
  upscale: { count: 3, label: "Upscale" },
  luxury: { count: 4, label: "Luxury" },
};

export default function PriceLevel({ level }: PriceLevelProps) {
  const { count, label } = tierConfig[level];

  if (count === 0) {
    return (
      <span
        className="inline-flex items-center rounded-full bg-suntimes-light-teal px-2.5 py-0.5 font-body text-xs font-semibold text-suntimes-teal"
        title={label}
      >
        Free
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-0.5" title={label}>
      {Array.from({ length: 4 }).map((_, i) => (
        <DollarSign
          key={i}
          className={`h-4 w-4 ${
            i < count
              ? "text-suntimes-gold"
              : "text-suntimes-charcoal/20"
          }`}
        />
      ))}
    </span>
  );
}
