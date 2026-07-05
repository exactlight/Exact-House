import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "@/lib/blog";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/CtaBanner";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="bg-white px-4 py-14">
        <div className="mx-auto max-w-[760px]">
          <p className="text-sm font-semibold text-accent-600">
            <Link href="/blog" className="hover:underline">← Seller Resources</Link>
          </p>
          <h1 className="heading-display mt-3 text-5xl text-brand-800 sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-[#888]">
            {new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {site.name}
          </p>
          <div
            className="prose-eh mt-8"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>
      <CtaBanner heading="Have a House to Sell? Let's Talk." />
    </>
  );
}
