"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DEFAULT_INPUTS,
  FINANCING_BY_KEY,
  FINANCING_METHODS,
  NO_STRESS,
  STRATEGY_LABELS,
  analyzeDeal,
  applyStress,
  gradeOf,
  type Analysis,
  type DealInputs,
  type Financing,
  type Stress,
} from "@/lib/engine";
import { money, pct, ratio } from "@/lib/format";
import { getDeal, saveDeal } from "@/lib/storage";
import Term from "@/components/Term";
import { MoneyField, NumField, PctField, SliderField } from "@/components/fields";
import { CostBar, Meter, ScoreBadge, Stat, type Segment } from "@/components/viz";

function verdictSentence(a: Analysis, i: DealInputs): string {
  switch (a.best) {
    case "flip":
      return a.flip.profit > 0
        ? `Buy it, renovate it, and resell: an estimated ${money(a.flip.profit)} profit — ${pct(a.flip.roiPct)} on the cash you'd put in over ${i.monthsHeld} months.`
        : `Even the strongest exit loses money at this price. Negotiate down or walk.`;
    case "brrrr":
      return a.brrrr.infiniteReturn
        ? `Rehab, rent, and refinance: you'd pull all of your cash back out and keep a property paying ${money(a.brrrr.rental.monthlyCashflow)}/mo.`
        : `Rehab, rent, and refinance: you'd recover ${pct(Math.max(0, a.brrrr.pctCashRecovered), 0)} of your cash and keep ${money(a.brrrr.rental.monthlyCashflow)}/mo in cash flow.`;
    case "rental":
      return `Best kept as a rental: ${money(a.rental.monthlyCashflow)}/mo after all expenses — a ${pct(a.rental.cashOnCashPct)} cash-on-cash return.`;
    case "wholesale":
      return `The spread is the prize here: contract it and assign to a flipper for up to ${money(a.wholesale.spread)}.`;
  }
}

