import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/data/cities";
import { situations } from "@/data/situations";

export default function Footer() {
  return (
    <>
      {/* Subtle link strips for SEO/navigation */}
      <div className="bg-[#F3F4F6] px-4 py-4 text-center">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-1 text-xs text-[#9CA3AF]">Areas We Buy In:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {cities.map((c, i) => (
              <span key={c.slug} className="flex items-center gap-1">
                {i > 0 && <span className="text-xs text-[#D1D5DB]">|</span>}
                <Link href={`/${c.slug}`} className="px-1.5 py-1 text-xs text-[#6B7280] hover:text-brand-800">
                  {c.name}
                </Link>
              </span>
            ))}
          </div>
          <p className="mb-1 mt-2 text-xs text-[#9CA3AF]">Situations:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {situations.map((s, i) => (
              <span key={s.slug} className="flex items-center gap-1">
                {i > 0 && <span className="text-xs text-[#D1D5DB]">|</span>}
                <Link href={`/${s.slug}`} className="px-1.5 py-1 text-xs text-[#6B7280] hover:text-brand-800">
                  {s.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-brand-900 px-4 py-12 text-center text-white">
        <p className="mb-4">
          <strong>{site.name}</strong> — {site.footerTagline}
        </p>
        <p className="mb-4">
          <a href={site.phoneHref} className="font-bold text-gold-400 hover:text-gold-500">
            {site.phone}
          </a>{" "}
          |{" "}
          <a href={`mailto:${site.email}`} className="text-gold-400 hover:text-gold-500">
            {site.email}
          </a>
        </p>
        <p className="mb-4 text-white/80">{site.counties}</p>
        <p className="text-sm text-white/50">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-white">Terms of Use</Link>
          {" · "}© {new Date().getFullYear()} {site.legalName}
        </p>
      </footer>
    </>
  );
}
