import { NextResponse } from "next/server";
import { runOllamaChat } from "@/lib/ai/ollama";
import { baseCv, cloneExperienceEntries, cloneSkillGroups } from "@/lib/cv/base-cv";
import {
  buildTailorCvSystemPrompt,
  buildTailorCvUserPrompt,
} from "@/lib/ai/prompts";
import { parseTailoredCvDraft } from "@/lib/ai/parser";
import { validateTailoredCvDraft } from "@/lib/ai/validate";

type TailorRequestBody = {
  jobDescription?: string;
  currentSummary?: string;
  currentSkills?: typeof baseCv.skills;
  currentExperience?: typeof baseCv.experience;
};

const MAX_TAILOR_ATTEMPTS = 2;

function getRetryInstruction(errorMessage: string, previousResponse: string) {
  return [
    "Your previous response failed strict validation.",
    `Validation error: ${errorMessage}`,
    "Return corrected JSON only.",
    "Do not explain anything.",
    "Do not change the required shape.",
    "Keep the summary actively tailored to the target role.",
    "Keep important job-description keywords in the skills section.",
    "Keep the original skill group labels exactly unchanged.",
    "Keep every experience entry title, company, workTypeCountry, period, and bullet count unchanged.",
    "Previous invalid response:",
    previousResponse,
  ].join("\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TailorRequestBody;

    if (!body.jobDescription?.trim()) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 },
      );
    }

    const systemPrompt = buildTailorCvSystemPrompt();
    const initialUserPrompt = buildTailorCvUserPrompt({
      baseCv,
      jobDescription: body.jobDescription,
      currentSummary: body.currentSummary ?? baseCv.summary,
      currentSkills: body.currentSkills ?? cloneSkillGroups(baseCv.skills),
      currentExperience:
        body.currentExperience ?? cloneExperienceEntries(baseCv.experience),
    });

    const messages: {
      role: "system" | "user" | "assistant";
      content: string;
    }[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: initialUserPrompt,
      },
    ];

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < MAX_TAILOR_ATTEMPTS; attempt += 1) {
      const raw = await runOllamaChat({
        format: "json",
        messages,
      });

      try {
        const parsed = parseTailoredCvDraft(raw);
        const draft = validateTailoredCvDraft(parsed, {
          baseSkills: baseCv.skills,
          baseExperience: baseCv.experience,
        });

        return NextResponse.json({ draft });
      } catch (error) {
        lastError =
          error instanceof Error
            ? error
            : new Error("Tailoring request failed.");

        if (attempt === MAX_TAILOR_ATTEMPTS - 1) {
          break;
        }

        messages.push({
          role: "assistant",
          content: raw,
        });
        messages.push({
          role: "user",
          content: getRetryInstruction(lastError.message, raw),
        });
      }
    }

    throw lastError ?? new Error("Tailoring request failed.");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Tailoring request failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
