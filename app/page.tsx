"use client";

import { useState } from "react";

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

const profileItems = [
  "Frontend Engineer",
  "TypeScript",
  "React / Next.js",
  "Node.js",
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

function SparkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5 14.3 9l5.2 2.2-5.2 2.2L12 19l-2.3-5.6-5.2-2.2L9.7 9 12 3.5Z" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16V5" />
      <path d="m8 9 4-4 4 4" />
      <path d="M20 16.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3h6l1 2h3v16H5V5h3l1-2Z" />
      <path d="M9 7h6" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 17.2 1.2 3.8L8 19.8 18.4 9.4a2.2 2.2 0 0 0-3.1-3.1L4.9 16.7Z" />
      <path d="m13.9 7.8 2.3 2.3" />
    </svg>
  );
}

function SummaryIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13 5-2 14" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 6V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V6" />
      <path d="M4 8.5h16a1 1 0 0 1 1 1V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5a1 1 0 0 1 1-1Z" />
      <path d="M3 12h18" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3.8 2.4 4.8 5.3.8-3.8 3.8.9 5.4L12 16l-4.8 2.6.9-5.4L4.3 9.4l5.3-.8L12 3.8Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.4 2.5 4.7-5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 11a8 8 0 1 0-2.3 6" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M8.5 15.5h2.2a1.8 1.8 0 0 0 0-3.6H8.5v6" />
      <path d="M13.5 18h1.3a2.3 2.3 0 0 0 0-4.6h-1.3V18Z" />
      <path d="M18.5 11.9h-2.4V18" />
    </svg>
  );
}

type PreviewSectionProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
};

function PreviewSection({ icon, title, children }: PreviewSectionProps) {
  return (
    <section className="rounded-[22px] border border-white/10 bg-[#27231f] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 text-[#dbc19d]">
          {icon}
          <h3 className="text-[1.02rem] font-medium text-stone-100">{title}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-300">
          <PencilIcon />
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
      className="inline-flex items-center gap-2 rounded-xl border border-[#e4dbcf] bg-white px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-[#d6c9b8] hover:bg-[#fdfbf8]"
    >
      {children}
    </button>
  );
}

type ProfilePillProps = {
  label: string;
};

function ProfilePill({ label }: ProfilePillProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-[#e6ddd1] bg-white px-4 py-3 text-sm font-medium text-stone-700 shadow-[0_10px_20px_rgba(17,17,17,0.03)]">
      <span className="flex h-7 w-7 items-center justify-center rounded-xl border border-[#e8dfd4] bg-[#faf7f2] text-[0.72rem] text-[#a7793d]">
        {label
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)}
      </span>
      <span>{label}</span>
    </div>
  );
}

