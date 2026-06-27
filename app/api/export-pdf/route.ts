import { NextResponse } from "next/server";
import { baseCv, type CvExperienceEntry, type CvSkillGroup } from "@/lib/cv/base-cv";
import { generateTailoredPdfBuffer } from "@/lib/cv/pdf-export";

export const runtime = "nodejs";

type ExportPdfRequestBody = {
  summary?: string;
  skills?: CvSkillGroup[];
  experience?: CvExperienceEntry[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ExportPdfRequestBody;

    const summary = body.summary?.trim() || baseCv.summary;
    const skills = body.skills?.length ? body.skills : baseCv.skills;
    const experience = body.experience?.length
      ? body.experience
      : baseCv.experience;

    const buffer = await generateTailoredPdfBuffer({
      summary,
      skills,
      experience,
    });

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="Asim Alizada - CV.pdf"',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "PDF export failed.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
