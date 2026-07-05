# Exact House — exacthouse.com

Rebuild of exacthouse.com as a self-owned Next.js site: the live site's exact
design and copy, plus LeadPropeller-grade lead-generation functionality.

- **[PLAN.md](./PLAN.md)** — the phased coding plan and parity checklist
- **`design-reference/live-site/`** — snapshots of the current live site (design/copy source of truth, and the redirect map source at launch)

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind v4 · Netlify (Forms + Functions)

```bash
npm install
npm run dev     # local dev at localhost:3000
npm run build   # production build (36 static pages)
```

## Lead pipeline

1. **Step 1** — every page's "Get a Cash Offer" form posts to Netlify Forms
   using the same form names as the live site (`contact`, `contact-{city}`,
   `contact-{situation}`). The lead is stored immediately.
2. **Step 2** — the visitor continues to `/details` (form `property-details`).
   Abandoning step 2 loses nothing.
3. **Notifications** — `netlify/functions/submission-created.ts` fires on every
   submission: SMS (Twilio), Slack, email to Ken, and a seller autoresponder
   (Resend). Each channel activates only when its environment variables are
   set — see `.env.example`. Failures are logged, never lose a lead.

### One-time setup on the Netlify site (before launch)

1. Link this repo to the Netlify project (branch → production).
2. Add the environment variables from `.env.example` (Twilio, Slack webhook,
   Resend) under Site configuration → Environment variables.
3. Submit a test lead and confirm the SMS/Slack/email arrive.

**Form names and field names are load-bearing** — they match the live site's
Netlify Forms so submission history and notification wiring carry over. Do not
rename them (see `public/__forms.html`).
