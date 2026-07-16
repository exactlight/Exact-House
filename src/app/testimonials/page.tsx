import type { Metadata } from "next";
import { site } from "@/lib/site";
import CtaBanner from "@/components/CtaBanner";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description: `What Wisconsin homeowners say about selling their house to ${site.name}.`,
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-brand-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-center text-4xl font-bold text-brand-800">
            What Homeowners Say
          </h1>

          {testimonials.length === 0 ? (
            <div className="mx-auto mt-10 max-w-xl rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-brand-100">
              <p className="text-brand-700/90">
                We&apos;re gathering written and video reviews from the homeowners
                we&apos;ve worked with, and they&apos;ll appear here shortly. In the
                meantime, we&apos;re glad to provide references. Just ask.
              </p>
              <p className="mt-4 text-brand-700/90">
                You can also find us on{" "}
                <a
                  href={site.social.facebook}
                  className="font-semibold text-accent-600"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Facebook
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {testimonials.map((t) => (
                <figure
                  key={`${t.name}-${t.location}`}
                  className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-100"
                >
                  {t.videoId ? (
                    <div className="mb-4 aspect-video overflow-hidden rounded-lg">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${t.videoId}`}
                        title={`Testimonial from ${t.name}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : null}
                  <blockquote className="text-brand-800">“{t.quote}”</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-brand-700/80">
                    {t.name}, {t.location}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
