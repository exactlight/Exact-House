import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You — We're On It",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="bg-brand-50">
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-3xl text-white">
          ✓
        </div>
        <h1 className="mt-6 text-4xl font-bold text-brand-800">
          Got It — We&apos;re On It
        </h1>
        <p className="mt-4 text-lg text-brand-700/80">
          Thanks for reaching out. Here&apos;s what happens next:
        </p>
        <ol className="mx-auto mt-6 max-w-md space-y-3 text-left text-brand-800">
          <li className="flex gap-3">
            <span className="font-bold text-accent-600">1.</span>
            We review your property details right away.
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent-600">2.</span>
            We&apos;ll reach out — usually the same day — to talk through the house and
            answer your questions.
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-accent-600">3.</span>
            You get a fair, no-obligation cash offer. Take your time deciding.
          </li>
        </ol>
        <p className="mt-8 text-brand-700/80">
          Need us sooner?{" "}
          <a href={site.phoneHref} className="font-semibold text-accent-600">
            Call or text {site.phone}
          </a>
        </p>
        <p className="mt-10">
          <Link href="/" className="text-sm font-medium text-brand-700/70 hover:text-accent-600">
            ← Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}
