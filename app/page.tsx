"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clipboard,
  CodeXml,
  FileText,
  Pencil,
  RefreshCcw,
  Sparkles,
  UserRound,
} from "lucide-react";
import { CvPrintView } from "@/components/print/CvPrintView";
import { printableCvData } from "@/lib/cv/printable-data";
import {
  baseCv,
  cloneExperienceEntries,
  cloneSkillGroups,
  ensureBulletPrefix,
  formatExperienceHeading,
  formatBaseCvForAi,
} from "@/lib/cv/base-cv";

const sampleJobDescription = `We're looking for a Senior Frontend Engineer to join our product team.
You will build performant, accessible web experiences using React and TypeScript.
You'll collaborate with designers and backend engineers to ship features that delight millions of users.

Requirements:
- 5+ years of experience building modern web applications
- Strong proficiency in TypeScript, React, and Next.js
- Experience with state management, testing, and performance optimization
- Comfortable working with REST/GraphQL APIs
- Strong communication and ownership mindset`;

type PreviewSectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function PreviewSection({ icon, title, children }: PreviewSectionProps) {
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#27231f] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-[#dbc19d]">
          {icon}
          <h3 className="text-[1.02rem] font-medium text-stone-100">{title}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-300">
          <Pencil className="h-4 w-4" />
          <span>Editable</span>
        </div>
      </div>
      {children}
    </section>
  );
}

type UtilityButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function UtilityButton({ children, onClick }: UtilityButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-[12px] border border-[#e4dbcf] bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-[#d6c9b8] hover:bg-[#fdfbf8]"
    >
      {children}
    </button>
  );
}

type LabelProps = {
  label: string;
};

function SkillChip({ label }: LabelProps) {
  return (
    <span className="rounded-[10px] border border-white/8 bg-[#322d28] px-3 py-2 text-sm text-stone-200">
      {label}
    </span>
  );
}

