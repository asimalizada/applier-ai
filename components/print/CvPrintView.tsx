import type { PrintableCvData } from "@/lib/cv/printable-data";

type CvPrintViewProps = {
  data: PrintableCvData;
};

export function CvPrintView({ data }: CvPrintViewProps) {
  return (
    <article className="cv-print mx-auto w-full max-w-[900px] bg-white px-10 py-12 text-black">
      <header className="border-b border-[#b8b8b8] pb-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-[0.04em]">
          {data.name}
        </h1>
        <p className="mt-3 text-[1.05rem]">{data.role}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[1rem] text-[#1d4ed8]">
          {data.contacts.map((item, index) => (
            <span key={item.label} className="flex items-center gap-3">
              <a href={item.href} className="underline-offset-2 hover:underline">
                {item.label}
              </a>
              {index < data.contacts.length - 1 ? <span className="text-black">|</span> : null}
            </span>
          ))}
        </div>
      </header>

      <section className="border-b border-[#b8b8b8] py-5">
        <h2 className="text-[2rem] font-extrabold uppercase tracking-[0.02em]">
          Summary
        </h2>
        <p className="mt-3 text-[1.05rem] leading-9">{data.summary}</p>
      </section>

      <section className="border-b border-[#b8b8b8] py-5">
        <h2 className="text-[2rem] font-extrabold uppercase tracking-[0.02em]">
          Skills
        </h2>
        <div className="mt-3 space-y-2 text-[1rem] leading-8">
          {data.skills.map((item) => (
            <p key={item.label}>
              <strong>{item.label}:</strong> {item.value}
            </p>
          ))}
        </div>
      </section>

      <section className="py-5">
        <h2 className="text-[2rem] font-extrabold uppercase tracking-[0.02em]">
          Experience
        </h2>
        <div className="mt-4 space-y-6">
          {data.experience.map((item) => (
            <div key={`${item.heading}-${item.period}`}>
              <h3 className="text-[1.2rem] font-bold">{item.heading}</h3>
              <p className="text-[1.1rem] font-semibold">{item.period}</p>
              <ul className="mt-2 space-y-1 text-[1rem] leading-8">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>- {bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
