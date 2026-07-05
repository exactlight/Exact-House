import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities, getCity, type City } from "@/data/cities";
import { situations, getSituation, type Situation } from "@/data/situations";
import LeadForm from "@/components/LeadForm";
import HeroBenefits from "@/components/HeroBenefits";
import CtaBanner from "@/components/CtaBanner";

/**
 * Top-level slug pages, matching the live site's URL structure:
 * /madison, /watertown, ... (city pages) and /divorce, /inherited, ...
 * (situation pages).
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
      title: { absolute: `We Buy Houses in ${city.name}, WI - Fast Cash Offers | Exact House` },
      description: `Sell your ${city.name} house fast for cash. Any condition, no fees, no repairs. Get a fair cash offer today.`,
    };
  }
  const situation = getSituation(slug);
  if (situation) {
    return {
      title: { absolute: situation.pageTitle || `${situation.name} | Exact House` },
      description: situation.heroIntro,
    };
  }
  return {};
}

function CityPage({ city }: { city: City }) {
  return (
    <>
      <section className="hero-stripes relative bg-gradient-to-br from-brand-800 to-brand-500 text-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-14 sm:px-8 lg:grid-cols-2">
          <div className="anim-in-left">
            {/* Per-city badge, like the live pages */}
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/${city.badgeIcon}`} alt="" className="h-9 w-9 object-contain" />
              {city.badgeText}
            </p>
            <h1 className="heading-display mb-6 text-6xl">
              We Buy Houses in <span className="text-accent-400">{city.name}</span>
            </h1>
            <p className="mb-8 text-xl opacity-95">{city.heroIntro}</p>
            <HeroBenefits />
          </div>
          <div className="text-foreground">
            <LeadForm
              formName={city.formName}
              hidden={city.cityFieldValue ? { city: city.cityFieldValue } : {}}
            />
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="bg-brand-50 px-4 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="heading-display text-center text-5xl text-brand-800">
            {city.storiesTitle}
          </h2>
          <p className="mt-3 text-center text-[#666]">{city.storiesSubtitle}</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {city.stories.map((s) => (
              <div
                key={s.title + s.location}
                className="rounded-[15px] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p className="heading-display mb-2 inline-block rounded-full bg-brand-800 px-3 py-1 text-sm tracking-[1px] text-white">
                  {s.badge}
                </p>
                <h3 className="text-xl font-semibold text-brand-800">{s.title}</h3>
                <p className="text-sm font-semibold text-accent-600">{s.location}</p>
                <p className="mt-2 text-sm text-[#666]">{s.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature strip */}
      <section className="bg-brand-800 px-4 py-10 text-center text-white">
        <p className="heading-display text-3xl tracking-[2px]">
          Not a call center. A neighbor.
        </p>
      </section>

      <CtaBanner heading={`Ready to Sell Your ${city.name} House?`} />
    </>
  );
}

function SituationPage({ situation }: { situation: Situation }) {
  return (
    <>
      <section className="hero-stripes relative bg-gradient-to-br from-brand-800 to-brand-500 text-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 py-14 sm:px-8 lg:grid-cols-2">
          <div className="anim-in-left">
            <h1 className="heading-display mb-6 text-6xl">{situation.h1}</h1>
            <p className="mb-6 text-xl opacity-95">{situation.heroIntro}</p>
            {situation.highlight ? (
              <div className="rounded-[10px] bg-white/10 p-5 backdrop-blur">
                <h3 className="mb-1 text-xl font-semibold">{situation.highlight.title}</h3>
                <p className="opacity-95">{situation.highlight.body}</p>
              </div>
            ) : null}
          </div>
          <div className="text-foreground">
            <LeadForm
              formName={situation.formName}
              hidden={
                situation.situationFieldValue
                  ? { situation: situation.situationFieldValue }
                  : {}
              }
            />
          </div>
        </div>
      </section>

      {/* Problems */}
      {situation.problems.length > 0 ? (
        <section className="bg-white px-4 py-20">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="heading-display text-center text-5xl text-brand-800">
              {situation.problemsTitle}
            </h2>
            {situation.problemsSubtitle ? (
              <p className="mt-3 text-center text-[#666]">{situation.problemsSubtitle}</p>
            ) : null}
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {situation.problems.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col rounded-[15px] border-l-4 border-accent-500 bg-brand-50 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <h3 className="mb-3 text-xl font-semibold text-brand-800">{p.title}</h3>
                  <p className="text-[#666]">{p.body}</p>
                  {p.solution ? (
                    <div className="mt-auto pt-5">
                      <div className="rounded-[10px] bg-emerald-600/10 p-4">
                        <p className="text-sm font-semibold text-emerald-700">✓ Our Solution:</p>
                        <p className="mt-1 text-sm text-brand-800">{p.solution}</p>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Steps */}
      {situation.steps.length > 0 ? (
        <section className="bg-brand-50 px-4 py-20">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="heading-display mb-12 text-center text-5xl text-brand-800">
              {situation.stepsTitle}
            </h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {situation.steps.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-[15px] bg-white p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-1"
                >
                  <div className="heading-display mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-500 text-4xl text-white">
                    {i + 1}
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold text-brand-800">{s.title}</h3>
                  <p className="text-[#666]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner
        heading={situation.ctaHeading || "Ready for a Fair Cash Offer?"}
        body={situation.ctaBody || undefined}
      />
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
