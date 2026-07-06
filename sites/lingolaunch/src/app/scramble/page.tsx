"use client";

import { useState } from "react";
import EmojiBurst from "@/components/EmojiBurst";
import ListPicker from "@/components/ListPicker";
import type { Word, WordList } from "@/data/wordlists";

type Tile = { id: number; text: string };

function scrambleTiles(sentence: string): Tile[] {
  const tiles = sentence.split(" ").map((text, id) => ({ id, text }));
  if (tiles.length < 2) return tiles;
  let shuffled = tiles;
  // Reshuffle until the tiles aren't accidentally in the right order.
  do {
    shuffled = [...tiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  } while (shuffled.every((tile, i) => tile.id === tiles[i].id));
  return shuffled;
}

export default function ScramblePage() {
  const [list, setList] = useState<WordList | null>(null);
  const [remaining, setRemaining] = useState<Word[]>([]);
  const [pool, setPool] = useState<Tile[]>([]);
  const [answer, setAnswer] = useState<Tile[]>([]);
  const [status, setStatus] = useState<"building" | "wrong" | "solved">("building");
  const [solvedCount, setSolvedCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const current = remaining[0];

  function start(selected: WordList) {
    const shuffledWords = [...selected.words].sort(() => Math.random() - 0.5);
    setList(selected);
    setRemaining(shuffledWords);
    setSolvedCount(0);
    loadRound(shuffledWords[0]);
  }

  function loadRound(word: Word | undefined) {
    setAnswer([]);
    setStatus("building");
    setShowHint(false);
    setPool(word ? scrambleTiles(word.example) : []);
  }

  function pickTile(tile: Tile) {
    if (status === "solved") return;
    const next = [...answer, tile];
    setStatus("building");
    setPool((prev) => prev.filter((t) => t.id !== tile.id));
    setAnswer(next);
    if (current && next.length === current.example.split(" ").length) {
      checkAnswer(next);
    }
  }

  function returnTile(tile: Tile) {
    if (status === "solved") return;
    setStatus("building");
    setAnswer((prev) => prev.filter((t) => t.id !== tile.id));
    setPool((prev) => [...prev, tile]);
  }

  function checkAnswer(tiles: Tile[]) {
    if (!current) return;
    const built = tiles.map((t) => t.text).join(" ");
    if (built === current.example) {
      setStatus("solved");
      setSolvedCount((n) => n + 1);
      setBurstKey((k) => k + 1);
    } else {
      setStatus("wrong");
    }
  }

  function nextRound() {
    const rest = remaining.slice(1);
    setRemaining(rest);
    loadRound(rest[0]);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <EmojiBurst burstKey={burstKey} />
      <h1 className="font-display text-4xl font-extrabold">🧩 Sentence Scramble</h1>

      {!list ? (
        <>
          <p className="mt-2 font-semibold text-ink-soft">
            The example sentence from each word gets mixed up — the class
            rebuilds it by clicking the tiles in order. Great for word order,
            capitals, and reading aloud.
          </p>
          <div className="mt-6">
            <ListPicker selectedId={null} onSelect={start} minWords={2} />
          </div>
        </>
      ) : current ? (
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
              onClick={() => setShowHint((h) => !h)}
              className="rounded-full bg-sun-100 px-4 py-1.5 text-sm font-bold text-ink hover:bg-sun-400"
            >
              💡 {showHint ? "Hide hint" : "Hint"}
            </button>
            <span className="ml-auto rounded-full bg-grape-100 px-4 py-1.5 text-sm font-black text-grape-600">
              Solved {solvedCount} / {list.words.length}
            </span>
          </div>

          <div className="mt-6 rounded-3xl border-4 border-ink/10 bg-paper p-6 text-center shadow-pop">
            <p className="text-sm font-black uppercase tracking-widest text-ink-soft">
              Mystery word
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold text-grape-600">
              {current.emoji} {current.term}
            </p>
            {showHint && (
              <p className="mt-2 text-lg font-semibold text-ink-soft">
                {current.definition}
              </p>
            )}
          </div>

          {/* Answer row */}
          <div
            className={`mt-6 flex min-h-24 flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed p-4 ${
              status === "wrong"
                ? "animate-wiggle border-coral-500 bg-coral-100"
                : status === "solved"
                  ? "border-teal-500 bg-teal-100"
                  : "border-ink/20 bg-cream"
            }`}
          >
            {answer.length === 0 ? (
              <p className="font-semibold text-ink-soft">
                Click the tiles below to build the sentence here
              </p>
            ) : (
              answer.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => returnTile(tile)}
                  className="rounded-xl bg-paper px-4 py-2.5 font-display text-2xl font-bold shadow-pop transition-transform hover:-translate-y-0.5"
                >
                  {tile.text}
                </button>
              ))
            )}
          </div>
          {status === "wrong" && (
            <p className="mt-2 text-center font-bold text-coral-600">
              Not quite — click a word to send it back and try a new order!
            </p>
          )}

          {/* Tile pool */}
          {status !== "solved" && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {pool.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => pickTile(tile)}
                  className="rounded-xl border-2 border-ink/15 bg-sun-100 px-5 py-3 font-display text-2xl font-bold shadow-pop transition-transform hover:-translate-y-1 hover:bg-sun-400"
                >
                  {tile.text}
                </button>
              ))}
            </div>
          )}

          {status === "solved" && (
            <div className="mt-6 text-center">
              <p className="font-display text-3xl font-extrabold text-teal-600">
                🎉 Perfect! Read it out loud together.
              </p>
              <button
                type="button"
                onClick={nextRound}
                className="mt-4 rounded-2xl bg-teal-500 px-8 py-4 font-display text-2xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1"
              >
                Next sentence →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 rounded-3xl border-4 border-grape-500/40 bg-grape-100 p-10 text-center">
          <p className="text-6xl" aria-hidden>
            🏅
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold">
            All {list.words.length} sentences solved!
          </h2>
          <button
            type="button"
            onClick={() => start(list)}
            className="mt-6 rounded-2xl bg-grape-500 px-8 py-4 font-display text-xl font-extrabold text-white shadow-pop-lg"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
