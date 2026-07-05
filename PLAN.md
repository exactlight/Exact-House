# ExactHouse.com Rebuild — Coding Plan (LeadPropeller Parity)

**Business:** Exact House — cash home buyer serving South-Central Wisconsin (based in Lake Mills, WI)
**Goal:** Rebuild exacthouse.com in this repository as a fully-owned, high-converting motivated-seller lead-generation website with feature parity to a LeadPropeller site — then exceed it where cheap to do so.

---

## 1. What "LeadPropeller parity" means

LeadPropeller sites are conversion-optimized "we buy houses" websites. The features that matter, and that this plan replicates:

| # | LeadPropeller feature | Parity target in our build |
|---|----------------------|---------------------------|
| 1 | Two-step lead capture form (short form first, longer follow-up second; lead saved even if step 2 abandoned) | Custom two-step form; step 1 submission persists immediately |
| 2 | Instant SMS + email notification when a seller submits | Serverless function → Twilio SMS + email to Ken on every lead |
| 3 | Built-in basic CRM (leads, notes, statuses, any device) | Lead database + simple password-protected admin dashboard (phased) |
| 4 | Proven default content, editable | All copy in Markdown/structured content files, editable without touching code |
| 5 | High-ranking localized SEO content | City/service-area landing pages, LocalBusiness schema, sitemap, fast Core Web Vitals |
| 6 | Testimonials with YouTube video embeds | Testimonials section + video embed support |
| 7 | Email marketing integration (Mailchimp etc.) + drip autoresponder | Instant seller autoresponder email; provider integration hook |
| 8 | Buyers-list capture (investor/wholesale side) | "Investment opportunities" page with buyer signup form feeding a buyers list |
| 9 | Multiple polished templates, mobile-first | One custom mobile-first design, componentized so restyling is a token change |
| 10 | Thank-you pages / conversion tracking | Dedicated thank-you routes firing GA4 + ad-pixel conversion events |

---

## 2. Recommended tech stack

Chosen for zero platform lock-in (the point of leaving LeadPropeller), low/no monthly cost, and easy deployment:

- **Framework:** Next.js (App Router, TypeScript) — static-first pages for SEO speed, server routes for lead handling.
- **Styling:** Tailwind CSS with a small design-token layer (brand colors, fonts in one file).
- **Hosting:** Netlify (Netlify integration is already connected to this workspace) — deploy previews per branch, forms fallback, serverless functions.
- **Lead storage:** Supabase (Postgres, free tier) — `leads`, `lead_notes`, `buyers` tables. Simple, exportable, no vendor trap.
- **Notifications:** Twilio (SMS to Ken) + Resend (transactional email: Ken notification + seller autoresponder).
- **Content:** MDX/Markdown files in-repo for page copy, testimonials, FAQ, and blog posts (no CMS to start; Decap/Sanity can be added later if Ken wants browser editing).
- **Analytics:** GA4 + Meta Pixel + Google Ads conversion tags via a single analytics component; CallRail-ready phone number component (swappable tracking number).

---

## 3. Site map (pages to build)

```
/                         Home — hero, 2-step form, trust badges, how-it-works teaser, testimonials, service area
/how-it-works             3-step process, "our offers explained", timeline expectations
/about                    Ken's story, photos, local credibility (Lake Mills / South-Central WI)
/testimonials             Reviews + YouTube video embeds
/faq                      Objection-handling FAQ (accordion, FAQPage schema)
/compare                  "Selling to Exact House vs. listing with an agent" table
/sell-your-house-fast/[city]   SEO landing pages: Madison, Lake Mills, Watertown, Fort Atkinson,
                               Jefferson, Sun Prairie, Waterloo, Cambridge, Deerforest… (data-driven, one template)
/situations/[slug]        SEO pages by seller situation: foreclosure, inherited/probate, divorce,
                          landlord-tired, relocation, major-repairs
/investors                Buyers-list / passive-investment page + buyer signup form
/blog + /blog/[slug]      Markdown blog for local SEO content
/get-offer                Full-page offer form (step 2 lives here too)
/thank-you                Post-submission page (conversion event) + "what happens next"
/privacy  /terms          Legal
/admin                    Password-protected lead dashboard (Phase 4)
```

---

## 4. The lead engine (core differentiator)

