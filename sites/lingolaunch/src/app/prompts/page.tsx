"use client";

import { useState } from "react";
import { talkPrompts, type TalkPrompt } from "@/data/wordlists";

type LevelFilter = "all" | "starter" | "stretch";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function PromptsPage() {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [deck, setDeck] = useState<TalkPrompt[]>([]);
  const [drawn, setDrawn] = useState<TalkPrompt | null>(null);

  function filtered(nextLevel: LevelFilter) {
    return talkPrompts.filter((p) => nextLevel === "all" || p.level === nextLevel);
  }

  function draw() {
    let pool = deck;
    if (pool.length === 0) pool = shuffle(filtered(level));
    const [next, ...rest] = pool;
    setDrawn(next);
    setDeck(rest);
  }

  function changeLevel(next: LevelFilter) {
    setLevel(next);
    setDeck([]);
    setDrawn(null);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">💬 Talk Cards</h1>
      <p className="mt-2 font-semibold text-ink-soft">
        Project a card, give pairs one minute each to answer, then swap.
        Starter cards suit newcomers; stretch cards push for longer answers.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["all", "🃏 All cards"],
            ["starter", "🌱 Starter"],
            ["stretch", "🚀 Stretch"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => changeLevel(value)}
            className={`rounded-2xl border-2 px-4 py-2 font-bold shadow-pop transition-all ${
              level === value
                ? "border-sky-600 bg-sky-500 text-white"
                : "border-ink/15 bg-paper hover:-translate-y-0.5"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-3xl border-4 border-ink/10 bg-paper p-10 text-center shadow-pop-lg">
        {drawn ? (
          <>
            <span className="text-6xl" aria-hidden>
              {drawn.emoji}
            </span>
            <p className="mt-5 font-display text-4xl font-extrabold leading-snug">
              {drawn.text}
            </p>
            <span
              className={`mt-5 rounded-full px-4 py-1 text-sm font-black uppercase tracking-wide ${
                drawn.level === "starter"
                  ? "bg-teal-100 text-teal-700"
                  : "bg-grape-100 text-grape-600"
              }`}
            >
              {drawn.level === "starter" ? "🌱 starter" : "🚀 stretch"}
            </span>
          </>
        ) : (
          <p className="text-2xl font-bold text-ink-soft">
            {filtered(level).length} cards ready. Draw one!
          </p>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={draw}
          className="rounded-2xl bg-sky-500 px-10 py-5 font-display text-3xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1"
        >
          {drawn ? "Next card →" : "🎴 Draw a card"}
        </button>
        {drawn && (
          <p className="mt-3 text-sm font-semibold text-ink-soft">
            {deck.length} cards left before the deck reshuffles
          </p>
        )}
      </div>

      <details className="mt-10">
        <summary className="cursor-pointer font-display text-xl font-extrabold">
          Browse all {talkPrompts.length} cards
        </summary>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {talkPrompts.map((prompt) => (
            <li
              key={prompt.text}
              className="rounded-2xl border-2 border-ink/10 bg-paper p-4 font-semibold"
            >
              <span aria-hidden className="mr-2">
                {prompt.emoji}
              </span>
              {prompt.text}
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-xs font-black ${
                  prompt.level === "starter"
                    ? "bg-teal-100 text-teal-700"
                    : "bg-grape-100 text-grape-600"
                }`}
              >
                {prompt.level}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
