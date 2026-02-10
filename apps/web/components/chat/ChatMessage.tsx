"use client";

import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 font-body text-sm leading-relaxed sm:text-base",
          isUser
            ? "rounded-br-md bg-suntimes-teal text-white"
            : "rounded-bl-md bg-white text-suntimes-charcoal shadow-sm"
        )}
      >
        {/* Render paragraphs from newlines for assistant messages */}
        {isUser ? (
          <p>{content}</p>
        ) : (
          content.split("\n").map((paragraph, i) =>
            paragraph.trim() === "" ? (
              <br key={i} />
            ) : (
              <p key={i} className={i > 0 ? "mt-2" : ""}>
                {paragraph}
              </p>
            )
          )
        )}
      </div>
    </div>
  );
}
