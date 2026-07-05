import type { Metadata } from "next";
import { site } from "@/lib/site";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us — A Local Wisconsin Home Buyer",
  description: `${site.name} is a local Wisconsin home-buying company led by ${site.owner}. Fair cash offers in 24 hours across southern Wisconsin.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-50 px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="heading-display text-4xl text-brand-900">
            A Local Buyer You Can Actually Talk To
          </h1>
          <div className="mt-6 space-y-5 leading-relaxed text-[#4B5563]">
            <p>
              {site.name} is a Wisconsin home-buying company led by {site.owner},
              buying houses across southern Wisconsin — from Milwaukee and its
              suburbs to Madison, Janesville, Racine, and the communities between.
            </p>
            <p>
              We buy houses, duplexes, and small rentals in any condition, fix
              what needs fixing, and return them to the market. Because repairs
              are our business, they are never your problem — we price the work
              in and buy exactly as-is.
            </p>
            <p>
              When you call {site.phone}, you talk to the person who will
              actually evaluate your house, make the offer, and show up at
              closing. No call centers, no runarounds, no pressure.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Local", "Wisconsin-based, Wisconsin-focused"],
              ["Direct", "You deal with the actual buyer"],
              ["Straightforward", "Fair offers, explained openly"],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-brand-100">
                <p className="font-bold text-brand-900">{title}</p>
                <p className="mt-1 text-sm text-[#6B7280]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner heading="Have a House to Sell? Let's Talk." />
    </>
  );
}
