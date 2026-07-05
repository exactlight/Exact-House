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

  const slugPages = [...cities, ...situations].map((entry) => ({
    url: `${site.url}/${entry.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...slugPages];
}
