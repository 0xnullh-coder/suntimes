"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-suntimes-teal via-suntimes-teal/90 to-suntimes-charcoal">
      {/* Decorative radial overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,166,35,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,107,107,0.08)_0%,transparent_50%)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        {/* Eyebrow tag */}
        <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-body text-sm font-medium tracking-wide text-white/90 backdrop-blur-sm">
          Queensland, Australia
        </span>

        <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Your Sunshine State{" "}
          <span className="bg-gradient-to-r from-suntimes-gold to-yellow-300 bg-clip-text text-transparent">
            Insider
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-white/80 sm:text-xl">
          Queensland&rsquo;s best food, events, hidden gems and weekend escapes
          &mdash; curated by locals, powered by AI.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/ask"
            className="group inline-flex items-center gap-3 rounded-full bg-suntimes-gold px-8 py-4 font-body text-base font-semibold text-suntimes-charcoal shadow-lg shadow-suntimes-gold/25 transition-all duration-300 hover:bg-yellow-400 hover:shadow-xl hover:shadow-suntimes-gold/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Ask us anything about Queensland
          </Link>
        </div>

        {/* Trust signals */}
        <p className="mt-8 font-body text-sm text-white/50">
          Powered by local knowledge &amp; AI — always free, always honest
        </p>
      </div>

      {/* Bottom fade into sand background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-suntimes-sand to-transparent" />
    </section>
  );
}
