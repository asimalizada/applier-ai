export type TailoredCvDraft = {
  summary: string;
  skills: string[];
  experience: string[];
};

export class AiParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AiParseError";
  }
}

function stripMarkdownCodeFence(raw: string): string {
  return raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    throw new AiParseError("Expected an array of strings.");
  }

  return value.map((item) => {
    if (typeof item !== "string") {
      throw new AiParseError("Expected every array item to be a string.");
    }

    return item.trim();
  });
}

export function parseTailoredCvDraft(raw: string): TailoredCvDraft {
  const cleaned = stripMarkdownCodeFence(raw);

  let parsed: unknown;

  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new AiParseError("AI response is not valid JSON.");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new AiParseError("AI response must be a JSON object.");
  }

  const draft = parsed as {
    summary?: unknown;
    skills?: unknown;
    experience?: unknown;
  };

  if (typeof draft.summary !== "string") {
    throw new AiParseError("AI response summary must be a string.");
  }

  return {
    summary: draft.summary.trim(),
    skills: normalizeStringArray(draft.skills),
    experience: normalizeStringArray(draft.experience),
  };
}
