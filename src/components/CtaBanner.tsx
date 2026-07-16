import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBanner({
  heading = "Ready for a Fair Cash Offer?",
  body = "Tell us about the property, or just call or text. You'll talk directly with Ken. No call centers, no pressure, no obligation.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-brand-800 to-brand-500 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-14 text-center">
        <h2 className="heading-display text-4xl">{heading}</h2>
        <p className="max-w-xl text-white/90">{body}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/get-offer"
            className="heading-display rounded-full bg-accent-500 px-10 py-4 text-xl tracking-[1px] text-white shadow-[0_10px_30px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-0.5 hover:bg-accent-600"
          >
            Get Me An Offer
          </Link>
          <a
            href={site.phoneHref}
            className="rounded-full border-2 border-white/40 px-9 py-3.5 text-lg font-semibold hover:bg-white/10"
          >
            Call or Text {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
