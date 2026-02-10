import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDb, venues, regions } from "@suntimes/shared";
import { eq } from "drizzle-orm";
import SuntimesRating from "@/components/shared/SuntimesRating";
import PriceLevel from "@/components/shared/PriceLevel";
import VenueCard from "@/components/venues/VenueCard";
import type { PriceLevel as PriceTier } from "@suntimes/shared";
import {
  MapPin,
  Phone,
  Globe,
  ArrowLeft,
  Quote,
  Map,
  Tag,
  UtensilsCrossed,
} from "lucide-react";

interface VenuePageProps {
  params: { slug: string };
}

const typeLabels: Record<string, string> = {
  restaurant: "Restaurant",
  cafe: "Cafe",
  bar: "Bar",
  attraction: "Attraction",
  beach: "Beach",
  park: "Park",
  market: "Market",
  experience: "Experience",
  accommodation: "Accommodation",
};

export async function generateMetadata({
  params,
}: VenuePageProps): Promise<Metadata> {
  const db = getDb();
  const [venue] = await db
    .select()
    .from(venues)
    .where(eq(venues.slug, params.slug))
    .limit(1);

  if (!venue) {
    return { title: "Venue Not Found | Suntimes" };
  }

  return {
    title: `${venue.name} | Suntimes`,
    description: venue.insiderTip,
  };
}

