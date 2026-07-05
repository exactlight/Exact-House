import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Seller Resources & Guides",
  description:
    "Straight answers for Wisconsin homeowners: selling inherited property, avoiding we-buy-houses scams, as-is sales, foreclosure options, and more.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <>
      <section className="bg-brand-50 px-4 py-14">
        <div className="mx-auto max-w-[900px]">
          <h1 className="heading-display text-center text-6xl text-brand-800">
            Seller Resources
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-[#666]">
            Straight answers for Wisconsin homeowners — no fluff, no pressure,
            written by the people who actually buy the houses.
          </p>
          <div className="mt-12 space-y-6">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block rounded-[15px] bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-transform hover:-translate-y-1"
              >
                <p className="text-sm font-semibold text-accent-600">
                  {new Date(`${p.date}T12:00:00`).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-brand-800">{p.title}</h2>
                <p className="mt-2 text-[#666]">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
