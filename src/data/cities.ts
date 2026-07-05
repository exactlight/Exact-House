/**
 * City landing pages. `formName` values match the Netlify Forms that already
 * exist on the live exacthouse.com site — do not rename them, or the existing
 * SMS/Slack notification pipeline and form history will split.
 */
export type City = {
  slug: string;
  name: string;
  county: string;
  formName: string;
  intro: string;
  localNote: string;
};

export const cities: City[] = [
  {
    slug: "madison",
    name: "Madison",
    county: "Dane County",
    formName: "contact-madison",
    intro:
      "Madison's market moves fast — but a traditional listing still means showings, inspections, financing contingencies, and months of waiting. If your Madison house needs work or you simply need certainty, we'll make you a fair cash offer and close on your timeline.",
    localNote:
      "From the East Side to Fitchburg-adjacent neighborhoods, we buy houses all over the Madison area in any condition.",
  },
  {
    slug: "sun-prairie",
    name: "Sun Prairie",
    county: "Dane County",
    formName: "contact-sun-prairie",
    intro:
      "Sun Prairie has grown quickly, but not every house has kept up. Whether you own an older home that needs updating or a rental you're ready to be done with, we'll buy it as-is for cash.",
    localNote:
      "We're based just down the road in Lake Mills — Sun Prairie is home turf for us.",
  },
  {
    slug: "watertown",
    name: "Watertown",
    county: "Jefferson & Dodge County",
    formName: "contact-watertown",
    intro:
      "Watertown homeowners call us when they want a straightforward sale: no repairs, no open houses, no waiting on a buyer's bank. We make fair cash offers on houses in any condition, on both sides of the river.",
    localNote:
      "As a Jefferson County-area buyer, we know Watertown's older housing stock well — foundation quirks, knob-and-tube, and all.",
  },
  {
    slug: "fort-atkinson",
    name: "Fort Atkinson",
    county: "Jefferson County",
    formName: "contact-fort-atkinson",
    intro:
      "Selling a house in Fort Atkinson shouldn't take months. We buy houses near the Rock River and throughout Fort Atkinson for cash — any condition, any situation.",
    localNote:
      "We're a local Jefferson County buyer, not a national call center. You'll deal directly with us from offer to closing.",
  },
  {
    slug: "stoughton",
    name: "Stoughton",
    county: "Dane County",
    formName: "contact-stoughton",
    intro:
      "Whether it's a century home off Main Street that needs more work than it's worth or a family property you've inherited, we buy Stoughton houses as-is for cash.",
    localNote:
      "No commissions, no repairs, no cleaning — we've bought houses in every condition you can imagine.",
  },
  {
    slug: "oconomowoc",
    name: "Oconomowoc",
    county: "Waukesha County",
    formName: "contact-oconomowoc",
    intro:
      "Oconomowoc properties are in demand, but a traditional sale still isn't right for everyone. If you need speed, privacy, or a buyer who'll take the house exactly as it sits, we can help.",
    localNote:
      "We buy throughout the Lake Country area — houses, duplexes, and inherited properties in any condition.",
  },
  {
    slug: "beaver-dam",
    name: "Beaver Dam",
    county: "Dodge County",
    formName: "contact-beaver-dam",
    intro:
      "We buy houses throughout Beaver Dam and Dodge County for cash. Skip the repairs, the listings, and the uncertainty — get a fair offer and close on your schedule.",
    localNote:
      "Older home? Deferred maintenance? That's exactly what we buy. You don't need to fix a thing.",
  },
  {
    slug: "deforest",
    name: "DeForest",
    county: "Dane County",
    formName: "contact-deforest",
    intro:
      "DeForest homeowners choose us when they want a simple, certain sale. We pay cash, buy as-is, and work around your moving timeline — not the other way around.",
    localNote:
      "From Windsor to downtown DeForest, we make fair offers backed by real local knowledge.",
  },
  {
    slug: "waunakee",
    name: "Waunakee",
    county: "Dane County",
    formName: "contact-waunakee",
    intro:
      "Even in a strong market like Waunakee, some sales call for speed and simplicity. We buy houses for cash with no showings, no contingencies, and no surprises at closing.",
    localNote:
      "You pick the closing date — next month or next season, we work on your schedule.",
  },
  {
    slug: "whitewater",
    name: "Whitewater",
    county: "Walworth & Jefferson County",
    formName: "contact-whitewater",
    intro:
      "Own a rental near campus you're tired of managing? An inherited house you can't maintain from out of town? We buy Whitewater houses for cash in any condition.",
    localNote:
      "We regularly buy from tired landlords in college towns — tenants in place is not a problem.",
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
