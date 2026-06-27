import { NextResponse } from "next/server";
import { runOllamaChat } from "@/lib/ai/ollama";
import {
  buildCoverLetterSystemPrompt,
  buildCoverLetterUserPrompt,
} from "@/lib/ai/prompts";

type CoverLetterRequestBody = {
  baseProfile?: string;
  jobDescription?: string;
  summary?: string;
  skills?: string[];
  experience?: string[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CoverLetterRequestBody;

    if (!body.jobDescription?.trim()) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 },
      );
    }

    const content = await runOllamaChat({
      messages: [
        {
          role: "system",
          content: buildCoverLetterSystemPrompt(),
        },
        {
          role: "user",
          content: buildCoverLetterUserPrompt({
            baseProfile: body.baseProfile ?? "",
            jobDescription: body.jobDescription,
            summary: body.summary ?? "",
            skills: body.skills ?? [],
            experience: body.experience ?? [],
          }),
        },
      ],
      temperature: 0.4,
    });

    if (!content.trim()) {
      return NextResponse.json(
        { error: "Cover letter response was empty." },
        { status: 500 },
      );
    }

    return NextResponse.json({ coverLetter: content.trim() });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Cover letter request failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
