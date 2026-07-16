import type { Metadata } from "next";
import { site } from "@/lib/site";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "About Us: A Local Lake Mills Home Buyer",
  description: `${site.name} is a local, family-run home buying company based in ${site.address.locality}, Wisconsin, led by ${site.owner}. We buy houses across South-Central Wisconsin.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="text-4xl font-bold text-brand-800">
            A Local Buyer You Can Actually Meet
          </h1>
          {/*
            NOTE FOR KEN: this page is intentionally light on specifics so we don't
            put words in your mouth. Send over your story (how you got started,
            family, photos, community involvement) and we'll make it personal.
          */}
          <div className="mt-6 space-y-5 leading-relaxed text-brand-700/90">
            <p>
              {site.name} is a local home-buying company based in{" "}
              {site.address.locality}, Wisconsin, led by {site.owner}. We buy houses
              across South-Central Wisconsin: single-family homes and small
              multifamily rentals, in any condition.
            </p>
            <p>
              When we buy a house, we rehab it where it makes sense and return it to
              the market for an end homeowner. That local, hands-on model is why we
              can buy as-is: repairs aren&apos;t an obstacle for us, they&apos;re the
              job.
            </p>
            <p>
              We&apos;re not a franchise or a national call center. When you call{" "}
              {site.phone}, you&apos;re talking to the people who will actually buy
              your house, walk it with you, and show up at closing.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Local", `Based in ${site.address.locality}, WI`],
              ["Direct", "You deal with us, start to finish"],
              ["Straightforward", "Fair offers, explained openly"],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg bg-white p-5 text-center shadow-sm ring-1 ring-brand-100">
                <p className="font-bold text-brand-800">{title}</p>
                <p className="mt-1 text-sm text-brand-700/80">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner heading="Have a House to Sell? Let's Talk." />
    </>
  );
}
