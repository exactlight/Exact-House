import type { Metadata } from "next";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Cash Offer vs. Listing With an Agent",
  description:
    "An honest side-by-side comparison of selling your Wisconsin house for cash versus listing with a real estate agent — costs, timelines, and trade-offs.",
};

const rows: [string, string, string][] = [
  ["Commissions & fees", "None", "Typically 5-6% + seller fees"],
  ["Closing costs", "We pay standard costs", "Usually 1-2% paid by you"],
  ["Repairs & updates", "None — sell as-is", "Often required before or after inspection"],
  ["Showings & open houses", "None", "Ongoing until offer accepted"],
  ["Time to close", "7-30 days, your choice", "Commonly 60-90+ days total"],
  ["Financing fall-through risk", "None — cash", "Deals can collapse at the bank"],
  ["Sale price", "Below full retail (repairs priced in)", "Highest potential price"],
  ["Certainty", "Firm offer, firm date", "Depends on market and buyer"],
];

export default function ComparePage() {
  return (
    <>
      <section className="bg-brand-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-center text-4xl font-bold text-brand-800">
            Cash Offer vs. Listing With an Agent
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-center text-brand-700/80">
            A cash sale isn&apos;t right for everyone — here&apos;s the honest
            comparison so you can decide what fits your situation.
          </p>

          <div className="mt-10 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-brand-100">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-brand-100 bg-brand-800 text-white">
                  <th className="px-5 py-4 font-semibold"> </th>
                  <th className="px-5 py-4 font-semibold">Selling to Forward Home Buyer</th>
                  <th className="px-5 py-4 font-semibold">Listing With an Agent</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, us, agent], i) => (
                  <tr key={label} className={i % 2 ? "bg-brand-50/50" : "bg-white"}>
                    <td className="px-5 py-3.5 font-medium text-brand-800">{label}</td>
                    <td className="px-5 py-3.5 text-brand-800">{us}</td>
                    <td className="px-5 py-3.5 text-brand-700/80">{agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-brand-700/70">
            If your house is in great shape and you have time to wait, listing may
            net you more — and we&apos;ll tell you so. Cash makes sense when speed,
            condition, or certainty matter most.
          </p>
        </div>
      </section>
      <CtaBanner heading="Want Both Numbers? Get Our Offer and Compare." />
    </>
  );
}
