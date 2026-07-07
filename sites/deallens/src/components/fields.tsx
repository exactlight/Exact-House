"use client";

import { useState } from "react";

/** Shared form controls for the analyzer — controlled numeric inputs. */

const inputCls =
  "w-full rounded-lg border border-hairline bg-white px-3 py-2 text-sm text-foreground transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20";

type NumProps = {
  label: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
};

const numToText = (v: number) => (Number.isFinite(v) ? String(v) : "");

/**
 * Numeric input backed by a local text buffer, so the box shows exactly what
 * the user typed and stays freely editable — deletable leading zeros, empty
 * mid-edit, a lone trailing ".". We emit a parsed number upward on every
 * change and normalize the display on blur. A plain `type="number"` bound to
 * a numeric value can't do this: React skips rewriting the DOM string when the
 * parsed value already matches, so a stray leading zero gets stuck.
 */
export function NumField({ label, value, onChange, prefix, suffix, min = 0, max }: NumProps) {
  const [text, setText] = useState(() => numToText(value));
  const [seenValue, setSeenValue] = useState(value);

  // Refresh the buffer when the numeric value changes from outside (loading a
  // saved deal, a reset) and no longer matches what's typed. Render-phase
  // adjustment — the "store previous prop" pattern, no effect needed.
  if (value !== seenValue) {
    setSeenValue(value);
    if (Number(text) !== value) setText(numToText(value));
  }

  function handleChange(raw: string) {
    setText(raw);
    const trimmed = raw.trim();
    if (trimmed === "" || trimmed === "-" || trimmed === ".") {
      onChange(0);
      return;
    }
    const n = Number(trimmed);
    if (Number.isFinite(n)) onChange(clampEmit(n, min, max));
  }

  function handleBlur() {
    const trimmed = text.trim();
    const n = trimmed === "" ? 0 : Number(trimmed);
    setText(Number.isFinite(n) ? String(clampEmit(n, min, max)) : "0");
  }

  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted">{label}</span>
      <span className="relative block">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-faint">
            {prefix}
          </span>
        )}
        <input
          type="text"
          inputMode="decimal"
          className={`${inputCls} ${prefix ? "pl-7" : ""} ${suffix ? "pr-9" : ""}`}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-faint">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

/** Keep emitted values within the field's declared bounds. */
function clampEmit(n: number, min?: number, max?: number): number {
  let v = n;
  if (min !== undefined && v < min) v = min;
  if (max !== undefined && v > max) v = max;
  return v;
}

export function MoneyField(props: Omit<NumProps, "prefix">) {
  return <NumField {...props} prefix="$" />;
}

export function PctField(props: Omit<NumProps, "suffix">) {
  return <NumField {...props} suffix="%" max={props.max ?? 100} />;
}

export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  format: (v: number) => string;
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center justify-between text-xs font-semibold text-muted">
        <span>{label}</span>
        <span className="tabular-nums text-foreground">{format(value)}</span>
      </span>
      <input
        type="range"
        className="w-full accent-[#047857]"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
