"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import EmojiBurst from "@/components/EmojiBurst";
import { useClasses } from "@/lib/store";

export default function PickerPage() {
  const [classes, , hydrated] = useClasses();
  const [names, setNames] = useState<string[]>([]);
  const [source, setSource] = useState<string>("");
  const [pasted, setPasted] = useState("");

  // Fair mode: nobody gets picked twice until everyone has had a turn.
  const [fairMode, setFairMode] = useState(true);
  const [alreadyPicked, setAlreadyPicked] = useState<string[]>([]);

  const [display, setDisplay] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  function loadClass(id: string) {
    const cls = classes.find((c) => c.id === id);
    if (!cls) return;
    setSource(id);
    setNames(cls.students.map((s) => s.name));
    setAlreadyPicked([]);
    setDisplay(null);
  }

  function loadPasted() {
    const parsed = pasted
      .split(/[\n,]/)
      .map((n) => n.trim())
      .filter(Boolean);
    if (parsed.length === 0) return;
    setSource("pasted");
    setNames(parsed);
    setAlreadyPicked([]);
    setDisplay(null);
  }

  function spin() {
    const pool = fairMode
      ? names.filter((n) => !alreadyPicked.includes(n))
      : names;
    if (pool.length === 0 || spinning) return;

    const winner = pool[Math.floor(Math.random() * pool.length)];
    setSpinning(true);

    // Flash through random names, slowing down before landing on the winner.
    let ticks = 0;
    const totalTicks = 18 + Math.floor(Math.random() * 6);
    const tick = () => {
      ticks += 1;
      if (ticks >= totalTicks) {
        setDisplay(winner);
        setSpinning(false);
        setBurstKey((k) => k + 1);
        if (fairMode) setAlreadyPicked((prev) => [...prev, winner]);
        return;
      }
      setDisplay(names[Math.floor(Math.random() * names.length)]);
      timerRef.current = window.setTimeout(tick, 40 + ticks * ticks * 0.9);
    };
    tick();
  }

  const pool = fairMode ? names.filter((n) => !alreadyPicked.includes(n)) : names;
  const everyoneWent = names.length > 0 && pool.length === 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <EmojiBurst burstKey={burstKey} emojis={["🎊", "👏", "⭐", "🎉"]} />
      <h1 className="font-display text-4xl font-extrabold">🎡 Student Picker</h1>
      <p className="mt-2 font-semibold text-ink-soft">
        Pick who reads, answers, or goes first — with drama. Fair mode makes
        sure everyone gets a turn before anyone repeats.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {hydrated && classes.length > 0 ? (
          classes.map((cls) => (
            <button
              key={cls.id}
              type="button"
              onClick={() => loadClass(cls.id)}
              className={`rounded-2xl border-2 px-4 py-2 font-bold shadow-pop transition-all ${
                source === cls.id
                  ? "border-teal-600 bg-teal-500 text-white"
                  : "border-ink/15 bg-paper hover:-translate-y-0.5"
              }`}
            >
              🏫 {cls.name} ({cls.students.length})
            </button>
          ))
        ) : hydrated ? (
          <p className="font-semibold text-ink-soft">
            No saved classes yet —{" "}
            <Link href="/classes" className="font-bold text-teal-600 underline">
              set up a roster
            </Link>{" "}
            or paste names below.
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <textarea
          value={pasted}
          onChange={(e) => setPasted(e.target.value)}
          placeholder="Or paste names here — commas or new lines"
          rows={1}
          className="flex-1 resize-y rounded-2xl border-2 border-ink/15 bg-paper px-4 py-2.5 font-semibold outline-none focus:border-teal-500"
        />
        <button
          type="button"
          onClick={loadPasted}
          className="rounded-2xl bg-sky-500 px-5 py-2.5 font-bold text-white shadow-pop"
        >
          Use these names
        </button>
      </div>

      {names.length > 0 && (
        <>
          <div className="mt-8 flex min-h-64 items-center justify-center rounded-3xl border-4 border-ink/10 bg-paper p-8 shadow-pop-lg">
            {display ? (
              <p
                className={`text-center font-display font-extrabold ${
                  spinning ? "text-5xl text-ink-soft" : "text-7xl text-teal-600"
                }`}
              >
                {display}
              </p>
            ) : (
              <p className="text-center text-2xl font-bold text-ink-soft">
                {names.length} names loaded — hit the button!
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={spin}
              disabled={spinning || pool.length === 0}
              className="rounded-2xl bg-coral-500 px-10 py-5 font-display text-3xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1 disabled:opacity-40"
            >
              {spinning ? "…" : everyoneWent ? "Everyone went!" : "🎲 Pick someone!"}
            </button>
            <label className="flex items-center gap-2 font-bold">
              <input
                type="checkbox"
                checked={fairMode}
                onChange={(e) => {
                  setFairMode(e.target.checked);
                  setAlreadyPicked([]);
                }}
                className="h-5 w-5 accent-teal-500"
              />
              Fair mode (no repeats)
            </label>
            {fairMode && alreadyPicked.length > 0 && (
              <button
                type="button"
                onClick={() => setAlreadyPicked([])}
                className="rounded-full bg-ink/10 px-4 py-2 text-sm font-bold hover:bg-ink/20"
              >
                ↺ Reset turns ({alreadyPicked.length}/{names.length})
              </button>
            )}
          </div>

          {fairMode && alreadyPicked.length > 0 && (
            <p className="mt-4 text-center text-sm font-semibold text-ink-soft">
              Already went: {alreadyPicked.join(", ")}
            </p>
          )}
        </>
      )}
    </div>
  );
}
