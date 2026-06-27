export type CvContact = {
  label: string;
  href: string;
};

export type CvSkillGroup = {
  label: string;
  items: string[];
};

export type CvExperienceEntry = {
  title: string;
  company: string;
  workTypeCountry: string;
  period: string;
  bullets: string[];
};

export type CvEducationEntry = {
  degree: string;
  school: string;
  period: string;
  gpa: string;
};

export type BaseCv = {
  name: string;
  role: string;
  contacts: CvContact[];
  summary: string;
  skills: CvSkillGroup[];
  experience: CvExperienceEntry[];
  education: CvEducationEntry[];
};

export function ensureBulletPrefix(value: string): string {
  const trimmed = value.trim().replace(/^-\s*/, "");
  return trimmed ? `- ${trimmed}` : "";
}

export function normalizeBulletList(values: string[]): string[] {
  return values.map(ensureBulletPrefix).filter(Boolean);
}

export const baseCv: BaseCv = {
  name: "ASIM ALIZADA",
  role: "Senior Software Engineer",
  contacts: [
    {
      label: "asim.alizada.dev@gmail.com",
      href: "mailto:asim.alizada.dev@gmail.com",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/alizada-asim",
    },
    {
      label: "GitHub",
      href: "https://github.com/asimalizada",
    },
    {
      label: "Portfolio",
      href: "https://asimalizada.vercel.app",
    },
  ],
  summary:
    "Senior Software Engineer with 6+ years of experience building full-stack, cloud-based platforms using .NET, Node.js, React, Next.js, and Angular. Experienced in microservices, distributed systems, integrations, release management, and production-ready software delivery across cybersecurity, fitness, energy, EdTech, and enterprise products.",
  skills: [
    {
      label: "Backend",
      items: [".NET (Core)", "Node.js", "NestJS", "REST APIs", "GraphQL"],
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Angular", "TypeScript", "Micro-frontends"],
    },
    {
      label: "Data",
      items: [
        "PostgreSQL",
        "MongoDB",
        "SQL Server",
        "MySQL",
        "Prisma",
        "Entity Framework",
      ],
    },
    {
      label: "Cloud/DevOps",
      items: ["AWS", "Docker", "Kubernetes", "CI/CD", "Cloudflare", "Azure"],
    },
    {
      label: "Practices",
      items: [
        "Microservices",
        "Distributed Systems",
        "Event-Driven Architecture",
        "Clean Architecture",
      ],
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
    {
      title: "Senior Software Engineer",
      company: "Cymulate (via Progressocore)",
      workTypeCountry: "Remote, USA",
      period: "Apr 2025 - May 2026",
      bullets: [
        "Built full-stack features using NestJS, Prisma, React/Next.js, and micro-frontends for cybersecurity testing workflows.",
        "Designed a dynamic ITSM integration framework for Jira and ServiceNow with configurable auth, fields, statuses, and ticket rules.",
        "Developed a .NET endpoint agent deployed in customer environments to simulate and validate security controls.",
        "Integrated enterprise security platforms including Devo, Zscaler, Wiz, Sophos, and Microsoft Entra ID.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Simplexity Group (Contract)",
      workTypeCountry: "Remote, France",
      period: "Aug 2025 - Apr 2026",
      bullets: [
        "Developed .NET/Angular features for an Energy Management System, improving device monitoring workflows.",
        "Implemented Google Maps-based device tracking with custom markers and real-time visualization.",
        "Built background workers, event-driven processing, and MinIO/local file storage with signed URL access.",
      ],
    },
    {
      title: "Software Engineer",
      company: "TayqaTech",
      workTypeCountry: "Baku, Azerbaijan",
      period: "Aug 2023 - Apr 2025",
      bullets: [
        "Developed CRM, Sales, Workplan modules using .NET Core and Angular for internal business operations.",
        "Integrated ERP platforms and internal services to automate data exchange across enterprise systems.",
        "Built an internal low-code platform for faster creation and management of business applications.",
      ],
    },
    {
      title: "Software Engineer",
      company: "TechBridge Solutions",
      workTypeCountry: "Baku, Azerbaijan",
      period: "Jun 2022 - Aug 2023",
      bullets: [
        "Built end-to-end session management and incident detection features for an EdTech LMS, applying the logic across .NET and NestJS microservices.",
        "Developed Angular dashboards and React/Next.js applications for teacher and student workflows.",
        "Integrated Stripe, PayPal and local providers, and supported Docker/AWS-based deployments.",
      ],
    },
    {
      title: "Junior Software Engineer",
      company: "InsureSoft",
      workTypeCountry: "Baku, Azerbaijan",
      period: "Jun 2021 - Jun 2022",
      bullets: [
        "Developed enterprise business modules using .NET and ASP.NET MVC to support operational workflows.",
        "Integrated biometric attendance and external services via REST/SOAP APIs.",
      ],
    },
    {
      title: "Junior Software Engineer",
      company: "SmartSoft Technologies",
      workTypeCountry: "Baku, Azerbaijan",
      period: "Feb 2020 - Jun 2021",
      bullets: [
        "Built real-time Angular dashboards with SignalR/WebSockets for live data monitoring.",
        "Developed .NET jobs, Python components, and REST APIs for data processing and classification.",
      ],
    },
    {
      title: "Part-time IT Instructor",
      company: "Academy of Public Administration (APA)",
      workTypeCountry: "Baku, Azerbaijan",
      period: "Sep 2020 - Oct 2023",
      bullets: [
        "Taught C#, .NET Core, Web API, and Angular through project-based training.",
      ],
    },
  ],
  education: [
    {
      degree: "MSc in Information Systems Security",
      school: "The Academy of Public Administration, Baku, Azerbaijan.",
      period: "2023 - 2025",
      gpa: "GPA: 94.8/100 (4.0/4.0)",
    },
    {
      degree: "BSc in Computer Science",
      school: "The Academy of Public Administration, Baku, Azerbaijan.",
      period: "2019 - 2023",
      gpa: "GPA: 94.3/100 (4.0/4.0)",
    },
  ],
};

export function cloneSkillGroups(skills: CvSkillGroup[]): CvSkillGroup[] {
  return skills.map((group) => ({
    label: group.label,
    items: [...group.items],
  }));
}

export function cloneExperienceEntries(
  experience: CvExperienceEntry[],
): CvExperienceEntry[] {
  return experience.map((entry) => ({
    title: entry.title,
    company: entry.company,
    workTypeCountry: entry.workTypeCountry,
    period: entry.period,
    bullets: normalizeBulletList(entry.bullets),
  }));
}

export function formatExperienceHeading(entry: CvExperienceEntry): string {
  return `${entry.title}, ${entry.company} - ${entry.workTypeCountry}`;
}

export function formatBaseCvForAi(cv: BaseCv): string {
  const contacts = cv.contacts.map((contact) => `- ${contact.label}: ${contact.href}`).join("\n");
  const skills = cv.skills
    .map((group) => `- ${group.label}: ${group.items.join(" • ")}`)
    .join("\n");
  const experience = cv.experience
    .map((entry) =>
      [
        `- ${formatExperienceHeading(entry)}`,
        `  Period: ${entry.period}`,
        ...normalizeBulletList(entry.bullets).map(
          (bullet) => `  Bullet: ${bullet}`,
        ),
      ].join("\n"),
    )
    .join("\n");
  const education = cv.education
    .map(
      (entry) =>
        `- ${entry.degree} | ${entry.school} | ${entry.period} | ${entry.gpa}`,
    )
    .join("\n");

  return [
    `Name: ${cv.name}`,
    `Role: ${cv.role}`,
    "",
    "Contacts:",
    contacts,
    "",
    "Summary:",
    cv.summary,
    "",
    "Skills:",
    skills,
    "",
    "Experience:",
    experience,
    "",
    "Education:",
    education,
  ].join("\n");
}
