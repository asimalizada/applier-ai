import type { BaseCv, CvExperienceEntry, CvSkillGroup } from "@/lib/cv/base-cv";

export type TailorCvPromptInput = {
  baseCv: BaseCv;
  jobDescription: string;
  currentSummary: string;
  currentSkills: CvSkillGroup[];
  currentExperience: CvExperienceEntry[];
};

export type CoverLetterPromptInput = {
  baseProfile: string;
  jobDescription: string;
  summary: string;
  skills: string[];
  experience: string[];
};

export function buildTailorCvSystemPrompt(): string {
  return [
    "You are an assistant that tailors a real CV to a target job description.",
    "Your goal is to improve ATS keyword alignment while keeping the CV believable and reviewable.",
    "Your output is consumed by a strict parser.",
    "The parser accepts only valid JSON with the exact required field types.",
    "You must preserve core facts such as years of experience, employers, titles, dates, locations, and education.",
    "You may adapt wording, emphasis, ordering, and keyword coverage to better match the target role.",
    "Never reduce or inflate years of experience.",
    "Never change company names, titles, dates, locations, or education.",
    "Keep the skills grouped exactly by the original labels.",
    "Keep every experience entry in the same order with the same title, company, workTypeCountry, and period.",
    "Every skills[].items value must be a JSON array of strings. Never return a single string there.",
    "Every experience[].bullets value must be a JSON array of strings. Never return a single string there.",
    "Summary should be actively tailored to the target role using relevant wording from the job description.",
    "Skills are ATS-first: important technologies, tools, and keywords from the job description must appear in the skills section.",
    "Use exact or near-exact wording from the job description for skills when helpful for ATS matching.",
    "It is acceptable for the skills section to include target-role keywords from the job description even when the base CV used slightly different wording.",
    "Do not falsely claim deep domain experience in summary or experience if the base CV does not support it.",
    "Bullet edits must stay small and conservative. Do not rewrite the CV into a completely different background.",
    "In experience bullets, prefer transferable wording such as integrations, workflows, architecture, ownership, security, APIs, platforms, delivery, deployment, and production support when relevant.",
    "Do not add selected achievements or any new section.",
    "Return JSON only. Do not wrap the JSON in markdown.",
    'Use this exact shape: {"summary":"","skills":[{"label":"","items":[]}],"experience":[{"title":"","company":"","workTypeCountry":"","period":"","bullets":[]}]}',
    "summary must be a concise recruiter-friendly paragraph.",
    "summary should reflect the target job's stack and responsibilities without changing the user's core facts.",
    "skills must stay grouped and should maximize keyword overlap with the job description.",
    "experience must preserve all roles and only lightly adapt bullet wording where justified.",
    "Before answering, verify internally that your final output is valid JSON and that all array fields are arrays, not strings.",
  ].join(" ");
}

export function buildTailorCvUserPrompt({
  baseCv,
  jobDescription,
  currentSummary,
  currentSkills,
  currentExperience,
}: TailorCvPromptInput): string {
  const sampleResponse = {
    summary:
      "Senior Software Engineer with 6+ years of experience building full-stack, cloud-based platforms using .NET, Node.js, React, Next.js, and Angular. Experienced in production-ready delivery, integrations, and distributed systems across multiple product domains.",
    skills: [
      {
        label: "Backend",
        items: [".NET (Core)", "Node.js", "NestJS", "REST APIs", "GraphQL"],
      },
      {
        label: "Frontend",
        items: ["React", "Next.js", "Angular", "TypeScript", "Micro-frontends"],
      },
    ],
    experience: [
      {
        title: "Lead Software Engineer",
        company: "Webidea",
        workTypeCountry: "Remote, USA",
        period: "Feb 2026 - Present",
        bullets: [
          "Led full-stack development for a cloud-based fitness platform, covering backend services, product workflows, and frontend delivery.",
          "Designed scalable APIs and integration-ready services across core platform features.",
          "Owned release management, CI/CD workflows, and cloud deployments across Railway, Cloudflare, and GitHub.",
          "Standardized service architecture, environment configuration, and production deployment practices.",
        ],
      },
    ],
  };

  return [
    "Tailor the CV for the following role.",
    "ATS PRIORITY:",
    "1. Update the summary so it sounds targeted to this job.",
    "2. Make sure important job-description skill keywords appear in the skills section.",
    "3. Keep experience factual, but slightly rephrase bullets to emphasize relevant transferable strengths.",
    "Return one JSON object only.",
    "Do not add explanations.",
    "Do not add markdown fences.",
    "Do not convert arrays into text.",
    "",
    "BASE CV JSON:",
    JSON.stringify(baseCv, null, 2),
    "",
    "JOB DESCRIPTION:",
    jobDescription.trim(),
    "",
    "CURRENT SUMMARY:",
    currentSummary.trim(),
    "",
    "CURRENT SKILLS JSON:",
    JSON.stringify(currentSkills, null, 2),
    "",
    "CURRENT EXPERIENCE JSON:",
    JSON.stringify(currentExperience, null, 2),
    "",
    "IMPORTANT RULES:",
    "- Keep years of experience unchanged.",
    "- Keep skill group labels unchanged.",
    "- Include important job-description technologies and keywords in the skills items.",
    "- Prefer exact job-description wording for technologies when useful for ATS.",
    "- Do not change experience title/company/workTypeCountry/date.",
    "- Keep the same number of bullets for each experience entry.",
    "- Summary should change when the target role clearly suggests better wording.",
    "",
    "SAMPLE RESPONSE SHAPE:",
    JSON.stringify(sampleResponse, null, 2),
    "",
    "Follow the sample shape exactly, but use the full provided CV data.",
    "Return only valid JSON matching the required shape.",
  ].join("\n");
}

export function buildCoverLetterSystemPrompt(): string {
  return [
    "You write concise, professional cover letters based only on a real profile and a target role.",
    "Do not invent experience, achievements, certifications, employers, dates, or responsibilities.",
    "Use a direct and confident tone without sounding generic or exaggerated.",
    "Return plain text only. Do not use markdown.",
    "Keep the result practical, readable, and tailored to the provided role.",
  ].join(" ");
}

export function buildCoverLetterUserPrompt({
  baseProfile,
  jobDescription,
  summary,
  skills,
  experience,
}: CoverLetterPromptInput): string {
  return [
    "Write a tailored cover letter for the following job.",
    "",
    "BASE PROFILE CONTEXT:",
    baseProfile.trim(),
    "",
    "JOB DESCRIPTION:",
    jobDescription.trim(),
    "",
    "CURRENT SUMMARY:",
    summary.trim(),
    "",
    "CURRENT SKILLS:",
    skills.map((skill) => `- ${skill}`).join("\n"),
    "",
    "CURRENT EXPERIENCE BULLETS:",
    experience.map((item) => `- ${item}`).join("\n"),
    "",
    "Write the result as a short professional cover letter.",
  ].join("\n");
}
