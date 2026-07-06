/**
 * DealLens analysis engine — pure functions, no I/O.
 *
 * One set of property inputs is evaluated against four exit strategies
 * (fix & flip, BRRRR, buy & hold rental, wholesale). Every formula here is
 * a standard industry calculation; the point of the app is running all of
 * them at once and translating the results into plain English.
 */

export type Financing = "cash" | "hardMoney";

export type DealInputs = {
  address: string;
  purchasePrice: number;
  arv: number; // after-repair value
  rehabCost: number;
  monthlyRent: number; // market rent after rehab

  // carrying costs
  taxesYearly: number;
  insuranceYearly: number;
  utilitiesMonthly: number;
  hoaMonthly: number;

  // flip / project assumptions
  monthsHeld: number; // purchase → resale (flip) or refi (BRRRR)
  buyClosingPct: number; // % of purchase price
  sellCostPct: number; // % of ARV (agent commission + seller closing)

  // acquisition financing
  financing: Financing;
  hardMoneyLtcPct: number; // loan as % of (purchase + rehab)
  hardMoneyRatePct: number; // annual, interest-only
  hardMoneyPointsPct: number; // % of loan, paid up front

  // rental assumptions
  vacancyPct: number; // % of gross rent
  maintenancePct: number; // % of gross rent
  capexPct: number; // % of gross rent
  managementPct: number; // % of gross rent
  rentalDownPct: number; // conventional down payment (buy & hold)
  rentalRatePct: number; // 30-yr conventional rate
  refiLtvPct: number; // BRRRR cash-out refi LTV
  refiRatePct: number; // 30-yr refi rate

  // investor targets
  targetFlipProfit: number;
  targetMonthlyCashflow: number;
  targetWholesaleFee: number;
};

export const DEFAULT_INPUTS: DealInputs = {
  address: "",
  purchasePrice: 150000,
  arv: 250000,
  rehabCost: 40000,
  monthlyRent: 1800,

  taxesYearly: 3600,
  insuranceYearly: 1400,
  utilitiesMonthly: 150,
  hoaMonthly: 0,

  monthsHeld: 6,
  buyClosingPct: 2,
  sellCostPct: 8,

  financing: "hardMoney",
  hardMoneyLtcPct: 85,
  hardMoneyRatePct: 11,
  hardMoneyPointsPct: 2,

  vacancyPct: 8,
  maintenancePct: 8,
  capexPct: 5,
  managementPct: 8,
  rentalDownPct: 20,
  rentalRatePct: 7.25,
  refiLtvPct: 75,
  refiRatePct: 7.25,

  targetFlipProfit: 30000,
  targetMonthlyCashflow: 200,
  targetWholesaleFee: 10000,
};

