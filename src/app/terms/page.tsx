import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 text-brand-700/90">
        <h1 className="text-3xl font-bold text-brand-800">Terms of Use</h1>
        <div className="mt-6 space-y-4 leading-relaxed">
          <p>
            Welcome to {site.url}, operated by {site.legalName}. By using this
            website, you agree to these terms.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-brand-800">Informational purposes</h2>
          <p>
            Content on this site is provided for general information about our
            home-buying services and does not constitute legal, financial, or real
            estate advice. Offers to purchase are made only in writing after we
            evaluate a specific property.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-brand-800">No obligation</h2>
          <p>
            Submitting information through this site does not obligate you to sell
            your property, and does not obligate us to purchase it.
          </p>
          <h2 className="pt-2 text-xl font-semibold text-brand-800">Contact</h2>
          <p>
            Questions about these terms? Reach us at{" "}
            <a href={`mailto:${site.email}`} className="text-accent-600">{site.email}</a> or {site.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
