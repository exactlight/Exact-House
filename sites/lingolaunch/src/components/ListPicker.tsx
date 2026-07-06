"use client";

import { builtinLists, type WordList } from "@/data/wordlists";
import { useCustomLists } from "@/lib/store";

/*
 * Shared word-list chooser used by Flashcards, Scramble, and Bingo.
 * Shows built-in lists grouped by grade band, then the teacher's own lists.
 */
export default function ListPicker({
  selectedId,
  onSelect,
  minWords = 1,
}: {
  selectedId: string | null;
  onSelect: (list: WordList) => void;
  minWords?: number;
}) {
  const [customLists, , hydrated] = useCustomLists();

  const groups: { label: string; lists: WordList[] }[] = [
    { label: "Grades 3–5", lists: builtinLists.filter((l) => l.gradeBand === "3–5") },
    { label: "Grades 6–8", lists: builtinLists.filter((l) => l.gradeBand === "6–8") },
  ];
  if (hydrated && customLists.length > 0) {
    groups.push({ label: "My Lists", lists: customLists });
  }

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-ink-soft">
            {group.label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.lists.map((list) => {
              const tooSmall = list.words.length < minWords;
              const active = list.id === selectedId;
              return (
                <button
                  key={list.id}
                  type="button"
                  disabled={tooSmall}
                  onClick={() => onSelect(list)}
                  title={
                    tooSmall
                      ? `Needs at least ${minWords} words (has ${list.words.length})`
                      : list.description
                  }
                  className={`rounded-2xl border-2 px-4 py-2 text-sm font-bold shadow-pop transition-all ${
                    active
                      ? "border-teal-600 bg-teal-500 text-white"
                      : "border-ink/15 bg-paper text-ink hover:-translate-y-0.5 hover:border-teal-500"
                  } ${tooSmall ? "cursor-not-allowed opacity-40 shadow-none" : ""}`}
                >
                  <span aria-hidden className="mr-1.5">
                    {list.emoji}
                  </span>
                  {list.name}
                  <span
                    className={`ml-2 text-xs font-semibold ${active ? "text-teal-100" : "text-ink-soft"}`}
                  >
                    {list.words.length} words
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