/** Monthly principal-and-interest payment on a fully amortized loan. */
export function monthlyPI(loan: number, annualRatePct: number, years = 30): number {
  if (loan <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export type Grade = "A" | "B" | "C" | "D" | "F";

export function gradeOf(score: number): Grade {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

// ---------------------------------------------------------------------------
// Fix & flip
// ---------------------------------------------------------------------------

export type FlipResult = {
  profit: number;
  totalCost: number;
  cashInvested: number;
  roiPct: number; // cash-on-cash for the project
  annualizedRoiPct: number;
  loanAmount: number;
  points: number;
  interest: number;
  holdingCosts: number;
  buyClosing: number;
  sellCosts: number;
  /** Precise max offer that still hits the target profit. */
  maxOfferForTarget: number;
  /** The classic 70% rule of thumb, for comparison. */
  mao70: number;
  score: number;
};

export function holdingMonthly(i: DealInputs): number {
  return i.taxesYearly / 12 + i.insuranceYearly / 12 + i.utilitiesMonthly + i.hoaMonthly;
}

/**
 * Per-dollar-of-loan financing cost over the hold:
 * up-front points plus interest-only payments.
 */
function hardMoneyCostFactor(i: DealInputs): number {
  if (i.financing !== "hardMoney") return 0;
  return i.hardMoneyPointsPct / 100 + (i.hardMoneyRatePct / 100) * (i.monthsHeld / 12);
}

export function analyzeFlip(i: DealInputs): FlipResult {
  const buyClosing = i.purchasePrice * (i.buyClosingPct / 100);
  const holding = holdingMonthly(i) * i.monthsHeld;
  const sellCosts = i.arv * (i.sellCostPct / 100);

  const loanAmount =
    i.financing === "hardMoney" ? (i.hardMoneyLtcPct / 100) * (i.purchasePrice + i.rehabCost) : 0;
  const points = loanAmount * (i.hardMoneyPointsPct / 100);
  const interest = loanAmount * (i.hardMoneyRatePct / 100) * (i.monthsHeld / 12);

  const totalCost = i.purchasePrice + i.rehabCost + buyClosing + holding + points + interest + sellCosts;
  const profit = i.arv - totalCost;
  const cashInvested = Math.max(
    1,
    i.purchasePrice + i.rehabCost + buyClosing + points + interest + holding - loanAmount,
  );
  const roiPct = (profit / cashInvested) * 100;
  const annualizedRoiPct = roiPct * (12 / Math.max(1, i.monthsHeld));

  // Solve purchase price P so profit === target:
  //   profit = ARV·(1 − s) − P·(1 + c) − rehab − holding − ltc·(P + rehab)·k
  // where k = points% + rate%·months/12 and ltc applies only for hard money.
  const k = hardMoneyCostFactor(i);
  const ltc = i.financing === "hardMoney" ? i.hardMoneyLtcPct / 100 : 0;
  const numerator =
    i.arv * (1 - i.sellCostPct / 100) -
    i.rehabCost -
    holding -
    ltc * i.rehabCost * k -
    i.targetFlipProfit;
  const denominator = 1 + i.buyClosingPct / 100 + ltc * k;
  const maxOfferForTarget = Math.max(0, numerator / denominator);

  const mao70 = Math.max(0, 0.7 * i.arv - i.rehabCost);

  // Score: hitting the target profit is worth 60; project ROI up to 40.
  let score = 0;
  if (profit > 0) {
    score = 60 * clamp(profit / Math.max(1, i.targetFlipProfit), 0, 1) + 40 * clamp(roiPct / 30, 0, 1);
  }
  return {
    profit,
    totalCost,
    cashInvested,
    roiPct,
    annualizedRoiPct,
    loanAmount,
    points,
    interest,
    holdingCosts: holding,
    buyClosing,
    sellCosts,
    maxOfferForTarget,
    mao70,
    score: Math.round(clamp(score, 0, 100)),
  };
}

// ---------------------------------------------------------------------------
// Buy & hold rental (conventional financing)
// ---------------------------------------------------------------------------

export type RentalResult = {
  loanAmount: number;
  monthlyPI: number;
  grossAnnualRent: number;
  vacancyLoss: number;
  operatingExpenses: number; // annual, excludes debt service
  noi: number; // annual net operating income
  annualDebtService: number;
  monthlyCashflow: number;
  capRatePct: number; // NOI / all-in project cost
  cashOnCashPct: number;
  dscr: number; // NOI / debt service
  cashInvested: number;
  rentToPricePct: number; // the "1% rule"
  score: number;
};

function rentalMetrics(
  i: DealInputs,
  loanAmount: number,
  ratePct: number,
  cashInvested: number,
): RentalResult {
  const gross = i.monthlyRent * 12;
  const vacancyLoss = gross * (i.vacancyPct / 100);
  const pctOfRent = (i.maintenancePct + i.capexPct + i.managementPct) / 100;
  const operatingExpenses =
    i.taxesYearly + i.insuranceYearly + i.hoaMonthly * 12 + gross * pctOfRent;
  const noi = gross - vacancyLoss - operatingExpenses;
  const pi = monthlyPI(loanAmount, ratePct);
  const annualDebtService = pi * 12;
  const annualCashflow = noi - annualDebtService;
  const allIn = i.purchasePrice + i.rehabCost + i.purchasePrice * (i.buyClosingPct / 100);
  const capRatePct = allIn > 0 ? (noi / allIn) * 100 : 0;
  const cashOnCashPct = cashInvested > 0 ? (annualCashflow / cashInvested) * 100 : 0;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : Infinity;
  const rentToPricePct = i.purchasePrice > 0 ? (i.monthlyRent / i.purchasePrice) * 100 : 0;

  const monthlyCashflow = annualCashflow / 12;
  // Score: cash flow vs target (50), cash-on-cash vs 8% (30), DSCR vs 1.2 (20).
  let score = 0;
  if (monthlyCashflow > 0) {
    score =
      50 * clamp(monthlyCashflow / Math.max(1, i.targetMonthlyCashflow), 0, 1) +
      30 * clamp(cashOnCashPct / 8, 0, 1) +
      20 * clamp((dscr - 1) / 0.2, 0, 1);
  }

  return {
    loanAmount,
    monthlyPI: pi,
    grossAnnualRent: gross,
    vacancyLoss,
    operatingExpenses,
    noi,
    annualDebtService,
    monthlyCashflow,
    capRatePct,
    cashOnCashPct,
    dscr,
    cashInvested,
    rentToPricePct,
    score: Math.round(clamp(score, 0, 100)),
  };
}

export function analyzeRental(i: DealInputs): RentalResult {
  const down = i.purchasePrice * (i.rentalDownPct / 100);
  const loan = i.purchasePrice - down;
  const buyClosing = i.purchasePrice * (i.buyClosingPct / 100);
  const cashInvested = down + buyClosing + i.rehabCost;
  return rentalMetrics(i, loan, i.rentalRatePct, cashInvested);
}

// ---------------------------------------------------------------------------
// BRRRR (buy, rehab, rent, refinance, repeat)
// ---------------------------------------------------------------------------

export type BrrrrResult = {
  phaseCashIn: number; // cash out of pocket through rehab
  refiLoan: number;
  refiClosing: number;
  cashOutAtRefi: number; // refi proceeds after paying off acquisition loan
  cashLeftInDeal: number; // phaseCashIn − cashOut (negative = pulled out extra)
  pctCashRecovered: number; // 0–100+, >100 means over-recovered
  equityAfterRefi: number;
  rental: RentalResult; // post-refi rental performance
  infiniteReturn: boolean;
  score: number;
};

export function analyzeBrrrr(i: DealInputs): BrrrrResult {
  const buyClosing = i.purchasePrice * (i.buyClosingPct / 100);
  const holding = holdingMonthly(i) * i.monthsHeld;
  const loanAmount =
    i.financing === "hardMoney" ? (i.hardMoneyLtcPct / 100) * (i.purchasePrice + i.rehabCost) : 0;
  const points = loanAmount * (i.hardMoneyPointsPct / 100);
  const interest = loanAmount * (i.hardMoneyRatePct / 100) * (i.monthsHeld / 12);

  const phaseCashIn = Math.max(
    1,
    i.purchasePrice + i.rehabCost + buyClosing + points + interest + holding - loanAmount,
  );

  const refiLoan = i.arv * (i.refiLtvPct / 100);
  const refiClosing = refiLoan * 0.015;
  const cashOutAtRefi = refiLoan - loanAmount - refiClosing;
  const cashLeftInDeal = phaseCashIn - cashOutAtRefi;
  const pctCashRecovered = (cashOutAtRefi / phaseCashIn) * 100;
  const equityAfterRefi = i.arv - refiLoan;

  const rental = rentalMetrics(i, refiLoan, i.refiRatePct, Math.max(0, cashLeftInDeal));
  const infiniteReturn = cashLeftInDeal <= 0 && rental.monthlyCashflow > 0;

  // Score: cash recovered (50) + post-refi cash flow vs target (50).
  // A BRRRR that loses money monthly scores 0 regardless of recovery.
  let score = 0;
  if (rental.monthlyCashflow > 0) {
    score =
      50 * clamp(pctCashRecovered / 100, 0, 1) +
      50 * clamp(rental.monthlyCashflow / Math.max(1, i.targetMonthlyCashflow), 0, 1);
    if (infiniteReturn) score = Math.max(score, 90);
  }

  return {
    phaseCashIn,
    refiLoan,
    refiClosing,
    cashOutAtRefi,
    cashLeftInDeal,
    pctCashRecovered,
    equityAfterRefi,
    rental,
    infiniteReturn,
    score: Math.round(clamp(score, 0, 100)),
  };
}

// ---------------------------------------------------------------------------
// Wholesale
// ---------------------------------------------------------------------------

export type WholesaleResult = {
  buyerMao: number; // what a flipper can pay (70% rule)
  spread: number; // buyerMao − your contract price
  hitsTargetFee: boolean;
  score: number;
};

export function analyzeWholesale(i: DealInputs): WholesaleResult {
  const buyerMao = Math.max(0, 0.7 * i.arv - i.rehabCost);
  const spread = buyerMao - i.purchasePrice;
  const hitsTargetFee = spread >= i.targetWholesaleFee;
  let score = 0;
  if (spread > 0) {
    score = 100 * clamp(spread / Math.max(1, i.targetWholesaleFee * 1.5), 0, 1);
  }
  return { buyerMao, spread, hitsTargetFee, score: Math.round(clamp(score, 0, 100)) };
}

// ---------------------------------------------------------------------------
// Stress test
// ---------------------------------------------------------------------------

export type Stress = {
  rehabOverrunPct: number; // 0–50
  arvMissPct: number; // 0–20
  rentMissPct: number; // 0–20
  extraMonths: number; // 0–12
};

export const NO_STRESS: Stress = { rehabOverrunPct: 0, arvMissPct: 0, rentMissPct: 0, extraMonths: 0 };

export function applyStress(i: DealInputs, s: Stress): DealInputs {
  return {
    ...i,
    rehabCost: i.rehabCost * (1 + s.rehabOverrunPct / 100),
    arv: i.arv * (1 - s.arvMissPct / 100),
    monthlyRent: i.monthlyRent * (1 - s.rentMissPct / 100),
    monthsHeld: i.monthsHeld + s.extraMonths,
  };
}

export type BreakEvens = {
  /** % the rehab can run over before flip profit hits $0 (null if already ≤ 0). */
  maxRehabOverrunPct: number | null;
  /** % the ARV can come in under before flip profit hits $0 (null if already ≤ 0). */
  maxArvMissPct: number | null;
  /** % the rent can come in under before rental cash flow hits $0 (null if already ≤ 0). */
  maxRentMissPct: number | null;
  /** 0–100 — how much simultaneous bad news the deal absorbs before losing money. */
  resilienceScore: number;
};

/** Bisection on a monotonically decreasing metric; returns the zero-crossing. */
function solveBreakEven(metric: (pct: number) => number, maxPct: number): number | null {
  if (metric(0) <= 0) return null;
  if (metric(maxPct) > 0) return maxPct; // survives the whole tested range
  let lo = 0;
  let hi = maxPct;
  for (let iter = 0; iter < 40; iter++) {
    const mid = (lo + hi) / 2;
    if (metric(mid) > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function computeBreakEvens(i: DealInputs): BreakEvens {
  const MAX = 100;
  const maxRehabOverrunPct = solveBreakEven(
    (pct) => analyzeFlip(applyStress(i, { ...NO_STRESS, rehabOverrunPct: pct })).profit,
    MAX,
  );
  const maxArvMissPct = solveBreakEven(
    (pct) => analyzeFlip(applyStress(i, { ...NO_STRESS, arvMissPct: pct })).profit,
    MAX,
  );
  const maxRentMissPct = solveBreakEven(
    (pct) => analyzeRental(applyStress(i, { ...NO_STRESS, rentMissPct: pct })).monthlyCashflow,
    MAX,
  );

  // Resilience: how far each cushion goes, normalized against a "comfortable"
  // margin (20% rehab overrun / 10% ARV miss / 15% rent miss all absorbed).
  const parts = [
    clamp((maxRehabOverrunPct ?? 0) / 20, 0, 1),
    clamp((maxArvMissPct ?? 0) / 10, 0, 1),
    clamp((maxRentMissPct ?? 0) / 15, 0, 1),
  ];
  const resilienceScore = Math.round((100 * parts.reduce((a, b) => a + b, 0)) / parts.length);

  return { maxRehabOverrunPct, maxArvMissPct, maxRentMissPct, resilienceScore };
}

// ---------------------------------------------------------------------------
// Full analysis + verdict
// ---------------------------------------------------------------------------

export type StrategyKey = "flip" | "brrrr" | "rental" | "wholesale";

export type Analysis = {
  flip: FlipResult;
  brrrr: BrrrrResult;
  rental: RentalResult;
  wholesale: WholesaleResult;
  breakEvens: BreakEvens;
  best: StrategyKey;
  ranking: { key: StrategyKey; score: number }[];
};

export const STRATEGY_LABELS: Record<StrategyKey, string> = {
  flip: "Fix & flip",
  brrrr: "BRRRR",
  rental: "Buy & hold",
  wholesale: "Wholesale",
};

export function analyzeDeal(i: DealInputs): Analysis {
  const flip = analyzeFlip(i);
  const brrrr = analyzeBrrrr(i);
  const rental = analyzeRental(i);
  const wholesale = analyzeWholesale(i);
  const breakEvens = computeBreakEvens(i);

  const ranking = (
    [
      { key: "flip", score: flip.score },
      { key: "brrrr", score: brrrr.score },
      { key: "rental", score: rental.score },
      { key: "wholesale", score: wholesale.score },
    ] as { key: StrategyKey; score: number }[]
  ).sort((a, b) => b.score - a.score);

  return { flip, brrrr, rental, wholesale, breakEvens, best: ranking[0].key, ranking };
}
