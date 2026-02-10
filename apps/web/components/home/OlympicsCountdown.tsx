"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";

/** July 23 2032 — Brisbane Olympics Opening Ceremony */
const OPENING_CEREMONY = new Date("2032-07-23T00:00:00+10:00");

function getDaysUntil(): number {
  const now = new Date();
  const diff = OPENING_CEREMONY.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function OlympicsCountdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(getDaysUntil());

    // Update once per hour — the number only changes daily
    const interval = setInterval(() => {
      setDays(getDaysUntil());
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-suntimes-light-teal px-6 py-20 lg:py-28">
      {/* Decorative rings */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[3px] border-suntimes-teal/10" />
      <div className="absolute -left-16 bottom-8 h-56 w-56 rounded-full border-[3px] border-suntimes-gold/10" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Olympic rings hint */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Flame className="h-6 w-6 text-suntimes-coral" />
          <span className="font-body text-sm font-semibold uppercase tracking-widest text-suntimes-teal">
            The Games are coming
          </span>
          <Flame className="h-6 w-6 text-suntimes-coral" />
        </div>

        <h2 className="font-heading text-4xl font-bold text-suntimes-charcoal sm:text-5xl">
          Brisbane 2032
        </h2>

        {/* Countdown number */}
        <div className="my-8">
          <span
            className="font-heading text-7xl font-bold leading-none text-suntimes-gold sm:text-8xl lg:text-9xl"
            aria-label={days !== null ? `${days} days` : "Calculating"}
          >
            {days !== null ? days.toLocaleString() : "\u2014"}
          </span>
        </div>

        <p className="font-body text-xl font-medium text-suntimes-charcoal/70">
          days until the Opening Ceremony
        </p>

        <Link
          href="/2032"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-suntimes-teal px-7 py-3.5 font-body text-sm font-semibold text-white shadow-lg shadow-suntimes-teal/20 transition-all duration-300 hover:bg-suntimes-charcoal hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        >
          Track Olympic progress
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
