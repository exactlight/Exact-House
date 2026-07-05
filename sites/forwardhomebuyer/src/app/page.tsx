import Link from "next/link";
import { site } from "@/lib/site";
import { situations } from "@/data/situations";
import { cities } from "@/data/cities";
import LeadForm from "@/components/LeadForm";
import HeroBenefits from "@/components/HeroBenefits";
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
    addressRegion: "WI",
    addressCountry: "US",
  },
  areaServed: [
    "Milwaukee County, WI",
    "Waukesha County, WI",
    "Racine County, WI",
    "Rock County, WI",
    "Walworth County, WI",
    "Dane County, WI",
    "Jefferson County, WI",
    "Dodge County, WI",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={localBusiness} />

      {/* Hero — blue gradient with curved bottom, form card right */}
      <section className="hero-stripes bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500 pb-24 text-white">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-4 py-14 lg:grid-cols-2">
          <div className="anim-in-left">
            <h1 className="heading-display mb-4 text-4xl sm:text-5xl">
              Get a <span className="text-gold-400">Fair Cash Offer</span> on
              Your Wisconsin Home in 24 Hours
            </h1>
            <p className="mb-8 text-xl opacity-90">
              No repairs. No showings. No commissions. No hassle. We buy homes
              in any condition and close on your timeline.
            </p>
            <HeroBenefits />
          </div>
          <div className="text-foreground">
            <LeadForm formName="contact" />
          </div>
        </div>
      </section>

      {/* Trust bar — real claims from the existing site */}
      <section className="bg-white px-4 pb-6">
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-6 rounded-2xl bg-brand-50 px-6 py-8 text-center sm:grid-cols-4">
          {site.trustBar.map(([num, label]) => (
            <div key={label}>
              <p className="heading-display text-4xl text-brand-800">{num}</p>
              <p className="mt-1 text-sm font-semibold text-[#6B7280]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="heading-display text-center text-4xl text-brand-900">
            Sell Your House in 3 Simple Steps
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#6B7280]">
            From first call to cash in hand — usually in less time than it
            takes to get a single showing scheduled.
          </p>
          <div className="mt-12">
            <HowItWorksSteps />
          </div>
          <p className="mt-8 text-center">
            <Link href="/how-it-works" className="font-bold text-brand-500 hover:text-brand-800">
              See exactly how our offers are calculated →
            </Link>
          </p>
        </div>
      </section>

      {/* Situations */}
      <section className="bg-brand-50 px-4 py-16">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="heading-display text-center text-4xl text-brand-900">
            Whatever the Situation, We Can Help
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[#6B7280]">
            We&apos;ve helped Wisconsin homeowners through all of these — no
            judgment, just a straightforward way out.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {situations.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-xl bg-gradient-to-br from-brand-900 to-brand-500 p-6 text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
              >
                <h3 className="text-xl font-bold">{s.name}</h3>
                <p className="mt-1.5 text-sm opacity-90">{s.heroIntro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="bg-white px-4 py-16 text-center">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="heading-display text-4xl text-brand-900">
            We Buy Houses Across Southern Wisconsin
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#6B7280]">
            From Milwaukee to Madison and everywhere between:
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="rounded-full border border-[#E5E7EB] bg-white px-4 py-1.5 text-sm font-semibold text-[#374151] hover:border-brand-500 hover:text-brand-800"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