export default function Home() {
  const printRootRef = useRef<HTMLDivElement | null>(null);
  const [hasPreview, setHasPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);
  const [coverLetterError, setCoverLetterError] = useState<string | null>(null);
  const [coverLetterText, setCoverLetterText] = useState("");
  const [hasCoverLetterDraft, setHasCoverLetterDraft] = useState(false);
  const [coverLetterCopied, setCoverLetterCopied] = useState(false);
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);
  const [summary, setSummary] = useState(baseCv.summary);
  const [skills, setSkills] = useState(() => cloneSkillGroups(baseCv.skills));
  const [experience, setExperience] = useState(
    () => cloneExperienceEntries(baseCv.experience),
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileText, setProfileText] = useState(formatBaseCvForAi(baseCv));

  const previewReady = hasPreview;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setJobDescription(text);
        setGenerationError(null);
      } else {
        setGenerationError("Clipboard is empty. Paste a role manually or try again.");
      }
    } catch {
      setJobDescription(sampleJobDescription);
      setGenerationError(
        "Clipboard access was unavailable. A sample role was inserted instead.",
      );
    }
  };

  const handleTailorCv = () => {
    if (!jobDescription.trim()) {
      setGenerationError(
        "A job description is required before Applier AI can tailor the CV.",
      );
      setHasPreview(false);
      setIsGenerating(false);
      return;
    }

    setGenerationError(null);
    setIsGenerating(true);
    void fetch("/api/tailor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobDescription,
        currentSummary: summary,
        currentSkills: skills,
        currentExperience: experience,
      }),
    })
      .then(async (response) => {
        const payload = (await response.json()) as
          | {
              draft?: {
                summary: string;
                skills: typeof baseCv.skills;
                experience: typeof baseCv.experience;
              };
              error?: string;
            }
          | undefined;

        if (!response.ok || !payload?.draft) {
          throw new Error(payload?.error || "Tailoring request failed.");
        }

        setSummary(payload.draft.summary);
        setSkills(payload.draft.skills);
        setExperience(payload.draft.experience);
        setHasPreview(true);
      })
      .catch((error: unknown) => {
        setHasPreview(false);
        setGenerationError(
          error instanceof Error
            ? error.message
            : "Tailoring request failed unexpectedly.",
        );
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const handleGenerateCoverLetter = () => {
    const currentSkills = skills.flatMap((group) => group.items);
    const currentExperience = experience.flatMap((entry) => entry.bullets);

    setIsGeneratingCoverLetter(true);
    setIsCoverLetterOpen(true);
    setCoverLetterCopied(false);
    setCoverLetterError(null);
    setHasCoverLetterDraft(false);

    void fetch("/api/cover-letter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseProfile: profileText,
        jobDescription,
        summary,
        skills: currentSkills,
        experience: currentExperience,
      }),
    })
      .then(async (response) => {
        const payload = (await response.json()) as
          | { coverLetter?: string; error?: string }
          | undefined;

        if (!response.ok || !payload?.coverLetter) {
          throw new Error(payload?.error || "Cover letter request failed.");
        }

        setCoverLetterText(payload.coverLetter);
        setHasCoverLetterDraft(true);
      })
      .catch((error: unknown) => {
        setCoverLetterError(
          error instanceof Error
            ? error.message
            : "Cover letter request failed unexpectedly.",
        );
      })
      .finally(() => {
        setIsGeneratingCoverLetter(false);
      });
  };

  const handleCopyCoverLetter = async () => {
    try {
      await navigator.clipboard.writeText(coverLetterText);
      setCoverLetterCopied(true);
      window.setTimeout(() => setCoverLetterCopied(false), 1800);
    } catch {
      setCoverLetterCopied(false);
    }
  };

  const handleExportPdf = () => {
    setGenerationError(null);
    setIsExportingPdf(true);

    void fetch("/api/export-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary,
        skills,
        experience,
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const payload = (await response.json()) as
            | { error?: string }
            | undefined;

          throw new Error(payload?.error || "PDF export failed.");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Asim Alizada - CV.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error: unknown) => {
        setGenerationError(
          error instanceof Error
            ? error.message
            : "PDF export failed unexpectedly.",
        );
      })
      .finally(() => {
        setIsExportingPdf(false);
      });
  };

  const printableViewData = {
    ...printableCvData,
    summary,
    skills: skills.map((group) => ({
      label: group.label,
      value: group.items.join(" • "),
    })),
    experience,
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] px-4 py-4 text-stone-900 sm:px-5 lg:h-screen lg:overflow-hidden lg:px-6 lg:py-5">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 lg:h-full">
        <div className="grid gap-5 lg:h-full lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
          <section className="rounded-[18px] border border-[#e5dbce] bg-[linear-gradient(180deg,#fffdfa_0%,#fcf8f2_100%)] p-5 shadow-[0_24px_60px_rgba(50,36,20,0.08)] sm:p-6 lg:flex lg:min-h-0 lg:flex-col">
            <div className="space-y-5 lg:flex lg:min-h-0 lg:flex-col">
              <div className="flex flex-col gap-3 border-b border-[#eee4d8] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-[0.92rem] font-semibold uppercase tracking-[0.28em] text-[#aa7a40]">
                    Applier AI
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="inline-flex items-center gap-2 self-start rounded-[12px] border border-[#e4dbcf] bg-[#faf6f1] px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-[#d6c9b8] hover:bg-white"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit base profile</span>
                </button>
              </div>

              <div className="rounded-[14px] border border-[#e7ddd1] bg-[#fffdfa] p-4 shadow-[0_14px_34px_rgba(30,24,18,0.04)] lg:flex lg:min-h-0 lg:flex-col">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-medium tracking-[-0.02em] text-stone-900">
                    Target role
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <UtilityButton onClick={handlePaste}>
                      <Clipboard className="h-4 w-4" />
                      <span>Paste role</span>
                    </UtilityButton>
                    <UtilityButton
                      onClick={() => setJobDescription(sampleJobDescription)}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Use sample role</span>
                    </UtilityButton>
                    <UtilityButton onClick={() => setJobDescription("")}>
                      <Pencil className="h-4 w-4" />
                      <span>Clear field</span>
                    </UtilityButton>
                  </div>
                </div>

                <textarea
                  id="job-description"
                  name="jobDescription"
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="Paste the target job description here..."
                  className="app-scrollbar min-h-[320px] w-full resize-y rounded-[12px] border border-[#e6ddd2] bg-white px-5 py-4 text-[0.95rem] leading-7 text-stone-700 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition placeholder:text-stone-400 focus:border-[#cdb79c] focus:ring-4 focus:ring-[#b08145]/10 lg:min-h-[380px]"
                />

                {generationError ? (
                  <p className="mt-3 rounded-[10px] border border-[#e5c8c5] bg-[#fff4f2] px-3.5 py-2.5 text-sm text-[#9a443e]">
                    {generationError}
                  </p>
                ) : null}
              </div>

              <div className="space-y-3 border-t border-[#eee4d8] pt-2">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleTailorCv}
                    disabled={isGenerating}
                    className="inline-flex min-h-14 flex-1 items-center justify-between rounded-[12px] bg-[#171412] px-5 py-4 text-left text-stone-50 shadow-[0_20px_40px_rgba(20,18,16,0.22)] transition hover:bg-[#211d1a] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-[#d8b98f]">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      {isGenerating ? "Tailoring draft..." : "Tailor CV"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleGenerateCoverLetter}
                    disabled={isGeneratingCoverLetter}
                    className="inline-flex min-h-14 items-center gap-3 rounded-[12px] border border-[#e4dacc] bg-white px-5 py-4 text-left text-stone-800 transition hover:bg-[#fdfaf6] disabled:cursor-not-allowed disabled:opacity-60 sm:min-w-[300px]"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {isGeneratingCoverLetter
                        ? "Generating letter..."
                        : "Generate cover letter"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[18px] border border-[#2b2723] bg-[linear-gradient(180deg,#171513_0%,#121110_100%)] p-5 text-stone-100 shadow-[0_28px_80px_rgba(22,19,16,0.34)] sm:p-6 lg:flex lg:min-h-0 lg:flex-col">
            <div className="space-y-5 lg:flex lg:min-h-0 lg:flex-col">
              <div className="space-y-4">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
                  Preview
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-editorial text-3xl leading-none tracking-[-0.05em] text-white">
                    {generationError
                      ? "Generation blocked"
                      : isGenerating
                      ? "Generating draft"
                      : previewReady
                        ? "Draft ready"
                        : "Draft preview"}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-2 rounded-[10px] border px-3 py-1.5 text-sm ${
                      generationError
                        ? "border-[#6d302c] bg-[#2a1717] text-[#f2b2aa]"
                        : isGenerating
                        ? "border-[#6e603f] bg-[#2b251c] text-[#d4bf8f]"
                        : previewReady
                        ? "border-[#26653b] bg-[#163421] text-[#7fe59f]"
                        : "border-white/10 bg-white/[0.04] text-stone-300"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        generationError
                          ? "bg-[#e07d72]"
                          : isGenerating
                          ? "bg-[#d0b37a]"
                          : previewReady
                            ? "bg-[#3dd273]"
                            : "bg-stone-500"
                      }`}
                    />
                    {generationError
                      ? "Error"
                      : isGenerating
                        ? "Working"
                        : previewReady
                          ? "Ready"
                          : "Idle"}
                  </span>
                </div>

                {generationError ? (
                  <p className="text-sm leading-7 text-[#d9a29b]">
                    Review the input, then retry the tailoring flow.
                  </p>
                ) : null}
              </div>

              <div className="app-scrollbar lg:min-h-0 lg:flex-1 lg:overflow-auto lg:pr-1">
                {previewReady ? (
                  <div className="space-y-4 pb-1">
                    <PreviewSection
                      icon={<UserRound className="h-4 w-4" />}
                      title="Summary"
                    >
                      <textarea
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                        className="app-scrollbar min-h-[168px] w-full resize-y rounded-[10px] border border-white/8 bg-[#211d1a] px-4 py-3 text-[0.97rem] leading-8 text-stone-200 outline-none transition focus:border-[#4a433d] focus:ring-2 focus:ring-white/5"
                      />
                    </PreviewSection>

                    <PreviewSection
                      icon={<CodeXml className="h-4 w-4" />}
                      title="Skills"
                    >
                      <div className="space-y-3">
                        {skills.map((group, index) => (
                          <div key={group.label} className="space-y-2">
                            <p className="text-sm font-medium text-stone-300">
                              {group.label}
                            </p>
                            <textarea
                              value={group.items.join(" • ")}
                              onChange={(event) =>
                                setSkills((current) =>
                                  current.map((item, itemIndex) =>
                                    itemIndex === index
                                      ? {
                                          ...item,
                                          items: event.target.value
                                            .split("•")
                                            .map((skill) => skill.trim())
                                            .filter(Boolean),
                                        }
                                      : item,
                                  ),
                                )
                              }
                              className="app-scrollbar min-h-[84px] w-full resize-y rounded-[10px] border border-white/8 bg-[#211d1a] px-4 py-3 text-[0.95rem] leading-7 text-stone-200 outline-none transition focus:border-[#4a433d] focus:ring-2 focus:ring-white/5"
                            />
                          </div>
                        ))}
                        <div className="flex flex-wrap gap-2.5">
                          {skills
                            .flatMap((group) => group.items)
                            .map((item) => (
                              <SkillChip key={item} label={item} />
                            ))}
                        </div>
                      </div>
                    </PreviewSection>

                    <PreviewSection
                      icon={<BriefcaseBusiness className="h-4 w-4" />}
                      title="Experience"
                    >
                      <div className="space-y-4">
                        {experience.map((entry, index) => (
                          <div
                            key={`${entry.title}-${entry.company}-${entry.period}`}
                            className="space-y-3 rounded-[10px] border border-white/8 bg-[#211d1a] p-4"
                          >
                            <div className="space-y-1">
                              <p className="text-base font-medium text-stone-100">
                                {formatExperienceHeading(entry)}
                              </p>
                              <p className="text-sm text-stone-400">
                                {entry.period}
                              </p>
                            </div>
                            <textarea
                              value={entry.bullets.join("\n")}
                              onChange={(event) =>
                                setExperience((current) =>
                                  current.map((item, itemIndex) =>
                                    itemIndex === index
                                      ? {
                                          ...item,
                                          bullets: event.target.value
                                            .split("\n")
                                            .map((bullet) =>
                                              ensureBulletPrefix(bullet),
                                            )
                                            .filter(Boolean),
                                        }
                                      : item,
                                  ),
                                )
                              }
                              className="app-scrollbar min-h-[156px] w-full resize-y rounded-[10px] border border-white/8 bg-[#1b1816] px-4 py-3 text-[0.95rem] leading-7 text-stone-200 outline-none transition focus:border-[#4a433d] focus:ring-2 focus:ring-white/5"
                            />
                          </div>
                        ))}
                      </div>
                    </PreviewSection>
                  </div>
                ) : (
                  <div className="rounded-[14px] border border-dashed border-white/10 bg-white/[0.03] p-7">
                    <div className="space-y-3">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-stone-500">
                        Empty preview
                      </p>
                      <p className="max-w-md text-sm leading-7 text-stone-400">
                        Run the tailoring flow to populate the draft summary,
                        skills, and experience sections here.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-3 pt-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleTailorCv}
                  disabled={isGenerating}
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-stone-100 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCcw className="h-4 w-4" />
                  {isGenerating ? "Refreshing draft..." : "Refresh draft"}
                </button>
                <button
                  type="button"
                  onClick={handleExportPdf}
                  disabled={isExportingPdf}
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[12px] bg-[linear-gradient(180deg,#b78a52_0%,#9f7340_100%)] px-5 py-4 text-sm font-medium text-white shadow-[0_20px_35px_rgba(164,119,61,0.3)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FileText className="h-4 w-4" />
                  {isExportingPdf ? "Exporting PDF..." : "Export CV PDF"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {isProfileOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/28 px-4 py-6 backdrop-blur-[2px]">
          <div className="w-full max-w-xl rounded-[18px] border border-[#e3d8ca] bg-[#fffdfa] p-5 shadow-[0_30px_80px_rgba(32,24,17,0.22)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#aa7a40]">
                  Base Profile
                </p>
                <h3 className="text-lg font-medium text-stone-900">
                  Edit profile context
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="rounded-[10px] border border-[#e4dbcf] px-3 py-1.5 text-sm text-stone-600 transition hover:bg-[#faf6f1]"
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <p className="text-sm leading-7 text-stone-600">
                Keep one skill or profile signal per line. This context guides
                tailoring decisions later.
              </p>

              <textarea
                value={profileText}
                onChange={(event) => setProfileText(event.target.value)}
                className="app-scrollbar min-h-[240px] w-full resize-y rounded-[12px] border border-[#e6ddd2] bg-white px-4 py-3 text-[0.95rem] leading-7 text-stone-800 outline-none transition focus:border-[#cdb79c] focus:ring-4 focus:ring-[#b08145]/10"
              />
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="rounded-[12px] border border-[#e4dbcf] bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-[#faf6f1]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="rounded-[12px] bg-[#171412] px-4 py-2.5 text-sm font-medium text-stone-50 transition hover:bg-[#211d1a]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isCoverLetterOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/28 px-4 py-6 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl rounded-[18px] border border-[#e3d8ca] bg-[#fffdfa] p-5 shadow-[0_30px_80px_rgba(32,24,17,0.22)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#aa7a40]">
                  Cover Letter
                </p>
                <h3 className="text-lg font-medium text-stone-900">
                  {isGeneratingCoverLetter
                    ? "Generating letter"
                    : hasCoverLetterDraft
                    ? "Cover letter draft"
                    : "Cover letter"}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCoverLetterOpen(false)}
                className="rounded-[10px] border border-[#e4dbcf] px-3 py-1.5 text-sm text-stone-600 transition hover:bg-[#faf6f1]"
              >
                Close
              </button>
            </div>

            {isGeneratingCoverLetter ? (
              <div className="mt-5 rounded-[12px] border border-[#e7ddd1] bg-white p-4">
                <p className="text-sm leading-7 text-stone-600">
                  Preparing a draft from the current role and profile context...
                </p>
              </div>
            ) : coverLetterError ? (
              <div className="mt-5 rounded-[12px] border border-[#e5c8c5] bg-[#fff4f2] p-4">
                <p className="text-sm leading-7 text-[#9a443e]">
                  {coverLetterError}
                </p>
              </div>
            ) : hasCoverLetterDraft ? (
              <div className="mt-5 rounded-[12px] border border-[#e7ddd1] bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#aa7a40]">
                    Generated draft
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyCoverLetter}
                    className="inline-flex items-center gap-2 rounded-[10px] border border-[#e4dbcf] bg-[#faf6f1] px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-white"
                  >
                    <Clipboard className="h-4 w-4" />
                    {coverLetterCopied ? "Copied" : "Copy text"}
                  </button>
                </div>
                <textarea
                  value={coverLetterText}
                  onChange={(event) => setCoverLetterText(event.target.value)}
                  className="app-scrollbar min-h-[320px] w-full resize-y rounded-[12px] border border-[#e6ddd2] bg-white px-4 py-3 text-sm leading-7 text-stone-700 outline-none transition focus:border-[#cdb79c] focus:ring-4 focus:ring-[#b08145]/10"
                />
              </div>
            ) : (
              <div className="mt-5 rounded-[12px] border border-[#e7ddd1] bg-white p-4">
                <p className="text-sm leading-7 text-stone-600">
                  Generate a cover letter to open the first editable draft here.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <section className="mx-auto mt-8 w-full max-w-[1440px] rounded-[18px] border border-[#e5dbce] bg-[#fffdfa] p-5 shadow-[0_18px_40px_rgba(50,36,20,0.08)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#aa7a40]">
              Print View
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Dedicated resume layout for PDF export.
            </p>
          </div>
        </div>

        <div className="overflow-auto rounded-[14px] border border-[#e8dfd4] bg-[#f5f1ea] p-4 sm:p-5">
          <div ref={printRootRef}>
            <CvPrintView data={printableViewData} />
          </div>
        </div>
      </section>
    </main>
  );
}
