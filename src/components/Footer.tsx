import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/data/cities";

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">
            Exact<span className="text-accent-400">House</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            We buy houses for cash in South-Central Wisconsin — any condition, on
            your schedule.
          </p>
          <p className="mt-4 text-sm">
            {site.address.locality}, {site.address.region}
          </p>
          <p className="mt-1 text-sm">
            <a href={site.phoneHref} className="font-semibold text-white hover:text-accent-400">
              {site.phone}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${site.email}`} className="hover:text-accent-400">
              {site.email}
            </a>
          </p>
        </div>

        <div>
          <p className="font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/how-it-works" className="hover:text-accent-400">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-accent-400">About Us</Link></li>
            <li><Link href="/faq" className="hover:text-accent-400">FAQ</Link></li>
            <li><Link href="/get-offer" className="hover:text-accent-400">Get a Cash Offer</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Areas We Buy In</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link href={`/sell-my-house-fast/${c.slug}`} className="hover:text-accent-400">
                  {c.name}, WI
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-brand-100/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent-400">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