export default function Analyzer() {
  const searchParams = useSearchParams();
  const [inputs, setInputs] = useState<DealInputs>(DEFAULT_INPUTS);
  const [dealId, setDealId] = useState<string | undefined>(undefined);
  const [stress, setStress] = useState<Stress>(NO_STRESS);
  const [saved, setSaved] = useState(false);

  // /analyze?deal=<id> re-opens a saved deal from localStorage. Render-phase
  // state adjustment (the React "derive state from a changed prop" pattern);
  // this component only renders on the client (useSearchParams inside
  // Suspense), so reading localStorage here can't cause a hydration mismatch.
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const urlId = searchParams.get("deal");
  if (urlId && urlId !== loadedId) {
    setLoadedId(urlId);
    const deal = getDeal(urlId);
    if (deal) {
      setInputs(deal.inputs);
      setDealId(deal.id);
    }
  }

  const analysis = useMemo(() => analyzeDeal(inputs), [inputs]);
  const hasStress =
    stress.rehabOverrunPct > 0 || stress.arvMissPct > 0 || stress.rentMissPct > 0 || stress.extraMonths > 0;
  const stressed = useMemo(
    () => (hasStress ? analyzeDeal(applyStress(inputs, stress)) : null),
    [inputs, stress, hasStress],
  );

  const set =
    <K extends keyof DealInputs>(key: K) =>
    (v: DealInputs[K]) => {
      setSaved(false);
      setInputs((s) => ({ ...s, [key]: v }));
    };

  // Picking a financing method seeds the editable rate/points/LTC fields with
  // that method's typical terms (and whether it funds rehab).
  function selectFinancing(key: Financing) {
    const m = FINANCING_BY_KEY[key];
    setSaved(false);
    setInputs((s) => ({
      ...s,
      financing: key,
      acqLtcPct: m.ltcPct,
      acqRatePct: m.ratePct,
      acqPointsPct: m.pointsPct,
      acqCoversRehab: m.coversRehab,
    }));
  }

  function onSave() {
    const deal = saveDeal(inputs, dealId);
    setDealId(deal.id);
    setSaved(true);
  }

  const { flip, brrrr, rental, wholesale, breakEvens, best } = analysis;
  const offerGap = inputs.purchasePrice - flip.maxOfferForTarget;

  const costSegments: Segment[] = [
    { label: "Purchase", value: inputs.purchasePrice, color: "var(--viz-purchase)" },
    { label: "Rehab", value: inputs.rehabCost, color: "var(--viz-rehab)" },
    {
      label: "Carry & financing",
      value: flip.buyClosing + flip.holdingCosts + flip.points + flip.interest,
      color: "var(--viz-carry)",
    },
    { label: "Selling costs", value: flip.sellCosts, color: "var(--viz-selling)" },
    {
      label: flip.profit >= 0 ? "Your profit" : "Loss",
      value: Math.abs(flip.profit),
      color: flip.profit >= 0 ? "var(--viz-profit)" : "var(--viz-loss)",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="print-hidden">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Analyze a deal</h1>
            <p className="mt-1 text-sm text-muted">
              Five numbers in, every exit strategy out. Tap any{" "}
              <Term k="arv">dotted term</Term> for a plain-English explanation.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onSave}
              className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-700"
            >
              {saved ? "Saved ✓" : dealId ? "Update deal" : "Save deal"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg border border-hairline bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface"
            >
              Print report
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          {/* ------------------------------ inputs ------------------------------ */}
          <div className="space-y-4">
            <Card title="The deal">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Property address or nickname</span>
                <input
                  type="text"
                  value={inputs.address}
                  onChange={(e) => set("address")(e.target.value)}
                  placeholder="123 Main St, Madison WI"
                  className="w-full rounded-lg border border-hairline bg-white px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                />
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <MoneyField label="Asking / purchase price" value={inputs.purchasePrice} onChange={set("purchasePrice")} />
                <MoneyField
                  label={<Term k="arv">ARV (after-repair value)</Term>}
                  value={inputs.arv}
                  onChange={set("arv")}
                />
                <MoneyField label="Rehab budget" value={inputs.rehabCost} onChange={set("rehabCost")} />
                <MoneyField label="Market rent (monthly)" value={inputs.monthlyRent} onChange={set("monthlyRent")} step={50} />
                <MoneyField label="Property taxes / yr" value={inputs.taxesYearly} onChange={set("taxesYearly")} step={100} />
              </div>
            </Card>

            <Card title={<Term k="holding">Carrying costs</Term>} collapsible>
              <div className="grid grid-cols-2 gap-3">
                <MoneyField label="Insurance / yr" value={inputs.insuranceYearly} onChange={set("insuranceYearly")} step={100} />
                <MoneyField label="Utilities / mo" value={inputs.utilitiesMonthly} onChange={set("utilitiesMonthly")} step={25} />
                <MoneyField label="HOA / mo" value={inputs.hoaMonthly} onChange={set("hoaMonthly")} step={25} />
                <NumField label="Months to resell / refi" value={inputs.monthsHeld} onChange={set("monthsHeld")} min={1} max={36} />
              </div>
            </Card>

            <Card title="Financing the purchase &amp; rehab" collapsible>
              <p className="-mt-1 mb-3 text-xs text-muted">
                How you fund the <em>short-term</em> buy &amp; rehab of a flip or BRRRR. Your long-term
                rental mortgage and the BRRRR cash-out refi are set in “Rental assumptions.”
              </p>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-muted">Method</span>
                <select
                  value={inputs.financing}
                  onChange={(e) => selectFinancing(e.target.value as Financing)}
                  className="w-full rounded-lg border border-hairline bg-white px-3 py-2 text-sm font-semibold text-foreground focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                >
                  {FINANCING_METHODS.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </label>
              <p className="mt-2 text-xs text-faint">{FINANCING_BY_KEY[inputs.financing].blurb}</p>

              {inputs.financing !== "cash" && (
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <PctField
                    label={inputs.acqCoversRehab ? "Loan-to-cost" : "Loan-to-price"}
                    value={inputs.acqLtcPct}
                    onChange={set("acqLtcPct")}
                  />
                  <PctField label="Rate (yr)" value={inputs.acqRatePct} onChange={set("acqRatePct")} step={0.25} />
                  <PctField label="Points" value={inputs.acqPointsPct} onChange={set("acqPointsPct")} step={0.5} />
                </div>
              )}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <PctField label="Buying closing costs (% of price)" value={inputs.buyClosingPct} onChange={set("buyClosingPct")} />
                <PctField label="Selling costs (% of ARV)" value={inputs.sellCostPct} onChange={set("sellCostPct")} />
              </div>
            </Card>

            <Card title="Rental assumptions" collapsible>
              <div className="grid grid-cols-2 gap-3">
                <PctField label={<Term k="vacancy">Vacancy</Term>} value={inputs.vacancyPct} onChange={set("vacancyPct")} />
                <PctField label="Maintenance (% rent)" value={inputs.maintenancePct} onChange={set("maintenancePct")} />
                <PctField label={<Term k="capex">CapEx reserve</Term>} value={inputs.capexPct} onChange={set("capexPct")} />
                <PctField label="Management (% rent)" value={inputs.managementPct} onChange={set("managementPct")} />
                <PctField label="Down payment (buy & hold)" value={inputs.rentalDownPct} onChange={set("rentalDownPct")} />
                <PctField label="30-yr rate" value={inputs.rentalRatePct} onChange={set("rentalRatePct")} step={0.125} />
                <PctField label={<Term k="brrrr">BRRRR refi LTV</Term>} value={inputs.refiLtvPct} onChange={set("refiLtvPct")} />
                <PctField label="Refi rate" value={inputs.refiRatePct} onChange={set("refiRatePct")} step={0.125} />
              </div>
            </Card>

            <Card title="Your targets" collapsible>
              <div className="grid grid-cols-2 gap-3">
                <MoneyField label="Flip profit target" value={inputs.targetFlipProfit} onChange={set("targetFlipProfit")} step={5000} />
                <MoneyField label="Cash flow target / mo" value={inputs.targetMonthlyCashflow} onChange={set("targetMonthlyCashflow")} step={50} />
                <MoneyField label={<Term k="wholesale">Wholesale fee target</Term>} value={inputs.targetWholesaleFee} onChange={set("targetWholesaleFee")} step={1000} />
              </div>
            </Card>
          </div>

          {/* ------------------------------ results ------------------------------ */}
          <div className="space-y-4">
            {/* Verdict */}
            <section className="rounded-2xl bg-ink-900 p-5 text-white">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-widest text-accent-100">Best exit for this deal</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
                  Grade {gradeOf(analysis.ranking[0].score)} · {analysis.ranking[0].score}/100
                </span>
              </div>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight">{STRATEGY_LABELS[best]}</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/85">{verdictSentence(analysis, inputs)}</p>
              <ol className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                {analysis.ranking.map((r, idx) => (
                  <li key={r.key} className={`rounded-full px-3 py-1 ${idx === 0 ? "bg-accent-500 text-white" : "bg-white/10 text-white/75"}`}>
                    {idx + 1}. {STRATEGY_LABELS[r.key]} · {r.score}
                  </li>
                ))}
              </ol>
            </section>

            {/* Offer coach */}
            <Card
              title={
                <>
                  Offer coach — your <Term k="mao">maximum allowable offer</Term>
                </>
              }
            >
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat
                  big
                  tone="accent"
                  label={`Max offer to clear ${money(inputs.targetFlipProfit)} flipping`}
                  value={money(flip.maxOfferForTarget)}
                  sub="Solved from your actual costs"
                />
                <Stat
                  label={<Term k="rule70">70% rule says</Term>}
                  value={money(flip.mao70)}
                  sub="Quick screen: 70% × ARV − rehab"
                />
                <Stat
                  label="Your price vs. max offer"
                  value={offerGap > 0 ? `${money(offerGap)} over` : `${money(-offerGap)} under`}
                  tone={offerGap > 0 ? "bad" : "good"}
                  sub={offerGap > 0 ? "Negotiate down or the profit comes out of you" : "There's room in this deal"}
                />
              </div>
            </Card>

            {/* Strategy cards */}
            <div className="grid gap-4 xl:grid-cols-2">
              <Card
                title={
                  <span className="flex items-center justify-between gap-2">
                    <span>Fix &amp; flip</span> <ScoreBadge score={flip.score} />
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-3">
                  <Stat
                    big
                    className="col-span-2"
                    label="Net profit"
                    value={money(flip.profit)}
                    tone={flip.profit >= 0 ? "good" : "bad"}
                  />
                  <Stat label="Cash needed" value={money(flip.cashInvested)} />
                  <Stat label="Return on cash" value={pct(flip.roiPct)} sub={`${pct(flip.annualizedRoiPct, 0)} annualized`} />
                </div>
                <div className="mt-4">
                  <CostBar
                    title={`Where the ${money(inputs.arv)} sale price goes`}
                    segments={costSegments}
                    note={flip.profit < 0 ? "Costs exceed the sale price — the red share is your loss." : undefined}
                  />
                </div>
              </Card>

              <Card
                title={
                  <span className="flex items-center justify-between gap-2">
                    <span><Term k="brrrr">BRRRR</Term></span> <ScoreBadge score={brrrr.score} />
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-3">
                  <Stat
                    big
                    className="col-span-2"
                    label="Cash left in deal"
                    value={brrrr.cashLeftInDeal <= 0 ? "$0" : money(brrrr.cashLeftInDeal)}
                    tone={brrrr.cashLeftInDeal <= 0 ? "good" : "default"}
                    sub={
                      brrrr.infiniteReturn
                        ? "All cash out — infinite return"
                        : `${pct(Math.max(0, Math.min(100, brrrr.pctCashRecovered)), 0)} of cash recovered`
                    }
                  />
                  <Stat
                    label="Cash flow after refi"
                    value={`${money(brrrr.rental.monthlyCashflow)}/mo`}
                    tone={brrrr.rental.monthlyCashflow >= 0 ? "good" : "bad"}
                  />
                  <Stat label={<Term k="equity">Equity kept</Term>} value={money(brrrr.equityAfterRefi)} />
                </div>
                <dl className="mt-4 space-y-1 text-xs text-muted">
                  <Row k="Cash in through rehab" v={money(brrrr.phaseCashIn)} />
                  <Row k={`Refi loan (${pct(inputs.refiLtvPct, 0)} of ARV)`} v={money(brrrr.refiLoan)} />
                  <Row k="Cash back at refi" v={money(Math.max(0, brrrr.cashOutAtRefi))} />
                  <Row
                    k={<Term k="dscr">DSCR after refi</Term>}
                    v={`${ratio(brrrr.rental.dscr)} ${brrrr.rental.dscr >= 1.2 ? "· lender-ready" : "· below 1.2× min"}`}
                  />
                </dl>
              </Card>

              <Card
                title={
                  <span className="flex items-center justify-between gap-2">
                    <span>Buy &amp; hold rental</span> <ScoreBadge score={rental.score} />
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-3">
                  <Stat
                    big
                    className="col-span-2"
                    label="Cash flow"
                    value={`${money(rental.monthlyCashflow)}/mo`}
                    tone={rental.monthlyCashflow >= 0 ? "good" : "bad"}
                  />
                  <Stat label={<Term k="coc">Cash-on-cash</Term>} value={pct(rental.cashOnCashPct)} />
                  <Stat label={<Term k="caprate">Cap rate</Term>} value={pct(rental.capRatePct)} />
                </div>
                <dl className="mt-4 space-y-1 text-xs text-muted">
                  <Row k={<Term k="noi">NOI (yearly)</Term>} v={money(rental.noi)} />
                  <Row k="Mortgage (P&I)" v={`${money(rental.monthlyPI)}/mo`} />
                  <Row k={<Term k="dscr">DSCR</Term>} v={ratio(rental.dscr)} />
                  <Row
                    k={<Term k="onepct">1% rule</Term>}
                    v={`${pct(rental.rentToPricePct, 2)} ${rental.rentToPricePct >= 1 ? "· passes" : "· misses"}`}
                  />
                  <Row k="Cash needed" v={money(rental.cashInvested)} />
                </dl>
              </Card>

              <Card
                title={
                  <span className="flex items-center justify-between gap-2">
                    <span><Term k="wholesale">Wholesale</Term></span> <ScoreBadge score={wholesale.score} />
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-3">
                  <Stat
                    big
                    label={<Term k="spread">Assignment spread</Term>}
                    value={money(wholesale.spread)}
                    tone={wholesale.spread > 0 ? "good" : "bad"}
                    sub={
                      wholesale.spread > 0
                        ? wholesale.hitsTargetFee
                          ? "Room for your full fee"
                          : `Below your ${money(inputs.targetWholesaleFee)} target`
                        : "No room at this contract price"
                    }
                  />
                  <Stat
                    label="A flipper can pay up to"
                    value={money(wholesale.buyerMao)}
                    sub="70% × ARV − rehab: your end buyer's ceiling"
                  />
                </div>
                <p className="mt-3 text-xs text-muted">
                  {wholesale.spread > 0
                    ? `Contract at ${money(inputs.purchasePrice)}, assign to a cash buyer, and the spread is your fee — no rehab, no loan, no ownership.`
                    : `To wholesale this with a ${money(inputs.targetWholesaleFee)} fee, you'd need it under contract at ${money(Math.max(0, wholesale.buyerMao - inputs.targetWholesaleFee))} or less.`}
                </p>
              </Card>
            </div>

            {/* Stress lab */}
            <Card title="Stress test — what if things go wrong?">
              <p className="-mt-1 mb-4 text-xs text-muted">
                New investors lose money on surprises, not on the base case. Drag the sliders and watch the deal
                absorb (or not absorb) the hit.
              </p>
              <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                <SliderField
                  label="Rehab runs over"
                  value={stress.rehabOverrunPct}
                  onChange={(v) => setStress((s) => ({ ...s, rehabOverrunPct: v }))}
                  min={0}
                  max={50}
                  format={(v) => `+${v}%`}
                />
                <SliderField
                  label="ARV comes in low"
                  value={stress.arvMissPct}
                  onChange={(v) => setStress((s) => ({ ...s, arvMissPct: v }))}
                  min={0}
                  max={20}
                  format={(v) => `−${v}%`}
                />
                <SliderField
                  label="Rent comes in low"
                  value={stress.rentMissPct}
                  onChange={(v) => setStress((s) => ({ ...s, rentMissPct: v }))}
                  min={0}
                  max={20}
                  format={(v) => `−${v}%`}
                />
                <SliderField
                  label="Takes longer to sell / refi"
                  value={stress.extraMonths}
                  onChange={(v) => setStress((s) => ({ ...s, extraMonths: v }))}
                  min={0}
                  max={12}
                  format={(v) => `+${v} mo`}
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Stat
                  label="Flip profit under stress"
                  value={money((stressed ?? analysis).flip.profit)}
                  tone={(stressed ?? analysis).flip.profit >= 0 ? "good" : "bad"}
                  sub={hasStress ? `${money(analysis.flip.profit)} before stress` : "Move a slider to stress the deal"}
                />
                <Stat
                  label="Rental cash flow under stress"
                  value={`${money((stressed ?? analysis).rental.monthlyCashflow)}/mo`}
                  tone={(stressed ?? analysis).rental.monthlyCashflow >= 0 ? "good" : "bad"}
                  sub={hasStress ? `${money(analysis.rental.monthlyCashflow)}/mo before stress` : undefined}
                />
              </div>

              <div className="mt-5">
                <Meter value={breakEvens.resilienceScore} label={<Term k="resilience">Deal resilience</Term>} />
                <ul className="mt-3 space-y-1.5 text-xs text-muted">
                  <li>
                    {breakEvens.maxRehabOverrunPct === null
                      ? "The flip loses money before any rehab overrun — there is no cushion."
                      : `The rehab can run ${pct(Math.min(100, breakEvens.maxRehabOverrunPct), 0)} over budget before the flip loses money.`}
                  </li>
                  <li>
                    {breakEvens.maxArvMissPct === null
                      ? "The flip loses money even at your full ARV estimate."
                      : `The ARV can come in ${pct(Math.min(100, breakEvens.maxArvMissPct), 0)} under your estimate before the flip loses money.`}
                  </li>
                  <li>
                    {breakEvens.maxRentMissPct === null
                      ? "The rental is cash-flow negative even at your full rent estimate."
                      : `Rent can come in ${pct(Math.min(100, breakEvens.maxRentMissPct), 0)} under your estimate before the rental bleeds cash.`}
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ------------------------- printable report ------------------------- */}
      <PrintReport inputs={inputs} analysis={analysis} />
    </div>
  );
}

function Card({
  title,
  children,
  collapsible = false,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
}) {
  if (collapsible) {
    return (
      <details className="group rounded-2xl border border-hairline bg-surface">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-bold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between">
            {title}
            <span className="text-faint transition-transform group-open:rotate-180">▾</span>
          </span>
        </summary>
        <div className="px-4 pb-4">{children}</div>
      </details>
    );
  }
  return (
    <section className="rounded-2xl border border-hairline bg-surface p-4">
      <h3 className="mb-3 text-sm font-bold text-foreground">{title}</h3>
      {children}
    </section>
  );
}

function Row({ k, v }: { k: React.ReactNode; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt>{k}</dt>
      <dd className="font-semibold tabular-nums text-foreground">{v}</dd>
    </div>
  );
}

/** One-page summary rendered only when printing (Print report button). */
function PrintReport({ inputs, analysis }: { inputs: DealInputs; analysis: Analysis }) {
  const { flip, brrrr, rental, wholesale, breakEvens } = analysis;
  return (
    <div className="print-visible hidden text-sm">
      <h1 className="text-xl font-extrabold">DealLens deal report</h1>
      <p className="text-muted">{inputs.address || "Unnamed property"}</p>
      <table className="mt-4 w-full border-collapse text-left">
        <tbody>
          <tr className="border-b border-hairline">
            <td className="py-1 pr-4 text-muted">Purchase price</td>
            <td className="py-1 font-semibold">{money(inputs.purchasePrice)}</td>
            <td className="py-1 pr-4 text-muted">ARV</td>
            <td className="py-1 font-semibold">{money(inputs.arv)}</td>
          </tr>
          <tr className="border-b border-hairline">
            <td className="py-1 pr-4 text-muted">Rehab budget</td>
            <td className="py-1 font-semibold">{money(inputs.rehabCost)}</td>
            <td className="py-1 pr-4 text-muted">Market rent</td>
            <td className="py-1 font-semibold">{money(inputs.monthlyRent)}/mo</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-5 font-bold">Best exit: {STRATEGY_LABELS[analysis.best]}</h2>
      <p>{verdictSentence(analysis, inputs)}</p>

      <table className="mt-4 w-full border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-foreground text-xs uppercase tracking-wide text-muted">
            <th className="py-1 pr-3">Strategy</th>
            <th className="py-1 pr-3">Score</th>
            <th className="py-1 pr-3">Headline</th>
            <th className="py-1">Cash needed</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-hairline">
            <td className="py-1 pr-3">Fix &amp; flip</td>
            <td className="py-1 pr-3">{flip.score}/100</td>
            <td className="py-1 pr-3">{money(flip.profit)} profit · {pct(flip.roiPct)} on cash</td>
            <td className="py-1">{money(flip.cashInvested)}</td>
          </tr>
          <tr className="border-b border-hairline">
            <td className="py-1 pr-3">BRRRR</td>
            <td className="py-1 pr-3">{brrrr.score}/100</td>
            <td className="py-1 pr-3">
              {money(brrrr.rental.monthlyCashflow)}/mo after refi · {money(Math.max(0, brrrr.cashLeftInDeal))} left in
            </td>
            <td className="py-1">{money(brrrr.phaseCashIn)}</td>
          </tr>
          <tr className="border-b border-hairline">
            <td className="py-1 pr-3">Buy &amp; hold</td>
            <td className="py-1 pr-3">{rental.score}/100</td>
            <td className="py-1 pr-3">
              {money(rental.monthlyCashflow)}/mo · {pct(rental.cashOnCashPct)} CoC · DSCR {ratio(rental.dscr)}
            </td>
            <td className="py-1">{money(rental.cashInvested)}</td>
          </tr>
          <tr className="border-b border-hairline">
            <td className="py-1 pr-3">Wholesale</td>
            <td className="py-1 pr-3">{wholesale.score}/100</td>
            <td className="py-1 pr-3">{money(wholesale.spread)} spread vs. buyer max {money(wholesale.buyerMao)}</td>
            <td className="py-1">≈ $0</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mt-5 font-bold">Offer guidance</h2>
      <p>
        Max offer to clear {money(inputs.targetFlipProfit)} on a flip: <strong>{money(flip.maxOfferForTarget)}</strong>{" "}
        (70% rule: {money(flip.mao70)}).
      </p>

      <h2 className="mt-5 font-bold">Risk cushion — resilience {breakEvens.resilienceScore}/100</h2>
      <ul className="list-disc pl-5">
        <li>
          Rehab overrun absorbed before the flip loses money:{" "}
          {breakEvens.maxRehabOverrunPct === null ? "none" : pct(Math.min(100, breakEvens.maxRehabOverrunPct), 0)}
        </li>
        <li>
          ARV miss absorbed: {breakEvens.maxArvMissPct === null ? "none" : pct(Math.min(100, breakEvens.maxArvMissPct), 0)}
        </li>
        <li>
          Rent miss absorbed before negative cash flow:{" "}
          {breakEvens.maxRentMissPct === null ? "none" : pct(Math.min(100, breakEvens.maxRentMissPct), 0)}
        </li>
      </ul>

      <p className="mt-6 text-xs text-faint">
        Generated by DealLens from user-supplied inputs and standard formulas. Educational estimate — not an appraisal
        or financial advice.
      </p>
    </div>
  );
}
