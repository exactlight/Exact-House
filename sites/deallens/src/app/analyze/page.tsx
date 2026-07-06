import { Suspense } from "react";
import type { Metadata } from "next";
import Analyzer from "@/components/Analyzer";

export const metadata: Metadata = {
  title: "Analyze a deal",
  description:
    "Enter one property and instantly compare fix & flip, BRRRR, buy & hold, and wholesale — with a max-offer calculator and a stress test.",
};

export default function AnalyzePage() {
  return (
    <Suspense>
      <Analyzer />
    </Suspense>
  );
}
