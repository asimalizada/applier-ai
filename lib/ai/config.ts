const DEFAULT_OLLAMA_BASE_URL = "http://127.0.0.1:11434";
const DEFAULT_OLLAMA_MODEL = "qwen3:8b";

export type AiRuntimeConfig = {
  baseUrl: string;
  model: string;
};

export function getAiRuntimeConfig(): AiRuntimeConfig {
  return {
    baseUrl: process.env.OLLAMA_BASE_URL?.trim() || DEFAULT_OLLAMA_BASE_URL,
    model: process.env.OLLAMA_MODEL?.trim() || DEFAULT_OLLAMA_MODEL,
  };
}