function SkillChip({ label }: ProfilePillProps) {
  return (
    <span className="rounded-xl border border-white/8 bg-[#322d28] px-3 py-2 text-sm text-stone-200">
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
    <main className="min-h-screen bg-[#f7f3ee] px-4 py-4 text-stone-900 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1460px] rounded-[34px] border border-[#dfd6ca] bg-[radial-gradient(circle_at_top,#fffdfa_0%,#f9f5ef_44%,#f5f0e8_100%)] p-5 shadow-[0_28px_80px_rgba(66,50,31,0.14)] sm:p-6 lg:p-8">
        <div className="rounded-[28px] border border-[#e4dbcf] bg-white/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur">
          <div className="flex items-center justify-between border-b border-[#eadfce] px-5 py-3 sm:px-6">
            <div className="flex items-center gap-2.5 text-stone-400">
              <span className="h-3 w-3 rounded-full bg-[#e98e7b]" />
              <span className="h-3 w-3 rounded-full bg-[#e7c564]" />
              <span className="h-3 w-3 rounded-full bg-[#72bf74]" />
            </div>
            <div className="flex min-w-0 flex-1 justify-center px-4">
              <div className="flex w-full max-w-md items-center justify-center gap-2 rounded-2xl border border-[#ebe3d9] bg-[#f6f1ea] px-4 py-2 text-sm text-stone-500">
                <span className="text-stone-400">applier.ai</span>
              </div>
            </div>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-stone-500 transition hover:border-[#e6ddcf] hover:bg-white"
            >
              <span className="text-xl leading-none">+</span>
            </button>
          </div>

          <header className="flex flex-col gap-4 border-b border-[#eadfce] px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#fbf5eb] text-[#b08145] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <SparkIcon />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-editorial text-[2rem] leading-none tracking-[-0.04em] text-stone-950">
                  Applier AI
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-[#e4d9c9] hover:bg-[#faf6f1]"
              >
                <UploadIcon />
                <span>Import CV</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-[#e4d9c9] hover:bg-[#faf6f1]"
              >
                <HistoryIcon />
                <span>History</span>
              </button>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e7ddcf] bg-[linear-gradient(180deg,#d1b08a_0%,#9f7950_100%)] text-sm font-semibold text-white">
                AA
              </div>
            </div>
          </header>

          <div className="px-5 pt-5 sm:px-6">
            <div className="flex items-center justify-center gap-3 rounded-full border border-[#e8dfd4] bg-[#fbf7f1] px-6 py-3 text-center text-sm text-stone-600 shadow-[0_12px_24px_rgba(17,17,17,0.03)]">
              <span className="text-[#b08145]">
                <SparkIcon />
              </span>
              <p>Tailor your CV with clear, reviewable AI suggestions.</p>
            </div>
          </div>

          <div className="grid gap-5 px-5 py-5 sm:px-6 sm:py-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:items-start">
            <section className="rounded-[30px] border border-[#e5dbce] bg-[linear-gradient(180deg,#fffdfa_0%,#fcf8f2_100%)] p-6 shadow-[0_24px_60px_rgba(50,36,20,0.08)] sm:p-7 lg:p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.35em] text-[#aa7a40]">
                    CV Tailoring Studio
                  </p>
                  <div className="max-w-2xl space-y-4">
                    <h1 className="font-editorial max-w-xl text-5xl leading-[0.95] tracking-[-0.06em] text-stone-950 sm:text-6xl">
                      Shape each application with more intent.
                    </h1>
                    <p className="max-w-xl text-base leading-8 text-stone-600">
                      Tailor your CV against a target role, review each change,
                      and export a polished PDF without losing your voice.
                    </p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#e7ddd1] bg-[#fffdfa] p-5 shadow-[0_14px_34px_rgba(30,24,18,0.04)]">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-xl font-medium tracking-[-0.02em] text-stone-900">
                      Job description
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <UtilityButton onClick={handlePaste}>
                        <ClipboardIcon />
                        <span>Paste</span>
                      </UtilityButton>
                      <UtilityButton
                        onClick={() => setJobDescription(sampleJobDescription)}
                      >
                        <DocumentIcon />
                        <span>Use sample</span>
                      </UtilityButton>
                      <UtilityButton onClick={() => setJobDescription("")}>
                        <PencilIcon />
                        <span>Clear</span>
                      </UtilityButton>
                    </div>
                  </div>

                  <textarea
                    id="job-description"
                    name="jobDescription"
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    className="min-h-[260px] w-full resize-none rounded-[22px] border border-[#e6ddd2] bg-white px-5 py-4 text-[0.95rem] leading-8 text-stone-700 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition placeholder:text-stone-400 focus:border-[#cdb79c] focus:ring-4 focus:ring-[#b08145]/10"
                  />
                </div>

                <div className="rounded-[24px] border border-[#e7ddd1] bg-[#fffdfa] p-5 shadow-[0_14px_34px_rgba(30,24,18,0.04)]">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-medium tracking-[-0.02em] text-stone-900">
                        Base profile
                      </h2>
                      <span className="text-sm text-stone-400">i</span>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
                    >
                      <PencilIcon />
                      <span>Edit profile</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {profileItems.map((item) => (
                      <ProfilePill key={item} label={item} />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setHasPreview(true)}
                      className="inline-flex min-h-14 flex-1 items-center justify-between rounded-2xl bg-[#171412] px-5 py-4 text-left text-stone-50 shadow-[0_20px_40px_rgba(20,18,16,0.22)] transition hover:bg-[#211d1a]"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <span className="text-[#d8b98f]">
                          <SparkIcon />
                        </span>
                        Tailor CV
                      </span>
                      <ArrowRightIcon />
                    </button>

                    <button
                      type="button"
                      className="inline-flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-[#e4dacc] bg-white px-5 py-4 text-left text-stone-800 transition hover:bg-[#fdfaf6] sm:min-w-[300px]"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <DocumentIcon />
                        Generate cover letter
                      </span>
                      <span className="rounded-full border border-[#e5dacb] bg-[#faf7f2] px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-stone-500">
                        Optional
                      </span>
                    </button>
                  </div>

                  <p className="text-sm text-stone-500">
                    Cover letter is not included in the CV preview until
                    requested.
                  </p>
                </div>
              </div>
            </section>

            <aside className="sticky top-6 rounded-[30px] border border-[#2b2723] bg-[linear-gradient(180deg,#171513_0%,#121110_100%)] p-5 text-stone-100 shadow-[0_28px_80px_rgba(22,19,16,0.34)] sm:p-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
                    Preview
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-editorial text-4xl leading-none tracking-[-0.05em] text-white">
                      {previewReady ? "Draft ready" : "Awaiting review"}
                    </h2>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
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
                  <p className="text-sm leading-7 text-stone-400">
                    {previewReady
                      ? "This is a mocked result based on your inputs."
                      : "Your tailored CV preview will appear here after the first tailoring pass."}
                  </p>
                </div>

                {previewReady ? (
                  <>
                    <PreviewSection icon={<SummaryIcon />} title="Summary">
                      <p className="text-[0.97rem] leading-8 text-stone-200">
                        {summaryText}
                      </p>
                    </PreviewSection>

                    <PreviewSection icon={<CodeIcon />} title="Skills">
                      <div className="flex flex-wrap gap-2.5">
                        {skillItems.map((item) => (
                          <SkillChip key={item} label={item} />
                        ))}
                      </div>
                    </PreviewSection>

                    <PreviewSection icon={<BriefcaseIcon />} title="Experience">
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

                    <PreviewSection icon={<StarIcon />} title="Selected achievements">
                      <ul className="space-y-3">
                        {achievementItems.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-[0.95rem] leading-7 text-stone-200"
                          >
                            <span className="mt-1 text-[#41d07b]">
                              <CheckIcon />
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </PreviewSection>
                  </>
                ) : (
                  <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] p-7">
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

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setHasPreview(true)}
                    className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-stone-100 transition hover:bg-white/[0.06]"
                  >
                    <RefreshIcon />
                    Regenerate
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[linear-gradient(180deg,#b78a52_0%,#9f7340_100%)] px-5 py-4 text-sm font-medium text-white shadow-[0_20px_35px_rgba(164,119,61,0.3)] transition hover:brightness-105"
                  >
                    <PdfIcon />
                    Export PDF
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
