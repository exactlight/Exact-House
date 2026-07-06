import Link from "next/link";

const FEATURES = [
  {
    title: "Every exit, one screen",
    body: "Fix & flip, BRRRR, buy & hold, and wholesale are analyzed simultaneously from the same five inputs — and ranked. Most first deals fail because the strategy was picked before the math was run.",
  },
  {
    title: "An offer coach, not just a calculator",
    body: "DealLens solves backwards from your profit target to the exact maximum you can offer — from your real costs, not just the 70% rule (though it shows you that too).",
  },
  {
    title: "A stress test for bad news",
    body: "Rehab runs 20% over. The ARV appraises low. The flip takes 10 months. Drag the sliders and see precisely how much bad news the deal absorbs before it loses money.",
  },
  {
    title: "Plain-English everything",
    body: "Every term — ARV, DSCR, cap rate, NOI — is one tap from a definition written for someone on their first deal. The tool teaches while you use it.",
  },
  {
    title: "Nothing leaves your browser",
    body: "No account, no email capture, no server. Deals save to your device, and the one-page report prints straight from the page — ready to hand a lender or partner.",
  },
  {
    title: "Honest by design",
    body: "Vacancy, CapEx reserves, points, holding costs — the line items beginners forget are in the defaults, so the number you see is the number you'd actually make.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Enter five numbers",
    body: "Price, after-repair value, rehab budget, market rent, and your taxes. Sensible defaults cover the rest until you refine them.",
  },
  {
    n: "2",
    title: "Read the verdict",
    body: "Four strategy scorecards, ranked, each with the numbers a lender would ask for — plus where every dollar of the sale price goes.",
  },
  {
    n: "3",
    title: "Stress it, then offer",
    body: "Check the deal's resilience score, get your maximum allowable offer, save the deal, and print the one-page report.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-100">
            Free deal analyzer for new investors
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            See every exit <span className="text-accent-500">before</span> you buy.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Enter one property. DealLens instantly runs it as a flip, a BRRRR, a rental, and a
            wholesale — tells you which one actually works, the most you should offer, and how much
            can go wrong before you lose money.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/analyze"
              className="rounded-xl bg-accent-500 px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-accent-600"
            >
              Analyze a deal — free, no signup
            </Link>
            <Link
              href="/learn"
              className="rounded-xl border border-white/25 px-6 py-3 text-base font-semibold text-white/90 transition hover:bg-white/10"
            >
              Learn the numbers first
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/50">
            Runs entirely in your browser — your numbers never leave your device.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          The first-deal mistake isn&apos;t a bad house. It&apos;s a one-sided spreadsheet.
        </h2>
        <p className="mt-3 max-w-3xl text-muted">
          New investors run the numbers for the strategy they already fell in love with — and skip
          the vacancy line, the CapEx reserve, and the month-seven holding costs. DealLens runs the
          full, honest math on every exit at once, so the property tells <em>you</em> what it wants
          to be.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-hairline bg-surface p-5">
              <h3 className="font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">How it works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-hairline bg-white p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-600 text-base font-extrabold text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          The next listing you&apos;re curious about — run it.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Ninety seconds from address to verdict. If the deal doesn&apos;t work, it costs you
          nothing to find out now.
        </p>
        <Link
          href="/analyze"
          className="mt-6 inline-block rounded-xl bg-accent-600 px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-accent-700"
        >
          Open the analyzer
        </Link>
      </section>
    </>
  );
}
