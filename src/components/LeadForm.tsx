"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  /** Netlify form name — must match a form defined in public/__forms.html */
  formName: string;
  /** Extra hidden fields, e.g. { city: "Madison" } or { situation: "Divorce" } */
  hidden?: Record<string, string>;
};

const inputCls =
  "w-full rounded-[10px] border-2 border-[#e0e0e0] px-4 py-3.5 text-base text-foreground transition-all focus:border-accent-500 focus:outline-none focus:ring-[3px] focus:ring-accent-500/10";

/**
 * Step 1 of the two-step lead flow — visual match for the live site's form
 * card. Captures the lead into Netlify Forms immediately, then forwards to
 * /details for step 2. The lead is saved even if step 2 is abandoned.
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
      router.push("/details");
    } catch {
      setError(
        "Something went wrong sending your info. Please try again, or call/text us directly."
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="anim-in-right rounded-[20px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:p-10">
      <h2 className="heading-display text-4xl text-brand-800">Get a Cash Offer</h2>
      <p className="mt-1 text-[#666]">
        Send your details below and we&apos;ll text or email your offer the same
        day. No pressure.
      </p>
      <p className="mt-2 font-semibold text-[#666]">
        Prefer faster? Call or text the number above.
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-5" data-form-name={formName}>
        <p className="hidden">
          <label>
            Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <div>
          <label htmlFor={`${formName}-name`} className="mb-2 block font-semibold text-brand-800">
            Full Name *
          </label>
          <input
            id={`${formName}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor={`${formName}-phone`} className="mb-2 block font-semibold text-brand-800">
            Phone Number *
          </label>
          <input
            id={`${formName}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor={`${formName}-email`} className="mb-2 block font-semibold text-brand-800">
            Email (Optional)
          </label>
          <input
            id={`${formName}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor={`${formName}-address`} className="mb-2 block font-semibold text-brand-800">
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

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="heading-display w-full rounded-full bg-accent-500 py-5 text-xl tracking-[1px] text-white shadow-[0_10px_30px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-[0_15px_40px_rgba(255,107,53,0.4)] disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Get Me An Offer"}
        </button>

        {/* SMS consent disclosure — required by TCPA and reviewed by carriers
            during toll-free verification / A2P 10DLC campaign approval. */}
        <p className="text-xs leading-relaxed text-[#888]">
          By submitting, you agree that Exact House may contact you by phone,
          text message, or email about your property inquiry, including via
          automated means. Consent is not a condition of any purchase. Message
          and data rates may apply. Message frequency varies. Reply STOP to
          opt out or HELP for help. See our{" "}
          <Link href="/privacy" className="underline hover:text-accent-600">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
