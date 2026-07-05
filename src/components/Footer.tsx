import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/data/cities";
import { situations } from "@/data/situations";

/**
 * Matches the live site's footer (centered navy block with owner/phone/counties)
 * plus the live site's subtle city-links strip above it.
 */
export default function Footer() {
  return (
    <>
      {/* City links strip — styled like the live site's inconspicuous nav */}
      <div className="bg-[#ecf0f1] px-4 py-4 text-center">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-1 text-xs text-[#95a5a6]">City Pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {cities.map((c, i) => (
              <span key={c.slug} className="flex items-center gap-1">
                {i > 0 && <span className="text-xs text-[#bdc3c7]">|</span>}
                <Link
                  href={`/${c.slug}`}
                  className="px-2 py-1 text-xs text-[#7f8c8d] hover:text-brand-800"
                >
                  {c.name}
                </Link>
              </span>
            ))}
          </div>
          <p className="mb-1 mt-2 text-xs text-[#95a5a6]">Situations:</p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
            {situations.map((s, i) => (
              <span key={s.slug} className="flex items-center gap-1">
                {i > 0 && <span className="text-xs text-[#bdc3c7]">|</span>}
                <Link
                  href={`/${s.slug}`}
                  className="px-2 py-1 text-xs text-[#7f8c8d] hover:text-brand-800"
                >
                  {s.name}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-brand-800 px-4 py-12 text-center text-white">
        <p className="mb-4">
          <strong>{site.name}</strong> - {site.footerTagline}
        </p>
        <p className="mb-4">
          {site.owner} |{" "}
          <a href={site.phoneHref} className="text-accent-500 hover:text-accent-400">
            {site.phone}
          </a>{" "}
          |{" "}
          <a href={`mailto:${site.email}`} className="text-accent-500 hover:text-accent-400">
            {site.email}
          </a>
        </p>
        <p className="mb-4">{site.counties}</p>
        <p className="text-sm text-white/60">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-white">Terms of Use</Link>
          {" · "}© {new Date().getFullYear()} {site.legalName}
        </p>
      </footer>
    </>
  );
}
