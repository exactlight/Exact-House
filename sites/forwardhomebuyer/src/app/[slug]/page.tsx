import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCity, type City } from "@/data/cities";
import { situations, getSituation, type Situation } from "@/data/situations";
import { site } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import HeroBenefits from "@/components/HeroBenefits";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import CtaBanner from "@/components/CtaBanner";

/**
 * Top-level slug pages matching the live site's URL structure:
 * /madison, /milwaukee, ... (27 cities) and /foreclosure, /divorce, ...
 * (9 situations).
 */

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...cities.map((c) => ({ slug: c.slug })),
    ...situations.map((s) => ({ slug: s.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  if (city) {
    return {
      title: { absolute: `We Buy Houses in ${city.name}, WI — Cash Offer in 24 Hours | ${site.name}` },
      description: `Sell your ${city.name} house fast for cash. Any condition, $0 fees or commissions, close in as little as 3 days. Get a fair cash offer within 24 hours.`,
    };
  }
  const situation = getSituation(slug);
  if (situation) {
    return {
      title: { absolute: situation.pageTitle },
      description: situation.heroIntro,
    };
  }
  return {};
}

function CityPage({ city }: { city: City }) {
  return (
    <>
      <section className="hero-stripes bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500 pb-24 text-white">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-4 py-14 lg:grid-cols-2">
          <div className="anim-in-left">
            <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
              {city.county}
            </p>
            <h1 className="heading-display mb-4 text-4xl sm:text-5xl">
              We Buy Houses in <span className="text-gold-400">{city.name}</span>
            </h1>
            <p className="mb-6 text-xl opacity-90">{city.intro}</p>
            <p className="mb-8 opacity-80">{city.localNote}</p>
            <HeroBenefits />
          </div>
          <div className="text-foreground">
            <LeadForm formName={city.formName} hidden={{ city: city.name }} />
          </div>
        </div>
      </section>

      {/* Trust bar */}
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

      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="heading-display text-center text-4xl text-brand-900">
            How Selling Your {city.name} House Works
          </h2>
          <div className="mt-12">
            <HowItWorksSteps />
          </div>
          <p className="mt-8 text-center text-[#6B7280]">
            Rather talk it through?{" "}
            <a href={site.phoneHref} className="font-bold text-brand-500">
              Call or text {site.phone}
            </a>{" "}
            — you&apos;ll reach a local buyer, not a call center.{" "}
            <Link href="/how-it-works" className="font-bold text-brand-500 hover:text-brand-800">
              How our offers are calculated →
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner heading={`Ready to Sell Your ${city.name} House?`} />
    </>
  );
}

function SituationPage({ situation }: { situation: Situation }) {
  return (
    <>
      <section className="hero-stripes bg-gradient-to-br from-brand-900 via-brand-800 to-brand-500 pb-24 text-white">
        <div className="mx-auto grid max-w-[1100px] items-center gap-12 px-4 py-14 lg:grid-cols-2">
          <div className="anim-in-left">
            <h1 className="heading-display mb-4 text-4xl sm:text-5xl">{situation.h1}</h1>
            <p className="mb-6 text-xl opacity-90">{situation.heroIntro}</p>
            {situation.highlight ? (
              <div className="rounded-xl bg-white/10 p-5 backdrop-blur">
                <h3 className="mb-1 text-xl font-bold text-gold-400">
                  {situation.highlight.title}
                </h3>
                <p className="opacity-95">{situation.highlight.body}</p>
              </div>
            ) : null}
          </div>
          <div className="text-foreground">
            <LeadForm
              formName={situation.formName}
              hidden={{ situation: situation.situationFieldValue }}
            />
          </div>
        </div>
      </section>

      {situation.problems.length > 0 ? (
        <section className="bg-white px-4 py-16">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="heading-display text-center text-4xl text-brand-900">
              {situation.problemsTitle}
            </h2>
            {situation.problemsSubtitle ? (
              <p className="mx-auto mt-3 max-w-xl text-center text-[#6B7280]">
                {situation.problemsSubtitle}
              </p>
            ) : null}
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {situation.problems.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col rounded-xl border-l-4 border-accent-500 bg-brand-50 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <h3 className="mb-2.5 text-lg font-bold text-brand-900">{p.title}</h3>
                  <p className="text-[#4B5563]">{p.body}</p>
                  {p.solution ? (
                    <div className="mt-auto pt-4">
                      <div className="rounded-lg bg-emerald-600/10 p-4">
                        <p className="text-sm font-bold text-emerald-700">✓ Our Solution:</p>
                        <p className="mt-1 text-sm text-brand-900">{p.solution}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {situation.steps.length > 0 ? (
        <section className="bg-brand-50 px-4 py-16">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="heading-display mb-12 text-center text-4xl text-brand-900">
              {situation.stepsTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {situation.steps.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-xl bg-white p-7 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
                >
                  <div className="heading-display mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-3xl text-white">
                    {i + 1}
                  </div>
                  <h3 className="mb-2.5 text-xl font-bold text-brand-900">{s.title}</h3>
                  <p className="text-[#6B7280]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner heading={situation.ctaHeading} body={situation.ctaBody} />
    </>
  );
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const city = getCity(slug);
  if (city) return <CityPage city={city} />;
  const situation = getSituation(slug);
  if (situation) return <SituationPage situation={situation} />;
  notFound();
}
