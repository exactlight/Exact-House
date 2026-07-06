"use client";

import Link from "next/link";
import { wordOfTheDay, type Word, type WordList } from "@/data/wordlists";
import { useHydrated } from "@/lib/store";

/* Cached per calendar day so re-renders reuse the same object. */
let cachedDay: { key: number; value: { word: Word; list: WordList } } | null =
  null;
function getTodaysWord(): { word: Word; list: WordList } {
  const key = Math.floor(Date.now() / 86_400_000);
  if (!cachedDay || cachedDay.key !== key) {
    cachedDay = { key, value: wordOfTheDay(new Date()) };
  }
  return cachedDay.value;
}

const tools = [
  {
    href: "/flashcards",
    emoji: "🃏",
    name: "Flashcards",
    blurb: "Flip through any word list — students shout the word before you flip.",
    color: "bg-teal-100",
  },
  {
    href: "/scramble",
    emoji: "🧩",
    name: "Sentence Scramble",
    blurb: "Rebuild mixed-up sentences as a class. Instant celebration when it's right.",
    color: "bg-grape-100",
  },
  {
    href: "/bingo",
    emoji: "🎯",
    name: "Vocabulary Bingo",
    blurb: "Print unique cards for the class, then call definitions from the board.",
    color: "bg-coral-100",
  },
  {
    href: "/picker",
    emoji: "🎡",
    name: "Student Picker",
    blurb: "Fair, dramatic, and giggle-proof: pick who answers next.",
    color: "bg-sun-100",
  },
  {
    href: "/speaking",
    emoji: "🎤",
    name: "Speaking Studio",
    blurb: "Record speaking samples and score them on the WIDA rubric — videos stay on this computer.",
    color: "bg-sun-100",
  },
  {
    href: "/prompts",
    emoji: "💬",
    name: "Talk Cards",
    blurb: "Conversation starters for pair practice — starter and stretch levels.",
    color: "bg-sky-100",
  },
  {
    href: "/timer",
    emoji: "⏱️",
    name: "Class Timer",
    blurb: "A giant countdown the back row can read, with a friendly chime.",
    color: "bg-teal-100",
  },
  {
    href: "/words",
    emoji: "📚",
    name: "Word Lists",
    blurb: "Eight curated grade-band lists, plus build your own for any unit.",
    color: "bg-grape-100",
  },
  {
    href: "/classes",
    emoji: "🏫",
    name: "My Classes",
    blurb: "Set up rosters once — the picker and games use them everywhere.",
    color: "bg-coral-100",
  },
];

export default function Dashboard() {
  // Word of the Day depends on the viewer's clock, so it only renders
  // after hydration — the page is statically built and must not bake in
  // a date.
  const hydrated = useHydrated();
  const today = hydrated ? getTodaysWord() : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10 text-center">
        <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
          Ready for today?
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold text-ink-soft">
          Everything here is made to be projected on your board — big type,
          one click, no logins. Your classes and lists save in this browser.
        </p>
      </section>

      <section className="mb-12">
        <div className="rounded-3xl border-4 border-ink/10 bg-paper p-8 shadow-pop-lg sm:p-10">
          <p className="text-sm font-black uppercase tracking-widest text-coral-500">
            ⭐ Word of the Day
          </p>
          {today ? (
            <div className="mt-4 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="text-7xl" aria-hidden>
                {today.word.emoji}
              </div>
              <div>
                <h2 className="font-display text-5xl font-extrabold text-teal-600">
                  {today.word.term}
                  <span className="ml-3 align-middle text-base font-bold text-ink-soft">
                    {today.word.pos}
                  </span>
                </h2>
                <p className="mt-2 text-2xl font-semibold">{today.word.definition}</p>
                <p className="mt-2 text-lg italic text-ink-soft">
                  &ldquo;{today.word.example}&rdquo;
                </p>
                <p className="mt-3 text-sm font-bold text-ink-soft">
                  From {today.list.emoji} {today.list.name} · Try it: say it,
                  spell it, use it in your own sentence.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 h-40 animate-pulse rounded-2xl bg-cream" />
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-3xl font-extrabold">Your toolkit</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group rounded-3xl border-4 border-ink/10 ${tool.color} p-6 shadow-pop transition-transform hover:-translate-y-1`}
            >
              <div className="text-5xl transition-transform group-hover:scale-110" aria-hidden>
                {tool.emoji}
              </div>
              <h3 className="mt-3 font-display text-2xl font-extrabold">{tool.name}</h3>
              <p className="mt-1 text-sm font-semibold text-ink-soft">{tool.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
