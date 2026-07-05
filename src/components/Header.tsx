import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-brand-800">
          Exact<span className="text-accent-600">House</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-700 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden text-sm font-semibold text-brand-800 sm:block"
          >
            Call or Text {site.phone}
          </a>
          <Link
            href="/get-offer"
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-600"
          >
            Get My Cash Offer
          </Link>
        </div>
      </div>
    </header>
  );
}
