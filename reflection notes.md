# Reflection notes — Claude Code / Cowork setup review

Date: 2026-07-06 · Prepared in session `session_01CmWFdymc6WdpkSCNsAPAch` (branch `claude/setup-leverage-analysis-s8nfpx`)
Diagnostic only — nothing was built or changed. Each cluster below has a verdict (skill / automation / fix / nothing) weighing recurrence against build cost.

## Data & method (read this first)

Raw session transcripts do **not** persist in the remote-execution containers, so three subagents mined the durable proxies instead:

1. **Git history** of `origin/claude/exacthouse-parity-plan-nap41y` — 19 commits, every one stamped with the same trailer `Claude-Session: session_01P4pXHcXzWHbQxo1K6swbLj`. One continuous ~23-hour session (Jul 4 23:29 UTC → Jul 5 22:21 UTC) in 5 work bursts built the entire repo: exacthouse.com rebuild Phases 0–4 **and** the whole `sites/forwardhomebuyer` second site.
2. **Repo docs and scripts** — AGENTS.md standing rules, LAUNCH.md runbooks, PLAN.md, README.md, `scripts/qa-check.mjs`, `scripts/deploy.sh`, Netlify functions. Standing rules and runbook checkboxes are fossils of in-session friction.
3. **GitHub activity record** — zero PRs, zero issues, zero CI workflows, zero human commits. The `claude/exacthouse-parity-plan-nap41y` branch *is* the default branch.

**Honest caveat on sample size:** almost all evidence traces to one mega-session plus this one. "Recurrence" below is measured within that session (same mistake at different times), across the two sites (same work done twice), and against runbook steps that are scheduled to repeat (FHB launch is still pending). No Cowork-side transcripts survived at all — the connector inventory (Gmail, Calendar, Slack, Drive, Netlify, Calendly) is visible but there's no evidence of what's used or where it hurts, so no Cowork proposals are made this round.

---

## Ranked clusters — most leverage first

### 1. Deploys are ungated — wire QA into the deploy path
**Verdict: automation.** Build cost: low (an hour). Frequency: every deploy, both sites, forever.

- `scripts/deploy.sh` zips and uploads to Netlify's build API and polls, but never runs `scripts/qa-check.mjs`; nothing gates a deploy (deploy.sh, qa-check.mjs invoked manually per LAUNCH.md:70).
- A real runtime failure shipped and was caught only after deploy: Netlify Blobs threw `MissingBlobsEnvironmentError` in production 4 minutes after commit `32e3970`; hotfixed in `8bb77ca` ("Convert lead functions to Functions 2.0 API").
- No CI exists (`actions_list` → 0 workflows), no tests, no `test` script in either package.json. The repo's own prime directive — "nothing here can lose a lead" (submission-created.ts:8-10, PLAN.md:76) — currently has no automated guard.
- Cheapest version: deploy.sh runs qa-check against the fresh deploy URL and fails loudly. Fuller version: a minimal GitHub Actions workflow (lint + build + qa-check on deploy previews). Given deploys are MCP-driven from sessions rather than push-triggered, the deploy.sh hook is the right first move.

### 2. Sandbox network policy caused the two biggest rework loops — fix the environment, retire the relay
**Verdict: fix** (environment config + security cleanup). Build cost: low. Cost of not fixing: the two largest reworks on record.

- **Rework #1 (~15,000 lines):** Phase 1 (`9b6a7b2`, 03:22) was built blind — wrong URL structure, wrong phone number — because the live site couldn't be reached. 33 minutes later `5e4b041` deleted and rebuilt nearly everything once "network access now allowed" (its own commit message).
- **Rework #2 (relay function + 3 patch rounds):** `netlify/functions/telnyx-admin.ts` exists *only* because "the dev sandbox... cannot reach api.telnyx.com directly" (telnyx-admin.ts:6-8). Its path allowlist was widened three times as real calls hit the guard (`6f1c1aa` → `93106fd` → `95b5999`).
- **Security tail:** telnyx-admin.ts:11 has a hardcoded `ADMIN_TOKEN` committed to the repo, guarding a live relay to your Telnyx account (can reach `/v2/api_keys`). Its removal is an open LAUNCH.md checkbox (line 46). Remove the function, rotate the token's assumption of secrecy.
- Smaller echo: Node fetch ignoring `HTTPS_PROXY` in the sandbox forced an undici ProxyAgent shim into both qa-check copies (`8bb77ca`, qa-check.mjs:9-14).
- The fix is configuration, not code: set the CCR environment's network policy to allow `api.telnyx.com`, `exacthouse.com`, `forwardhomebuyer` origins and `*.netlify.app` before the next session that needs them.

