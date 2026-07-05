import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cities } from "@/data/cities";
import { situations } from "@/data/situations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/how-it-works",
    "/about",
    "/faq",
    "/compare",
    "/testimonials",
    "/get-offer",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const cityPages = cities.map((c) => ({
    url: `${site.url}/sell-my-house-fast/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const situationPages = situations.map((s) => ({
    url: `${site.url}/situations/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...cityPages, ...situationPages];
}
