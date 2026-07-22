"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

type Props = {
  /** Netlify form name — must match a form defined in public/__forms.html */
  formName: string;
  /** Extra hidden fields, e.g. { city: "Madison" } or { situation: "Foreclosure" } */
  hidden?: Record<string, string>;
};

const inputCls =
  "w-full rounded-lg border-2 border-[#E5E7EB] px-4 py-3.5 text-base text-foreground transition-all focus:border-brand-500 focus:outline-none focus:ring-[3px] focus:ring-brand-500/15";

/**
 * Step 1 of the two-step lead flow. Writes the lead to Netlify Forms, which
 * drives the SMS + email notification (submission-created function) and the
 * /admin dashboard. Then forwards to /details for step 2. The lead is safe
 * even if step 2 is abandoned.
 */
export default function LeadForm({ formName, hidden = {} }: Props) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    // Spam honeypot: real users never fill this field
    if (data.get("bot-field")) return;

    const body = new URLSearchParams();
    body.set("form-name", formName);
    body.set("source-page", window.location.pathname);
    for (const [k, v] of Object.entries(hidden)) body.set(k, v);
    for (const [k, v] of data.entries()) {
      if (typeof v === "string" && k !== "bot-field") body.set(k, v);
    }

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const address = String(data.get("address") ?? "").trim();

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`netlify ${res.status}`);

      sessionStorage.setItem(
        "fhb-lead",
        JSON.stringify({
          name,
          address,
          phone,
          sourcePage: window.location.pathname,
        })
      );
      router.push("/details");
    } catch {
      setError(
        `Something went wrong sending your info. Please try again, or call/text us at ${site.phone}.`
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="anim-in-right rounded-2xl bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-9">
      <h2 className="heading-display text-3xl text-brand-900">
        Get Your Free Cash Offer
      </h2>
      <p className="mt-1.5 text-[#6B7280]">
        Takes about 30 seconds. We&apos;ll text or email your offer within 24
        hours — no pressure, no obligation.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-4" data-form-name={formName}>
        <p className="hidden">
          <label>
            Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div>
          <label htmlFor={`${formName}-address`} className="mb-1.5 block text-sm font-bold text-brand-900">
            Property Address *
          </label>
          <input
            id={`${formName}-address`}
            name="address"
            type="text"
            required
            autoComplete="street-address"
            placeholder="123 Main St, Madison, WI"
            className={inputCls}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formName}-name`} className="mb-1.5 block text-sm font-bold text-brand-900">
              Full Name *
            </label>
            <input id={`${formName}-name`} name="name" type="text" required autoComplete="name" className={inputCls} />
          </div>
          <div>
            <label htmlFor={`${formName}-phone`} className="mb-1.5 block text-sm font-bold text-brand-900">
              Phone *
            </label>
            <input id={`${formName}-phone`} name="phone" type="tel" required autoComplete="tel" className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor={`${formName}-email`} className="mb-1.5 block text-sm font-bold text-brand-900">
            Email (Optional)
          </label>
          <input id={`${formName}-email`} name="email" type="email" autoComplete="email" className={inputCls} />
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent-500 py-4 text-lg font-extrabold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_6px_20px_rgba(249,115,22,0.5)] disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Get My Cash Offer →"}
        </button>

        {/* Optional, branded SMS opt-in with full CTIA disclosures in one
            block (use case, rates, frequency, STOP/HELP, privacy) — required
            for toll-free verification. Unchecked by default; not a condition
            of submitting the form. */}
        <label className="flex items-start gap-2 text-xs leading-relaxed text-[#9CA3AF]">
          <input
            type="checkbox"
            name="sms-consent"
            value="yes"
            className="mt-0.5 h-4 w-4 shrink-0 accent-accent-600"
          />
          <span>
            <span className="font-bold text-brand-900">
              Text me my cash offer (optional).
            </span>{" "}
            By checking this box, you agree to receive text messages from{" "}
            {site.name} about your property inquiry and cash offer at the number
            provided (customer care / conversational). Msg &amp; data rates may
            apply. Msg frequency varies. Reply STOP to opt out, HELP for help.
            See our{" "}
            <Link href="/privacy" className="underline hover:text-brand-800">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <p className="text-xs leading-relaxed text-[#9CA3AF]">
          By submitting, you agree that {site.name} may contact you by phone or
          email about your property inquiry. Consent to texts is not a condition
          of any purchase.
        </p>
      </form>
    </div>
  );
}
