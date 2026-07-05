import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cities } from "@/data/cities";
import { situations } from "@/data/situations";
import { getAllPosts } from "@/lib/blog";

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

  const blogPages = [
    { url: `${site.url}/blog`, changeFrequency: "weekly" as const, priority: 0.6 },
    ...getAllPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...slugPages, ...blogPages];
}
