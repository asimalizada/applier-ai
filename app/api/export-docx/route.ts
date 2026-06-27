import { NextResponse } from "next/server";
import { generateTailoredDocxBuffer } from "@/lib/cv/docx-template";
import { baseCv, type CvExperienceEntry, type CvSkillGroup } from "@/lib/cv/base-cv";

export const runtime = "nodejs";

type ExportDocxRequestBody = {
  summary?: string;
  skills?: CvSkillGroup[];
  experience?: CvExperienceEntry[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ExportDocxRequestBody;

    const summary = body.summary?.trim() || baseCv.summary;
    const skills = body.skills?.length ? body.skills : baseCv.skills;
    const experience = body.experience?.length
      ? body.experience
      : baseCv.experience;

    const buffer = await generateTailoredDocxBuffer({
      summary,
      skills,
      experience,
    });
    const fileBytes = new Uint8Array(buffer);

    return new NextResponse(fileBytes, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition":
          'attachment; filename="Asim Alizada - CV.docx"',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "DOCX export failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
