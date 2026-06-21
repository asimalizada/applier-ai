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
              <div className="flex-1 rounded-[28px] border border-dashed border-stone-900/10 bg-stone-900/[0.03]" />
            </div>
          </section>

          <aside className="rounded-[32px] border border-stone-900/10 bg-[#201c1a] p-5 text-stone-100 shadow-[0_30px_80px_rgba(28,25,23,0.18)] sm:p-6">
            <div className="flex h-full min-h-[420px] flex-col gap-4">
              <div className="h-4 w-20 rounded-full bg-white/10" />
              <div className="h-32 rounded-[24px] bg-white/[0.045]" />
              <div className="h-28 rounded-[24px] bg-white/[0.04]" />
              <div className="flex-1 rounded-[28px] border border-white/8 bg-white/[0.03]" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
