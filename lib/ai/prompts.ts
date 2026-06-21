export type TailorCvPromptInput = {
  baseProfile: string;
  jobDescription: string;
  currentSummary: string;
  currentSkills: string[];
  currentExperience: string[];
};

export function buildTailorCvSystemPrompt(): string {
  return [
    "You are an assistant that tailors a real CV to a target job description.",
    "You must preserve truthfulness and avoid inventing experience, skills, dates, employers, or achievements.",
    "You may improve alignment, wording, ordering, and emphasis only when supported by the provided profile.",
    "Experience edits must stay conservative and preserve the original meaning.",
    "Return JSON only. Do not wrap the JSON in markdown.",
    'Use this exact shape: {"summary":"","skills":[],"experience":[]}.',
    "summary must be a concise recruiter-friendly paragraph.",
    "skills must be an array of strings containing only realistic skills supported by the provided profile.",
    "experience must be an array of bullet strings aligned to the provided experience background.",
  ].join(" ");
}

export function buildTailorCvUserPrompt({
  baseProfile,
  jobDescription,
  currentSummary,
  currentSkills,
  currentExperience,
}: TailorCvPromptInput): string {
  return [
    "Tailor the CV for the following role.",
    "",
    "BASE PROFILE CONTEXT:",
    baseProfile.trim(),
    "",
    "JOB DESCRIPTION:",
    jobDescription.trim(),
    "",
    "CURRENT SUMMARY:",
    currentSummary.trim(),
    "",
    "CURRENT SKILLS:",
    currentSkills.map((skill) => `- ${skill}`).join("\n"),
    "",
    "CURRENT EXPERIENCE BULLETS:",
    currentExperience.map((item) => `- ${item}`).join("\n"),
    "",
    "Return only valid JSON matching the required shape.",
  ].join("\n");
}
