"use client";

import Link from "next/link";
import { X } from "lucide-react";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Events", href: "/events" },
  { label: "Itineraries", href: "/itineraries" },
  { label: "2032", href: "/2032" },
  { label: "Ask", href: "/ask" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white">
      {/* Header row with logo and close button */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-heading text-2xl font-bold text-suntimes-gold">
          Suntimes
        </span>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-suntimes-charcoal transition-colors hover:bg-suntimes-light-teal hover:text-suntimes-teal"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-1 flex-col items-center justify-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-heading text-3xl font-semibold text-suntimes-charcoal transition-colors hover:text-suntimes-teal"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Bottom tagline */}
      <div className="px-4 py-6 text-center">
        <p className="font-body text-sm text-suntimes-charcoal/60">
          Your Sunshine State Insider
        </p>
      </div>
    </div>
  );
}
