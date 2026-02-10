"use client";

import Link from "next/link";
import { MapPin, Lightbulb, DollarSign } from "lucide-react";

interface Stop {
  time: string;
  venueSlug?: string;
  activity: string;
  tip?: string;
  cost?: string;
}

interface Day {
  day: number;
  title: string;
  stops: Stop[];
}

interface DayTimelineProps {
  days: Day[];
}

export default function DayTimeline({ days }: DayTimelineProps) {
  return (
    <div className="space-y-10">
      {days.map((day) => (
        <div key={day.day}>
          {/* Day header */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-suntimes-teal font-body text-sm font-bold text-white">
              {day.day}
            </span>
            <div>
              <p className="font-body text-xs font-medium uppercase tracking-wide text-suntimes-teal">
                Day {day.day}
              </p>
              <h3 className="font-heading text-lg font-semibold text-suntimes-charcoal">
                {day.title}
              </h3>
            </div>
          </div>

          {/* Stops timeline */}
          <div className="ml-5 border-l-2 border-suntimes-teal/20 pl-8">
            {day.stops.map((stop, stopIndex) => (
              <div
                key={stopIndex}
                className="relative pb-8 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[2.3rem] top-1 h-3 w-3 rounded-full border-2 border-suntimes-teal bg-white" />

                {/* Time */}
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-suntimes-teal">
                  {stop.time}
                </p>

                {/* Activity */}
                <div className="mt-1">
                  {stop.venueSlug ? (
                    <Link
                      href={`/venues/${stop.venueSlug}`}
                      className="inline-flex items-center gap-1.5 font-body text-base font-medium text-suntimes-charcoal transition-colors hover:text-suntimes-teal"
                    >
                      <MapPin className="h-4 w-4 shrink-0 text-suntimes-teal" />
                      {stop.activity}
                    </Link>
                  ) : (
                    <p className="font-body text-base font-medium text-suntimes-charcoal">
                      {stop.activity}
                    </p>
                  )}
                </div>

                {/* Cost */}
                {stop.cost && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-suntimes-charcoal/50">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span className="font-body text-xs">{stop.cost}</span>
                  </div>
                )}

                {/* Tip */}
                {stop.tip && (
                  <div className="mt-2 rounded-lg bg-suntimes-light-teal px-3 py-2">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-suntimes-teal" />
                      <p className="font-body text-xs leading-relaxed text-suntimes-teal">
                        {stop.tip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