**Two-step form flow:**
1. **Step 1 (hero, everywhere):** Property address + phone. On submit → `POST /api/leads` → row created in Supabase, SMS + email fire immediately, autoresponder emails the seller. User advances to step 2.
2. **Step 2 (`/get-offer`):** Condition, timeline, reason for selling, asking price, email. `PATCH` the same lead row. Abandoning step 2 loses nothing — step 1 data is already captured (LeadPropeller's key conversion trick).
3. Redirect to `/thank-you` → GA4/pixel conversion events.

**API routes (Next.js route handlers / Netlify functions):**
- `POST /api/leads` — validate (zod), honeypot + rate-limit spam protection, insert lead, dispatch Twilio SMS + Resend emails.
- `PATCH /api/leads/:id` — enrich with step-2 answers.
- `POST /api/buyers` — buyers-list signup.

**Failure safety:** if Twilio/Resend fail, the lead still saves; notification errors are logged and retried — a lost lead is the one unacceptable failure.

---

## 5. Build phases

### Phase 0 — Scaffold (½ day)
- `create-next-app` (TypeScript, App Router, Tailwind), ESLint/Prettier, repo hygiene (README, .env.example).
- Netlify site + deploy pipeline from `main`; environment variables for Twilio/Resend/Supabase.
- Design tokens: Exact House colors, logo, typography; base layout with header (phone number CTA always visible) and footer (NAP: name/address/phone, license/LLC info).

### Phase 1 — Core conversion pages (2–3 days)
- Home page with hero + step-1 form, trust signals, process teaser, testimonials strip, service-area map/list, final CTA.
- `/how-it-works`, `/about`, `/faq`, `/compare`, `/testimonials`, `/privacy`, `/terms`.
- Content written as editable Markdown/config, seeded with proven "we buy houses" copy adapted to Ken's voice and Wisconsin market.
- Mobile-first QA; Lighthouse ≥ 90 on mobile.

### Phase 2 — Lead engine (2 days)
- Supabase schema + API routes above.
- Two-step form with validation, spam defenses, and persistence between steps.
- Twilio SMS to (920) 397-9663, Resend notification to ken@exacthouse.com, seller autoresponder.
- `/thank-you` with conversion events. End-to-end test: submit → SMS/email received → row visible in Supabase.

### Phase 3 — SEO & content expansion (2–3 days)
- City landing-page template + data file (~8–12 South-Central WI cities), unique localized copy blocks per city.
- Situation pages (foreclosure, inherited, divorce, repairs, landlord, relocation).
- Blog scaffold + 3 seed posts.
- Technical SEO: metadata per page, OpenGraph, `sitemap.xml`, `robots.txt`, `LocalBusiness`/`FAQPage`/`Review` JSON-LD schema, canonical URLs.
- GA4 + Meta Pixel wiring; Search Console submission.

### Phase 4 — CRM-lite admin (2 days)
- `/admin` behind auth (Supabase Auth, single user).
- Lead table: status pipeline (New → Contacted → Appointment → Offer → Under Contract → Closed/Dead), notes per lead, click-to-call/text links.
- Buyers-list view + CSV export.
- (Parity checkpoint: this matches LeadPropeller's "basic CRM".)

### Phase 5 — Launch & polish (1 day)
- Accessibility pass, 404 page, favicon/social cards, uptime + form-failure alerting.
- DNS cutover of exacthouse.com to Netlify; 301-map any existing indexed URLs from the old site to their new equivalents (crawl the live site first to capture them).
- Post-launch checklist: submit sitemap, verify conversion events, test SMS on real phone.

**Total estimate: roughly 8–11 working days of build time.**

---

## 6. Parity acceptance checklist

- [ ] Step-1 form submission captures a lead even if the visitor abandons step 2
- [ ] Ken receives SMS + email within seconds of any submission
- [ ] Seller receives an automatic "we got it, here's what's next" email
- [ ] All page copy editable without code changes (Markdown/config)
- [ ] City + situation SEO pages live with structured data, sitemap submitted
- [ ] Testimonials page supports YouTube embeds
- [ ] Buyers-list signup stores investors and is exportable
- [ ] Admin dashboard shows leads with statuses and notes on any device
- [ ] Mobile Lighthouse: Performance/SEO/Accessibility ≥ 90
- [ ] exacthouse.com serves the new site with old URLs redirected

---

## 7. Live-site inventory (discovered via Netlify — governs the rebuild)

The current exacthouse.com (Netlify project `exacthouse`) already implements much
of the LeadPropeller playbook. The rebuild preserves all of it:

- **Two-step flow already live:** `contact` form (name/phone/email/address) →
  `property-details` form (bedrooms, bathrooms, sqft, condition, mortgage-balance,
  asking-price, lowest-price, accept-payoff, timeline, reason, additional-info).
- **City forms:** contact-madison, contact-sun-prairie, contact-watertown,
  contact-fort-atkinson, contact-stoughton, contact-oconomowoc, contact-beaver-dam,
  contact-deforest, contact-waunakee, contact-whitewater (hidden `city` field).
- **Situation forms:** contact-foreclosure, contact-divorce, contact-inherited,
  contact-job-relocation, contact-senior-transition, contact-financial-strain,
  contact-tired-landlord, contact-double-mortgage, contact-repairs,
  contact-tax-liens (hidden `source-page` + `situation` fields).
- **Notifications:** Netlify functions `sms-notification` and `slack-notification`
  are deployed on the live site. Phase 2 must port equivalents into this repo
  (a `submission-created` function) before cutover, since functions ship with the
  site deploy.
- **Form names and field names are load-bearing** — they are kept identical in
  `public/__forms.html` so form history and notification wiring carry over.
- Launch prerequisite: crawl the live site for exact page URLs to build the 301
  redirect map, and port the visual design (blocked from this sandbox — needs
  network access to exacthouse.com, a screenshot from Ken, or the source).

## 8. Post-parity upgrades (beyond LeadPropeller, optional later)

- Instant cash-offer range estimator (address autocomplete + comps API) — stronger hook than any LeadPropeller form
- Drip follow-up sequences for unconverted leads (Resend scheduled sends)
- Google Business Profile review feed on the testimonials page
- A/B testing on hero headline/form copy (Netlify split testing)
- Spanish-language landing page for the Madison market