### 3. Docs actively contradict the standing rules — truth sweep + commit `.env.example`
**Verdict: fix.** Build cost: trivial (~30 min). Cost of not fixing: a future session following README will violate the Twilio ban.

- README.md:27-34 and PLAN.md (lines 15, 35, 72, 76, 84, 96) still describe the **Twilio + Slack** pipeline that AGENTS.md bans outright and `6f1c1aa` deleted. PLAN.md also carries the wrong phone number that `5e4b041` corrected in code.
- README.md:29,34 instructs the operator to copy env vars from `.env.example` — **the file does not exist**. Two commit messages (`b6f9bc7`, `16c03a3`) claim it was added; `.gitignore`'s `.env*` pattern silently swallowed it both times. Add it with a `!.env.example` exception, listing the real contract: `TELNYX_API_KEY`, `TELNYX_FROM_NUMBER`, `LEAD_NOTIFY_SMS_TO`, `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `LEAD_NOTIFY_EMAIL_TO`, `LEADS_ADMIN_PASSWORD`, `NEXT_PUBLIC_GA`, `NEXT_PUBLIC_META_PIXEL_ID`.
- AGENTS.md is the only doc that moved on after the Telnyx pivot; README and PLAN were left behind. Fresh sessions read all three.

### 4. Two-site duplication — the multi-brand stamping pattern is real and already biting
**Verdict: skill now (`new-brand-site`), shared-code refactor later.** Skill build cost: low-medium. Refactor: medium-high, defer until brand #3 is real. Recurrence: 2 occurrences, with cross-site drift bugs already observed.

