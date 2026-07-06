import type { Metadata } from "next";
import Link from "next/link";
import { GLOSSARY } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Learn the numbers",
  description:
    "Every real estate investing term DealLens uses — ARV, MAO, NOI, cap rate, DSCR, BRRRR — explained in plain English for first-time investors.",
};

export default function LearnPage() {
  const entries = Object.entries(GLOSSARY);
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Learn the numbers</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Every term the analyzer uses, in plain English. Read these once and you can hold your own
        with any lender, agent, or wholesaler. Then{" "}
        <Link href="/analyze" className="font-semibold text-accent-600 hover:text-accent-700">
          put them to work on a real deal →
        </Link>
      </p>
      <div className="mt-8 space-y-4">
        {entries.map(([key, e]) => (
          <section
            key={key}
            id={key}
            className="scroll-mt-20 rounded-2xl border border-hairline bg-surface p-5"
          >
            <h2 className="text-lg font-bold">{e.term}</h2>
            <p className="mt-0.5 text-sm font-semibold text-accent-700">{e.short}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{e.long}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
