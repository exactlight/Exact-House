"use client";

import { useState } from "react";
import ListPicker from "@/components/ListPicker";
import {
  builtinLists,
  type PartOfSpeech,
  type Word,
  type WordList,
} from "@/data/wordlists";
import { makeId, useCustomLists } from "@/lib/store";

const posOptions: PartOfSpeech[] = ["noun", "verb", "adjective", "adverb", "phrase"];

export default function WordsPage() {
  const [customLists, setCustomLists, hydrated] = useCustomLists();
  const [selectedId, setSelectedId] = useState<string>(builtinLists[0].id);
  const [creating, setCreating] = useState(false);

  const selected: WordList | undefined =
    builtinLists.find((l) => l.id === selectedId) ??
    customLists.find((l) => l.id === selectedId);
  const isCustom = customLists.some((l) => l.id === selectedId);

  function createList(name: string, gradeBand: "3–5" | "6–8") {
    const list: WordList = {
      id: makeId(),
      name,
      gradeBand,
      description: "My custom list",
      emoji: "🗂️",
      words: [],
    };
    setCustomLists((prev) => [...prev, list]);
    setSelectedId(list.id);
    setCreating(false);
  }

  function updateSelected(update: (list: WordList) => WordList) {
    setCustomLists((prev) =>
      prev.map((l) => (l.id === selectedId ? update(l) : l)),
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-extrabold">📚 Word Lists</h1>
          <p className="mt-2 font-semibold text-ink-soft">
            Browse the built-in lists or build your own for this week&apos;s
            unit. Every list works in Flashcards, Scramble, and Bingo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating((c) => !c)}
          className="rounded-2xl bg-grape-500 px-5 py-3 font-display text-lg font-bold text-white shadow-pop transition-transform hover:-translate-y-0.5"
        >
          {creating ? "Cancel" : "+ New List"}
        </button>
      </div>

      {creating && <NewListForm onCreate={createList} />}

      <div className="mt-6">
        <ListPicker
          selectedId={selectedId}
          onSelect={(list) => setSelectedId(list.id)}
        />
      </div>

      {selected && hydrated && (
        <section className="mt-8 rounded-3xl border-4 border-ink/10 bg-paper p-6 shadow-pop">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-extrabold">
                {selected.emoji} {selected.name}
              </h2>
              <p className="mt-1 font-semibold text-ink-soft">
                Grades {selected.gradeBand} · {selected.description}
              </p>
            </div>
            {isCustom && (
              <button
                type="button"
                onClick={() => {
                  setCustomLists((prev) => prev.filter((l) => l.id !== selectedId));
                  setSelectedId(builtinLists[0].id);
                }}
                className="rounded-full px-3 py-1 text-sm font-bold text-ink-soft hover:bg-coral-100 hover:text-coral-600"
              >
                Delete list
              </button>
            )}
          </div>

          {selected.words.length === 0 ? (
            <p className="mt-6 rounded-2xl border-4 border-dashed border-ink/15 p-6 text-center font-semibold text-ink-soft">
              No words yet — add the first one below. Lists need 9+ words for
              Bingo and 2+ for the games.
            </p>
          ) : (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {selected.words.map((word, i) => (
                <li
                  key={`${word.term}-${i}`}
                  className="rounded-2xl border-2 border-ink/10 bg-cream p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-display text-xl font-extrabold text-teal-700">
                      <span aria-hidden className="mr-1.5">{word.emoji}</span>
                      {word.term}
                      <span className="ml-2 text-xs font-bold text-ink-soft">
                        {word.pos}
                      </span>
                    </p>
                    {isCustom && (
                      <button
                        type="button"
                        aria-label={`Remove ${word.term}`}
                        onClick={() =>
                          updateSelected((l) => ({
                            ...l,
                            words: l.words.filter((_, j) => j !== i),
                          }))
                        }
                        className="text-ink-soft hover:text-coral-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <p className="mt-1 font-semibold">{word.definition}</p>
                  <p className="mt-1 text-sm italic text-ink-soft">
                    &ldquo;{word.example}&rdquo;
                  </p>
                </li>
              ))}
            </ul>
          )}

          {isCustom && (
            <AddWordForm
              onAdd={(word) =>
                updateSelected((l) => ({ ...l, words: [...l.words, word] }))
              }
            />
          )}
        </section>
      )}
    </div>
  );
}

function NewListForm({
  onCreate,
}: {
  onCreate: (name: string, gradeBand: "3–5" | "6–8") => void;
}) {
  const [name, setName] = useState("");
  const [gradeBand, setGradeBand] = useState<"3–5" | "6–8">("3–5");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) onCreate(name.trim(), gradeBand);
      }}
      className="mt-6 flex flex-wrap items-center gap-3 rounded-3xl border-4 border-grape-500/30 bg-grape-100 p-5"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="List name — e.g. Unit 4: Ecosystems"
        className="min-w-60 flex-1 rounded-2xl border-2 border-ink/15 bg-paper px-4 py-3 font-semibold outline-none focus:border-grape-500"
      />
      <div className="flex gap-2">
        {(["3–5", "6–8"] as const).map((band) => (
          <button
            key={band}
            type="button"
            onClick={() => setGradeBand(band)}
            className={`rounded-2xl px-4 py-3 font-bold ${
              gradeBand === band ? "bg-grape-500 text-white" : "bg-paper text-ink"
            }`}
          >
            Grades {band}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="rounded-2xl bg-grape-600 px-6 py-3 font-display text-lg font-bold text-white shadow-pop"
      >
        Create
      </button>
    </form>
  );
}

function AddWordForm({ onAdd }: { onAdd: (word: Word) => void }) {
  const [term, setTerm] = useState("");
  const [pos, setPos] = useState<PartOfSpeech>("noun");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [emoji, setEmoji] = useState("");

  function submit() {
    if (!term.trim() || !definition.trim() || !example.trim()) return;
    onAdd({
      term: term.trim(),
      pos,
      definition: definition.trim(),
      example: example.trim(),
      emoji: emoji.trim() || "🔤",
    });
    setTerm("");
    setDefinition("");
    setExample("");
    setEmoji("");
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="mt-6 grid gap-3 rounded-2xl bg-cream p-5 sm:grid-cols-2"
    >
      <p className="font-display text-lg font-extrabold sm:col-span-2">Add a word</p>
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Word or phrase"
        className="rounded-2xl border-2 border-ink/15 bg-paper px-4 py-2.5 font-semibold outline-none focus:border-teal-500"
      />
      <div className="flex gap-2">
        <select
          value={pos}
          onChange={(e) => setPos(e.target.value as PartOfSpeech)}
          className="flex-1 rounded-2xl border-2 border-ink/15 bg-paper px-3 py-2.5 font-semibold outline-none focus:border-teal-500"
        >
          {posOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
          placeholder="Emoji"
          className="w-24 rounded-2xl border-2 border-ink/15 bg-paper px-3 py-2.5 text-center font-semibold outline-none focus:border-teal-500"
        />
      </div>
      <input
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        placeholder="Kid-friendly definition"
        className="rounded-2xl border-2 border-ink/15 bg-paper px-4 py-2.5 font-semibold outline-none focus:border-teal-500 sm:col-span-2"
      />
      <input
        value={example}
        onChange={(e) => setExample(e.target.value)}
        placeholder="Example sentence using the word (Scramble uses this!)"
        className="rounded-2xl border-2 border-ink/15 bg-paper px-4 py-2.5 font-semibold outline-none focus:border-teal-500 sm:col-span-2"
      />
      <button
        type="submit"
        className="rounded-2xl bg-teal-500 px-5 py-2.5 font-bold text-white shadow-pop sm:col-span-2"
      >
        + Add word
      </button>
    </form>
  );
}
