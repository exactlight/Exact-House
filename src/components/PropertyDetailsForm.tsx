"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

type Lead = { name: string; address: string; phone: string; sourcePage: string };

const inputCls =
  "w-full rounded-lg border border-brand-100 px-3 py-2.5 text-brand-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30";
const labelCls = "mb-1 block text-sm font-medium text-brand-800";

/**
 * Step 2 of the lead flow. Posts to the existing `property-details` Netlify
 * form with the same field names as the live site, carrying step-1 lead info
 * in hidden fields so submissions can be matched up.
 */
export default function PropertyDetailsForm() {
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // sessionStorage must be read after mount — reading it during render
    // would make server and client HTML disagree and break hydration.
    try {
      const raw = sessionStorage.getItem("eh-lead");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLead(JSON.parse(raw));
    } catch {
      // no lead context — form still works standalone
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const data = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    body.set("form-name", "property-details");
    body.set("lead-name", lead?.name ?? "");
    body.set("lead-address", lead?.address ?? "");
    body.set("lead-phone", lead?.phone ?? "");
    body.set("source-page", lead?.sourcePage ?? "direct");
    for (const [k, v] of data.entries()) {
      if (typeof v === "string") body.set(k, v);
    }

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
      sessionStorage.removeItem("eh-lead");
      router.push("/thank-you");
    } catch {
      setError(
        `Something went wrong. Your first submission was received — you can also just call us at ${site.phone}.`
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {lead?.address ? (
        <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800">
          Property: <span className="font-semibold">{lead.address}</span>
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="bedrooms" className={labelCls}>Bedrooms</label>
          <select id="bedrooms" name="bedrooms" className={inputCls} defaultValue="">
            <option value="" disabled>Select</option>
            {["1", "2", "3", "4", "5+"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bathrooms" className={labelCls}>Bathrooms</label>
          <select id="bathrooms" name="bathrooms" className={inputCls} defaultValue="">
            <option value="" disabled>Select</option>
            {["1", "1.5", "2", "2.5", "3+"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sqft" className={labelCls}>Approx. Square Feet</label>
          <input id="sqft" name="sqft" type="text" inputMode="numeric" className={inputCls} />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Overall condition</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            "Move-in ready",
            "Needs minor updates",
            "Needs major repairs",
            "Not livable as-is",
          ].map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-brand-100 px-3 py-2.5 text-sm text-brand-800 has-checked:border-accent-500 has-checked:bg-accent-500/5"
            >
              <input type="radio" name="condition" value={v} className="accent-accent-600" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="mortgage-balance" className={labelCls}>Mortgage balance (approx.)</label>
          <input id="mortgage-balance" name="mortgage-balance" type="text" inputMode="numeric" placeholder="$" className={inputCls} />
        </div>
        <div>
          <label htmlFor="asking-price" className={labelCls}>Asking price</label>
          <input id="asking-price" name="asking-price" type="text" inputMode="numeric" placeholder="$" className={inputCls} />
        </div>
        <div>
          <label htmlFor="lowest-price" className={labelCls}>Lowest you&apos;d accept</label>
          <input id="lowest-price" name="lowest-price" type="text" inputMode="numeric" placeholder="$" className={inputCls} />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>
          Would you consider an offer that pays off your mortgage plus a little extra?
        </legend>
        <div className="flex gap-3">
          {["Yes", "No", "Depends"].map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-brand-100 px-4 py-2.5 text-sm text-brand-800 has-checked:border-accent-500 has-checked:bg-accent-500/5"
            >
              <input type="radio" name="accept-payoff" value={v} className="accent-accent-600" />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="timeline" className={labelCls}>How soon do you want to sell?</label>
          <select id="timeline" name="timeline" className={inputCls} defaultValue="">
            <option value="" disabled>Select</option>
            {["ASAP", "Within 30 days", "1-3 months", "3-6 months", "Just exploring"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="reason" className={labelCls}>Reason for selling</label>
          <select id="reason" name="reason" className={inputCls} defaultValue="">
            <option value="" disabled>Select</option>
            {[
              "Relocating",
              "Inherited the property",
              "Behind on payments / foreclosure",
              "Divorce",
              "Tired of being a landlord",
              "House needs too many repairs",
              "Downsizing / senior transition",
              "Other",
            ].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="additional-info" className={labelCls}>
          Anything else we should know?
        </label>
        <textarea id="additional-info" name="additional-info" rows={4} className={inputCls} />
      </div>

      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-accent-500 px-6 py-3.5 text-lg font-semibold text-white shadow-md hover:bg-accent-600 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {submitting ? "Sending…" : "Send Property Details"}
      </button>
    </form>
  );
}
