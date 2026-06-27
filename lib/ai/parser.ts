import type { CvExperienceEntry, CvSkillGroup } from "@/lib/cv/base-cv";

export type TailoredCvDraft = {
  summary: string;
  skills: CvSkillGroup[];
  experience: CvExperienceEntry[];
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

function extractJsonObject(raw: string): string {
  const firstBrace = raw.indexOf("{");
  const lastBrace = raw.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return raw;
  }

  return raw.slice(firstBrace, lastBrace + 1);
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

function normalizeSkills(value: unknown): CvSkillGroup[] {
  if (!Array.isArray(value)) {
    throw new AiParseError("Expected skills to be an array.");
  }

  return value.map((item) => {
    if (!item || typeof item !== "object") {
      throw new AiParseError("Expected every skill group to be an object.");
    }

    const group = item as {
      label?: unknown;
      items?: unknown;
    };

    if (typeof group.label !== "string") {
      throw new AiParseError("Every skill group label must be a string.");
    }

    return {
      label: group.label.trim(),
      items: normalizeStringArray(group.items),
    };
  });
}

function normalizeExperience(value: unknown): CvExperienceEntry[] {
  if (!Array.isArray(value)) {
    throw new AiParseError("Expected experience to be an array.");
  }

  return value.map((item) => {
    if (!item || typeof item !== "object") {
      throw new AiParseError("Expected every experience entry to be an object.");
    }

    const entry = item as {
      title?: unknown;
      company?: unknown;
      workTypeCountry?: unknown;
      period?: unknown;
      bullets?: unknown;
    };

    if (typeof entry.title !== "string") {
      throw new AiParseError("Every experience title must be a string.");
    }

    if (typeof entry.company !== "string") {
      throw new AiParseError("Every experience company must be a string.");
    }

    if (typeof entry.workTypeCountry !== "string") {
      throw new AiParseError(
        "Every experience workTypeCountry must be a string.",
      );
    }

    if (typeof entry.period !== "string") {
      throw new AiParseError("Every experience period must be a string.");
    }

    return {
      title: entry.title.trim(),
      company: entry.company.trim(),
      workTypeCountry: entry.workTypeCountry.trim(),
      period: entry.period.trim(),
      bullets: normalizeStringArray(entry.bullets),
    };
  });
}

export function parseTailoredCvDraft(raw: string): TailoredCvDraft {
  const cleaned = extractJsonObject(stripMarkdownCodeFence(raw));

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
    skills: normalizeSkills(draft.skills),
    experience: normalizeExperience(draft.experience),
  };
}
