export interface MortgageInputs {
  grossRevenue: number;
  businessDeductions: number;
  filingStatus: "single" | "married";
  targetHomePrice: number;
  downPaymentPct: number;
  creditScoreRange: string;
}

export interface MortgageOutputs {
  qualifyingIncome: number;
  effectiveTaxRate: number;
  estimatedTaxBill: number;
  maxMonthlyPayment: number;
  estimatedMaxMortgage: number;
  targetMortgageNeeded: number;
  deductionGap: number;
  taxIncreaseIfReduced: number;
  recommendation: "conventional" | "non-qm" | "either" | "unqualified";
  recommendationText: string;
  nonQmNote: string;
  loanToValue: number;
  downPaymentAmount: number;
}

// Simplified 2024 tax brackets
const TAX_BRACKETS_SINGLE = [
  { limit: 11600, rate: 0.1 },
  { limit: 47150, rate: 0.12 },
  { limit: 100525, rate: 0.22 },
  { limit: 191950, rate: 0.24 },
  { limit: 243725, rate: 0.32 },
  { limit: 609350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
];

const TAX_BRACKETS_MARRIED = [
  { limit: 23200, rate: 0.1 },
  { limit: 94300, rate: 0.12 },
  { limit: 201050, rate: 0.22 },
  { limit: 383900, rate: 0.24 },
  { limit: 487450, rate: 0.32 },
  { limit: 731200, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTION = {
  single: 14600,
  married: 29200,
};

function calculateIncomeTax(
  taxableIncome: number,
  filingStatus: "single" | "married"
): number {
  const brackets =
    filingStatus === "single" ? TAX_BRACKETS_SINGLE : TAX_BRACKETS_MARRIED;
  let tax = 0;
  let prev = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= prev) break;
    const taxable = Math.min(taxableIncome, bracket.limit) - prev;
    tax += taxable * bracket.rate;
    prev = bracket.limit;
  }

  // Self-employment tax: 15.3% on net self-employment income (up to SS wage base)
  // Half of SE tax is deductible
  const seIncome = Math.max(0, taxableIncome);
  const seTax = Math.min(seIncome, 160200) * 0.153 + Math.max(0, seIncome - 160200) * 0.029;
  const seDeduction = seTax / 2;
  
  // Recalculate income tax with SE deduction
  const adjustedIncome = Math.max(0, taxableIncome - seDeduction);
  tax = 0;
  prev = 0;
  for (const bracket of brackets) {
    if (adjustedIncome <= prev) break;
    const taxable = Math.min(adjustedIncome, bracket.limit) - prev;
    tax += taxable * bracket.rate;
    prev = bracket.limit;
  }

  return tax + seTax;
}

// Monthly payment per dollar of loan at ~7% for 30yr
const MONTHLY_PAYMENT_PER_DOLLAR = 0.006653; // precise for 7% 30yr

export function calculateMortgage(inputs: MortgageInputs): MortgageOutputs {
  const {
    grossRevenue,
    businessDeductions,
    filingStatus,
    targetHomePrice,
    downPaymentPct,
    creditScoreRange,
  } = inputs;

  // Schedule C net income (what lenders see)
  const qualifyingIncome = Math.max(0, grossRevenue - businessDeductions);

  // Tax calculation on qualifying income minus standard deduction
  const standardDeduction = STANDARD_DEDUCTION[filingStatus];
  const taxableIncome = Math.max(0, qualifyingIncome - standardDeduction);
  const estimatedTaxBill = calculateIncomeTax(taxableIncome, filingStatus);
  const effectiveTaxRate =
    qualifyingIncome > 0 ? estimatedTaxBill / qualifyingIncome : 0;

  // Max monthly debt (43% DTI based on qualifying income)
  const maxMonthlyPayment = (qualifyingIncome / 12) * 0.43;

  // Estimated max mortgage they qualify for
  const estimatedMaxMortgage = maxMonthlyPayment / MONTHLY_PAYMENT_PER_DOLLAR;

  // Down payment and loan needed
  const downPaymentAmount = targetHomePrice * (downPaymentPct / 100);
  const targetMortgageNeeded = targetHomePrice - downPaymentAmount;
  const loanToValue = targetMortgageNeeded / targetHomePrice;

  // How much less in deductions do they need to qualify?
  // Required qualifying income to afford target mortgage
  const requiredMonthlyPayment = targetMortgageNeeded * MONTHLY_PAYMENT_PER_DOLLAR;
  const requiredAnnualIncome = (requiredMonthlyPayment / 0.43) * 12;
  const deductionGap = Math.max(0, requiredAnnualIncome - qualifyingIncome);

  // Tax increase if they reduce deductions by deductionGap
  const newQualifyingIncome = qualifyingIncome + deductionGap;
  const newTaxableIncome = Math.max(0, newQualifyingIncome - standardDeduction);
  const newTaxBill = calculateIncomeTax(newTaxableIncome, filingStatus);
  const taxIncreaseIfReduced = Math.max(0, newTaxBill - estimatedTaxBill);

  // Recommendation logic
  let recommendation: MortgageOutputs["recommendation"];
  let recommendationText: string;
  let nonQmNote: string;

  const canQualifyConventional = estimatedMaxMortgage >= targetMortgageNeeded;
  const creditScore = creditScoreRange;
  const goodCredit =
    creditScore === "760+" ||
    creditScore === "720-759" ||
    creditScore === "680-719";

  if (canQualifyConventional && goodCredit) {
    recommendation = "conventional";
    recommendationText =
      "Good news — your current income qualifies you for a conventional mortgage at your target price. You don't need to sacrifice any deductions.";
    nonQmNote =
      "You qualify conventionally, but Non-QM (bank statement) loans may offer better terms if you have strong cash flow. Worth exploring both.";
  } else if (
    canQualifyConventional &&
    !goodCredit &&
    estimatedMaxMortgage >= targetMortgageNeeded * 0.9
  ) {
    recommendation = "either";
    recommendationText =
      "You're close to qualifying conventionally, but your credit score may limit your options. A Non-QM lender using bank statements could be a strong path.";
    nonQmNote =
      "Non-QM lenders often have more flexible credit requirements. They may use 12–24 months of bank deposits to qualify you at a higher income.";
  } else if (
    !canQualifyConventional &&
    deductionGap < qualifyingIncome * 0.3
  ) {
    recommendation = "non-qm";
    recommendationText = `You don't currently qualify at your target price on paper — but you're within reach. A Non-QM lender using bank statement income could qualify you based on your actual cash deposits (${formatCurrency(grossRevenue)}/yr gross), not your tax return.`;
    nonQmNote =
      "Non-QM bank statement loans use 12–24 months of average monthly deposits as income. This is a popular path for self-employed borrowers who write off large expenses.";
  } else {
    recommendation = "non-qm";
    recommendationText = `There's a significant gap between your tax return income (${formatCurrency(qualifyingIncome)}) and what's needed to qualify (${formatCurrency(requiredAnnualIncome)}). A Non-QM bank statement loan is your best path — or consider a larger down payment to reduce the loan amount.`;
    nonQmNote =
      "Non-QM lenders look at your actual bank deposits, not your Schedule C. You may qualify at a much higher income than your tax returns show. Expect higher rates (0.5%–2% above conventional).";
  }

  return {
    qualifyingIncome,
    effectiveTaxRate,
    estimatedTaxBill,
    maxMonthlyPayment,
    estimatedMaxMortgage,
    targetMortgageNeeded,
    deductionGap,
    taxIncreaseIfReduced,
    recommendation,
    recommendationText,
    nonQmNote,
    loanToValue,
    downPaymentAmount,
  };
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}
