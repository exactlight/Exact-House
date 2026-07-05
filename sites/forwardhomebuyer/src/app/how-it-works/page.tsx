import type { Metadata } from "next";
import { site } from "@/lib/site";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "How It Works — Selling Your House for Cash",
  description: `How ${site.name} buys houses: a simple 3-step process, how our cash offers are calculated, and what to expect from first call to closing day.`,
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-brand-50">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h1 className="text-4xl font-bold text-brand-800">How It Works</h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-700/80">
            No mystery, no games. Here&apos;s the entire process from &quot;just
            curious&quot; to cash in hand.
          </p>
          <div className="mt-12">
            <HowItWorksSteps />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl space-y-10 px-4 py-16">
          <div>
            <h2 className="text-2xl font-bold text-brand-800">
              How We Calculate Your Offer
            </h2>
            <p className="mt-3 leading-relaxed text-brand-700/90">
              Our offers aren&apos;t random, and they&apos;re not lowball fishing. We
              start with what your house would be worth fully fixed up (based on real
              sales of similar homes nearby), then subtract what it will cost us to
              get it there and the margin we need to keep the lights on. What&apos;s
              left is your offer — and we&apos;ll walk you through the math on the
              phone if you want to see it.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand-800">
              What Makes a Cash Sale Different
            </h2>
            <ul className="mt-4 space-y-3 text-brand-800">
              {[
                "No financing contingency — the #1 reason traditional sales fall through doesn't exist here",
                "No inspection negotiation — we buy as-is and price the work in up front",
                "No showings, open houses, or strangers walking through your home",
                "No agent commissions, and we cover standard closing costs",
                "A closing date you pick — fast if you need speed, later if you need time",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent-600">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand-800">
              What Happens After You Reach Out
            </h2>
            <p className="mt-3 leading-relaxed text-brand-700/90">
              We&apos;ll call or text to learn about the property and your timeline.
              If it looks like a fit, we&apos;ll set up one quick visit (or work from
              photos if you prefer). You&apos;ll get a written cash offer with no
              expiration pressure. If you accept, we open escrow with a local title
              company, you pick the closing date, and you get paid at closing. If our
              offer isn&apos;t right for you, no hard feelings — we&apos;re happy to
              point you toward whatever option actually fits, even if it&apos;s
              listing with an agent.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner heading="See What Your House Is Worth in Cash" />
    </>
  );
}