export default async function VenuePage({ params }: VenuePageProps) {
  const db = getDb();

  // Fetch venue by slug
  const [venue] = await db
    .select()
    .from(venues)
    .where(eq(venues.slug, params.slug))
    .limit(1);

  if (!venue) {
    notFound();
  }

  // Fetch region name and related venues in parallel
  const [regionResult, relatedVenues] = await Promise.all([
    venue.regionId
      ? db
          .select()
          .from(regions)
          .where(eq(regions.id, venue.regionId))
          .limit(1)
      : Promise.resolve([]),
    venue.regionId
      ? db
          .select()
          .from(venues)
          .where(eq(venues.regionId, venue.regionId))
          .limit(4)
      : Promise.resolve([]),
  ]);

  const region = regionResult[0] ?? null;

  // Filter out current venue from related venues
  const otherVenues = relatedVenues
    .filter((v) => v.id !== venue.id)
    .slice(0, 3);

  const rating =
    typeof venue.suntimesRating === "string"
      ? parseFloat(venue.suntimesRating)
      : Number(venue.suntimesRating);

  const tags = venue.tags ?? [];

  return (
    <div className="bg-suntimes-sand">
      {/* Top nav bar */}
      <div className="border-b border-suntimes-charcoal/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={
              venue.regionId ? `/explore/${venue.regionId}` : "/explore"
            }
            className="inline-flex items-center gap-1.5 font-body text-sm text-suntimes-charcoal/60 transition-colors hover:text-suntimes-teal"
          >
            <ArrowLeft className="h-4 w-4" />
            {region ? `Back to ${region.name}` : "Back to Explore"}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content — left two thirds */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-suntimes-teal/10 px-3 py-1 font-body text-xs font-semibold text-suntimes-teal">
                    {typeLabels[venue.type] ?? venue.type}
                  </span>
                  {venue.cuisine && (
                    <span className="flex items-center gap-1 rounded-full bg-suntimes-charcoal/5 px-3 py-1 font-body text-xs text-suntimes-charcoal/60">
                      <UtensilsCrossed className="h-3 w-3" />
                      {venue.cuisine}
                    </span>
                  )}
                  {region && (
                    <Link
                      href={`/explore/${region.id}`}
                      className="rounded-full bg-suntimes-charcoal/5 px-3 py-1 font-body text-xs text-suntimes-charcoal/60 transition-colors hover:bg-suntimes-teal/10 hover:text-suntimes-teal"
                    >
                      {region.name}
                    </Link>
                  )}
                </div>

                <h1 className="mt-3 font-heading text-3xl font-bold text-suntimes-charcoal sm:text-4xl lg:text-5xl">
                  {venue.name}
                </h1>

                {venue.suburb && (
                  <p className="mt-2 flex items-center gap-1.5 font-body text-suntimes-charcoal/60">
                    <MapPin className="h-4 w-4" />
                    {venue.suburb}
                    {region && <span>&middot; {region.name}</span>}
                  </p>
                )}
              </div>

              {/* Big rating */}
              <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-4 shadow">
                <span className="font-heading text-4xl font-bold text-suntimes-gold">
                  {rating.toFixed(1)}
                </span>
                <span className="font-body text-sm text-suntimes-charcoal/50">
                  / 10
                </span>
                <span className="mt-1 font-body text-xs font-semibold uppercase tracking-widest text-suntimes-gold">
                  Suntimes Rating
                </span>
              </div>
            </div>

            {/* Price level */}
            <div className="mt-5">
              <PriceLevel level={venue.priceLevel as PriceTier} />
            </div>

            {/* Insider tip callout */}
            <div className="mt-8 rounded-xl border-l-4 border-suntimes-teal bg-suntimes-light-teal px-6 py-5">
              <div className="flex items-start gap-3">
                <Quote className="h-5 w-5 flex-shrink-0 text-suntimes-teal mt-0.5" />
                <div>
                  <p className="font-body text-xs font-bold uppercase tracking-widest text-suntimes-teal">
                    Insider tip
                  </p>
                  <p className="mt-1.5 font-body text-base italic leading-relaxed text-suntimes-charcoal/80">
                    {venue.insiderTip}
                  </p>
                </div>
              </div>
            </div>

            {/* Full description */}
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold text-suntimes-charcoal">
                About this place
              </h2>
              <div className="mt-3 font-body text-base leading-relaxed text-suntimes-charcoal/75 whitespace-pre-line">
                {venue.description}
              </div>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-suntimes-charcoal/40" />
                  <h3 className="font-body text-xs font-bold uppercase tracking-widest text-suntimes-charcoal/50">
                    Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white px-3.5 py-1.5 font-body text-sm text-suntimes-charcoal/70 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="mt-10 overflow-hidden rounded-xl border border-suntimes-charcoal/10 bg-white">
              <div className="flex h-64 flex-col items-center justify-center gap-3 bg-suntimes-light-teal/50">
                <Map className="h-10 w-10 text-suntimes-teal/40" />
                <p className="font-body text-sm text-suntimes-charcoal/40">
                  Interactive map coming soon
                </p>
                {venue.address && (
                  <p className="font-body text-xs text-suntimes-charcoal/30">
                    {venue.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar — right third */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact details card */}
              <div className="rounded-xl bg-white p-6 shadow">
                <h3 className="font-body text-xs font-bold uppercase tracking-widest text-suntimes-charcoal/50">
                  Details
                </h3>

                <dl className="mt-4 space-y-4">
                  {venue.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-suntimes-teal" />
                      <div>
                        <dt className="font-body text-xs text-suntimes-charcoal/40">
                          Address
                        </dt>
                        <dd className="font-body text-sm text-suntimes-charcoal">
                          {venue.address}
                        </dd>
                      </div>
                    </div>
                  )}

                  {venue.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-suntimes-teal" />
                      <div>
                        <dt className="font-body text-xs text-suntimes-charcoal/40">
                          Phone
                        </dt>
                        <dd>
                          <a
                            href={`tel:${venue.phone}`}
                            className="font-body text-sm text-suntimes-teal transition-colors hover:text-suntimes-teal/80"
                          >
                            {venue.phone}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}

                  {venue.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="mt-0.5 h-4 w-4 flex-shrink-0 text-suntimes-teal" />
                      <div>
                        <dt className="font-body text-xs text-suntimes-charcoal/40">
                          Website
                        </dt>
                        <dd>
                          <a
                            href={venue.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body text-sm text-suntimes-teal transition-colors hover:text-suntimes-teal/80 break-all"
                          >
                            {venue.website.replace(/^https?:\/\/(www\.)?/, "")}
                          </a>
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>

                {!venue.address && !venue.phone && !venue.website && (
                  <p className="mt-4 font-body text-sm text-suntimes-charcoal/40">
                    Contact details coming soon.
                  </p>
                )}
              </div>

              {/* Google rating comparison */}
              {venue.googleRating && (
                <div className="rounded-xl bg-white p-6 shadow">
                  <h3 className="font-body text-xs font-bold uppercase tracking-widest text-suntimes-charcoal/50">
                    Rating comparison
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="font-heading text-2xl font-bold text-suntimes-gold">
                        {rating.toFixed(1)}
                      </p>
                      <p className="font-body text-xs text-suntimes-charcoal/50">
                        Suntimes
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-heading text-2xl font-bold text-suntimes-charcoal/60">
                        {Number(venue.googleRating).toFixed(1)}
                      </p>
                      <p className="font-body text-xs text-suntimes-charcoal/50">
                        Google
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick facts */}
              <div className="rounded-xl bg-suntimes-teal/5 p-6">
                <h3 className="font-body text-xs font-bold uppercase tracking-widest text-suntimes-teal">
                  Quick facts
                </h3>
                <ul className="mt-3 space-y-2.5 font-body text-sm text-suntimes-charcoal/70">
                  <li className="flex items-center justify-between">
                    <span>Type</span>
                    <span className="font-medium text-suntimes-charcoal">
                      {typeLabels[venue.type] ?? venue.type}
                    </span>
                  </li>
                  {venue.cuisine && (
                    <li className="flex items-center justify-between">
                      <span>Cuisine</span>
                      <span className="font-medium text-suntimes-charcoal">
                        {venue.cuisine}
                      </span>
                    </li>
                  )}
                  <li className="flex items-center justify-between">
                    <span>Price</span>
                    <span className="font-medium capitalize text-suntimes-charcoal">
                      {venue.priceLevel}
                    </span>
                  </li>
                  {region && (
                    <li className="flex items-center justify-between">
                      <span>Region</span>
                      <Link
                        href={`/explore/${region.id}`}
                        className="font-medium text-suntimes-teal hover:underline"
                      >
                        {region.name}
                      </Link>
                    </li>
                  )}
                  <li className="flex items-center justify-between">
                    <span>Verified</span>
                    <span className="font-medium text-suntimes-charcoal">
                      {venue.isVerified ? "Yes" : "Pending"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related venues */}
      {otherVenues.length > 0 && (
        <section className="border-t border-suntimes-charcoal/5 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-suntimes-charcoal">
                More in {region?.name ?? "this region"}
              </h2>
              <p className="mt-1 font-body text-sm text-suntimes-charcoal/60">
                Other spots we rate nearby.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherVenues.map((v) => (
                <VenueCard key={v.slug} venue={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
