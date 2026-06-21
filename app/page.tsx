export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6f1e8_0%,#f3efe8_24%,#ece7de_100%)] text-stone-900">
      <div className="mx-auto flex min-h-screen w-full max-w-[1480px] flex-col px-6 py-6 sm:px-8 lg:px-10">
        <div className="mb-6 h-14 rounded-full border border-stone-900/10 bg-white/50 shadow-[0_10px_30px_rgba(28,25,23,0.06)] backdrop-blur-sm" />

        <div className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,0.75fr)]">
          <section className="rounded-[32px] border border-stone-900/10 bg-white/70 p-6 shadow-[0_30px_80px_rgba(28,25,23,0.08)] backdrop-blur-sm sm:p-8">
            <div className="flex h-full min-h-[420px] flex-col gap-5">
              <div className="space-y-4">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-stone-500">
                  Applier AI
                </p>
                <div className="max-w-2xl space-y-3">
                  <h1 className="text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
                    Shape each application with more intent.
                  </h1>
                  <p className="max-w-xl text-sm leading-7 text-stone-600 sm:text-[0.95rem]">
                    Tailor your CV against a target role, review each change,
                    and export a polished PDF without drifting away from your
                    real experience.
                  </p>
                </div>
              </div>

              <div className="flex-1 rounded-[28px] border border-stone-900/10 bg-[#fbfaf7] p-4 sm:p-5">
                <div className="flex h-full flex-col gap-3">
                  <div className="space-y-1">
                    <label
                      htmlFor="job-description"
                      className="text-sm font-medium text-stone-700"
                    >
                      Job description
                    </label>
                    <p className="text-sm leading-6 text-stone-500">
                      Paste the full role description to tailor your CV draft.
                    </p>
                  </div>

                  <textarea
                    id="job-description"
                    name="jobDescription"
                    placeholder="Paste the target role here..."
                    className="min-h-[260px] flex-1 resize-none rounded-[24px] border border-stone-900/10 bg-white px-5 py-4 text-sm leading-7 text-stone-800 outline-none transition focus:border-stone-900/20 focus:ring-4 focus:ring-stone-900/5"
                  />

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <p className="text-xs tracking-[0.16em] text-stone-400 uppercase">
                      Review happens before export
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-800"
                    >
                      Tailor CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[32px] border border-stone-900/10 bg-[#201c1a] p-5 text-stone-100 shadow-[0_30px_80px_rgba(28,25,23,0.18)] sm:p-6">
            <div className="flex h-full min-h-[420px] flex-col gap-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-stone-400">
                    Preview
                  </p>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                    Tailored draft
                  </h2>
                </div>
                <p className="max-w-sm text-sm leading-6 text-stone-300">
                  Your tailored CV preview will appear here once the first pass
                  is generated.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="rounded-[24px] border border-white/8 bg-white/[0.045] p-4">
                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-stone-400">
                      Summary
                    </p>
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded-full bg-white/9" />
                      <div className="h-2.5 w-[92%] rounded-full bg-white/9" />
                      <div className="h-2.5 w-[78%] rounded-full bg-white/9" />
                    </div>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4">
                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-stone-400">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <div className="h-8 w-24 rounded-full bg-white/8" />
                      <div className="h-8 w-20 rounded-full bg-white/8" />
                      <div className="h-8 w-28 rounded-full bg-white/8" />
                      <div className="h-8 w-18 rounded-full bg-white/8" />
                    </div>
                  </div>
                </div>
                <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4">
                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-stone-400">
                      Experience
                    </p>
                    <div className="space-y-2">
                      <div className="h-2.5 w-32 rounded-full bg-white/9" />
                      <div className="h-2.5 w-full rounded-full bg-white/8" />
                      <div className="h-2.5 w-[88%] rounded-full bg-white/8" />
                      <div className="h-2.5 w-[74%] rounded-full bg-white/8" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-[28px] border border-dashed border-white/10 bg-white/[0.025] p-4">
                <div className="space-y-3">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.24em] text-stone-400">
                    Cover letter
                  </p>
                  <div className="space-y-2">
                    <div className="h-2.5 w-28 rounded-full bg-white/8" />
                    <div className="h-2.5 w-full rounded-full bg-white/[0.07]" />
                    <div className="h-2.5 w-[90%] rounded-full bg-white/[0.07]" />
                    <div className="h-2.5 w-[76%] rounded-full bg-white/[0.07]" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
