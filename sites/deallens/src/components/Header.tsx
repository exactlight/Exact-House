import Link from "next/link";

export default function Header() {
  return (
    <header className="print-hidden sticky top-0 z-40 border-b border-hairline bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <LogoMark />
          <span>
            Deal<span className="text-accent-600">Lens</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <Link href="/deals" className="rounded-lg px-3 py-2 text-muted hover:bg-surface hover:text-foreground">
            My deals
          </Link>
          <Link href="/learn" className="rounded-lg px-3 py-2 text-muted hover:bg-surface hover:text-foreground">
            Learn
          </Link>
          <Link
            href="/analyze"
            className="rounded-lg bg-accent-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-accent-700"
          >
            Analyze a deal
          </Link>
        </nav>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="11.5" cy="11.5" r="8" fill="none" stroke="#047857" strokeWidth="2.4" />
      <path d="M7.5 12.5 L11.5 8.5 L15.5 12.5 M9 11.5 V15 H14 V11.5" fill="none" stroke="#047857" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17.5" y1="17.5" x2="23" y2="23" stroke="#101828" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}
