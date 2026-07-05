/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Resources" },
];

/**
 * Matches the live site's header: navy bar, logo, "Proud to Serve Wisconsin"
 * badge, orange pill phone CTA — plus a slim nav row for the new pages.
 */
export default function Header({
  badgeIcon = "wisconsin-icon.png",
  badgeText = "Proud to Serve Wisconsin",
}: {
  badgeIcon?: string;
  badgeText?: string;
}) {
  return (
    <header className="sticky top-0 z-50 bg-brand-800 shadow-md">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <img src="/logo.png" alt="Exact House" className="h-[50px] w-auto" />
          </Link>
          <div className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur md:flex">
            <img src={`/${badgeIcon}`} alt="Wisconsin" className="h-9 w-9 object-contain" />
            <span>{badgeText}</span>
          </div>
        </div>

        <a
          href={site.phoneHref}
          className="flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-lg font-semibold text-white shadow-[0_4px_15px_rgba(255,107,53,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden>
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
          {site.phone}
        </a>
      </div>

      <nav className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] items-center gap-5 overflow-x-auto px-4 py-2 text-sm font-medium text-white/80 sm:px-8">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-offer"
            className="ml-auto whitespace-nowrap font-semibold text-accent-400 hover:text-accent-500"
          >
            Get a Cash Offer →
          </Link>
        </div>
      </nav>
    </header>
  );
}
