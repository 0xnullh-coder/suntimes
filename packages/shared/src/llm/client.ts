import Anthropic from "@anthropic-ai/sdk";

export type ModelName = "haiku" | "sonnet";

const MODEL_IDS: Record<ModelName, string> = {
  haiku: "claude-haiku-4-5-20251001",
  sonnet: "claude-sonnet-4-5-20250929",
};

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (_client) return _client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  _client = new Anthropic({ apiKey });
  return _client;
}

export interface LLMResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export async function generateResponse(
  model: ModelName,
  system: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  maxTokens: number = 1024
): Promise<LLMResponse> {
  const client = getClient();

  const response = await client.messages.create({
    model: MODEL_IDS[model],
    max_tokens: maxTokens,
    system,
    messages,
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  return {
    text,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
  };
}

export async function* streamResponse(
  model: ModelName,
  system: string,
  messages: Array<{ role: "user" | "assistant"; content: string }>
): AsyncIterable<string> {
  const client = getClient();

  const stream = client.messages.stream({
    model: MODEL_IDS[model],
    max_tokens: 2048,
    system,
    messages,
  });

  for await (const event of stream) {
    if (
      event.type === "content_block_delta" &&
      event.delta.type === "text_delta"
    ) {
      yield event.delta.text;
    }
  }
}
