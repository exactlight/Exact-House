"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { STRATEGY_LABELS, analyzeDeal, gradeOf } from "@/lib/engine";
import { money } from "@/lib/format";
import { deleteDeal, getDealsServerSnapshot, getDealsSnapshot, subscribeDeals } from "@/lib/storage";

/**
 * Saved deals, side by side — the same columns for every deal so two
 * candidate properties can be compared at a glance.
 */
export default function DealsList() {
  const deals = useSyncExternalStore(subscribeDeals, getDealsSnapshot, getDealsServerSnapshot);

  if (deals.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-hairline bg-surface p-10 text-center">
        <p className="text-lg font-bold">No saved deals yet</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Analyze a property and hit “Save deal” — it&apos;s stored in this browser only, and every deal
          you save shows up here for side-by-side comparison.
        </p>
        <Link
          href="/analyze"
          className="mt-4 inline-block rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700"
        >
          Analyze your first deal
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-hairline">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-hairline bg-surface text-xs font-semibold uppercase tracking-wide text-muted">
            <th className="px-4 py-3">Deal</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">ARV</th>
            <th className="px-4 py-3">Best exit</th>
            <th className="px-4 py-3">Flip profit</th>
            <th className="px-4 py-3">Rental CF/mo</th>
            <th className="px-4 py-3">Resilience</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {deals.map((d) => {
            const a = analyzeDeal(d.inputs);
            const top = a.ranking[0];
            return (
              <tr key={d.id} className="border-b border-hairline last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/analyze?deal=${d.id}`} className="font-semibold text-accent-700 hover:underline">
                    {d.inputs.address || "Unnamed property"}
                  </Link>
                  <div className="text-xs text-faint">saved {new Date(d.savedAt).toLocaleDateString()}</div>
                </td>
                <td className="px-4 py-3 tabular-nums">{money(d.inputs.purchasePrice)}</td>
                <td className="px-4 py-3 tabular-nums">{money(d.inputs.arv)}</td>
                <td className="px-4 py-3">
                  {STRATEGY_LABELS[a.best]}{" "}
                  <span className="text-xs font-semibold text-muted">
                    ({gradeOf(top.score)} · {top.score})
                  </span>
                </td>
                <td className={`px-4 py-3 font-semibold tabular-nums ${a.flip.profit >= 0 ? "text-good" : "text-bad"}`}>
                  {money(a.flip.profit)}
                </td>
                <td
                  className={`px-4 py-3 font-semibold tabular-nums ${
                    a.rental.monthlyCashflow >= 0 ? "text-good" : "text-bad"
                  }`}
                >
                  {money(a.rental.monthlyCashflow)}
                </td>
                <td className="px-4 py-3 tabular-nums">{a.breakEvens.resilienceScore}/100</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => deleteDeal(d.id)}
                    className="rounded-md px-2 py-1 text-xs font-semibold text-faint hover:bg-surface hover:text-bad"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
