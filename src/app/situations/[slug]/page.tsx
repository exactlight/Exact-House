import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { situations, getSituation } from "@/data/situations";
import LeadForm from "@/components/LeadForm";
import CtaBanner from "@/components/CtaBanner";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return situations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getSituation(slug);
  if (!data) return {};
  return {
    title: `${data.name} — Sell Your House Fast for Cash`,
    description: `${data.intro.slice(0, 150)}…`,
  };
}

export default async function SituationPage({ params }: Props) {
  const { slug } = await params;
  const data = getSituation(slug);
  if (!data) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-brand-800 to-brand-700 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-gold-400/20 px-4 py-1 text-sm font-semibold text-gold-400">
              {data.name}
            </p>
            <h1 className="text-4xl font-bold leading-tight">{data.headline}</h1>
            <p className="mt-4 text-lg text-brand-100">{data.intro}</p>
          </div>
          <div className="text-brand-900">
            <LeadForm
              formName={data.formName}
              hidden={{ situation: data.slug }}
              title="Tell Us About Your Situation"
              subtitle="Confidential, no obligation, no pressure."
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-brand-800">How We Help</h2>
          <ul className="mt-6 space-y-4">
            {data.points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-white">
                  ✓
                </span>
                <span className="text-brand-800">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-brand-700/80">
            Every situation is different — the fastest way to know your options is a
            quick, free conversation.{" "}
            <Link href="/how-it-works" className="font-semibold text-accent-600 hover:text-accent-700">
              Here&apos;s exactly what happens when you reach out →
            </Link>
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
