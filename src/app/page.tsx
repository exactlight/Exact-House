import Link from "next/link";
import { site } from "@/lib/site";
import { situations } from "@/data/situations";
import LeadForm from "@/components/LeadForm";
import HeroBenefits from "@/components/HeroBenefits";
import HowItWorksSteps from "@/components/HowItWorksSteps";
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
  areaServed: [
    "Jefferson County, WI",
    "Dane County, WI",
    "Waukesha County, WI",
    "Milwaukee County, WI",
    "Dodge County, WI",
    "Columbia County, WI",
  ],
  sameAs: [site.social.facebook],
};

/** Homepage situations grid — numbered cards with the live site's copy. */
const situationCards = [
  { slug: "divorce", title: "1. Divorce or Separation", body: "Selling during a divorce? Get a fair split fast so both parties can move forward." },
  { slug: "inherited", title: "2. Inherited Property", body: "Don't want to deal with an inherited house? We'll buy it as-is." },
  { slug: "job-relocation", title: "3. Job Relocation", body: "Moving for work? We can close quickly so you can start your new chapter." },
  { slug: "senior-transition", title: "4. Senior Transition", body: "Moving to assisted living? Get the cash you need for care costs." },
  { slug: "financial-strain", title: "5. Financial Strain", body: "Can't afford the payments? Sell before you damage your credit." },
  { slug: "tired-landlord", title: "6. Burned-Out Landlord", body: "Done dealing with tenants and repairs? Sell your rental property fast." },
  { slug: "foreclosure", title: "7. Mortgage Delinquency", body: "Facing foreclosure? Stop the auction and protect your credit." },
  { slug: "double-mortgage", title: "8. Double Mortgage", body: "Bought before selling? We can help you avoid paying two mortgages." },
  { slug: "repairs", title: "9. Major Repairs Needed", body: "House needs work? We buy houses in any condition. No repairs needed." },
  { slug: "tax-liens", title: "10. Tax Liens", body: "Facing a tax lien or legal issues? Sell fast before seizure." },
];

export default function Home() {
  // Guard: keep the grid in sync with the situations data
  const known = new Set(situations.map((s) => s.slug));
  const cards = situationCards.filter((c) => known.has(c.slug));

  return (
    <>
      <JsonLd data={localBusiness} />

      {/* Hero — live layout: text + benefits left, form card right */}
      <section className="hero-stripes relative bg-gradient-to-br from-brand-800 to-brand-500 text-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-14 sm:px-8 lg:grid-cols-2 lg:py-16">
          <div className="anim-in-left">
            <h1 className="heading-display mb-6 text-6xl sm:text-7xl">
              We Buy Houses in Wisconsin
            </h1>
            <p className="mb-8 text-xl opacity-95">
              Get a fair cash offer fast. We Buy As-Is, no repairs, no cleaning,
              take what you want and we will take care of the rest. Save with no
              realtor fees. Sell your house on the day you chose or in as quick as
              3 days.
            </p>
            <HeroBenefits />
          </div>

          <div className="text-foreground">
            <LeadForm formName="contact" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-brand-50 px-4 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="heading-display mb-12 text-center text-5xl text-brand-800">
            How It Works
          </h2>
          <HowItWorksSteps />
          <p className="mt-8 text-center">
            <Link href="/how-it-works" className="font-semibold text-accent-600 hover:text-accent-700">
              See exactly how our offers work →
            </Link>
          </p>
        </div>
      </section>

      {/* Situations */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="heading-display mb-12 text-center text-5xl text-brand-800">
            We Buy Houses in Any Situation
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="rounded-[15px] bg-gradient-to-br from-brand-800 to-brand-500 p-8 text-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
              >
                <h3 className="mb-2 text-2xl font-semibold">{c.title}</h3>
                <p className="opacity-90">{c.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature strip from the live city pages */}
      <section className="bg-brand-800 px-4 py-10 text-center text-white">
        <p className="heading-display text-3xl tracking-[2px]">
          Not a call center. A neighbor.
        </p>
      </section>
    </>
  );
}
