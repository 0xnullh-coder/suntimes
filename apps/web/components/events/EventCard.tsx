import { Star, MapPin, Clock, DollarSign, Lightbulb } from "lucide-react";
import type { EventCategory } from "@suntimes/shared";

interface EventCardEvent {
  id: string;
  name: string;
  category: EventCategory;
  description: string;
  venueName: string;
  recurrencePattern: string | null;
  price: string | null;
  isSuntimesPick: boolean;
  insiderTip: string | null;
}

interface EventCardProps {
  event: EventCardEvent;
}

const categoryLabels: Record<EventCategory, string> = {
  food: "Food & Drink",
  music: "Music",
  markets: "Markets",
  family: "Family",
  outdoor: "Outdoor",
  arts: "Arts & Culture",
  sports: "Sports",
  festival: "Festival",
};

const categoryColors: Record<EventCategory, string> = {
  food: "bg-orange-100 text-orange-700",
  music: "bg-purple-100 text-purple-700",
  markets: "bg-emerald-100 text-emerald-700",
  family: "bg-blue-100 text-blue-700",
  outdoor: "bg-lime-100 text-lime-700",
  arts: "bg-pink-100 text-pink-700",
  sports: "bg-red-100 text-red-700",
  festival: "bg-amber-100 text-amber-700",
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Suntimes Pick badge */}
      {event.isSuntimesPick && (
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-suntimes-gold px-2.5 py-1">
          <Star className="h-3 w-3 fill-white text-white" />
          <span className="font-body text-xs font-semibold text-white">
            Suntimes Pick
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category badge */}
        <span
          className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 font-body text-xs font-medium ${
            categoryColors[event.category]
          }`}
        >
          {categoryLabels[event.category]}
        </span>

        {/* Title */}
        <h3 className="mt-3 font-heading text-lg font-semibold text-suntimes-charcoal">
          {event.name}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-suntimes-charcoal/70">
          {event.description}
        </p>

        {/* Meta info */}
        <div className="mt-4 flex flex-col gap-2">
          {/* Venue */}
          <div className="flex items-center gap-2 text-suntimes-charcoal/60">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="font-body text-xs">{event.venueName}</span>
          </div>

          {/* Recurrence */}
          {event.recurrencePattern && (
            <div className="flex items-center gap-2 text-suntimes-charcoal/60">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="font-body text-xs">
                {event.recurrencePattern}
              </span>
            </div>
          )}

          {/* Price */}
          {event.price && (
            <div className="flex items-center gap-2 text-suntimes-charcoal/60">
              <DollarSign className="h-3.5 w-3.5 shrink-0" />
              <span className="font-body text-xs">{event.price}</span>
            </div>
          )}
        </div>

        {/* Insider tip */}
        {event.insiderTip && (
          <div className="mt-4 rounded-lg bg-suntimes-light-teal px-3 py-2.5">
            <div className="flex items-start gap-2">
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-suntimes-teal" />
              <p className="font-body text-xs leading-relaxed text-suntimes-teal">
                {event.insiderTip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
