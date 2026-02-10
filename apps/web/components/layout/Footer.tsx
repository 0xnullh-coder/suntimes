import Link from "next/link";
import { Twitter } from "lucide-react";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-suntimes-charcoal/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Branding column */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-block">
              <span className="font-heading text-xl font-bold text-suntimes-gold">
                Suntimes
              </span>
            </Link>
            <p className="max-w-xs font-body text-sm leading-relaxed text-suntimes-charcoal/70">
              Curated by locals, powered by AI. We&rsquo;re transparent about
              that.
            </p>
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-body text-xs font-bold uppercase tracking-wider text-suntimes-charcoal/50">
              Links
            </h4>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-suntimes-charcoal transition-colors hover:text-suntimes-teal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-body text-xs font-bold uppercase tracking-wider text-suntimes-charcoal/50">
              Follow us
            </h4>
            <a
              href="https://twitter.com/SuntimesQLD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-suntimes-charcoal transition-colors hover:text-suntimes-teal"
            >
              <Twitter className="h-4 w-4" />
              @SuntimesQLD
            </a>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-10 border-t border-suntimes-charcoal/10 pt-6">
          <p className="font-body text-xs text-suntimes-charcoal/50">
            &copy; 2025 Suntimes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
