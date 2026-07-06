"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import type { WordList } from "@/data/wordlists";

/*
 * All teacher data lives in localStorage under "lingolaunch:*" keys —
 * no accounts, no server. Works offline once loaded.
 *
 * Persistence is modeled as an external store (useSyncExternalStore):
 * the server render sees the initial value, and the client snapshot
 * reads localStorage with a cache so repeated reads stay referentially
 * stable. Cross-tab edits propagate via the "storage" event.
 */

export type Student = {
  id: string;
  name: string;
};

export type ClassRoom = {
  id: string;
  name: string;
  students: Student[];
};

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

const snapshotCache = new Map<string, { raw: string | null; value: unknown }>();
const keyListeners = new Map<string, Set<() => void>>();

function readSnapshot<T>(key: string, initial: T): T {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    // Blocked storage: treat as empty.
  }
  const cached = snapshotCache.get(key);
  if (cached && cached.raw === raw) return cached.value as T;

  let value = initial;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      // Corrupt entry: fall back to the initial value.
    }
  }
  snapshotCache.set(key, { raw, value });
  return value;
}

function writeSnapshot<T>(key: string, value: T): void {
  const raw = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    // Storage full or blocked — keep the in-memory value anyway.
  }
  snapshotCache.set(key, { raw, value });
  keyListeners.get(key)?.forEach((listener) => listener());
}

function subscribeToKey(key: string, listener: () => void): () => void {
  let set = keyListeners.get(key);
  if (!set) {
    set = new Set();
    keyListeners.set(key, set);
  }
  set.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    set.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useStoredState<T>(
  key: string,
  initial: T,
): [T, (next: T | ((prev: T) => T)) => void, boolean] {
  // Keep the first-render `initial` stable so snapshots don't thrash when
  // callers pass literals.
  const initialRef = useRef(initial);

  const value = useSyncExternalStore(
    useCallback((listener: () => void) => subscribeToKey(key, listener), [key]),
    () => readSnapshot(key, initialRef.current),
    () => initialRef.current,
  );

  // True only after hydration — pages use it to avoid flashing empty state.
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = readSnapshot(key, initialRef.current);
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      writeSnapshot(key, resolved);
    },
    [key],
  );

  return [value, set, hydrated];
}

function emptySubscribe(): () => void {
  return () => {};
}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function useClasses() {
  return useStoredState<ClassRoom[]>("lingolaunch:classes", []);
}

export function useCustomLists() {
  return useStoredState<WordList[]>("lingolaunch:customLists", []);
}
