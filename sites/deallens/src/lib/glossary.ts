/**
 * Plain-English definitions shown as tap-to-reveal tooltips throughout the
 * app and on the /learn page. Written for someone analyzing their first deal.
 */
export const GLOSSARY: Record<string, { term: string; short: string; long: string }> = {
  arv: {
    term: "ARV (after-repair value)",
    short: "What the house will sell for once it's fixed up.",
    long: "The after-repair value is what the property should sell for after the rehab is done, based on recently sold comparable homes (\"comps\") of similar size, age, and condition nearby. Every other number in a deal hangs off this one, so estimate it from at least 3 sold comps — not listing prices, and not Zestimates.",
  },
  mao: {
    term: "Maximum allowable offer",
    short: "The most you can pay and still hit your profit target.",
    long: "Work backwards from the sale: start with the ARV, subtract selling costs, holding costs, financing costs, the rehab budget, and the profit you require — what's left is the most you can offer. Pay more than this and the extra comes straight out of your profit.",
  },
  rule70: {
    term: "The 70% rule",
    short: "Offer at most 70% of ARV minus repairs — a quick screen, not gospel.",
    long: "A rule of thumb flippers use to screen deals fast: pay no more than 70% of the ARV minus repair costs. The 30% margin approximates selling costs, holding costs, financing, and profit. It's a first filter — DealLens also solves the precise number from your actual costs and profit target, which matters in expensive or very cheap markets where 70% is miscalibrated.",
  },
  noi: {
    term: "NOI (net operating income)",
    short: "Rent money left after operating expenses, before the mortgage.",
    long: "Annual rental income minus vacancy and all operating expenses — taxes, insurance, maintenance, capital reserves, management. The mortgage is deliberately excluded, so NOI measures the property itself, not your financing. Lenders and appraisers value rentals off NOI.",
  },
  caprate: {
    term: "Cap rate",
    short: "NOI divided by what the property costs — its yield if bought in cash.",
    long: "The capitalization rate is annual NOI divided by the all-in cost of the property. It's the return the building itself produces, ignoring financing — which makes it the standard way to compare rentals to each other and to other markets.",
  },
  coc: {
    term: "Cash-on-cash return",
    short: "Annual cash flow divided by the cash you actually put in.",
    long: "Annual pre-tax cash flow divided by the actual cash you invested (down payment, closing costs, rehab). Where cap rate measures the building, cash-on-cash measures your money. Many rental investors want 8%+ — compare it to what the same cash earns elsewhere.",
  },
  dscr: {
    term: "DSCR (debt service coverage ratio)",
    short: "NOI divided by mortgage payments — lenders want 1.2× or better.",
    long: "Net operating income divided by annual mortgage payments. At 1.0× the rent exactly covers the mortgage with zero cushion. Investment-property lenders typically require 1.2×–1.25× to approve a loan, so this number decides whether a BRRRR refinance is even possible.",
  },
  brrrr: {
    term: "BRRRR",
    short: "Buy, Rehab, Rent, Refinance, Repeat — recycle your cash into the next deal.",
    long: "Buy a distressed property, rehab it, rent it out, then refinance based on its new (higher) value. The refinance pays back most or all of the cash you put in — which you then use for the next deal. Done well, you keep the rental and your money. The catch: it needs the rehab to genuinely raise the value, and the refi payment must still leave positive cash flow.",
  },
  wholesale: {
    term: "Wholesaling",
    short: "Contract a property below market, then sell the contract to an investor for a fee.",
    long: "Put a property under contract at a deep discount, then assign that contract to a cash buyer (usually a flipper) for an assignment fee — typically $5K–$15K. You never own the house, so it needs little capital. But the contract price must be low enough that the deal still works for your buyer after your fee, which is why the spread math matters. Some states regulate assignment — check yours.",
  },
  vacancy: {
    term: "Vacancy allowance",
    short: "Budgeted rent lost to empty months between tenants.",
    long: "No rental is occupied 100% of the time. Budgeting ~8% of gross rent (about one month per year) for turnover and vacancy keeps one empty month from wrecking your numbers. Skipping this line is the most common way new investors overestimate cash flow.",
  },
  capex: {
    term: "CapEx reserve",
    short: "Savings for big-ticket items: roof, furnace, water heater.",
    long: "Capital expenditures are the large, infrequent replacements — roof, HVAC, siding, water heater. They're not monthly bills, but they are real costs: a $12,000 roof over 20 years is $50 every month. Reserving ~5% of rent means the money exists when the furnace dies.",
  },
  hardmoney: {
    term: "Hard money loan",
    short: "Short-term, asset-based loan for flips — fast but expensive.",
    long: "A short-term loan (6–18 months) from a private lender, secured by the property rather than your income. Typical terms: 80–90% of purchase-plus-rehab cost, 10–13% interest-only, plus 1–3 \"points\" up front (each point is 1% of the loan). Expensive, but it lets you buy and renovate houses banks won't touch — the cost is priced into the deal, which is exactly what this analyzer does.",
  },
  private: {
    term: "Private / gap lending",
    short: "An individual's capital, on whatever terms you negotiate.",
    long: "Money from a private individual — often another investor, a self-directed retirement account, or a \"gap\" lender who covers the slice hard money won't. There's no rate sheet: the LTC, rate, and points are whatever the two of you agree to, which is why DealLens lets you edit them. Frequently cheaper than hard money and, like it, usually funds the rehab too. The relationship and a clear written note matter as much as the numbers.",
  },
  seller: {
    term: "Seller financing",
    short: "The seller becomes your lender instead of getting cashed out.",
    long: "Rather than a bank funding the purchase, the seller carries a note and you pay them over time — often with a down payment, a softer rate, and no points. It shines when a seller owns free-and-clear and wants steady income (or to spread their tax hit). Note the loan is against the purchase price only, so you still fund the rehab in cash — DealLens accounts for that, which is why cash-needed jumps versus hard money.",
  },
  conventional: {
    term: "Bank / conventional (DSCR) loan",
    short: "A traditional or investor mortgage — cheap, but it won't fund a gut rehab.",
    long: "A bank loan on the purchase: either a conforming mortgage or, for investors, a DSCR loan that qualifies on the property's rent rather than your W-2. Rates are the lowest of any method, but banks lend on the as-is purchase and won't finance a heavy rehab, so you cover that in cash. It fits light-rehab buy-and-holds better than distressed flips. Your long-term rental mortgage and the BRRRR cash-out refi are modeled separately in Rental assumptions.",
  },
  holding: {
    term: "Holding costs",
    short: "What the house costs you every month you own it.",
    long: "Property taxes, insurance, utilities, and HOA dues accrue every month between buying and selling. A flip that drags from 4 months to 8 pays double — which is why the stress test lets you see exactly what a slow sale does to profit.",
  },
  spread: {
    term: "Wholesale spread",
    short: "The gap between your contract price and what a flipper can pay.",
    long: "Your assignment fee comes out of the spread: what an end buyer (flipper) can afford to pay, minus your contract price. If a flipper's max is $135K and you contract at $120K, there's $15K of room. No spread, no deal — wholesaling only works when you contract deep below market.",
  },
  onepct: {
    term: "The 1% rule",
    short: "Monthly rent ≥ 1% of purchase price suggests decent cash flow.",
    long: "A screening shortcut for rentals: if the monthly rent is at least 1% of the purchase price ($1,500 rent on a $150K house), the property has a shot at positive cash flow. Below ~0.7% it rarely works with today's rates. Like the 70% rule, it's a filter to decide what's worth a full analysis — not the analysis itself.",
  },
  equity: {
    term: "Equity",
    short: "The slice of the property's value you actually own.",
    long: "Market value minus what you owe on it. Forced appreciation — buying under market and rehabbing — creates equity immediately, which is the engine behind both flipping (sell the equity) and BRRRR (borrow against it while keeping the house).",
  },
  resilience: {
    term: "Resilience score",
    short: "How much bad news the deal can absorb before losing money.",
    long: "DealLens solves for the break-even point on each risk: how far the rehab can run over, how low the ARV can come in, and how much rent can miss before the deal loses money. A deal that only works when everything goes perfectly is a gamble, not an investment. New investors' most common mistake is buying deals with no margin for error.",
  },
};

export type GlossaryKey = keyof typeof GLOSSARY;
