"use client";

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

export function NumField({ label, value, onChange, prefix, suffix, step = 1, min = 0, max }: NumProps) {
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
          type="number"
          inputMode="decimal"
          className={`${inputCls} ${prefix ? "pl-7" : ""} ${suffix ? "pr-9" : ""}`}
          value={Number.isFinite(value) ? value : 0}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
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

export function MoneyField(props: Omit<NumProps, "prefix">) {
  return <NumField {...props} prefix="$" step={props.step ?? 1000} />;
}

export function PctField(props: Omit<NumProps, "suffix">) {
  return <NumField {...props} suffix="%" step={props.step ?? 0.5} max={props.max ?? 100} />;
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
