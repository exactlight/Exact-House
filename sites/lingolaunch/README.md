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
npm run build   # production build (10 static routes)
npm run lint
```

## Where things live

- `src/data/wordlists.ts` — the curated word lists and talk prompts.
  Content rules the tools rely on are documented at the top of the file
  (example sentences feed Sentence Scramble; lists need 9+ words for Bingo).
- `src/lib/store.ts` — localStorage persistence (`lingolaunch:*` keys) via
  `useSyncExternalStore`, so it's SSR-safe and syncs across tabs.
- `src/app/*` — one route per tool, all client components.

## Deploying

Standalone Netlify site: point a Netlify project at this repo with the
**base directory** set to `sites/lingolaunch` (build command and plugin are
in `netlify.toml`). No environment variables needed.
