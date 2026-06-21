"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Clipboard,
  CodeXml,
  FileText,
  Pencil,
  RefreshCcw,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

const sampleJobDescription = `We're looking for a Senior Frontend Engineer to join our product team.
You will build performant, accessible web experiences using React and TypeScript.
You'll collaborate with designers and backend engineers to ship features that delight millions of users.

Requirements:
- 5+ years of experience building modern web applications
- Strong proficiency in TypeScript, React, and Next.js
- Experience with state management, testing, and performance optimization
- Comfortable working with REST/GraphQL APIs
- Strong communication and ownership mindset`;

const summaryText =
  "Senior Frontend Engineer with 6+ years of experience building scalable, accessible web applications using React, TypeScript, and Next.js. Proven track record of delivering high-impact features that improve performance, usability, and business outcomes.";

const skillItems = [
  "TypeScript",
  "React",
  "Next.js",
  "JavaScript",
  "HTML/CSS",
  "Node.js",
  "REST APIs",
  "GraphQL",
  "Git",
  "Jest",
  "PostgreSQL",
];

const experienceItems = [
  "Built a component library adopted across 8 products, reducing development time by 35%.",
  "Improved Core Web Vitals by 40% through code splitting, lazy loading, and bundle optimization.",
  "Led migration to TypeScript and Next.js, increasing code quality and deployment velocity.",
  "Collaborated with design and backend teams to deliver features used by 2M+ monthly active users.",
];

