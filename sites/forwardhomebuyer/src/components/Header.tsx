/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

/**
 * FHB header: dark top-bar with gold CTA link, white sticky header with
 * logo, nav, and a prominent phone block — matching the live site's shell.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)]">
      <div className="bg-brand-900 px-4 py-2 text-center text-sm font-medium text-white">
        Need to sell fast?{" "}
        <Link href="/get-offer" className="font-bold text-gold-400 hover:underline">
          Get a no-obligation cash offer
        </Link>{" "}
        in 24 hours.
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/">
          <img src="/logo.png" alt={site.name} className="h-[52px] w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3.5 py-2 text-[15px] font-semibold text-[#374151] hover:bg-brand-50 hover:text-brand-800"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-offer"
            className="ml-2 rounded-lg bg-accent-500 px-5 py-2.5 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(249,115,22,0.4)] transition-all hover:-translate-y-0.5 hover:bg-accent-600"
          >
            Get My Offer
          </Link>
        </nav>

        <a href={site.phoneHref} className="flex flex-col items-end">
          <span className="text-xs font-medium uppercase tracking-[0.5px] text-[#6B7280]">
            Call or Text
          </span>
          <span className="text-2xl font-extrabold tracking-[-0.5px] text-brand-800 hover:text-brand-500">
            {site.phone}
          </span>
        </a>
      </div>
    </header>
  );
}
