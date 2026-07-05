/**
 * Single source of truth for business info used across the site.
 * Values verified against the live exacthouse.com (snapshots in design-reference/).
 */
export const site = {
  name: "Exact House",
  legalName: "Exact House LLC",
  domain: "exacthouse.com",
  url: "https://exacthouse.com",
  tagline: "We Buy Houses in Wisconsin - Fast, Fair Cash Offers",
  description:
    "Get a cash offer for your Wisconsin home in 24 hours. No repairs, no fees, fast closing in 3-5 days. Call Ken at 920-650-8300.",

  phone: "920-650-8300",
  phoneHref: "tel:9206508300",
  smsHref: "sms:9206508300",
  email: "ken@exacthouse.com",

  owner: "Ken Collins",

  address: {
    locality: "Lake Mills",
    region: "WI",
    country: "US",
  },

  footerTagline: "We Buy Houses in Southern Wisconsin",
  counties: "Serving Jefferson, Dane, Waukesha, Milwaukee, Dodge, and Columbia Counties",

  social: {
    facebook: "https://www.facebook.com/exacthouse/",
  },
} as const;
