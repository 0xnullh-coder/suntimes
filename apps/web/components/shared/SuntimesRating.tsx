interface SuntimesRatingProps {
  rating: number;
}

export default function SuntimesRating({ rating }: SuntimesRatingProps) {
  const clamped = Math.min(10, Math.max(1, Math.round(rating * 10) / 10));

  return (
    <span className="inline-flex items-baseline gap-0.5 font-body">
      <span className="text-lg font-bold text-suntimes-gold">{clamped}</span>
      <span className="text-sm text-suntimes-charcoal/50">/10</span>
    </span>
  );
}
