"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  /** Netlify form name — must match a form defined in public/__forms.html */
  formName: string;
  /** Extra hidden fields, e.g. { city: "Madison" } or { situation: "foreclosure" } */
  hidden?: Record<string, string>;
  /** Compact style for in-page embeds vs. full standalone */
  title?: string;
  subtitle?: string;
};

/**
 * Step 1 of the two-step lead flow (same flow as the live site):
 * captures name/phone/email/address into Netlify Forms immediately, then
 * forwards the seller to /property-details for step 2. The lead is saved
 * even if they never complete step 2.
 */
export default function LeadForm({ formName, hidden = {}, title, subtitle }: Props) {
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

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);

      // Carry lead info into step 2 so property-details can link the records
      sessionStorage.setItem(
        "eh-lead",
        JSON.stringify({
          name: body.get("name") ?? "",
          address: body.get("address") ?? "",
          phone: body.get("phone") ?? "",
          sourcePage: window.location.pathname,
        })
      );
      router.push("/property-details");
    } catch {
      setError(
        `Something went wrong sending your info. Please try again, or call/text us directly.`
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-brand-100">
      {title ? (
        <h2 className="text-xl font-bold text-brand-800">{title}</h2>
      ) : null}
      {subtitle ? <p className="mt-1 text-sm text-brand-700/80">{subtitle}</p> : null}

      <form onSubmit={onSubmit} className="mt-4 space-y-3" data-form-name={formName}>
        <p className="hidden">
          <label>
            Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div>
          <label htmlFor={`${formName}-address`} className="mb-1 block text-sm font-medium text-brand-800">
            Property Address*
          </label>
          <input
            id={`${formName}-address`}
            name="address"
            type="text"
            required
            autoComplete="street-address"
            placeholder="123 Main St, City, WI"
            className="w-full rounded-lg border border-brand-100 px-3 py-2.5 text-brand-900 placeholder:text-brand-700/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formName}-name`} className="mb-1 block text-sm font-medium text-brand-800">
              Name*
            </label>
            <input
              id={`${formName}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-lg border border-brand-100 px-3 py-2.5 text-brand-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
            />
          </div>
          <div>
            <label htmlFor={`${formName}-phone`} className="mb-1 block text-sm font-medium text-brand-800">
              Phone*
            </label>
            <input
              id={`${formName}-phone`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="w-full rounded-lg border border-brand-100 px-3 py-2.5 text-brand-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${formName}-email`} className="mb-1 block text-sm font-medium text-brand-800">
            Email
          </label>
          <input
            id={`${formName}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-brand-100 px-3 py-2.5 text-brand-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
          />
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent-500 px-6 py-3.5 text-lg font-semibold text-white shadow-md hover:bg-accent-600 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Get My Fair Cash Offer"}
        </button>
        <p className="text-center text-xs text-brand-700/60">
          No obligation. No fees. Your info is never shared or sold.
        </p>
      </form>
    </div>
  );
}
