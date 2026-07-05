"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fires lead-conversion events on mount (used on /thank-you). */
export default function LeadConversionEvent() {
  useEffect(() => {
    try {
      window.gtag?.("event", "generate_lead", { method: "website_form" });
      window.fbq?.("track", "Lead");
    } catch {
      // analytics not configured — nothing to do
    }
  }, []);
  return null;
}