- `sites/forwardhomebuyer` landed as a single 20,248-insertion commit (`1943996`) cloned from the root app: 9 of 14 shared components **byte-identical** (AdminDashboard differs by 4 lines of 271), `admin-leads.ts` byte-identical, `submission-created.ts` differs in 5 brand strings out of 177 lines, full toolchain duplicated (second package-lock, netlify.toml, `__forms.html` hand-mirror, qa-check).
- Clone mistakes already recurred: the FHB qa-check shipped as a **verbatim exacthouse copy** (wrong origin, wrong city list, checks a `/blog` FHB doesn't have) and was rewritten 6 minutes later (`95b5999`, 43 of 58 lines changed). The image-optimization lesson from site 1 (`d863d5c`: 7.6MB→140KB) was **not** carried to site 2 — `sites/forwardhomebuyer/public/logo.png` sits at 433KB unoptimized today.
- A skill should encode the stamping checklist: what to parameterize (brand, phone, domain, cities, situations, Netlify site-id), what always gets forgotten (image optimization, qa-check lists, `__forms.html` field parity, per-project env vars, LAUNCH.md runbook section), and the reminder that every edit to a byte-identical file must land in both trees until the refactor happens.

### 5. Launch cutover ran twice by hand and will run again — capture it as a skill
**Verdict: skill (`launch-cutover`).** Build cost: low — LAUNCH.md is already 80% of the skill. Recurrence: executed for exacthouse, pending for FHB (still gated on `TELNYX_API_KEY` + toll-free number, LAUNCH.md:77-81), and repeats on any future brand.

- LAUNCH.md holds two parallel runbooks; the FHB section literally says "same 10-minute procedure as exacthouse" (LAUNCH.md:83). Steps: Netlify domain move, Cloudflare DNS check, real-phone smoke test, Search Console sitemap, per-project env vars, rollback path (LAUNCH.md:25-42, 85-96).
- A skill turns a prose runbook into a driven checklist with the Netlify MCP doing the project-side steps and the human loop ("text arrived on Ken's phone = green light", LAUNCH.md:20-21) kept explicit. Post-launch cleanup items (remove telnyx-admin, GA4/Pixel env) belong in it too — they're currently open checkboxes that nothing will revisit.

### 6. Netlify platform gotchas hit four times in one session — record them where every session reads
**Verdict: fix (AGENTS.md section, not a skill).** Build cost: trivial. Recurrence: 4 distinct gotchas in one session; every future Netlify change re-risks them.

- Env-var API rejects `SLACK_WEBHOOK_URL` as a key name (`7d89f07`); Blobs requires Functions 2.0 handler signature (`8bb77ca`); Netlify Forms needs the static `__forms.html` mirror and **form/field names are load-bearing** (PLAN.md:155-157, README.md:38-40); sandbox proxy breaks Node's built-in fetch (`8bb77ca`).
- These are one paragraph each in AGENTS.md — the doc already proved (Twilio rule) that standing rules there actually change behavior in later sessions.

### 7. Session bootstrap — no project settings, no SessionStart hook
**Verdict: fix.** Build cost: trivial (run `/fewer-permission-prompts` and the `session-start-hook` skill once). Recurrence: every session pays it.

- The repo has no `.claude/settings.json` (no permission allowlist → repeated prompts) and no SessionStart hook (web sessions can't lint/build until someone runs `npm install` by hand — in a repo with two package trees).

### 8. Toll-free verification babysitting — borderline skill, flag but defer
**Verdict: skill, weakly held — only if brand #3 materializes.** Recurrence so far: 1 completed (exacthouse, request `aec344b5-…`), 1 explicitly required next ("register a second toll-free number under the Forward Home Buyer name", LAUNCH.md:79-81).

- The workflow is real and fiddly: purchase number, messaging profile, TFV filing with consent screenshot (`f669e94`), scheduled monitor polling status, E2E SMS test (LAUNCH.md:3-21). But it runs once per brand, and the cluster-2 network fix changes how it would be driven (direct API instead of the relay). Two data points, one pending — write it down when the FHB number gets registered, while the steps are fresh.

### 9. Vendor decisions surfaced too late — generalize the standing rule
**Verdict: fix (one paragraph in AGENTS.md).** Build cost: trivial.

- The Twilio/Slack reversal cost ~9 hours of built-then-deleted work: Twilio+Slack notifications built at 04:02 (`16c03a3`), Slack env workaround at 11:48 (`7d89f07`), ban recorded 12:03 (`8f75628`), all of it deleted 12:49 (`6f1a1aa`→`6f1c1aa`). The preference existed before the session; it surfaced only after two rounds of implementation.
- The specific rule now exists (Twilio banned, Telnyx approved, SMS-not-Slack, "present true all-in costs before any signup" — AGENTS.md:1-16), so *this* one won't recur. The generalization worth adding: **confirm any new third-party vendor/channel with Ken before writing integration code**, and keep an "approved vendors" list (Telnyx, Resend, Netlify, Supabase) in AGENTS.md.

### 10. No action (explicitly considered, declined)
- **Repo/branch shape** — everything lives on one `claude/*` branch that is the default; no PRs or issues. For a solo founder shipping via MCP deploys, PR ceremony adds cost without a reviewer. Revisit only if a second human joins. (Evidence: GitHub record — 0 PRs, 0 issues, default branch = `claude/exacthouse-parity-plan-nap41y`.)
- **Blog-writing skill** — 3 seed posts exist (content/blog/), all from one session (`72e2bd4`/Phase 3). One session ≠ recurrence; the format is plain front-matter markdown that needs no scaffolding. Watch: if posts become a cadence, revisit.
- **Cowork/connector proposals** — no transcript evidence survived; proposing skills against Gmail/Calendar/Slack/Calendly usage would be guessing. Re-run this reflection from a device where Cowork transcripts persist if that side matters.

---

## Evidence index

| # | Cluster | Verdict | Key evidence | Sessions |
|---|---------|---------|--------------|----------|
| 1 | Ungated deploys | automation | `8bb77ca` prod hotfix; deploy.sh; 0 CI workflows | 01P4pXHc… |
| 2 | Sandbox network / telnyx relay | fix | `5e4b041` 15k-line rework; telnyx-admin.ts:6-11; `93106fd`, `95b5999` | 01P4pXHc… |
| 3 | Stale docs / missing .env.example | fix | README.md:27-34; PLAN.md:35,72,96; `.gitignore` `.env*` | 01P4pXHc… |
| 4 | Two-site duplication | skill + later refactor | `1943996` (20,248 ins.); byte-identical files; FHB logo 433KB; `95b5999` qa rewrite | 01P4pXHc… |
| 5 | Launch cutover | skill | LAUNCH.md:25-42, 83-96 (run 2×, 3rd pending) | 01P4pXHc… |
| 6 | Netlify gotchas | fix (AGENTS.md) | `7d89f07`, `8bb77ca`, PLAN.md:155-157 | 01P4pXHc… |
| 7 | Session bootstrap | fix | no `.claude/settings.json`, no SessionStart hook | all sessions |
| 8 | Toll-free verification | skill (defer) | LAUNCH.md:3-21, 79-81; `f669e94` | 01P4pXHc… |
| 9 | Late vendor reversal | fix (rule) | `16c03a3`→`8f75628`→`6f1c1aa` (~9h discarded) | 01P4pXHc… |
| 10 | Branch shape / blog / Cowork | nothing | GitHub record; content/blog/ | — |
