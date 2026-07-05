/**
 * Seller-situation landing pages. `formName` values match the Netlify Forms
 * that already exist on the live exacthouse.com site — do not rename them.
 */
export type Situation = {
  slug: string;
  name: string;
  formName: string;
  headline: string;
  intro: string;
  points: string[];
};

export const situations: Situation[] = [
  {
    slug: "foreclosure",
    name: "Facing Foreclosure",
    formName: "contact-foreclosure",
    headline: "Behind on Payments? You Still Have Options.",
    intro:
      "Foreclosure moves fast in Wisconsin, but until the sheriff's sale, you're still in control of your house. Selling for cash can stop the process, protect what equity you have left, and keep a completed foreclosure off your record.",
    points: [
      "We can close before your sale date — often in as little as 7-14 days",
      "Pay off the mortgage and keep the remaining equity in your pocket",
      "No fees or commissions taken out of what you walk away with",
      "Confidential — no sign in the yard, no public showings",
    ],
  },
  {
    slug: "divorce",
    name: "Going Through Divorce",
    formName: "contact-divorce",
    headline: "Sell the House Simply, So You Can Both Move Forward.",
    intro:
      "Dividing a house is often the hardest part of a divorce. A fast, as-is cash sale turns the house into money that can actually be split — without months of showings while you're both in limbo.",
    points: [
      "One clean transaction with a firm date both sides can plan around",
      "No prepping or staging a house during an already stressful time",
      "We work with both parties and your attorneys, neutrally",
      "Close in weeks, not months — no financing fall-throughs",
    ],
  },
  {
    slug: "inherited",
    name: "Inherited a House",
    formName: "contact-inherited",
    headline: "Inherited a House You Don't Need? We Make It Easy.",
    intro:
      "An inherited house often comes with decades of belongings, deferred maintenance, and taxes that don't stop. We buy inherited and probate properties as-is — take what you want to keep, and leave the rest to us.",
    points: [
      "Take the keepsakes; leave the furniture, boxes, everything else",
      "We can wait for probate to finish and close when you're able to sell",
      "No fixing up a house that hasn't been updated in decades",
      "Fair to split among heirs: one cash number, one closing date",
    ],
  },
  {
    slug: "job-relocation",
    name: "Job Relocation",
    formName: "contact-job-relocation",
    headline: "New Job, New City — Don't Let the House Hold You Back.",
    intro:
      "When work moves you, the last thing you need is a house on the market 200 miles behind you. We'll buy it on a date that matches your start date, so you're not paying two housing bills.",
    points: [
      "Pick a closing date that lines up with your move",
      "No flying back for showings, inspections, or repairs",
      "Avoid months of double mortgage or rent payments",
      "We handle everything local after you're gone",
    ],
  },
  {
    slug: "senior-transition",
    name: "Senior Transition",
    formName: "contact-senior-transition",
    headline: "Moving to Assisted Living or Downsizing? We'll Make It Gentle.",
    intro:
      "Transitioning a parent — or yourself — out of a longtime family home is emotional enough without contractors and open houses. We buy as-is, on your family's timeline, with patience and respect.",
    points: [
      "Sell as-is: no updates, no cleanout, no repairs",
      "Flexible closing that follows your family's schedule",
      "Cash to help fund care or the next chapter",
      "We're happy to work with adult children and powers of attorney",
    ],
  },
  {
    slug: "financial-strain",
    name: "Financial Hardship",
    formName: "contact-financial-strain",
    headline: "When the House Is the Burden, Selling Can Be the Relief.",
    intro:
      "Medical bills, job loss, rising costs — sometimes the mortgage, taxes, and upkeep are the weight that tips things over. Selling for cash converts the house into breathing room, fast.",
    points: [
      "No out-of-pocket costs — we cover closing costs",
      "Stop the bleed of mortgage, taxes, utilities, and repairs",
      "Cash in weeks, not months of waiting and hoping",
      "Judgment-free: we've helped many neighbors in tight spots",
    ],
  },
  {
    slug: "tired-landlord",
    name: "Tired Landlord",
    formName: "contact-tired-landlord",
    headline: "Done Being a Landlord? Sell With the Tenants in Place.",
    intro:
      "Midnight calls, turnover costs, non-paying tenants, new regulations — when a rental stops being worth it, we'll buy it exactly as it stands. Occupied, vacant, or somewhere in between.",
    points: [
      "We buy with tenants in place — no need to empty the property",
      "Skip the make-ready: no paint, carpet, or punch lists",
      "Single-family rentals, duplexes, and small multifamily",
      "We handle tenant communication after closing",
    ],
  },
  {
    slug: "double-mortgage",
    name: "Two Mortgages",
    formName: "contact-double-mortgage",
    headline: "Paying for Two Houses? End the Overlap.",
    intro:
      "Bought the new house before the old one sold? Every month of overlap drains savings. We'll buy your previous home for cash with a firm closing date, so the double payments stop.",
    points: [
      "Firm closing date — no waiting on a retail buyer's financing",
      "Sell as-is, even if the old house needs work you can't fund now",
      "Stop double payments on mortgage, insurance, and utilities",
      "Close in as little as two weeks",
    ],
  },
  {
    slug: "repairs",
    name: "House Needs Major Repairs",
    formName: "contact-repairs",
    headline: "Too Many Repairs? Sell It Exactly As It Sits.",
    intro:
      "Roof, foundation, mold, fire damage, decades of deferred maintenance — the repairs that scare off retail buyers are our specialty. We rehab houses for a living, so you don't have to.",
    points: [
      "Truly as-is: we've bought houses other buyers wouldn't walk into",
      "No inspection repair lists, no lender-required fixes",
      "Don't spend money you don't have on a house you're leaving",
      "We see past the condition to the fair value underneath",
    ],
  },
  {
    slug: "tax-liens",
    name: "Behind on Property Taxes",
    formName: "contact-tax-liens",
    headline: "Property Tax Trouble? Sell Before the County Acts.",
    intro:
      "Unpaid property taxes accrue interest and can eventually cost you the house with nothing in return. Selling for cash pays the county off at closing and puts the remaining equity in your hands.",
    points: [
      "Tax liens are paid at closing out of proceeds — nothing out of pocket",
      "Act before a tax deed wipes out your equity entirely",
      "We move fast when county deadlines are close",
      "Confidential, judgment-free help from a local buyer",
    ],
  },
];

export function getSituation(slug: string) {
  return situations.find((s) => s.slug === slug);
}
