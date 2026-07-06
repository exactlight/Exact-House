"use client";

import { useState } from "react";
import ListPicker from "@/components/ListPicker";
import type { Word, WordList } from "@/data/wordlists";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* A 3×3 card: 8 random words around a FREE center square. */
type Card = (Word | null)[];

function makeCard(words: Word[]): Card {
  const picks = shuffle(words).slice(0, 8);
  return [...picks.slice(0, 4), null, ...picks.slice(4, 8)];
}

export default function BingoPage() {
  const [list, setList] = useState<WordList | null>(null);
  const [cardCount, setCardCount] = useState(8);
  const [cards, setCards] = useState<Card[]>([]);
  const [callOrder, setCallOrder] = useState<Word[]>([]);
  const [callIndex, setCallIndex] = useState(0);
  const [mode, setMode] = useState<"setup" | "cards" | "caller">("setup");

  function generate() {
    if (!list) return;
    setCards(Array.from({ length: cardCount }, () => makeCard(list.words)));
    setMode("cards");
  }

  function startCaller() {
    if (!list) return;
    setCallOrder(shuffle(list.words));
    setCallIndex(0);
    setMode("caller");
  }

  const called = callOrder.slice(0, callIndex + 1);
  const currentCall = callOrder[callIndex];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="print-hidden">
        <h1 className="font-display text-4xl font-extrabold">🎯 Vocabulary Bingo</h1>
        <p className="mt-2 font-semibold text-ink-soft">
          Print a unique card for each student, then project Caller Mode: it
          shows the <em>definition</em> — students mark the matching word.
        </p>

        <div className="mt-6">
          <ListPicker
            selectedId={list?.id ?? null}
            onSelect={(selected) => {
              setList(selected);
              setMode("setup");
            }}
            minWords={9}
          />
        </div>

        {list && (
          <div className="mt-6 flex flex-wrap items-center gap-4 rounded-3xl border-4 border-ink/10 bg-paper p-5 shadow-pop">
            <label className="flex items-center gap-3 font-bold">
              Cards to print
              <input
                type="number"
                min={1}
                max={40}
                value={cardCount}
                onChange={(e) =>
                  setCardCount(
                    Math.max(1, Math.min(40, Number(e.target.value) || 1)),
                  )
                }
                className="w-20 rounded-xl border-2 border-ink/15 bg-cream px-3 py-2 text-center font-bold outline-none focus:border-teal-500"
              />
            </label>
            <button
              type="button"
              onClick={generate}
              className="rounded-2xl bg-coral-500 px-6 py-3 font-display text-lg font-bold text-white shadow-pop transition-transform hover:-translate-y-0.5"
            >
              Make cards
            </button>
            <button
              type="button"
              onClick={startCaller}
              className="rounded-2xl bg-grape-500 px-6 py-3 font-display text-lg font-bold text-white shadow-pop transition-transform hover:-translate-y-0.5"
            >
              📢 Caller mode
            </button>
            {mode === "cards" && cards.length > 0 && (
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-2xl bg-teal-500 px-6 py-3 font-display text-lg font-bold text-white shadow-pop transition-transform hover:-translate-y-0.5"
              >
                🖨️ Print {cards.length} cards
              </button>
            )}
          </div>
        )}
      </div>

      {mode === "cards" && list && cards.length > 0 && (
        <div className="mt-8 grid gap-8 print:mt-0 sm:grid-cols-2 print:block">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`print-card rounded-3xl border-4 border-ink/20 bg-paper p-5 ${
                i % 2 === 1 ? "print-page" : ""
              }`}
            >
              <div className="mb-3 flex items-baseline justify-between">
                <p className="font-display text-xl font-extrabold">
                  {list.emoji} {list.name} Bingo
                </p>
                <p className="text-sm font-bold text-ink-soft">
                  Name: ______________
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {card.map((word, j) =>
                  word === null ? (
                    <div
                      key={j}
                      className="flex aspect-square items-center justify-center rounded-xl bg-sun-100 text-center font-display text-xl font-extrabold"
                    >
                      ⭐ FREE
                    </div>
                  ) : (
                    <div
                      key={j}
                      className="flex aspect-square items-center justify-center rounded-xl border-2 border-ink/15 p-1 text-center font-bold leading-tight"
                    >
                      {word.term}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {mode === "caller" && currentCall && (
        <div className="print-hidden mt-8">
          <div className="rounded-3xl border-4 border-grape-500/40 bg-paper p-10 text-center shadow-pop-lg">
            <p className="text-sm font-black uppercase tracking-widest text-grape-600">
              Call #{callIndex + 1} of {callOrder.length} — find the word that means…
            </p>
            <p className="mt-6 font-display text-5xl font-extrabold leading-tight">
              &ldquo;{currentCall.definition}&rdquo;
            </p>
            <button
              type="button"
              onClick={() =>
                setCallIndex((i) => Math.min(i + 1, callOrder.length - 1))
              }
              disabled={callIndex >= callOrder.length - 1}
              className="mt-8 rounded-2xl bg-grape-500 px-8 py-4 font-display text-2xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1 disabled:opacity-40"
            >
              {callIndex >= callOrder.length - 1 ? "All words called!" : "Next call →"}
            </button>
          </div>

          <div className="mt-6 rounded-3xl border-4 border-ink/10 bg-cream p-5">
            <p className="text-sm font-black uppercase tracking-wide text-ink-soft">
              Teacher answer key — called so far
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {called.map((word) => (
                <span
                  key={word.term}
                  className="rounded-full bg-paper px-3 py-1 text-sm font-bold"
                >
                  {word.emoji} {word.term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
