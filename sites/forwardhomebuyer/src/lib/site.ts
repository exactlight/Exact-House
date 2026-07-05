/**
 * Single source of truth for Forward Home Buyer business info.
 */
export const site = {
  name: "Forward Home Buyer",
  legalName: "Forward Home Buyer LLC",
  domain: "forwardhomebuyer.com",
  url: "https://forwardhomebuyer.com",
  tagline: "Get a Fair Cash Offer on Your Wisconsin Home in 24 Hours",
  description:
    "We buy houses across southern Wisconsin for cash. No repairs, no showings, no commissions. Fair cash offer in 24 hours, close in as little as 3 days. Call 920-397-2922.",

  phone: "920-397-2922",
  phoneHref: "tel:9203972922",
  smsHref: "sms:9203972922",
  email: "forwardhomebuyer@gmail.com",

  owner: "Ken",

  address: {
    locality: "Lake Mills",
    region: "WI",
    country: "US",
  },

  footerTagline: "We Buy Houses Across Southern Wisconsin",
  counties:
    "Serving Milwaukee, Waukesha, Racine, Rock, Walworth, Dane, Jefferson, and Dodge Counties",

  /** Existing lead pipeline — step-1 submissions also post here. */
  supabaseLeadEndpoint:
    "https://dqrqbrvkgayhtcxhpczt.supabase.co/functions/v1/notify-web-lead",

  /** Real claims carried over from the current site. */
  trustBar: [
    ["100+", "Homes Purchased"],
    ["24hr", "Offer Turnaround"],
    ["$0", "Fees & Commissions"],
    ["3", "Days to Close"],
  ],

  social: {},
} as const;
