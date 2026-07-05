import type { Metadata } from "next";
import { site } from "@/lib/site";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Get Your Fair Cash Offer",
  description: `Get a no-obligation cash offer on your Wisconsin house from ${site.name}. Any condition, no fees, close on your schedule.`,
};

export default function GetOfferPage() {
  return (
    <section className="bg-brand-50">
      <div className="mx-auto grid max-w-5xl items-start gap-10 px-4 py-14 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold text-brand-800">
            Get Your Fair Cash Offer
          </h1>
          <p className="mt-4 text-brand-700/80">
            Tell us where the property is and how to reach you — that&apos;s it.
            We&apos;ll follow up quickly, usually the same day, with next steps and a
            no-obligation offer.
          </p>
          <ul className="mt-6 space-y-3 text-brand-800">
            {[
              "No fees, no commissions, no closing costs",
              "Sell completely as-is — any condition",
              "You choose the closing date",
              "No obligation — the offer is free, deciding is up to you",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-0.5 text-accent-600">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-brand-700/80">
            Rather talk it through?{" "}
            <a href={site.phoneHref} className="font-semibold text-accent-600">
              Call or text {site.phone}
            </a>
          </p>
        </div>
        <LeadForm
          formName="contact"
          title="Where's the Property?"
          subtitle="Takes about 30 seconds."
        />
      </div>
    </section>
  );
}
