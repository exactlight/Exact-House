"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tools = [
  { href: "/words", label: "Word Lists", emoji: "📚" },
  { href: "/flashcards", label: "Flashcards", emoji: "🃏" },
  { href: "/scramble", label: "Scramble", emoji: "🧩" },
  { href: "/bingo", label: "Bingo", emoji: "🎯" },
  { href: "/picker", label: "Picker", emoji: "🎡" },
  { href: "/prompts", label: "Talk Cards", emoji: "💬" },
  { href: "/timer", label: "Timer", emoji: "⏱️" },
  { href: "/classes", label: "Classes", emoji: "🏫" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="print-hidden sticky top-0 z-40 border-b-4 border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-2xl font-bold text-ink"
        >
          <span aria-hidden>🚀</span>
          <span>
            Lingo<span className="text-teal-600">Launch</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm font-bold">
          {tools.map((tool) => {
            const active = pathname.startsWith(tool.href);
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={`rounded-full px-3 py-1.5 transition-colors ${
                  active
                    ? "bg-teal-500 text-white"
                    : "text-ink-soft hover:bg-teal-100 hover:text-ink"
                }`}
              >
                <span aria-hidden className="mr-1">
                  {tool.emoji}
                </span>
                {tool.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
