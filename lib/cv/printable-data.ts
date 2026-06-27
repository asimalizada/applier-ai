import { baseCv, formatExperienceHeading } from "@/lib/cv/base-cv";

export type PrintableCvData = {
  name: string;
  role: string;
  contacts: { label: string; href: string }[];
  summary: string;
  skills: { label: string; value: string }[];
  experience: {
    heading: string;
    period: string;
    bullets: string[];
  }[];
};

export const printableCvData: PrintableCvData = {
  name: baseCv.name,
  role: baseCv.role,
  contacts: baseCv.contacts,
  summary: baseCv.summary,
  skills: baseCv.skills.map((group) => ({
    label: group.label,
    value: group.items.join(" • "),
  })),
  experience: baseCv.experience.map((entry) => ({
    heading: formatExperienceHeading(entry),
    period: entry.period,
    bullets: entry.bullets,
  })),
};
