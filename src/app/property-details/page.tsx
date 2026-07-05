import type { Metadata } from "next";
import PropertyDetailsForm from "@/components/PropertyDetailsForm";

export const metadata: Metadata = {
  title: "Property Details",
  description:
    "Tell us a little more about your property so we can make our best cash offer.",
  robots: { index: false },
};

export default function PropertyDetailsPage() {
  return (
    <section className="bg-brand-50">
      <div className="mx-auto max-w-3xl px-4 py-14">
        <p className="font-semibold text-accent-600">Step 2 of 2 — optional but helpful</p>
        <h1 className="mt-1 text-3xl font-bold text-brand-800">
          Tell Us a Bit More About the House
        </h1>
        <p className="mt-3 text-brand-700/80">
          We&apos;ve got your info and we&apos;ll be in touch shortly either way. A few
          more details help us make our <em>best</em> offer, faster — and often skip a
          round of phone tag.
        </p>
        <div className="mt-8 rounded-xl bg-white p-6 shadow-lg ring-1 ring-brand-100 sm:p-8">
          <PropertyDetailsForm />
        </div>
      </div>
    </section>
  );
}
