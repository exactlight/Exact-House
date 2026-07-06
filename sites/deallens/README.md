# DealLens — see every exit before you buy

A free, no-signup deal analyzer built for **new real estate investors**.
Enter one property (price, ARV, rehab budget, market rent, taxes) and DealLens
instantly analyzes **all four exit strategies at once** — fix & flip, BRRRR,
buy & hold rental, and wholesale — then ranks them, coaches the offer, and
stress-tests the deal.

## Why this app

New investors don't lose money because they can't find calculators — they lose
it because each calculator analyzes only the strategy they already fell in
love with, and because the base case hides the risk. DealLens flips both:

1. **Every exit, one screen.** The same five inputs feed four strategy
   scorecards (0–100, graded A–F), so the property tells you what it wants to
   be. A verdict banner explains the winner in plain English.
2. **Offer coach.** Solves *backwards* from your profit target to the exact
   maximum allowable offer using your real costs (points, interest, holding,
   selling costs) — shown next to the classic 70% rule so you learn why the
   rule of thumb exists and when it's miscalibrated.
3. **Stress test + resilience score.** Sliders for "rehab runs over", "ARV
   comes in low", "rent misses", and "takes longer to sell" re-run the whole
   analysis live. The engine also solves each break-even ("the rehab can run
   50% over before the flip loses money") and condenses them into a 0–100
   resilience score.
4. **Teaches while you use it.** Every term (ARV, MAO, NOI, DSCR, cap rate,
   CapEx…) is a tap-to-reveal plain-English definition, with a full `/learn`
   glossary page.
5. **Private by design.** No account, no server, no email capture. Deals save
   to `localStorage` (`/deals` compares them side by side), and the one-page
   deal report prints straight from the analyzer (print stylesheet) — ready to
   hand a lender or partner.

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind v4 · all analysis client-side
(pure functions in `src/lib/engine.ts`, no API keys, no env vars). Deploys to
Netlify like the other sites in this repo (`netlify.toml`).

```bash
cd sites/deallens
npm install
npm run dev     # localhost:3000
npm run build   # static build — all routes prerender
npm run lint
```

## Where things live

| Path | What it is |
|---|---|
| `src/lib/engine.ts` | The whole financial engine: flip P&L, MAO solver, rental metrics (NOI, cap rate, CoC, DSCR), BRRRR refi math, wholesale spread, break-even bisection, scores. Pure functions — easy to unit test. |
| `src/lib/glossary.ts` | Plain-English term definitions (tooltips + `/learn`). |
| `src/lib/storage.ts` | localStorage persistence exposed as an external store (`useSyncExternalStore`). |
| `src/components/Analyzer.tsx` | The analyzer page: inputs, verdict, strategy cards, stress lab, print report. |
| `src/components/viz.tsx` | Chart pieces: stacked cost bar, resilience meter, stat tiles, grade badge. |

## Notes for future work

- The cost-breakdown bar's series colors were validated for colorblind-safe
  adjacency (CVD ΔE 47.2) with the dataviz palette validator; the aqua/yellow
  contrast WARN is mitigated by the value-labeled legend list. Revalidate if
  you reorder or recolor segments.
- Scores/grades are deliberately simple monotonic heuristics documented inline
  in `engine.ts` — tune the targets there, not in the UI.
- Natural next steps: address autocomplete + comps API for ARV/rent estimates,
  shareable deal URLs (querystring-encoded inputs), CSV export of saved deals,
  and a buyers-list/lead hook if this becomes a funnel for the main business.
