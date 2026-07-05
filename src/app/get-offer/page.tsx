import type { Metadata } from "next";
import { site } from "@/lib/site";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Get Your Fair Cash Offer",
  description: `Get a no-obligation cash offer on your Wisconsin house from ${site.name}. Any condition, no fees, close on your schedule.`,
};

export default function GetOfferPage() {
  return (
    <section className="hero-stripes bg-gradient-to-br from-brand-800 to-brand-500 px-4 py-14 text-white">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 sm:px-8 lg:grid-cols-2">
        <div className="anim-in-left">
          <h1 className="heading-display mb-6 text-6xl">Get Your Fair Cash Offer</h1>
          <p className="mb-6 text-xl opacity-95">
            Tell us where the property is and how to reach you — that&apos;s it.
            We&apos;ll text or email your offer the same day. No pressure, no
            obligation.
          </p>
          <ul className="space-y-3">
            {[
              "No fees, no commissions — we pay all closing costs",
              "Sell completely as-is, any condition",
              "You choose the closing date — as quick as 3 days",
              "The offer is free. Deciding is up to you.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 fill-accent-500" aria-hidden>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-foreground">
          <LeadForm formName="contact" />
        </div>
      </div>
    </section>
  );
}
