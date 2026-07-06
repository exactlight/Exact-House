"use client";

import { useState } from "react";
import EmojiBurst from "@/components/EmojiBurst";
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

type Side = "term" | "meaning";

export default function FlashcardsPage() {
  const [list, setList] = useState<WordList | null>(null);
  const [deck, setDeck] = useState<Word[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [frontSide, setFrontSide] = useState<Side>("term");
  const [doneCount, setDoneCount] = useState(0);
  const [burstKey, setBurstKey] = useState(0);

  function start(selected: WordList) {
    setList(selected);
    setDeck(shuffle(selected.words));
    setDoneCount(0);
    setFlipped(false);
  }

  function advance(gotIt: boolean) {
    setFlipped(false);
    setDeck((prev) => {
      const [current, ...rest] = prev;
      if (gotIt) {
        if (rest.length === 0) setBurstKey((k) => k + 1);
        return rest;
      }
      return [...rest, current];
    });
    if (gotIt) setDoneCount((n) => n + 1);
  }

  const current = deck[0];
  const total = list?.words.length ?? 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <EmojiBurst burstKey={burstKey} />
      <h1 className="font-display text-4xl font-extrabold">🃏 Flashcards</h1>

      {!list ? (
        <>
          <p className="mt-2 font-semibold text-ink-soft">
            Pick a list, project the card, and let the class answer before you
            flip. &ldquo;Got it&rdquo; retires a card; &ldquo;Again&rdquo;
            sends it to the back of the deck.
          </p>
          <div className="mt-6">
            <ListPicker selectedId={null} onSelect={start} minWords={2} />
          </div>
        </>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setList(null)}
              className="rounded-full bg-ink/10 px-4 py-1.5 text-sm font-bold hover:bg-ink/20"
            >
              ← Change list
            </button>
            <button
              type="button"
              onClick={() => {
                setFrontSide((s) => (s === "term" ? "meaning" : "term"));
                setFlipped(false);
              }}
              className="rounded-full bg-sky-100 px-4 py-1.5 text-sm font-bold text-sky-600 hover:bg-sky-500 hover:text-white"
            >
              Front: {frontSide === "term" ? "word → meaning" : "meaning → word"}
            </button>
            <span className="ml-auto rounded-full bg-teal-100 px-4 py-1.5 text-sm font-black text-teal-700">
              {doneCount} / {total} mastered
            </span>
          </div>

          <div className="mx-auto mt-3 h-3 max-w-xl overflow-hidden rounded-full bg-ink/10">
            <div
              className="h-full rounded-full bg-teal-500 transition-all duration-500"
              style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }}
            />
          </div>

          {current ? (
            <div className="mt-8 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                className="perspective-1000 block w-full max-w-2xl cursor-pointer"
                aria-label={flipped ? "Show front of card" : "Flip card"}
              >
                <div
                  className={`preserve-3d relative h-80 w-full transition-transform duration-500 ${
                    flipped ? "rotate-y-180" : ""
                  }`}
                >
                  <CardFace side={frontSide} word={current} />
                  <CardFace
                    side={frontSide === "term" ? "meaning" : "term"}
                    word={current}
                    back
                  />
                </div>
              </button>
              <p className="mt-3 text-sm font-bold text-ink-soft">
                Click the card to flip · {deck.length} left in this round
              </p>

              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => advance(false)}
                  className="rounded-2xl bg-sun-400 px-8 py-4 font-display text-2xl font-extrabold text-ink shadow-pop-lg transition-transform hover:-translate-y-1"
                >
                  🔁 Again
                </button>
                <button
                  type="button"
                  onClick={() => advance(true)}
                  className="rounded-2xl bg-teal-500 px-8 py-4 font-display text-2xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1"
                >
                  ✅ Got it!
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border-4 border-teal-500/40 bg-teal-100 p-10 text-center">
              <p className="text-6xl" aria-hidden>
                🏆
              </p>
              <h2 className="mt-3 font-display text-4xl font-extrabold">
                Deck mastered!
              </h2>
              <p className="mt-2 text-lg font-semibold text-ink-soft">
                Every card in {list.name} got a &ldquo;Got it.&rdquo;
              </p>
              <button
                type="button"
                onClick={() => start(list)}
                className="mt-6 rounded-2xl bg-teal-500 px-8 py-4 font-display text-xl font-extrabold text-white shadow-pop-lg"
              >
                Shuffle &amp; go again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CardFace({
  side,
  word,
  back = false,
}: {
  side: Side;
  word: Word;
  back?: boolean;
}) {
  return (
    <div
      className={`backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-4 p-8 text-center shadow-pop-lg ${
        back ? "rotate-y-180 border-grape-500/40 bg-grape-100" : "border-ink/10 bg-paper"
      }`}
    >
      {side === "term" ? (
        <>
          <span className="text-6xl" aria-hidden>
            {word.emoji}
          </span>
          <span className="mt-4 font-display text-6xl font-extrabold text-teal-600">
            {word.term}
          </span>
          <span className="mt-2 text-lg font-bold text-ink-soft">{word.pos}</span>
        </>
      ) : (
        <>
          <span className="text-3xl font-bold">{word.definition}</span>
          <span className="mt-4 text-xl italic text-ink-soft">
            &ldquo;{word.example}&rdquo;
          </span>
        </>
      )}
    </div>
  );
}
