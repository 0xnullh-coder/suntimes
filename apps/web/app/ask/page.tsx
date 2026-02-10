import type { Metadata } from "next";
import ChatInterface from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Ask Suntimes — Your AI Concierge for Queensland",
  description:
    "Ask our AI concierge anything about Queensland. Restaurants, trips, events, hidden gems — we're opinionated and we love it.",
};

export default function AskPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header section */}
      <div className="bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold text-suntimes-charcoal sm:text-4xl">
            Ask Suntimes
          </h1>
          <p className="mt-3 font-body text-base text-suntimes-charcoal/70 sm:text-lg">
            Your AI concierge for Queensland. Ask us anything — we&apos;re
            opinionated and we love it.
          </p>
        </div>
      </div>

      {/* Chat area takes remaining height */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pb-6 sm:px-6 lg:px-8">
        <ChatInterface />
      </div>
    </div>
  );
}
