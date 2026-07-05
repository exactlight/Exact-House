"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

type Lead = { name: string; address: string; phone: string; sourcePage: string };

const inputCls =
  "w-full rounded-[10px] border-2 border-[#e0e0e0] px-4 py-3.5 text-base transition-all focus:border-accent-500 focus:outline-none focus:ring-[3px] focus:ring-accent-500/10";
const labelCls = "mb-2 block font-semibold text-brand-800";
const sectionTitleCls = "heading-display mb-6 text-3xl tracking-[1px] text-brand-800";

/** Pill-style radio option matching the live /details page. */
function RadioOption({ name, value }: { name: string; value: string }) {
  return (
    <label className="block cursor-pointer rounded-[10px] border-2 border-[#e0e0e0] px-4 py-3.5 text-center font-medium transition-all hover:border-accent-500 has-checked:border-accent-500 has-checked:bg-accent-500 has-checked:text-white">
      <input type="radio" name={name} value={value} className="sr-only" />
      {value}
    </label>
  );
}

/**
 * Step 2 of the lead flow — a faithful port of the live site's /details page.
 * Posts to the existing `property-details` Netlify form with identical field
 * names and values; step-1 lead info rides along in hidden fields.
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
      const raw = sessionStorage.getItem("fhb-lead");
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
      sessionStorage.removeItem("fhb-lead");
      router.push("/thank-you");
    } catch {
      setError(
        `Something went wrong. Your first submission was received — you can also just call us at ${site.phone}.`
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[20px] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] sm:p-12">
      <h1 className="heading-display text-5xl tracking-[1px] text-brand-800">
        Almost Done!
      </h1>
      <p className="mt-2 text-lg text-[#666]">
        Help us understand your property better so we can make you the best cash
        offer.
      </p>

      {/* Progress bar at 50%, like the live page */}
      <div className="mb-10 mt-8 h-2 overflow-hidden rounded-[10px] bg-[#e0e0e0]">
        <div className="h-full w-1/2 rounded-[10px] bg-gradient-to-r from-accent-500 to-accent-400" />
      </div>

      <form onSubmit={onSubmit} className="space-y-10">
        {/* Property Details */}
        <div>
          <h2 className={sectionTitleCls}>Property Details</h2>

          <div className="mb-6">
            <label htmlFor="bedrooms" className={labelCls}>How many bedrooms?</label>
            <select id="bedrooms" name="bedrooms" required className={inputCls} defaultValue="">
              <option value="" disabled>Select...</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5+">5+ Bedrooms</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="bathrooms" className={labelCls}>How many bathrooms?</label>
            <select id="bathrooms" name="bathrooms" required className={inputCls} defaultValue="">
              <option value="" disabled>Select...</option>
              <option value="1">1 Bathroom</option>
              <option value="1.5">1.5 Bathrooms</option>
              <option value="2">2 Bathrooms</option>
              <option value="2.5">2.5 Bathrooms</option>
              <option value="3+">3+ Bathrooms</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="sqft" className={labelCls}>Approximate square footage?</label>
            <input id="sqft" name="sqft" type="text" inputMode="numeric" placeholder="e.g., 1500" className={inputCls} />
          </div>

          <fieldset>
            <legend className={labelCls}>Property condition?</legend>
            <div className="grid gap-4 sm:grid-cols-4">
              {["Excellent", "Good", "Fair", "Needs Work"].map((v) => (
                <RadioOption key={v} name="condition" value={v} />
              ))}
            </div>
          </fieldset>
        </div>

        {/* Financial Information */}
        <div>
          <h2 className={sectionTitleCls}>Financial Information</h2>

          <div className="mb-6">
            <label htmlFor="mortgage-balance" className={labelCls}>
              How much do you owe on the property?
            </label>
            <input id="mortgage-balance" name="mortgage-balance" type="text" inputMode="numeric" placeholder="$" required className={inputCls} />
            <p className="mt-1 text-sm text-[#666]">If you own it free and clear, enter $0</p>
          </div>

          <div className="mb-6">
            <label htmlFor="asking-price" className={labelCls}>
              What price are you hoping to get?
            </label>
            <input id="asking-price" name="asking-price" type="text" inputMode="numeric" placeholder="$" required className={inputCls} />
          </div>

          <div className="mb-6">
            <label htmlFor="lowest-price" className={labelCls}>
              What&apos;s the lowest you would accept if we could close fast?
            </label>
            <input id="lowest-price" name="lowest-price" type="text" inputMode="numeric" placeholder="$" className={inputCls} />
          </div>

          <fieldset>
            <legend className={labelCls}>Would you accept what you owe on the mortgage?</legend>
            <div className="grid gap-4 sm:grid-cols-3">
              {["Yes", "No", "Maybe"].map((v) => (
                <RadioOption key={v} name="accept-payoff" value={v} />
              ))}
            </div>
          </fieldset>
        </div>

        {/* Your Situation */}
        <div>
          <h2 className={sectionTitleCls}>Your Situation</h2>

          <div className="mb-6">
            <label htmlFor="timeline" className={labelCls}>When do you need to sell?</label>
            <select id="timeline" name="timeline" required className={inputCls} defaultValue="">
              <option value="" disabled>Select...</option>
              <option value="ASAP">As soon as possible</option>
              <option value="1-month">Within 1 month</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="flexible">Flexible / Just exploring</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="reason" className={labelCls}>What&apos;s prompting you to sell?</label>
            <select id="reason" name="reason" required className={inputCls} defaultValue="">
              <option value="" disabled>Select...</option>
              <option value="Foreclosure">Facing foreclosure</option>
              <option value="Divorce">Divorce</option>
              <option value="Inherited">Inherited property</option>
              <option value="Job Relocation">Job relocation</option>
              <option value="Downsizing">Downsizing</option>
              <option value="Tired Landlord">Tired of being a landlord</option>
              <option value="Repairs">Property needs too many repairs</option>
              <option value="Financial">Financial hardship</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="additional-info" className={labelCls}>
              Anything else you&apos;d like us to know?
            </label>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Tell us about your situation, any special circumstances, or questions you have..."
              className={`${inputCls} min-h-[120px] resize-y`}
            />
          </div>
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="heading-display w-full rounded-full bg-accent-500 py-5 text-xl tracking-[1px] text-white shadow-[0_10px_30px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(255,107,53,0.4)] disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Submit & Get My Offer"}
        </button>
      </form>
    </div>
  );
}
