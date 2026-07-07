import { DEFAULT_INPUTS, type DealInputs } from "./engine";

/**
 * Saved-deal persistence — localStorage only, by design. No account, no
 * server, nothing leaves the browser. Callers must be client components.
 *
 * Exposes a tiny external-store interface (subscribe/snapshot) so
 * components can read it with useSyncExternalStore.
 */

export type SavedDeal = {
  id: string;
  savedAt: string; // ISO date
  inputs: DealInputs;
};

const KEY = "deallens.deals.v1";
const EMPTY: SavedDeal[] = [];

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeDeals(cb: () => void): () => void {
  listeners.add(cb);
  window.addEventListener("storage", cb); // other tabs
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

// Snapshot is cached by the raw string so repeated reads return the same
// reference — useSyncExternalStore requires that.
let snapshot: { raw: string | null; deals: SavedDeal[] } = { raw: null, deals: EMPTY };

/**
 * Bring a stored deal's inputs up to the current shape: fill any missing
 * field from defaults, and map the legacy `hardMoney*` acquisition-financing
 * keys (pre-multi-method) onto the current `acq*` ones so old saves still
 * compute instead of reading as NaN.
 */
function normalizeInputs(raw: Record<string, unknown>): DealInputs {
  const legacy = raw as Record<string, unknown>;
  const mapped: Record<string, unknown> = { ...raw };
  if (legacy.acqLtcPct === undefined && legacy.hardMoneyLtcPct !== undefined) {
    mapped.acqLtcPct = legacy.hardMoneyLtcPct;
    mapped.acqRatePct = legacy.hardMoneyRatePct;
    mapped.acqPointsPct = legacy.hardMoneyPointsPct;
    mapped.acqCoversRehab = true; // legacy model always financed rehab
  }
  return { ...DEFAULT_INPUTS, ...mapped } as DealInputs;
}

function parse(raw: string | null): SavedDeal[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed
      .filter((d) => d && typeof d === "object" && d.inputs)
      .map((d) => ({ ...d, inputs: normalizeInputs(d.inputs) }) as SavedDeal);
  } catch {
    return EMPTY;
  }
}

export function getDealsSnapshot(): SavedDeal[] {
  const raw = window.localStorage.getItem(KEY);
  if (raw !== snapshot.raw) snapshot = { raw, deals: parse(raw) };
  return snapshot.deals;
}

export function getDealsServerSnapshot(): SavedDeal[] {
  return EMPTY;
}

export function loadDeals(): SavedDeal[] {
  if (typeof window === "undefined") return EMPTY;
  return getDealsSnapshot();
}

function persist(deals: SavedDeal[]) {
  window.localStorage.setItem(KEY, JSON.stringify(deals));
  emit();
}

export function saveDeal(inputs: DealInputs, existingId?: string): SavedDeal {
  const deals = [...loadDeals()];
  const now = new Date().toISOString();
  if (existingId) {
    const idx = deals.findIndex((d) => d.id === existingId);
    if (idx >= 0) {
      deals[idx] = { ...deals[idx], savedAt: now, inputs };
      persist(deals);
      return deals[idx];
    }
  }
  const deal: SavedDeal = {
    id: `deal-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    savedAt: now,
    inputs,
  };
  deals.unshift(deal);
  persist(deals);
  return deal;
}

export function deleteDeal(id: string) {
  persist(loadDeals().filter((d) => d.id !== id));
}

export function getDeal(id: string): SavedDeal | undefined {
  return loadDeals().find((d) => d.id === id);
}
