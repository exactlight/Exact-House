export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  /** City-page slugs this quote appears on (the customer's city or one nearby). */
  citySlugs: string[];
  videoId?: string;
};

/*
 * Real customer pull quotes provided by Ken, July 2026. Do not invent or
 * edit quotes. Each is shown on /testimonials and on the city pages listed
 * in citySlugs.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "I expected a long, stressful process, but Exact House made everything simple from the first call. I always knew what was happening next.",
    name: "Sarah M.",
    location: "Madison, WI",
    citySlugs: ["madison", "deforest", "waunakee"],
  },
  {
    quote:
      "The house needed more work than I could handle. They bought it as-is, and I didn't have to repair, clean, or prepare a thing.",
    name: "Mike T.",
    location: "Janesville, WI",
    citySlugs: ["whitewater"],
  },
  {
    quote:
      "I was running out of time and felt like I had no good options. Exact House moved quickly, kept their word, and gave me room to breathe.",
    name: "Jennifer R.",
    location: "Beloit, WI",
    citySlugs: ["stoughton"],
  },
  {
    quote:
      "Selling my rental with repairs and tenant issues hanging over me felt impossible. Exact House helped me make a clean, easy exit.",
    name: "Dan K.",
    location: "Sun Prairie, WI",
    citySlugs: ["sun-prairie", "deforest"],
  },
  {
    quote:
      "No showings, no open houses, and no strangers walking through the property. It was straightforward and worked around my schedule.",
    name: "Lisa B.",
    location: "Fitchburg, WI",
    citySlugs: ["madison"],
  },
  {
    quote:
      "I inherited a house I couldn't afford to maintain. They were patient, respectful, and never made me feel pressured.",
    name: "Tom H.",
    location: "Stoughton, WI",
    citySlugs: ["stoughton"],
  },
  {
    quote:
      "What impressed me most was that the offer didn't suddenly change at the last minute. They did exactly what they said they would do.",
    name: "Amy S.",
    location: "Verona, WI",
    citySlugs: ["madison"],
  },
  {
    quote:
      "I had been putting off the sale for months because the whole situation felt overwhelming. After one conversation, it finally felt manageable.",
    name: "Brian P.",
    location: "Monroe, WI",
    citySlugs: [],
  },
  {
    quote:
      "They let me choose the closing date and worked around my moving plans. That flexibility made a difficult situation so much easier.",
    name: "Melissa J.",
    location: "Fort Atkinson, WI",
    citySlugs: ["fort-atkinson"],
  },
  {
    quote:
      "The property had years of deferred maintenance, and I didn't have the money or energy to fix it. Exact House gave me a clear way forward.",
    name: "Steve W.",
    location: "Whitewater, WI",
    citySlugs: ["whitewater"],
  },
  {
    quote:
      "Everything was explained in plain English. There were no surprises, confusing fine print, or unexpected last-minute fees.",
    name: "Nicole C.",
    location: "Elkhorn, WI",
    citySlugs: ["whitewater"],
  },
  {
    quote:
      "My rental had become a constant source of calls, repairs, and stress. Selling it to Exact House gave me my time and peace of mind back.",
    name: "Jason L.",
    location: "Watertown, WI",
    citySlugs: ["watertown", "beaver-dam"],
  },
  {
    quote:
      "I needed certainty more than anything. They gave me a clear offer, a clear closing date, and followed through on both.",
    name: "Karen D.",
    location: "Lake Geneva, WI",
    citySlugs: ["oconomowoc"],
  },
  {
    quote:
      "I thought selling a house as-is would be complicated. It ended up being the easiest real estate transaction I've ever experienced.",
    name: "Kevin F.",
    location: "Burlington, WI",
    citySlugs: ["oconomowoc"],
  },
  {
    quote:
      "The relief I felt after closing was immediate. I could finally stop worrying about the house and start moving forward.",
    name: "Rachel G.",
    location: "Racine, WI",
    citySlugs: ["oconomowoc"],
  },
];

export function testimonialsForCity(slug: string): Testimonial[] {
  return testimonials.filter((t) => t.citySlugs.includes(slug));
}
