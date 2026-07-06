"use client";

import { money } from "@/lib/format";
import { gradeOf } from "@/lib/engine";

/**
 * Chart pieces, per the dataviz mark specs: thin marks (≤24px), 2px
 * surface gaps between stacked segments, values carried by a legend list
 * (the table view) in text tokens — never on every segment.
 */

export type Segment = { label: string; value: number; color: string };

/** Horizontal part-to-whole stacked bar + value legend. */
export function CostBar({ title, segments, note }: { title: string; segments: Segment[]; note?: string }) {
  const shown = segments.filter((s) => s.value > 0);
  const total = shown.reduce((a, s) => a + s.value, 0);
  if (total <= 0) return null;
  return (
    <figure>
      <figcaption className="mb-2 text-xs font-semibold text-muted">{title}</figcaption>
      <div className="flex h-5 w-full gap-[2px] overflow-hidden rounded" role="img" aria-label={title}>
        {shown.map((s) => (
          <div
            key={s.label}
            title={`${s.label}: ${money(s.value)}`}
            style={{ width: `${(s.value / total) * 100}%`, background: s.color }}
            className="h-full min-w-[3px] first:rounded-l last:rounded-r"
          />
        ))}
      </div>
      <ul className="mt-2 space-y-1 text-xs">
        {segments.map((s) => (
          <li key={s.label} className="flex items-baseline gap-1.5">
            <span className="h-2.5 w-2.5 shrink-0 self-center rounded-sm" style={{ background: s.color }} aria-hidden />
            <span className="text-muted">{s.label}</span>
            <span className="ml-auto font-semibold tabular-nums text-foreground">{money(s.value)}</span>
          </li>
        ))}
      </ul>
      {note && <p className="mt-2 text-xs text-faint">{note}</p>}
    </figure>
  );
}

/** Resilience meter — fill carries state, track is a lighter step of the same ramp. */
export function Meter({ value, label }: { value: number; label: React.ReactNode }) {
  const state =
    value >= 70
      ? { fill: "#047857", track: "#d0eee1", word: "Sturdy" }
      : value >= 40
        ? { fill: "#b97e00", track: "#f5e5c3", word: "Some cushion" }
        : { fill: "#d03b3b", track: "#f6d7d7", word: "Thin margins" };
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-xs font-semibold">
        <span className="text-muted">{label}</span>
        <span style={{ color: state.fill }}>
          {state.word} · {value}/100
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full" style={{ background: state.track }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.max(2, Math.min(100, value))}%`, background: state.fill }}
        />
      </div>
    </div>
  );
}

/** Letter-grade chip: the letter carries meaning, color reinforces it. */
export function ScoreBadge({ score }: { score: number }) {
  const grade = gradeOf(score);
  const tone =
    grade === "A" || grade === "B"
      ? "bg-accent-050 text-accent-700"
      : grade === "C"
        ? "bg-[#fdf3dd] text-[#8a5f00]"
        : "bg-[#fbeaea] text-[#a32f2f]";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${tone}`}>
      <span className="text-sm leading-none">{grade}</span>
      <span className="font-semibold opacity-80">{score}/100</span>
    </span>
  );
}

/** Stat tile: label + value (+ optional sub-line), proportional figures on the value. */
export function Stat({
  label,
  value,
  sub,
  tone = "default",
  big = false,
  className = "",
}: {
  label: React.ReactNode;
  value: string;
  sub?: React.ReactNode;
  tone?: "default" | "good" | "bad" | "accent";
  big?: boolean;
  className?: string;
}) {
  const color =
    tone === "good" ? "text-good" : tone === "bad" ? "text-bad" : tone === "accent" ? "text-accent-700" : "text-foreground";
  return (
    <div className={`min-w-0 rounded-xl border border-hairline bg-white p-3 ${className}`}>
      <div className="text-xs font-semibold text-muted">{label}</div>
      <div className={`mt-0.5 font-bold tracking-tight ${big ? "text-2xl" : "text-lg"} ${color}`}>{value}</div>
      {sub && <div className="mt-0.5 text-xs text-faint">{sub}</div>}
    </div>
  );
}
