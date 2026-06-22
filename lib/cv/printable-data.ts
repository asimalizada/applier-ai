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
  name: "ASIM ALIZADA",
  role: "Senior Software Engineer",
  contacts: [
    { label: "asim.alizada.dev@gmail.com", href: "mailto:asim.alizada.dev@gmail.com" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
    { label: "Portfolio", href: "#" },
  ],
  summary:
    "Senior Software Engineer with 6+ years of experience building full-stack, cloud-based platforms using .NET, Node.js, React, Next.js, and Angular. Experienced in microservices, distributed systems, integrations, release management, and production-ready software delivery across cybersecurity, fitness, energy, EdTech, and enterprise products.",
  skills: [
    {
      label: "Backend",
      value: ".NET (Core) • Node.js • NestJS • REST APIs • GraphQL",
    },
    {
      label: "Frontend",
      value: "React • Next.js • Angular • TypeScript • Micro-frontends",
    },
    {
      label: "Data",
      value: "PostgreSQL • MongoDB • SQL Server • MySQL • Prisma • Entity Framework",
    },
    {
      label: "Cloud/DevOps",
      value: "AWS • Docker • Kubernetes • CI/CD • Cloudflare • Azure",
    },
    {
      label: "Practices",
      value: "Microservices • Distributed Systems • Event-Driven Architecture • Clean Architecture",
    },
  ],
  experience: [
    {
      heading: "Lead Software Engineer, Webidea – Remote, USA",
      period: "Feb 2026 – Present",
      bullets: [
        "Led full-stack development for a cloud-based fitness platform, covering backend services, product workflows, and frontend delivery.",
        "Designed scalable APIs and integration-ready services across core platform features.",
        "Owned release management, CI/CD workflows, and cloud deployments across Railway, Cloudflare, and GitHub.",
        "Standardized service architecture, environment configuration, and production deployment practices.",
      ],
    },
    {
      heading: "Senior Software Engineer, Cymulate (via Progressocore) – Remote, USA",
      period: "Apr 2025 – May 2026",
      bullets: [
        "Built full-stack features using NestJS, Prisma, React/Next.js, and micro-frontends for cybersecurity testing workflows.",
        "Designed a dynamic ITSM integration framework for Jira and ServiceNow with configurable auth, fields, statuses, and ticket rules.",
        "Developed a .NET endpoint agent deployed in customer environments to simulate and validate security controls.",
        "Integrated enterprise security platforms including Devo, Zscaler, Wiz, Sophos, and Microsoft Entra ID.",
      ],
    },
  ],
};
