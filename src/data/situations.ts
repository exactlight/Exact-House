export type SituationProblem = { title: string; body: string };
export type SituationStep = { title: string; body: string };

export type Situation = {
  slug: string;
  name: string;
  formName: string;
  situationFieldValue: string;
  pageTitle: string;
  h1: string;
  heroIntro: string;
  highlight: { title: string; body: string } | null;
  problemsTitle: string;
  problemsSubtitle: string;
  problems: SituationProblem[];
  stepsTitle: string;
  steps: SituationStep[];
  ctaHeading: string;
  ctaBody: string;
};

export const situations: Situation[] = [
  {
    slug: "foreclosure",
    name: "Mortgage Delinquency",
    formName: "contact-foreclosure",
    situationFieldValue: "Foreclosure",
    pageTitle: "Stop Foreclosure - Sell Your House Fast | Exact House Wisconsin",
    h1: "Stop Foreclosure & Save Your Credit",
    heroIntro:
      "Facing foreclosure in Wisconsin? We buy houses fast for cash and help you avoid the auction. Keep your equity and protect your financial future.",
    highlight: {
      title: "Time is Running Out",
      body: "Every day counts when you're facing foreclosure. A public auction could cost you thousands in equity and damage your credit for 7 years. Let us help you sell on your terms - not the bank's.",
    },
    problemsTitle: "The Foreclosure Crisis You're Facing",
    problemsSubtitle:
      "We understand the specific problems foreclosure creates - and we have solutions",
    problems: [
      {
        title: "Problem 1: Losing Your Equity at Auction",
        body: "A public foreclosure auction usually results in the loss of ALL your equity. Banks just want to recover what they're owed - they don't care about getting you fair market value. You could lose tens of thousands of dollars.",
      },
      {
        title: "Problem 2: Credit Destroyed for 7 Years",
        body: "A foreclosure stays on your credit report for 7 years, making it nearly impossible to buy another home, get approved for a car loan, or even rent an apartment. Your financial future is on the line.",
      },
    ],
    stepsTitle: "How We Stop Foreclosure in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us Today",
        body: "Call, text, or fill out the form. We'll discuss your situation and timeline - even if the auction is days away.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair offers within 24 hours. No inspections, no repairs, no waiting for bank approvals.",
      },
      {
        title: "Close Fast & Walk Away",
        body: "We can close in as little as 3-7 days. Stop the auction, save your credit, and move forward with cash in hand.",
      },
    ],
    ctaHeading: "Don't Wait Until It's Too Late",
    ctaBody:
      "Every day you wait, you lose more options. The foreclosure process moves fast - but so do we. Call now and let's find a solution together.",
  },
  {
    slug: "divorce",
    name: "Divorce or Separation",
    formName: "contact-divorce",
    situationFieldValue: "Divorce",
    pageTitle: "Selling Your House During Divorce | Exact House Wisconsin",
    h1: "Selling Your House During Divorce",
    heroIntro:
      "Going through a divorce in Wisconsin? We make it easy to sell your house fast for cash. Fair division, no delays, and one less thing to worry about.",
    highlight: {
      title: "Move Forward with Confidence",
      body: "Divorce is hard enough without fighting over a house. We help both parties get a fair split quickly so you can both move on with your lives.",
    },
    problemsTitle: "The Divorce Home Sale Problems You're Facing",
    problemsSubtitle:
      "We understand what you're going through - and we have solutions",
    problems: [
      {
        title: "Problem 1: Court-Ordered Asset Division",
        body: "Most divorce court orders require the home to be sold to facilitate a 50/50 or equitable split of the equity. But traditional sales can take months, delaying your settlement and keeping you tied to your ex.",
      },
      {
        title: "Problem 2: Shared Mortgage Liability",
        body: "Neither party wants to be legally responsible for a mortgage on a home they no longer inhabit. If one person can't afford the payments alone, both credit scores are at risk.",
      },
      {
        title: "Problem 3: Emotional Closure",
        body: "The house is often the final \"tether\" to a past life that prevents both parties from truly moving on. Every month that passes with the house unsold keeps old wounds open.",
      },
    ],
    stepsTitle: "How We Help Divorcing Couples in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us",
        body: "Either party can reach out. We work with both spouses, attorneys, and mediators to make the process smooth.",
      },
      {
        title: "Get Your Fair Offer",
        body: "We make a fair cash offer that both parties can agree on. No negotiations, no games, just a straightforward solution.",
      },
      {
        title: "Close & Move On",
        body: "We handle all the paperwork and close on your timeline. Both parties get their share and can finally move forward.",
      },
    ],
    ctaHeading: "Ready to Close This Chapter?",
    ctaBody:
      "You've been through enough. Let us make selling the house the easiest part of your divorce. Fair, fast, and final.",
  },
  {
    slug: "inherited",
    name: "Inherited Property",
    formName: "contact-inherited",
    situationFieldValue: "Inherited Property",
    pageTitle: "Sell Inherited Property Fast | Exact House Wisconsin",
    h1: "Inherited a House? Sell It Fast",
    heroIntro:
      "Don't let an inherited property become a burden. We buy inherited houses in Wisconsin for cash - no probate delays, no repairs, no hassle.",
    highlight: {
      title: "Turn Your Inheritance Into Cash",
      body: "Whether you live out of state or just don't want the responsibility, we make it easy to sell quickly and move on.",
    },
    problemsTitle: "The Inherited Property Problems You're Facing",
    problemsSubtitle:
      "We understand the challenges of inheriting a home - and we have solutions",
    problems: [
      {
        title: "Problem 1: Out-of-State Management",
        body: "Heirs often live hundreds of miles away and cannot effectively manage a vacant property. Driving back and forth to check on the house, arrange repairs, or meet contractors is expensive and time-consuming.",
      },
      {
        title: "Problem 2: Tax & Utility Burden",
        body: "Ongoing property taxes, insurance, and utilities can quickly drain an estate's cash reserves. An empty house still costs money every single month while you wait to sell it.",
      },
      {
        title: "Problem 3: Sibling Conflict",
        body: "When multiple heirs own a home, selling is usually the only way to resolve disagreements over what to do with the asset. One wants to keep it, another wants to sell, tensions rise.",
      },
    ],
    stepsTitle: "How We Buy Inherited Properties in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us",
        body: "Call, text, or fill out the form. We work with executors, administrators, and heirs directly.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair offers on inherited properties. No inspections, no repairs needed, just a straightforward cash offer.",
      },
      {
        title: "Close & Get Paid",
        body: "We handle all the paperwork and close quickly. Turn your inherited property into cash you can use.",
      },
    ],
    ctaHeading: "Don't Let an Inheritance Become a Burden",
    ctaBody:
      "You have enough to deal with. Let us take the property off your hands quickly and fairly. Call now for your cash offer.",
  },
  {
    slug: "job-relocation",
    name: "Job Relocation",
    formName: "contact-job-relocation",
    situationFieldValue: "Job Relocation",
    pageTitle: "Relocating for Work? Sell Your House Fast | Exact House Wisconsin",
    h1: "Job Relocation? Sell Your House Fast",
    heroIntro:
      "Starting a new job in a new city? We buy houses fast for cash so you can get your equity out and move on without delay.",
    highlight: {
      title: "Your New Job Shouldn't Wait",
      body: "Don't let selling your house slow down your career move. We close in days, not months, so you can focus on your new opportunity.",
    },
    problemsTitle: "The Job Relocation Problems You're Facing",
    problemsSubtitle:
      "We understand the time pressure you're under - and we have solutions",
    problems: [
      {
        title: "Problem 1: Need Cash for New Home",
        body: "You need the cash from your current home to put a down payment on a home in your new city. But traditional home sales can take 2-6 months - you can't wait that long.",
      },
      {
        title: "Problem 2: The \"Commuter\" Drain",
        body: "Paying for a hotel or short-term rental in your new city while still paying a mortgage in the old one is financially unsustainable. You're bleeding money every month.",
      },
    ],
    stepsTitle: "How We Help Relocating Families in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us",
        body: "Tell us about your timeline and your new location. We understand you're on a deadline.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair cash offers within 24 hours. No waiting for inspections or buyer financing.",
      },
      {
        title: "Close & Move On",
        body: "Close in as little as 7 days. Get your cash and start your new job without the stress.",
      },
    ],
    ctaHeading: "Ready to Start Your New Chapter?",
    ctaBody:
      "Don't let selling your house hold you back from your career opportunity. Get your cash offer today and move forward with confidence.",
  },
  {
    slug: "senior-transition",
    name: "Senior Transition",
    formName: "contact-senior-transition",
    situationFieldValue: "Senior Transition",
    pageTitle:
      "Moving to Assisted Living? Sell Your House Fast | Exact House Wisconsin",
    h1: "Moving to Assisted Living or Memory Care?",
    heroIntro:
      "Need to sell your house to pay for senior care in Wisconsin? We buy houses fast for cash so you can get the funds you need for quality care.",
    highlight: {
      title: "Focus on Care, Not the House",
      body: "Your health and safety are what matter. Let us handle the house sale quickly so you or your loved one can get the care they need.",
    },
    problemsTitle: "The Senior Transition Problems You're Facing",
    problemsSubtitle:
      "We understand the urgency of getting quality care - and we have solutions",
    problems: [
      {
        title: "Problem 1: Need Cash for Care Costs",
        body: "Assisted living and memory care facilities often require high \"buy-in\" fees or expensive monthly costs. The equity in your home is the key to affording quality care, but traditional sales take too long.",
      },
      {
        title: "Problem 2: Home is No Longer Safe",
        body: "The current home (usually a multi-story) may no longer be safe for a resident with limited mobility. Stairs, narrow doorways, and bathtubs become serious fall hazards.",
      },
    ],
    stepsTitle: "How We Help Seniors & Families in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us",
        body: "Call or fill out the form. We work with seniors, family members, and healthcare advocates.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair cash offers on homes in any condition. No repairs, no showings, no stress.",
      },
      {
        title: "Close & Get Care",
        body: "We close fast and you get your cash. Use it for the care facility deposit, monthly costs, or medical expenses.",
      },
    ],
    ctaHeading: "Quality Care Can't Wait",
    ctaBody:
      "Your health and safety are the priority. Let us help you get the cash you need for quality senior care. Call now for your fair offer.",
  },
  {
    slug: "financial-strain",
    name: "Financial Strain",
    formName: "contact-financial-strain",
    situationFieldValue: "Financial Strain",
    pageTitle:
      "Can't Afford Your Mortgage? Sell Your House Fast | Exact House Wisconsin",
    h1: "Can't Afford Your Mortgage Payments?",
    heroIntro:
      "Rising taxes and insurance making it impossible to keep up? Sell your house for cash before you miss payments and damage your credit.",
    highlight: {
      title: "Cash Out Your Equity Before It's Too Late",
      body: "You're equity rich but cash poor. Sell now while you still have options and walk away with money in your pocket - not debt.",
    },
    problemsTitle: "The Financial Strain Problems You're Facing",
    problemsSubtitle:
      "Insurance and tax hikes are crushing homeowners - we have solutions",
    problems: [
      {
        title: "Problem 1: Can't Afford Monthly Payments",
        body: "Your property taxes and insurance have increased dramatically - up 17% since 2022 in many Wisconsin counties. The escrow portion of your mortgage payment is now unaffordable, and you're struggling to keep up with monthly costs.",
      },
      {
        title: "Problem 2: Heading Toward Debt",
        body: "You're equity rich but cash poor. If you keep the house, you'll eventually miss payments, damage your credit, and possibly face foreclosure. You need to \"cash out\" while you still can.",
      },
    ],
    stepsTitle: "How We Help Struggling Homeowners in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us",
        body: "Tell us about your situation. We understand the pressure you're under and we're here to help.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair cash offers based on your equity. No fees, no commissions, just a straightforward offer.",
      },
      {
        title: "Close & Get Relief",
        body: "We close fast, pay off your mortgage, and you walk away with cash. Financial relief is just days away.",
      },
    ],
    ctaHeading: "Get Financial Relief Before It's Too Late",
    ctaBody:
      "Don't let rising costs force you into foreclosure. Sell now, protect your credit, and walk away with cash. Call today for your offer.",
  },
  {
    slug: "tired-landlord",
    name: "Burned-Out Landlord",
    formName: "contact-tired-landlord",
    situationFieldValue: "Tired Landlord",
    pageTitle:
      "Tired of Being a Landlord? Sell Your Rental Fast | Exact House Wisconsin",
    h1: "Burned Out from Being a Landlord?",
    heroIntro:
      "Tired of dealing with tenants, repairs, and late-night emergencies? Sell your rental property for cash and get your life back.",
    highlight: {
      title: "End the Landlord Nightmare",
      body: "The mental toll isn't worth it anymore. Sell your rental property fast and move your capital into something that doesn't keep you up at night.",
    },
    problemsTitle: "The Landlord Burnout Problems You're Facing",
    problemsSubtitle: "We understand the exhaustion - and we have solutions",
    problems: [
      {
        title: "Problem 1: Management Exhaustion",
        body: "The mental toll of property maintenance and tenant disputes outweighs the rental income. Late-night calls about broken toilets, dealing with problem tenants, and constant repairs have burned you out completely.",
      },
      {
        title: "Problem 2: Property Losing Money",
        body: "If your property is cash-flow negative due to rising interest rates, insurance costs, or constant repairs, you're losing money every month. You want to move that capital into a safer investment like a high-yield CD or index fund.",
      },
    ],
    stepsTitle: "How We Help Burned-Out Landlords in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us",
        body: "Tell us about your rental property. We buy properties with tenants in place or vacant.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair cash offers on rental properties. No need to evict tenants or make repairs first.",
      },
      {
        title: "Close & Move On",
        body: "Close in days and get your cash. No more landlord stress - invest your money elsewhere.",
      },
    ],
    ctaHeading: "Ready to Stop Being a Landlord?",
    ctaBody:
      "Life's too short to deal with problem tenants and constant repairs. Sell your rental property now and get your peace of mind back.",
  },
  {
    slug: "double-mortgage",
    name: "Double Mortgage",
    formName: "contact-double-mortgage",
    situationFieldValue: "Double Mortgage",
    pageTitle:
      "Stuck with Two Mortgages? Sell Your House Fast | Exact House Wisconsin",
    h1: "Stuck Paying Two Mortgages?",
    heroIntro:
      "Bought your new house before selling the old one? We buy houses fast for cash so you can stop the financial bleeding.",
    highlight: {
      title: "End the Double Payment Nightmare",
      body: "Most families can't sustain two sets of housing costs for more than 60 days. Sell your old house NOW before you drain your savings.",
    },
    problemsTitle: "The Double Mortgage Crisis You're Facing",
    problemsSubtitle: "We understand the pressure - and we have solutions",
    problems: [
      {
        title: "Problem 1: Lender Won't Finalize New Loan",
        body: "Your offer on a new house was accepted before your old one sold. Now many lenders will not finalize the loan on the new house until the old house is under contract. Your debt-to-income ratio is too high.",
      },
      {
        title: "Problem 2: Financial Bleeding",
        body: "Most families cannot sustain two sets of housing costs for more than 60 days. You're paying two mortgages, two insurance policies, two sets of utilities - it's draining your savings fast.",
      },
    ],
    stepsTitle: "How We Help in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us ASAP",
        body: "Time is critical. Call us immediately and explain your double mortgage situation.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair cash offers within 24 hours. No waiting for buyers or financing contingencies.",
      },
      {
        title: "Close Fast & Breathe",
        body: "Close in 7-14 days. Stop bleeding money and enjoy your new home stress-free.",
      },
    ],
    ctaHeading: "Stop the Financial Drain Today",
    ctaBody:
      "Two mortgages will destroy your savings in weeks. Call now and let us solve this problem fast.",
  },
  {
    slug: "repairs",
    name: "Major Repairs Needed",
    formName: "contact-repairs",
    situationFieldValue: "Major Repairs",
    pageTitle:
      "House Needs Major Repairs? Sell As-Is for Cash | Exact House Wisconsin",
    h1: "House Needs Major Repairs? We Buy As-Is",
    heroIntro:
      "Roof, foundation, mold, or HVAC failure? Don't spend thousands on repairs. We buy houses in ANY condition for cash.",
    highlight: {
      title: "Sell Now, Avoid the Money Pit",
      body: "Major repairs cost tens of thousands and traditional buyers won't touch your house. Sell to us as-is and walk away with cash.",
    },
    problemsTitle: "The Major Repair Problems You're Facing",
    problemsSubtitle:
      "We understand you don't have the cash to fix it - and we have solutions",
    problems: [
      {
        title: "Problem 1: House is Unlivable",
        body: "If the HVAC or plumbing fails, the house becomes unlivable. You're facing a \"fire sale\" situation because you literally can't stay there. Bad roof? Mold? Foundation issues? These make the home unsafe and unsellable on the traditional market.",
      },
      {
        title: "Problem 2: Can't Sell with FHA/VA Loans",
        body: "Traditional buyers using FHA or VA loans cannot buy a house with major defects. Banks won't approve loans on properties that don't meet minimum standards. You're stuck unless you spend $30K+ on repairs you can't afford.",
      },
    ],
    stepsTitle: "How We Buy Problem Houses in 3 Simple Steps",
    steps: [
      {
        title: "Tell Us What's Wrong",
        body: "Call and describe the issues - roof, foundation, mold, HVAC, whatever. We've seen it all.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make fair offers accounting for the repairs needed. No surprises, no lowball offers.",
      },
      {
        title: "Close & Move On",
        body: "Close in 7-14 days. No repairs, no cleaning, no stress. We handle everything.",
      },
    ],
    ctaHeading: "Don't Fix It - Sell It As-Is",
    ctaBody:
      "Major repairs are expensive and stressful. Sell your problem house to us for cash and let us deal with the headaches.",
  },
  {
    slug: "tax-liens",
    name: "Tax Liens",
    formName: "contact-tax-liens",
    situationFieldValue: "Tax Liens",
    pageTitle:
      "Facing Tax Lien or IRS Seizure? Sell Your House Fast | Exact House Wisconsin",
    h1: "Facing Tax Lien or IRS Seizure?",
    heroIntro:
      "The county or IRS has placed a lien on your property? Sell fast for cash and stop the seizure before you lose everything.",
    highlight: {
      title: "The Clock is Ticking",
      body: "Legal fees and tax penalties are compounding daily. A fast sale is the only way to \"stop the bleeding\" and save your equity.",
    },
    problemsTitle: "The Tax Lien Crisis You're Facing",
    problemsSubtitle: "We understand the legal pressure - and we have solutions",
    problems: [
      {
        title: "Problem 1: Facing Legal Forfeiture",
        body: "The county or IRS is about to seize your home for pennies on the dollar. Once they take it, you lose ALL your equity. A forced seizure means you get almost nothing while the government gets your property.",
      },
      {
        title: "Problem 2: Fees Compounding Daily",
        body: "Ongoing litigation and tax penalties are compounding every single day. The longer you wait, the more you owe and the less equity you keep. Every day costs you hundreds or thousands in additional fees and interest.",
      },
    ],
    stepsTitle: "How We Stop Seizure in 3 Simple Steps",
    steps: [
      {
        title: "Contact Us Immediately",
        body: "Time is critical. Call now and tell us about your lien situation.",
      },
      {
        title: "Get Your Cash Offer",
        body: "We make offers accounting for the lien amount. You keep any remaining equity.",
      },
      {
        title: "Close & Stop Seizure",
        body: "Close in 7-14 days. We pay off the lien and you walk away with your equity intact.",
      },
    ],
    ctaHeading: "Don't Let Them Take Your Home",
    ctaBody:
      "A forced seizure means you lose everything. Sell now, pay off the lien, and keep your equity. Call today before it's too late.",
  },
];

export function getSituation(slug: string) {
  return situations.find((s) => s.slug === slug);
}
