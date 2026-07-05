import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, getCity } from "@/data/cities";
import { site } from "@/lib/site";
import LeadForm from "@/components/LeadForm";
import HowItWorksSteps from "@/components/HowItWorksSteps";
import CtaBanner from "@/components/CtaBanner";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = getCity(city);
  if (!data) return {};
  return {
    title: `Sell My House Fast in ${data.name}, WI — Cash Offer`,
    description: `We buy houses in ${data.name}, Wisconsin for cash. Any condition, no fees, no repairs. Get a fair cash offer from a local ${data.county} buyer today.`,
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const data = getCity(city);
  if (!data) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-brand-800 to-brand-700 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-gold-400/20 px-4 py-1 text-sm font-semibold text-gold-400">
              {data.county}
            </p>
            <h1 className="text-4xl font-bold leading-tight">
              Sell Your House Fast in {data.name}, Wisconsin
            </h1>
            <p className="mt-4 text-lg text-brand-100">{data.intro}</p>
            <p className="mt-4 text-brand-100">{data.localNote}</p>
          </div>
          <div className="text-brand-900">
            <LeadForm
              formName={data.formName}
              hidden={{ city: data.name }}
              title={`Get a Cash Offer on Your ${data.name} House`}
              subtitle="Takes about 30 seconds. No obligation."
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold text-brand-800">
            How Selling Your {data.name} House Works
          </h2>
          <div className="mt-10">
            <HowItWorksSteps />
          </div>
        </div>
      </section>

      <section className="bg-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-brand-800">
            A Local Buyer, Not a National Call Center
          </h2>
          <p className="mt-3 text-brand-700/80">
            {site.name} is based in {site.address.locality}, WI. When you call, you
            talk to us — the people actually buying your house. We know the{" "}
            {data.name} market because we work in it every week.
          </p>
          <p className="mt-6">
            <Link href="/how-it-works" className="font-semibold text-accent-600 hover:text-accent-700">
              Learn how our offers are calculated →
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner heading={`Ready to Sell Your ${data.name} House?`} />
    </>
  );
}
