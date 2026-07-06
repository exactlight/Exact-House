import type { Metadata } from "next";
import DealsList from "@/components/DealsList";

export const metadata: Metadata = {
  title: "My deals",
  description: "Your saved deal analyses, side by side. Stored in your browser only.",
};

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-extrabold tracking-tight">My deals</h1>
      <p className="mt-1 text-sm text-muted">
        Every deal you save, in one table — the fastest way to see which candidate is actually the
        better buy. Stored in this browser only.
      </p>
      <div className="mt-6">
        <DealsList />
      </div>
    </div>
  );
}
