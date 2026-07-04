import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero — the real two-step form replaces the CTA button in Phase 2 */}
      <section className="bg-gradient-to-b from-brand-800 to-brand-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <p className="mb-4 inline-block rounded-full bg-gold-400/20 px-4 py-1 text-sm font-semibold text-gold-400">
            Local &amp; Trusted — {site.address.locality}, Wisconsin
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Sell Your House Fast for Cash in South-Central Wisconsin
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            Any condition. Any situation. No fees, no commissions, no repairs.
            Get a fair cash offer and close on your schedule.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/get-offer"
              className="rounded-lg bg-accent-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-accent-600"
            >
              Get My Fair Cash Offer
            </Link>
            <a
              href={site.phoneHref}
              className="rounded-lg border border-white/40 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10"
            >
              Call or Text {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-brand-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-center sm:grid-cols-3">
          {[
            ["No Fees or Commissions", "You pay nothing. We cover closing costs."],
            ["Sell As-Is", "No repairs, no cleaning — we buy in any condition."],
            ["Close on Your Schedule", "In as little as 7 days, or whenever works for you."],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-semibold text-brand-800">{title}</p>
              <p className="mt-1 text-sm text-brand-700/80">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
