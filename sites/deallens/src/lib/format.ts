const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** "$1,234" — rounds to whole dollars; negatives keep their sign. */
export function money(v: number): string {
  if (!Number.isFinite(v)) return "—";
  return usd0.format(Math.round(v));
}

/** "$1.2K" / "$1.4M" — compact for tight spots like bar labels. */
export function moneyCompact(v: number): string {
  if (!Number.isFinite(v)) return "—";
  const abs = Math.abs(v);
  const sign = v < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 10_000) return `${sign}$${Math.round(abs / 1000)}K`;
  if (abs >= 1_000) return `${sign}$${(abs / 1000).toFixed(1)}K`;
  return `${sign}$${Math.round(abs)}`;
}

/** "12.4%" */
export function pct(v: number, digits = 1): string {
  if (!Number.isFinite(v)) return "∞";
  return `${v.toFixed(digits)}%`;
}

/** "1.31×" for ratios like DSCR. */
export function ratio(v: number): string {
  if (!Number.isFinite(v)) return "∞";
  return `${v.toFixed(2)}×`;
}
