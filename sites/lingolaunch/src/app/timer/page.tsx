"use client";

import { useEffect, useRef, useState } from "react";

const presets = [
  { label: "1 min", seconds: 60 },
  { label: "2 min", seconds: 120 },
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
];

/* Friendly three-note chime via WebAudio — no sound files needed. */
function playChime() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.18);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + i * 0.18 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.6);
    });
  } catch {
    // No audio available — the flashing screen still signals time's up.
  }
}

function endAtFor(durationSeconds: number): number {
  return Date.now() + durationSeconds * 1000;
}

export default function TimerPage() {
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [remaining, setRemaining] = useState(300);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const endAtRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      const left = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        setRunning(false);
        setFinished(true);
        playChime();
      }
    }, 250);
    return () => window.clearInterval(interval);
  }, [running]);

  function start(seconds?: number) {
    const duration = seconds ?? remaining;
    if (seconds !== undefined) {
      setTotalSeconds(seconds);
      setRemaining(seconds);
    }
    endAtRef.current = endAtFor(duration);
    setFinished(false);
    setRunning(true);
  }

  function pause() {
    setRunning(false);
  }

  function reset() {
    setRunning(false);
    setFinished(false);
    setRemaining(totalSeconds);
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const fraction = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const urgent = running && remaining <= 10;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-4xl font-extrabold">⏱️ Class Timer</h1>
      <p className="mt-2 font-semibold text-ink-soft">
        Big enough for the back row. A friendly chime plays when time is up.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.seconds}
            type="button"
            onClick={() => start(preset.seconds)}
            className="rounded-2xl border-2 border-ink/15 bg-paper px-5 py-2.5 font-bold shadow-pop transition-transform hover:-translate-y-0.5"
          >
            {preset.label}
          </button>
        ))}
        <label className="flex items-center gap-2 font-bold">
          <input
            type="number"
            min={1}
            max={120}
            placeholder="min"
            onChange={(e) => {
              const mins = Number(e.target.value);
              if (mins >= 1 && !running) {
                setTotalSeconds(mins * 60);
                setRemaining(mins * 60);
                setFinished(false);
              }
            }}
            className="w-20 rounded-xl border-2 border-ink/15 bg-paper px-3 py-2 text-center font-bold outline-none focus:border-teal-500"
          />
          custom minutes
        </label>
      </div>

      <div
        className={`mt-8 rounded-3xl border-4 p-10 text-center shadow-pop-lg transition-colors ${
          finished
            ? "animate-wiggle border-coral-500 bg-coral-100"
            : urgent
              ? "border-coral-500 bg-paper"
              : "border-ink/10 bg-paper"
        }`}
      >
        <p
          className={`font-display text-[9rem] font-extrabold leading-none tabular-nums sm:text-[13rem] ${
            finished ? "text-coral-600" : urgent ? "text-coral-500" : "text-ink"
          }`}
        >
          {minutes}:{String(seconds).padStart(2, "0")}
        </p>
        {finished && (
          <p className="mt-2 font-display text-4xl font-extrabold text-coral-600">
            ⏰ Time&apos;s up!
          </p>
        )}
        <div className="mx-auto mt-8 h-4 max-w-2xl overflow-hidden rounded-full bg-ink/10">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              urgent || finished ? "bg-coral-500" : "bg-teal-500"
            }`}
            style={{ width: `${fraction * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {running ? (
          <button
            type="button"
            onClick={pause}
            className="rounded-2xl bg-sun-400 px-8 py-4 font-display text-2xl font-extrabold text-ink shadow-pop-lg transition-transform hover:-translate-y-1"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={() => start()}
            disabled={remaining === 0}
            className="rounded-2xl bg-teal-500 px-8 py-4 font-display text-2xl font-extrabold text-white shadow-pop-lg transition-transform hover:-translate-y-1 disabled:opacity-40"
          >
            ▶ Start
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="rounded-2xl bg-ink/10 px-8 py-4 font-display text-2xl font-extrabold text-ink shadow-pop-lg transition-transform hover:-translate-y-1"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  );
}
