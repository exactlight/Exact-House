"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GLOSSARY, type GlossaryKey } from "@/lib/glossary";

/**
 * A glossary term with a tap-to-reveal plain-English explanation.
 * Renders its children with a dotted underline; clicking opens a small
 * popover with the short definition and a link to the full one on /learn.
 */
export default function Term({ k, children }: { k: GlossaryKey; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const entry = GLOSSARY[k];

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!entry) return <>{children}</>;

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="term text-inherit"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-full z-50 mt-2 block w-72 rounded-xl border border-hairline bg-white p-3 text-left shadow-lg"
        >
          <span className="block text-sm font-semibold text-foreground">{entry.term}</span>
          <span className="mt-1 block text-sm font-normal text-muted">{entry.short}</span>
          <Link
            href={`/learn#${k}`}
            className="mt-2 block text-xs font-semibold text-accent-600 hover:text-accent-700"
          >
            Learn more →
          </Link>
        </span>
      )}
    </span>
  );
}
