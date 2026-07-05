import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-brand-50 px-4 py-20">
      <div className="mx-auto max-w-2xl rounded-[20px] bg-white p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.1)] sm:p-14">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-12 w-12 fill-white" aria-hidden>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <h1 className="heading-display mt-6 text-6xl text-brand-800">Thank You!</h1>
        <p className="mt-4 text-lg text-[#666]">
          We&apos;ve received your information and will be in touch within 24 hours
          with your cash offer.
        </p>
        <div className="mt-8 rounded-[10px] bg-brand-50 p-6 text-left">
          <p className="font-semibold text-brand-800">What happens next?</p>
          <p className="mt-2 text-[#666]">
            Ken will personally review your property information and contact you
            with a fair cash offer. We typically respond within a few hours during
            business hours.
          </p>
        </div>
        <p className="mt-8 font-semibold text-brand-800">
          Need to speak with us right away?
        </p>
        <a
          href={site.phoneHref}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-500 px-8 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-0.5 hover:bg-accent-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          {site.phone}
        </a>
        <p className="mt-8">
          <Link href="/" className="text-sm font-medium text-[#666] hover:text-accent-600">
            ← Back to Home
          </Link>
        </p>
      </div>
    </section>
  );
}
