# DealLens — Handoff

Read this first. It tells you what DealLens is, where it came from, how to run
it, and the three jobs the owner (Ken) wants done next. **Everything you need is
in this folder.**

---

## TL;DR for the owner (Ken)

- This folder **is** the entire DealLens app. Drop it wherever it should live
  (you mentioned `C:\Users\rockl\Desktop\AI\EXactREI\DealLens`).
- It was built and tested in a cloud session that was connected to your
  "Exact House" online project — that's why it wasn't on your Desktop. The app
  is finished and is **already live** on the web (see below).
- Hand this file to a Claude that can see your Desktop + your EXactREI design
  system, and it can finish the last three steps.

---

## What DealLens is

A free, no-signup **real-estate deal analyzer** for new investors. Enter one
property and it scores **all four exit strategies at once** — fix & flip,
BRRRR, buy & hold rental, wholesale — ranks them, coaches the maximum offer,
and stress-tests the deal. Everything runs in the browser; no accounts, no
server, no data leaves the device. Saved deals live in the browser's
localStorage.

## Current status: DONE and LIVE

- **Live URL:** https://deallens-rei.netlify.app
- Built, linted, production-built, and browser-tested end to end (all math
  hand-verified; ~20 automated UI checks passing).
- The financial engine is solid and **verified** — do not "improve" the math
  during a restyle (see "Rules for the restyle" below).

## Where it currently lives (the canonical copy)

- **Online project (GitHub repo):** `exactlight/exact-house`
- **Branch:** `claude/realtor-app-concept-g0i0j5`
- **Folder in that repo:** `sites/deallens`  ← this folder is a copy of it
- This ZIP/folder excludes `node_modules/` and `.next/` (build artifacts). Run
  `npm install` to regenerate them.

## Current hosting (Netlify)

- **Netlify project name:** `deallens-rei`
- **Netlify site ID:** `8383fcce-5b1e-479d-90fa-d15359fa2442`
- **Netlify team:** "Exact House" (slug `ken-q1lvys`)
- **Deploy method used:** remote build via the Netlify MCP deploy tool, run
  from inside the app folder. (Alternatively, link this folder to the Netlify
  site and let it build on push.)
- No environment variables are required — the app is 100% client-side.

---

## How to run it locally

```bash
cd DealLens
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender)
npm run lint
```

Requires Node 20+. Stack: **Next.js 16** (App Router, TypeScript), **Tailwind
CSS v4**, React 19. No database, no API keys.

## File map

```
DealLens/
  src/
    app/
      page.tsx            Landing page
      analyze/page.tsx    The analyzer route (wraps the Analyzer component)
      deals/page.tsx      Saved deals (localStorage) comparison table
      learn/page.tsx      Plain-English glossary
      layout.tsx          Root layout — FONTS are set here
      globals.css         *** DESIGN TOKENS live here (colors, etc.) ***
      icon.svg            Favicon
    components/
      Analyzer.tsx        The main analyzer UI (inputs, verdict, cards, stress test, print report)
      DealsList.tsx       Saved-deals table
      Header.tsx, Footer.tsx
      fields.tsx          Reusable numeric input controls
      viz.tsx             Chart pieces (cost bar, meter, stat tiles, score badge)
      Term.tsx            Tap-to-reveal glossary tooltips
    lib/
      engine.ts           *** THE FINANCIAL ENGINE — DO NOT change during a restyle ***
      glossary.ts         Definitions text
      format.ts           Money/percent formatting
      site.ts             Site name/description
      storage.ts          localStorage read/write + migration
  README.md               Product/dev overview
  HANDOFF.md              This file
  package.json, netlify.toml, next.config.ts, tsconfig.json, etc.
```

---

## The three jobs Ken wants done next

### 1. Relocate into the EXactREI suite
Put this folder at `C:\Users\rockl\Desktop\AI\EXactREI\DealLens`. That's it —
it's self-contained. (If EXactREI is one big Git repo, add it as a `DealLens/`
subfolder; if each app is its own repo/site, keep it standalone.)

### 2. Convert DealLens to the EXactREI design system
The design system is at `C:\Users\rockl\Desktop\AI\EXactREI\EXactREI design`.
**You must be able to read that folder to do this job.** The good news: DealLens
is themed through a small, contained set of files, so this is a
presentation-only change.

Where the look comes from, in priority order:
- **`src/app/globals.css`** — all design tokens are CSS custom properties here
  (brand/ink/accent colors, chart series colors, surfaces, hairlines). This is
  the main file to rewrite against EXactREI tokens. It uses Tailwind v4's
  `@theme inline { ... }` to expose the tokens as Tailwind color utilities
  (e.g. `bg-accent-600`, `text-muted`).
- **`src/app/layout.tsx`** — the fonts (currently `Inter` via `next/font`).
  Swap to the EXactREI typeface(s).
- **Component `className`s** — spacing, radii, shadows in the `.tsx` files.
  Match EXactREI's button/card/input styling. Key files: `Header.tsx`,
  `Footer.tsx`, `fields.tsx`, `viz.tsx`, `Analyzer.tsx`.
- **`src/app/icon.svg`** and the logo mark in `Header.tsx` — swap for EXactREI
  branding.

To do this well: read the EXactREI design system, map its tokens
(colors, fonts, spacing, radii, component styles) onto the token names in
`globals.css`, then adjust component classes where EXactREI differs
structurally (e.g., button shape, card borders). The chart colors in `viz.tsx`
/ `globals.css` (the `--viz-*` variables) should use EXactREI's data-viz or
categorical palette if it has one; keep them colorblind-distinct.

### 3. Rename the web address to deallens.exactrei.com + DNS
- In Netlify, add the **custom domain** `deallens.exactrei.com` to the
  `deallens-rei` site (site ID above).
- Add the **DNS record** wherever `exactrei.com`'s DNS is hosted (Netlify DNS,
  Cloudflare, or the registrar). For a Netlify-hosted site a subdomain is
  normally a **CNAME**: `deallens` → `deallens-rei.netlify.app` (or the
  Netlify-provided target). Netlify will provision HTTPS automatically once DNS
  resolves.
- Optionally rename the `.netlify.app` subdomain too (Netlify → site settings →
  change site name). Note DNS is case-insensitive, so
  `DealLens.EXactREI.com` == `deallens.exactrei.com`.

---

## Rules for the restyle (important)

- **Do NOT touch `src/lib/engine.ts`** or any calculation. The math is verified
  (flip P&L, max-offer solver, NOI/DSCR/cap rate, BRRRR refi, wholesale spread,
  stress-test break-evens, financing methods incl. seller/private-long-term
  hold logic). A restyle is CSS + fonts + component classes ONLY.
- After restyling, re-verify: `npm run lint`, `npm run build`, then click
  through `/`, `/analyze` (change inputs, move stress sliders, switch financing
  methods), `/deals`, `/learn`, and the "Print report" button. Confirm numbers
  still compute and nothing overflows on mobile.
- Keep the accessibility choices in the charts (legend + value labels, not
  color alone).

## House rules carried from the parent project (FYI)
- **Twilio is banned** across Ken's projects — never suggest it for anything.
  (DealLens sends no SMS, so this doesn't affect it, but keep it in mind if you
  add notifications later; approved provider is Telnyx.)

---

*Questions this handoff can't answer are almost always "where is exactrei.com's
DNS hosted?" and "what exactly is in the EXactREI design system?" — both live on
Ken's machine, so whoever finishes this needs Desktop access to that folder.*
