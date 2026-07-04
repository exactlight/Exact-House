/**
 * Single source of truth for business info used across the site.
 * Update values here — every page, header, footer, and schema block reads from this.
 */
export const site = {
  name: "Exact House",
  legalName: "Exact House LLC",
  domain: "exacthouse.com",
  url: "https://exacthouse.com",
  tagline: "Sell Your House Fast for Cash in South-Central Wisconsin",
  description:
    "Exact House buys houses for cash in South-Central Wisconsin. Any condition, on your schedule. No fees, no commissions, no repairs — get a fair cash offer today.",

  phone: "(920) 397-9663",
  phoneHref: "tel:+19203979663",
  smsHref: "sms:+19203979663",
  email: "ken@exacthouse.com",

  owner: "Ken Collins",

  address: {
    locality: "Lake Mills",
    region: "WI",
    country: "US",
  },

  serviceArea: [
    "Lake Mills",
    "Madison",
    "Sun Prairie",
    "Watertown",
    "Fort Atkinson",
    "Jefferson",
    "Waterloo",
    "Cambridge",
    "Johnson Creek",
    "Deerfield",
    "Cottage Grove",
    "Oconomowoc",
  ],

  social: {
    facebook: "https://www.facebook.com/exacthouse/",
  },
} as const;
