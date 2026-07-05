# Launch Runbook — exacthouse.com cutover

Go-live is gated on ONE thing: Telnyx toll-free verification of
+1 (833) 850-2664 (request `aec344b5-cd5b-5cc0-9f82-e0bd4a3ea7aa`).
Everything else below is DONE and verified.

## Pre-flight (all complete)

- [x] All 23 legacy URLs exist at identical paths on the rebuild (no redirects needed)
- [x] Legacy asset URLs preserved (logo, icons, city photos)
- [x] All 22 Netlify form names/fields identical to the live site
- [x] Lead notifications: SMS (Telnyx) + lead storage (Blobs) + /admin dashboard
- [x] SEO: sitemap, robots, LocalBusiness/FAQ/Article schema, per-page metadata
- [x] TCPA/SMS consent language on every form + /privacy
- [x] Live-site snapshot preserved in design-reference/ (rollback reference)

## When verification clears (automatic)

The scheduled monitor confirms Verified, runs the end-to-end SMS test
(form submission → text on Ken's phone), and reports. Human confirmation
that the text arrived = green light.

## Cutover steps (~10 minutes, done with Ken)

1. **Netlify domain move** — app.netlify.com/projects/exacthouse
   → Domain management → remove `exacthouse.com` (and any www alias).
   Then app.netlify.com/projects/exacthouse-rebuild → Domain management
   → add `exacthouse.com` (+ www).
2. **DNS check** — exacthouse.com is behind Cloudflare. If its DNS record
   points at Netlify's load balancer (apex A record / flattened CNAME),
   the domain move above is sufficient — no DNS change. If it's a CNAME to
   `exacthouse.netlify.app`, update it to `exacthouse-rebuild.netlify.app`
   in the Cloudflare dashboard.
3. **Smoke test on the real domain** — home, one city page, one situation
   page, /details, /privacy, /blog all load; submit one test lead; confirm
   SMS arrives and the lead shows at exacthouse.com/admin.
4. **Search Console** — submit https://exacthouse.com/sitemap.xml.

## Rollback (instant, either of)

- Move the domain back to the `exacthouse` project (reverse of step 1), or
- app.netlify.com/projects/exacthouse/deploys → publish the previous deploy.

## Post-launch cleanup

- [ ] Remove `netlify/functions/telnyx-admin.ts` (temporary setup utility) and redeploy
- [ ] Decide fate of the old `exacthouse` project (keep archived as backup)
- [ ] Set GA4 / Meta Pixel IDs in env when Ken creates them
- [ ] Add real testimonials and Ken's About-page story when provided
- [ ] Later: file 10DLC for a local number only if the 833 number bothers Ken in practice

## Admin dashboard

exacthouse-rebuild.netlify.app/admin (post-launch: exacthouse.com/admin).
Password is in Netlify env `LEADS_ADMIN_PASSWORD`. Leads stored in Netlify
Blobs (`leads` store); statuses: New → Contacted → Appointment → Offer Made
→ Under Contract → Closed/Dead.


---

# Launch Runbook — forwardhomebuyer.com cutover

Rebuild lives in `sites/forwardhomebuyer/`, deployed to the
`forwardhomebuyer-rebuild` Netlify project
(forwardhomebuyer-rebuild.netlify.app).

## Status

- [x] All 36 legacy URLs (27 cities + 9 situations) preserved; QA sweep passes (50 checks)
- [x] Two-step lead flow, dual-writing to Netlify Forms AND the existing
      Supabase notify-web-lead pipeline (unchanged)
- [x] Lead dashboard at /admin (password in Netlify env LEADS_ADMIN_PASSWORD
      on the forwardhomebuyer-rebuild project)
- [x] TCPA consent on all forms + /privacy page (the live site had neither)
- [x] End-to-end verified: form submission -> Netlify Forms -> dashboard
- [ ] TELNYX_API_KEY env var — needed before SMS alerts fire (see below);
      email/dashboard/Supabase channels work without it
- [ ] SMS sender is the shared (833) 850-2664 — fine for notifications to
      Ken; if seller-facing texting is added for this brand, register a
      second toll-free number under the Forward Home Buyer name

## Cutover (same 10-minute procedure as exacthouse)

1. Netlify: remove forwardhomebuyer.com from the `forwardhomebuyer`
   project, add it to `forwardhomebuyer-rebuild` (+ www).
2. DNS check (same note as exacthouse — depends whether the record targets
   Netlify's LB or a site-specific CNAME).
3. Smoke test on the real domain; submit one test lead; confirm it reaches
   the Supabase pipeline, the dashboard, and (once the key is set) SMS.
4. Search Console: submit https://forwardhomebuyer.com/sitemap.xml.

## Rollback

Move the domain back, or publish the previous deploy from the
`forwardhomebuyer` project's deploy history.
