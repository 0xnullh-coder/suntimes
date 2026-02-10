"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const OLYMPICS_DATE = new Date("2032-07-23T00:00:00+10:00");

const UPDATES = [
  {
    title: "Brisbane Arena — Victoria Park",
    category: "venue",
    region: "Brisbane",
    content:
      "New 17,000-seat arena under construction. Will host swimming, gymnastics, basketball finals. Completion 2031.",
    isFeatured: true,
  },
  {
    title: "Cross River Rail",
    category: "infrastructure",
    region: "Brisbane",
    content:
      "6 new stations, 10km of rail connecting Olympic venues. The Gabba 2 minutes from CBD by train. On track for 2032.",
    isFeatured: true,
  },
  {
    title: "The Gabba Redevelopment",
    category: "venue",
    region: "Brisbane",
    content:
      "Main athletics stadium for 2032. Design phase underway. Focus on legacy use for sports and entertainment.",
    isFeatured: true,
  },
  {
    title: "Cairns Basketball Preliminaries",
    category: "venue",
    region: "Tropical North Queensland",
    content:
      "Cairns Convention Centre confirmed for basketball preliminary rounds. Thousands of international visitors to TNQ.",
    isFeatured: false,
  },
  {
    title: "Gold Coast Venue Upgrades",
    category: "venue",
    region: "Gold Coast",
    content:
      "2018 Commonwealth Games venues being upgraded. Coomera Indoor Sports Centre and Robina Stadium confirmed.",
    isFeatured: false,
  },
];

function getCategoryColour(cat: string) {
  switch (cat) {
    case "venue":
      return "bg-suntimes-gold text-white";
    case "infrastructure":
      return "bg-suntimes-teal text-white";
    case "transport":
      return "bg-blue-500 text-white";
    case "policy":
      return "bg-gray-600 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

export default function Olympics2032Page() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const diff = OLYMPICS_DATE.getTime() - Date.now();
    setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, []);

  return (
    <div className="bg-suntimes-sand min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-suntimes-teal to-suntimes-charcoal px-4 py-20 text-center text-white">
        <h1 className="font-heading text-5xl font-bold md:text-7xl">
          Brisbane 2032
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Queensland is hosting the Olympics. We&apos;re tracking every venue,
          rail line, and milestone so you can plan ahead.
        </p>

        {/* Countdown */}
        <div className="mt-10">
          <span className="font-heading text-7xl font-bold text-suntimes-gold md:text-9xl">
            {daysLeft.toLocaleString()}
          </span>
          <p className="mt-2 text-xl text-white/70">
            days until the Opening Ceremony
          </p>
        </div>
      </section>

      {/* Updates Feed */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="font-heading text-3xl font-bold text-suntimes-charcoal">
          Latest Updates
        </h2>
        <p className="mt-2 text-gray-600">
          What we know so far about Brisbane 2032 — venues, infrastructure, and
          what it means for Queensland tourism.
        </p>

        <div className="mt-8 space-y-6">
          {UPDATES.map((update, i) => (
            <article
              key={i}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${getCategoryColour(update.category)}`}
                >
                  {update.category}
                </span>
                <span className="text-sm text-gray-500">{update.region}</span>
                {update.isFeatured && (
                  <span className="text-xs font-medium text-suntimes-gold">
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-heading mt-3 text-xl font-semibold text-suntimes-charcoal">
                {update.title}
              </h3>
              <p className="mt-2 text-gray-600">{update.content}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-suntimes-light-teal px-4 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-suntimes-charcoal">
          Planning Your 2032 Trip?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-600">
          It&apos;s never too early to start planning. Ask our AI concierge
          about venues, transport, accommodation, and what to expect.
        </p>
        <Link
          href="/ask"
          className="mt-6 inline-block rounded-full bg-suntimes-teal px-8 py-3 font-medium text-white transition-colors hover:bg-suntimes-teal/90"
        >
          Plan Your 2032 Trip
        </Link>
      </section>
    </div>
  );
}
