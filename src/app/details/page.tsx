import type { Metadata } from "next";
import PropertyDetailsForm from "@/components/PropertyDetailsForm";

export const metadata: Metadata = {
  title: "Property Details",
  description:
    "Help us understand your property better so we can make you the best cash offer.",
  robots: { index: false },
};

export default function DetailsPage() {
  return (
    <section className="bg-brand-50 px-4 py-12">
      <div className="mx-auto max-w-[800px]">
        <PropertyDetailsForm />
      </div>
    </section>
  );
}
