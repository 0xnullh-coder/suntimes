import type { Metadata } from "next";
import type { EventCategory } from "@suntimes/shared";
import EventCard from "@/components/events/EventCard";
import { Star } from "lucide-react";

export const metadata: Metadata = {
  title: "What's On in Queensland — Suntimes",
  description:
    "Markets, festivals, food events and more across Queensland. We've picked the ones actually worth your time.",
};

interface HardcodedEvent {
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

const events: HardcodedEvent[] = [
  {
    id: "1",
    name: "Eat Street Northshore",
    category: "food",
    description:
      "Over 100 shipping-container kitchens serving food from every corner of the globe, plus live music and waterfront vibes. Brisbane's best night out for food lovers.",
    venueName: "Eat Street Northshore, Hamilton",
    recurrencePattern: "Every Friday & Saturday, 4pm-10pm",
    price: "$5 entry (kids free)",
    isSuntimesPick: true,
    insiderTip:
      "Arrive before 5pm to skip the queue. The Greek doughnuts near the back are the sleeper hit — most people miss them.",
  },
  {
    id: "2",
    name: "Eumundi Markets",
    category: "markets",
    description:
      "Iconic Sunshine Coast markets with 600+ stalls — handmade goods, fresh produce, live music and genuine community atmosphere. An institution since 1979.",
    venueName: "Eumundi, Sunshine Coast",
    recurrencePattern: "Every Wednesday 8am-1pm & Saturday 7am-2pm",
    price: "Free entry",
    isSuntimesPick: true,
    insiderTip:
      "Wednesday is the locals' secret — same stalls, half the crowds. Grab a Yandina pie from the bakery stall on your way in.",
  },
  {
    id: "3",
    name: "Rusty's Markets",
    category: "markets",
    description:
      "Cairns' beloved produce market packed with tropical fruit you won't find down south. The smoothies and fresh coconuts are reason enough to visit.",
    venueName: "Rusty's Markets, Cairns",
    recurrencePattern: "Friday 5am-6pm, Saturday 5am-5pm, Sunday 5am-3pm",
    price: "Free entry",
    isSuntimesPick: false,
    insiderTip:
      "Go early Friday morning for the best selection. The jackfruit smoothie from the corner stall is unreal.",
  },
  {
    id: "4",
    name: "Miami Marketta",
    category: "food",
    description:
      "Gold Coast's original street food market with rotating chef pop-ups, craft beer and live music. Industrial warehouse vibes with serious food credentials.",
    venueName: "Miami Marketta, Gold Coast",
    recurrencePattern: "Every Wednesday & Friday, 5pm-10pm",
    price: "Free entry",
    isSuntimesPick: true,
    insiderTip:
      "Wednesday is the go — it's quieter and you get first dibs on the weekly specials. The cocktail bar upstairs has no queue.",
  },
  {
    id: "5",
    name: "Noosa Festival of Surfing",
    category: "sports",
    description:
      "The world's longest-running surfing festival, celebrating longboarding, ocean culture and the legendary Noosa waves. Free beachside viewing.",
    venueName: "Noosa Main Beach & First Point",
    recurrencePattern: "Annually in March (10 days)",
    price: "Free viewing",
    isSuntimesPick: true,
    insiderTip:
      "First Point at sunrise is pure magic during the festival. Grab a coffee from Bistro C and watch from the headland — you won't want to leave.",
  },
  {
    id: "6",
    name: "Cairns Esplanade Night Markets",
    category: "markets",
    description:
      "Open-air night market along the Cairns Esplanade with locally made crafts, souvenirs and massage stalls. A classic tropical-evening wander.",
    venueName: "Cairns Esplanade",
    recurrencePattern: "Nightly, 4:30pm-11pm",
    price: "Free entry",
    isSuntimesPick: false,
    insiderTip:
      "Skip the mass-produced stalls at the front and head to the back section for genuine local art and handmade jewellery.",
  },
  {
    id: "7",
    name: "Woodford Folk Festival",
    category: "festival",
    description:
      "Six-day festival in the Sunshine Coast hinterland with over 2,000 performers. Music, comedy, circus, debate and ceremony — Australia's premier folk gathering.",
    venueName: "Woodfordia, Sunshine Coast Hinterland",
    recurrencePattern: "Annually, 27 Dec - 1 Jan",
    price: "From $195 (season pass)",
    isSuntimesPick: true,
    insiderTip:
      "Camp in the Ambrosia section for hot showers and relative quiet. The late-night Duck & Juggler stage is where the real magic happens.",
  },
  {
    id: "8",
    name: "South Bank Parklands Weekend",
    category: "family",
    description:
      "Brisbane's beloved riverside parklands with Streets Beach, picnic lawns, the Wheel of Brisbane and weekend buskers. Free and always buzzing.",
    venueName: "South Bank Parklands, Brisbane",
    recurrencePattern: "Daily, free access — best on weekends",
    price: "Free",
    isSuntimesPick: false,
    insiderTip:
      "Sunday morning is family gold — swim at Streets Beach, walk to the Collective Markets at Stanley Plaza, then lunch at Cha Cha Char on the river.",
  },
];

export default function EventsPage() {
  const suntimesPicks = events.filter((e) => e.isSuntimesPick);
  const otherEvents = events.filter((e) => !e.isSuntimesPick);

  return (
    <div className="min-h-screen bg-suntimes-sand">
      {/* Hero section */}
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-heading text-3xl font-bold text-suntimes-charcoal sm:text-4xl lg:text-5xl">
            What&apos;s On in Queensland
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base text-suntimes-charcoal/70 sm:text-lg">
            Markets, festivals, food events — we&apos;ve picked the ones worth
            your time.
          </p>
        </div>
      </section>

      {/* Suntimes Picks */}
      {suntimesPicks.length > 0 && (
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-suntimes-gold text-suntimes-gold" />
              <h2 className="font-heading text-2xl font-semibold text-suntimes-charcoal">
                Suntimes Picks
              </h2>
            </div>
            <p className="mt-2 font-body text-sm text-suntimes-charcoal/60">
              Events we genuinely reckon are worth rearranging your schedule for.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {suntimesPicks.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All other events */}
      <section className="px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-2xl font-semibold text-suntimes-charcoal">
            More Events
          </h2>
          <p className="mt-2 font-body text-sm text-suntimes-charcoal/60">
            Solid picks, all of them. Just not quite &quot;drop everything&quot;
            territory.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