const achievementItems = [
  "Reduced page load time by 45%, improving conversion by 12%.",
  "Increased test coverage from 48% to 82%.",
  "Shipped 20+ features with zero Sev-1 incidents.",
];

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
  const [hasPreview, setHasPreview] = useState(false);
  const [jobDescription, setJobDescription] = useState(sampleJobDescription);

  const previewReady = hasPreview;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text.trim()) {
        setJobDescription(text);
      }
    } catch {
      setJobDescription(sampleJobDescription);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f3ee] px-4 py-4 text-stone-900 sm:px-5 lg:h-screen lg:overflow-hidden lg:px-6 lg:py-5">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 lg:h-full">
        <div className="grid gap-4 lg:h-full lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
          <section className="rounded-[18px] border border-[#e5dbce] bg-[linear-gradient(180deg,#fffdfa_0%,#fcf8f2_100%)] p-5 shadow-[0_24px_60px_rgba(50,36,20,0.08)] sm:p-6 lg:flex lg:min-h-0 lg:flex-col">
            <div className="space-y-4 lg:flex lg:min-h-0 lg:flex-col">
              <div className="flex flex-col gap-3 border-b border-[#eee4d8] pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-[0.92rem] font-semibold uppercase tracking-[0.28em] text-[#aa7a40]">
                    Applier AI
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 self-start rounded-[12px] border border-[#e4dbcf] bg-[#faf6f1] px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-[#d6c9b8] hover:bg-white"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit base profile</span>
                </button>
              </div>

              <div className="rounded-[14px] border border-[#e7ddd1] bg-[#fffdfa] p-4 shadow-[0_14px_34px_rgba(30,24,18,0.04)] lg:flex lg:min-h-0 lg:flex-col">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-medium tracking-[-0.02em] text-stone-900">
                    Job description
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <UtilityButton onClick={handlePaste}>
                      <Clipboard className="h-4 w-4" />
                      <span>Paste</span>
                    </UtilityButton>
                    <UtilityButton
                      onClick={() => setJobDescription(sampleJobDescription)}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Use sample</span>
                    </UtilityButton>
                    <UtilityButton onClick={() => setJobDescription("")}>
                      <Pencil className="h-4 w-4" />
                      <span>Clear</span>
                    </UtilityButton>
                  </div>
                </div>

                <textarea
                  id="job-description"
                  name="jobDescription"
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  className="app-scrollbar min-h-[320px] w-full resize-y rounded-[12px] border border-[#e6ddd2] bg-white px-5 py-4 text-[0.95rem] leading-7 text-stone-700 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition placeholder:text-stone-400 focus:border-[#cdb79c] focus:ring-4 focus:ring-[#b08145]/10 lg:min-h-[380px]"
                />
              </div>

              <div className="space-y-3 border-t border-[#eee4d8] pt-1">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setHasPreview(true)}
                    className="inline-flex min-h-14 flex-1 items-center justify-between rounded-[12px] bg-[#171412] px-5 py-4 text-left text-stone-50 shadow-[0_20px_40px_rgba(20,18,16,0.22)] transition hover:bg-[#211d1a]"
                  >
                    <span className="flex items-center gap-3 text-sm font-medium">
                      <span className="text-[#d8b98f]">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      Tailor CV
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    className="inline-flex min-h-14 items-center gap-3 rounded-[12px] border border-[#e4dacc] bg-white px-5 py-4 text-left text-stone-800 transition hover:bg-[#fdfaf6] sm:min-w-[300px]"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Generate cover letter
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[18px] border border-[#2b2723] bg-[linear-gradient(180deg,#171513_0%,#121110_100%)] p-5 text-stone-100 shadow-[0_28px_80px_rgba(22,19,16,0.34)] sm:p-6 lg:flex lg:min-h-0 lg:flex-col">
            <div className="space-y-5 lg:flex lg:min-h-0 lg:flex-col">
              <div className="space-y-3">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
                  Preview
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-editorial text-3xl leading-none tracking-[-0.05em] text-white">
                    {previewReady ? "Draft ready" : "Awaiting review"}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-2 rounded-[10px] border px-3 py-1.5 text-sm ${
                      previewReady
                        ? "border-[#26653b] bg-[#163421] text-[#7fe59f]"
                        : "border-white/10 bg-white/[0.04] text-stone-300"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        previewReady ? "bg-[#3dd273]" : "bg-stone-500"
                      }`}
                    />
                    {previewReady ? "Ready" : "Standby"}
                  </span>
                </div>
              </div>

              <div className="app-scrollbar lg:min-h-0 lg:flex-1 lg:overflow-auto lg:pr-1">
                {previewReady ? (
                  <div className="space-y-4">
                    <PreviewSection
                      icon={<UserRound className="h-4 w-4" />}
                      title="Summary"
                    >
                      <p className="text-[0.97rem] leading-8 text-stone-200">
                        {summaryText}
                      </p>
                    </PreviewSection>

                    <PreviewSection
                      icon={<CodeXml className="h-4 w-4" />}
                      title="Skills"
                    >
                      <div className="flex flex-wrap gap-2.5">
                        {skillItems.map((item) => (
                          <SkillChip key={item} label={item} />
                        ))}
                      </div>
                    </PreviewSection>

                    <PreviewSection
                      icon={<BriefcaseBusiness className="h-4 w-4" />}
                      title="Experience"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-300">
                          <span className="text-base font-medium text-stone-100">
                            Senior Frontend Engineer
                          </span>
                          <span className="text-stone-500">•</span>
                          <span>Acme Inc.</span>
                          <span className="text-stone-500">•</span>
                          <span>2021 – Present</span>
                        </div>
                        <ul className="space-y-2.5 pl-5 text-[0.95rem] leading-7 text-stone-200 marker:text-stone-500">
                          {experienceItems.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </PreviewSection>

                    <PreviewSection
                      icon={<Star className="h-4 w-4" />}
                      title="Selected achievements"
                    >
                      <ul className="space-y-3">
                        {achievementItems.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[0.95rem] leading-7 text-stone-200"
                          >
                            <span className="mt-1 text-[#41d07b]">
                              <BadgeCheck className="h-4 w-4" />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </PreviewSection>
                  </div>
                ) : (
                  <div className="rounded-[14px] border border-dashed border-white/10 bg-white/[0.03] p-7">
                    <div className="space-y-4">
                      <div className="h-3 w-20 rounded-full bg-white/10" />
                      <div className="h-3 w-40 rounded-full bg-white/8" />
                      <div className="space-y-2 pt-2">
                        <div className="h-2.5 w-full rounded-full bg-white/6" />
                        <div className="h-2.5 w-[92%] rounded-full bg-white/6" />
                        <div className="h-2.5 w-[76%] rounded-full bg-white/6" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setHasPreview(true)}
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[12px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-stone-100 transition hover:bg-white/[0.06]"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Regenerate
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-14 items-center justify-center gap-3 rounded-[12px] bg-[linear-gradient(180deg,#b78a52_0%,#9f7340_100%)] px-5 py-4 text-sm font-medium text-white shadow-[0_20px_35px_rgba(164,119,61,0.3)] transition hover:brightness-105"
                >
                  <FileText className="h-4 w-4" />
                  Export PDF
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
