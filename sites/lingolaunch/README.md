# LingoLaunch — ESL Classroom Companion

A daily toolkit for an ESL teacher in grades 3–8, designed to be **projected
on the classroom board**: big type, one-click tools, zero logins. All teacher
data (class rosters, custom word lists) lives in the browser's localStorage —
no server, no accounts, works offline once loaded.

## The toolkit

| Tool | What it does in class |
| --- | --- |
| ⭐ **Word of the Day** | A new curated word every day on the dashboard — say it, spell it, use it. |
| 📚 **Word Lists** | 8 built-in grade-band lists (3–5 and 6–8): school, feelings, food, weather, places, academic verbs, idioms, story elements, science. Teachers can build their own lists for any unit. |
| 🃏 **Flashcards** | Flip cards from any list. "Got it" retires a card, "Again" recycles it — with a mastery bar and a celebration when the deck is done. Reversible (word → meaning or meaning → word). |
| 🧩 **Sentence Scramble** | Each word's example sentence gets shuffled into tiles; the class rebuilds it. Teaches word order, capitals, and reading aloud. |
| 🎯 **Vocabulary Bingo** | Print unique 3×3 cards for the class (print-optimized, 2 per page), then project **Caller Mode**: it shows the *definition*, students mark the matching word. Includes a teacher answer key of called words. |
| 🎤 **Speaking Studio** | Record a student speaking sample on camera (chosen from WIDA-style task prompts by grade cluster, or a custom prompt), then score it on the three WIDA speaking criteria — linguistic complexity, vocabulary usage, language control — across levels 1–6, with notes, CSV export, and video download. Videos save to the browser's IndexedDB and never leave the computer. For progress monitoring, not official ACCESS scores. |
| 🎡 **Student Picker** | Dramatic name spinner with **fair mode** — nobody repeats until everyone has had a turn. Uses saved rosters or pasted names. |
| 💬 **Talk Cards** | 24 conversation prompts for pair speaking practice, in **starter** (newcomer) and **stretch** (longer answers) levels. |
| ⏱️ **Class Timer** | A countdown the back row can read, with presets, a progress bar, and a WebAudio chime — no sound files. |
| 🏫 **My Classes** | Paste a roster once (commas or lines); the picker uses it everywhere. |

## Stack

Next.js 16 (App Router, TypeScript) · Tailwind v4 · React 19. Every route is
statically prerendered; all interactivity is client-side.

```bash
npm install
npm run dev     # local dev at localhost:3000
npm run build   # static export -> self-contained out/ folder
npm run lint
```

## Privacy & self-containment

Everything runs in the browser. There is **no server, no database, and no
external network request** — student rosters, scores, and speaking recordings
are stored only on the device (`localStorage` / `IndexedDB`) and are never
uploaded. The build is a fully static export (`output: "export"`), and a
Content Security Policy (`connect-src 'self'`, no external origins) enforces
that no data can be sent off the device.

**For school IT review, see [`PRIVACY-AND-IT.md`](./PRIVACY-AND-IT.md)** — a
one-page fact sheet covering data flow, hosting options (district intranet /
IIS / Apache / Nginx / offline), the FERPA / COPPA / Wisconsin framing, and an
IT review checklist.

## Where things live

- `src/data/wordlists.ts` — the curated word lists and talk prompts.
  Content rules the tools rely on are documented at the top of the file
  (example sentences feed Sentence Scramble; lists need 9+ words for Bingo).
- `src/lib/store.ts` — localStorage persistence (`lingolaunch:*` keys) via
  `useSyncExternalStore`, so it's SSR-safe and syncs across tabs.
- `src/app/*` — one route per tool, all client components.

## Deploying

`npm run build` produces a static `out/` folder that can be hosted on **any**
static web server — a district intranet, IIS, Apache, Nginx, or a
district-managed static host — with no Node.js server, database, or
environment variables. Serve it over **HTTPS** (or `localhost`) so the
browser allows camera access for Speaking Studio.

The included `netlify.toml` (base directory `sites/lingolaunch`, publish
`out`) also deploys it to a Netlify preview and sends the security headers as
real HTTP response headers. See [`PRIVACY-AND-IT.md`](./PRIVACY-AND-IT.md) for
per-host CSP header snippets.
