import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/data/cities";
import { situations } from "@/data/situations";
import LeadForm from "@/components/LeadForm";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import CtaBanner from "@/components/CtaBanner";
import JsonLd from "@/components/JsonLd";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  areaServed: site.serviceArea.map((c) => ({ "@type": "City", name: `${c}, WI` })),
  sameAs: [site.social.facebook],
};

export default function Home() {
  return (
    <>
      <JsonLd data={localBusiness} />

      {/* Hero with step-1 lead form */}
      <section className="bg-gradient-to-b from-brand-800 to-brand-700 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="mb-4 inline-block rounded-full bg-gold-400/20 px-4 py-1 text-sm font-semibold text-gold-400">
              Local &amp; Trusted — {site.address.locality}, Wisconsin
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              We Buy Houses in Wisconsin — Fast, Fair Cash Offers
            </h1>
            <p className="mt-4 text-lg text-brand-100">
              Sell your South-Central Wisconsin house in any condition, on your
              schedule. No fees, no commissions, no repairs, no cleaning.
            </p>
            <ul className="mt-6 space-y-2 text-brand-100">
              {[
                "Fair cash offer, usually within 24 hours",
                "Close in as little as 7 days — or whenever you choose",
                "We buy as-is: take what you want, leave the rest",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-accent-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-brand-100">
              Prefer to talk?{" "}
              <a href={site.phoneHref} className="font-semibold text-white underline decoration-accent-400 underline-offset-4">
                Call or text {site.phone}
              </a>
            </p>
          </div>

          <div className="text-brand-900">
            <LeadForm
              formName="contact"
              title="Get Your Fair Cash Offer"
              subtitle="Takes about 30 seconds. No obligation."
            />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-brand-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-center sm:grid-cols-3">
          {[
            ["No Fees or Commissions", "You pay nothing. We cover standard closing costs."],
            ["Sell 100% As-Is", "No repairs, no cleaning — we buy in any condition."],
            ["You Pick the Closing Date", "In as little as 7 days, or months out if you need time."],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-semibold text-brand-800">{title}</p>
              <p className="mt-1 text-sm text-brand-700/80">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-brand-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold text-brand-800">
            Selling Your House Is as Easy as 1-2-3
          </h2>
          <div className="mt-10">
            <HowItWorksSteps />
          </div>
          <p className="mt-8 text-center">
            <Link href="/how-it-works" className="font-semibold text-accent-600 hover:text-accent-700">
              See exactly how our offers work →
            </Link>
          </p>
        </div>
      </section>

      {/* Situations */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold text-brand-800">
            Whatever the Situation, We Can Help
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-brand-700/80">
            We&apos;ve helped Wisconsin homeowners through all of these. No judgment —
            just a straightforward way out.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {situations.map((s) => (
              <Link
                key={s.slug}
                href={`/situations/${s.slug}`}
                className="rounded-lg border border-brand-100 px-4 py-5 text-center text-sm font-semibold text-brand-800 hover:border-accent-500 hover:bg-accent-500/5"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="bg-brand-50">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-brand-800">
            We Buy Houses Across South-Central Wisconsin
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-brand-700/80">
            Based in {site.address.locality}, we buy in these communities and
            everywhere in between:
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/sell-my-house-fast/${c.slug}`}
                className="rounded-full border border-brand-100 bg-white px-5 py-2 text-sm font-medium text-brand-800 hover:border-accent-500 hover:text-accent-600"
              >
                {c.name}, WI
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
