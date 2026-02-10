import Link from "next/link";

const FEATURES_FREE = [
  "3 AI chat queries per day",
  "Browse all venues and regions",
  "View itineraries",
  "Event listings",
  "2032 Olympics updates",
];

const FEATURES_PREMIUM = [
  "Unlimited AI chat queries",
  "Browse all venues and regions",
  "View itineraries",
  "Event listings",
  "2032 Olympics updates",
  "Save favourite venues",
  "Personalised recommendations",
  "Early access to new features",
  "Support independent journalism",
];

export default function PricingPage() {
  return (
    <div className="bg-suntimes-sand min-h-screen px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-heading text-4xl font-bold text-suntimes-charcoal md:text-5xl">
          Simple, Fair Pricing
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Most of Suntimes is free. Premium unlocks unlimited AI chat and
          personalised features for less than a flat white a month.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
        {/* Free Tier */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-suntimes-charcoal">
            Free
          </h2>
          <p className="mt-1 text-gray-500">Everything you need to explore</p>
          <p className="mt-6">
            <span className="font-heading text-4xl font-bold text-suntimes-charcoal">
              $0
            </span>
            <span className="text-gray-500"> / month</span>
          </p>
          <ul className="mt-8 space-y-3">
            {FEATURES_FREE.map((f) => (
              <li key={f} className="flex items-start gap-3 text-gray-700">
                <span className="mt-0.5 text-suntimes-teal">&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/ask"
            className="mt-8 block rounded-full border-2 border-suntimes-teal px-6 py-3 text-center font-medium text-suntimes-teal transition-colors hover:bg-suntimes-light-teal"
          >
            Get Started
          </Link>
        </div>

        {/* Premium Tier */}
        <div className="relative rounded-2xl bg-white p-8 shadow-lg ring-2 ring-suntimes-gold">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-suntimes-gold px-4 py-1 text-sm font-medium text-white">
            Most Popular
          </span>
          <h2 className="font-heading text-2xl font-bold text-suntimes-charcoal">
            Premium
          </h2>
          <p className="mt-1 text-gray-500">
            Unlimited AI + personalised picks
          </p>
          <p className="mt-6">
            <span className="font-heading text-4xl font-bold text-suntimes-charcoal">
              $9.99
            </span>
            <span className="text-gray-500"> AUD / month</span>
          </p>
          <ul className="mt-8 space-y-3">
            {FEATURES_PREMIUM.map((f) => (
              <li key={f} className="flex items-start gap-3 text-gray-700">
                <span className="mt-0.5 text-suntimes-gold">&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
          <button className="mt-8 block w-full rounded-full bg-suntimes-gold px-6 py-3 text-center font-medium text-white transition-colors hover:bg-suntimes-gold/90">
            Subscribe — $9.99/month
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            Cancel anytime. Powered by Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}
