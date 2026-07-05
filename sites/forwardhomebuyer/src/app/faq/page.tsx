import type { Metadata } from "next";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Answers to common questions about selling your house for cash to ${site.name}: fees, offer amounts, timelines, condition, and how closing works.`,
};

const faqs = [
  {
    q: "Are there any fees or commissions?",
    a: "No. There are no agent commissions and no fees of any kind, and we cover standard closing costs. The offer we make is the amount you walk away with, minus only whatever you still owe on the property.",
  },
  {
    q: "How fast can you actually close?",
    a: "In as little as 7 days when the title is clean, because there's no lender involved. But fast is optional — if you need 60 or 90 days to line up your next move, we close on your date.",
  },
  {
    q: "Do I need to make repairs or clean the house?",
    a: "No. We buy houses completely as-is — including houses that need major repairs. Take the belongings you want and leave the rest; we handle cleanouts all the time.",
  },
  {
    q: "Will your offer be lowball?",
    a: "Our offer reflects the house's fixed-up value minus real repair costs and our margin — and we're happy to show you the math. It will be less than a perfect retail sale, but with no commissions, no repairs, no carrying costs, and no risk of the deal falling through, many sellers net a comparable amount with none of the hassle.",
  },
  {
    q: "Am I obligated to accept your offer?",
    a: "Never. The offer is free and there's no pressure. Plenty of homeowners take our number, compare their options, and decide later — some list with an agent instead, and that's genuinely fine with us.",
  },
  {
    q: "What kinds of properties do you buy?",
    a: "Single-family houses, duplexes, and small multifamily rentals throughout South-Central Wisconsin — in any condition, occupied or vacant, including inherited properties and rentals with tenants in place.",
  },
  {
    q: "How do I know you're legitimate?",
    a: `We're a local company based in ${site.address.locality}, WI — not an out-of-state call center. We close through local title companies, you can meet us in person, and we're glad to provide references before you sign anything.`,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <section className="bg-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="text-center text-4xl font-bold text-brand-800">
            Frequently Asked Questions
          </h1>
          <div className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg bg-white p-5 shadow-sm ring-1 ring-brand-100 open:ring-accent-500/40"
              >
                <summary className="cursor-pointer list-none font-semibold text-brand-800 marker:hidden">
                  <span className="mr-2 text-accent-600 transition-transform group-open:rotate-90">
                    ›
                  </span>
                  {f.q}
                </summary>
                <p className="mt-3 leading-relaxed text-brand-700/90">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner heading="Still Have Questions? Just Ask." />
    </>
  );
}
