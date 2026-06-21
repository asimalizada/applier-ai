import { getAiRuntimeConfig } from "@/lib/ai/config";

type OllamaMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OllamaChatResponse = {
  message?: {
    content?: string;
  };
};

export type OllamaChatInput = {
  messages: OllamaMessage[];
  temperature?: number;
};

export class OllamaClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OllamaClientError";
  }
}

export async function runOllamaChat({
  messages,
  temperature = 0.3,
}: OllamaChatInput): Promise<string> {
  const { baseUrl, model } = getAiRuntimeConfig();

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream: false,
      options: {
        temperature,
      },
      messages,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new OllamaClientError(
      `Ollama request failed with status ${response.status}.`,
    );
  }

  const data = (await response.json()) as OllamaChatResponse;
  const content = data.message?.content?.trim();

  if (!content) {
    throw new OllamaClientError("Ollama returned an empty response.");
  }

  return content;
}
