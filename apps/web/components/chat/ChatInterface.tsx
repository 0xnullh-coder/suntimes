"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_PROMPTS = [
  "What should we do in Brisbane this weekend?",
  "Best restaurants on the Gold Coast?",
  "Plan a 3-day Cairns trip",
  "Tell us about the 2032 Olympics",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  async function sendMessage(content: string) {
    const userMessage: Message = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorText =
          errorData?.error || "Something went wrong. Give it another go.";
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: errorText },
        ]);
        setLoading(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong. Give it another go.",
          },
        ]);
        setLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let assistantContent = "";

      // Add placeholder assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        // Update the last (assistant) message in place
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "We hit a snag connecting to our servers. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const showStarters = messages.length === 0;

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-suntimes-charcoal/10 bg-suntimes-sand shadow-sm">
      {/* Messages area */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-6 sm:px-6"
      >
        {showStarters ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-suntimes-teal/10">
              <MessageCircle className="h-7 w-7 text-suntimes-teal" />
            </div>
            <div className="text-center">
              <p className="font-body text-base font-medium text-suntimes-charcoal">
                What can we help you with?
              </p>
              <p className="mt-1 font-body text-sm text-suntimes-charcoal/60">
                Pick a question or type your own below.
              </p>
            </div>
            <div className="grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-lg border border-suntimes-teal/20 bg-white px-4 py-3 text-left font-body text-sm text-suntimes-charcoal transition-all hover:border-suntimes-teal hover:bg-suntimes-light-teal"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, i) => (
              <ChatMessage key={i} role={message.role} content={message.content} />
            ))}

            {/* Loading indicator */}
            {loading &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-suntimes-teal/60 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-suntimes-teal/60 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-suntimes-teal/60" />
                    </div>
                  </div>
                </div>
              )}
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
