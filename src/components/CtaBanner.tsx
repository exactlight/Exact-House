import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBanner({
  heading = "Ready for a Fair Cash Offer?",
}: {
  heading?: string;
}) {
  return (
    <section className="bg-brand-800 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-14 text-center">
        <h2 className="text-3xl font-bold">{heading}</h2>
        <p className="max-w-xl text-brand-100">
          Tell us about the property, or just call or text. You&apos;ll talk directly
          with us — no call centers, no pressure, no obligation.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/get-offer"
            className="rounded-lg bg-accent-500 px-8 py-3.5 font-semibold text-white shadow-md hover:bg-accent-600"
          >
            Get My Cash Offer
          </Link>
          <a
            href={site.phoneHref}
            className="rounded-lg border border-white/40 px-8 py-3.5 font-semibold hover:bg-white/10"
          >
            Call or Text {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
