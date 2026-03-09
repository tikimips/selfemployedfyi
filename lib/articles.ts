export interface Article {
  slug: string;
  title: string;
  description: string;
  stage: "start" | "build" | "grow" | "optimize";
  stageLabel: string;
  stageColor: string;
  readTime: number;
  publishedAt: string;
  keywords: string[];
}

export const articles: Article[] = [
  // ── Starting Out ────────────────────────────────────────────────────────────
  {
    slug: "how-self-employment-tax-works",
    title: "Self-Employment Tax: The Bill Nobody Warned You About",
    description: "You're now both the employer and the employee, which means you pay both sides of Social Security and Medicare. Here's exactly how the math works.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 6,
    publishedAt: "2026-03-08",
    keywords: ["self-employment tax", "how does self employment tax work", "se tax 15.3%"],
  },
  {
    slug: "how-much-to-set-aside-for-taxes",
    title: "The 30% Rule for Freelancers (And When It's Wrong)",
    description: "Everyone says set aside 30%. Here's when that's right, when it's not enough, and the actual math behind picking your number.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 5,
    publishedAt: "2026-03-08",
    keywords: ["how much to set aside for taxes self employed", "freelancer tax savings", "30 percent rule freelancer"],
  },
  {
    slug: "llc-vs-s-corp-vs-sole-proprietorship",
    title: "LLC vs S-Corp vs Sole Prop: An Honest Breakdown",
    description: "Do you actually need an LLC? When does an S-corp make sense? The real answers, without the YouTube hype.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 7,
    publishedAt: "2026-03-08",
    keywords: ["llc vs s corp vs sole proprietorship", "do i need an llc freelancer", "s corp election threshold"],
  },
  {
    slug: "what-business-expenses-can-i-deduct",
    title: "What Business Expenses Can I Deduct? The Real List",
    description: "A plain-English guide to self-employed tax deductions. What counts, what doesn't, and how to make sure you're not leaving money on the table every April.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 8,
    publishedAt: "2026-03-08",
    keywords: ["self employed tax deductions list", "what can i deduct as a freelancer", "business expenses tax deductible"],
  },
  {
    slug: "how-to-open-a-business-bank-account",
    title: "How to Open a Business Bank Account (And Why You Can't Wait)",
    description: "Mixing personal and business money is the number one bookkeeping mistake freelancers make. Here's how to fix it and what to look for in a business account.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 5,
    publishedAt: "2026-03-08",
    keywords: ["business bank account freelancer", "best business checking account self employed", "open business bank account"],
  },
  // ── Getting Stable ──────────────────────────────────────────────────────────
  {
    slug: "quarterly-estimated-taxes-guide",
    title: "Quarterly Estimated Taxes: The Complete Guide",
    description: "How quarterly estimated tax payments work, when they're due, how much to pay, and how to avoid underpayment penalties. Everything in one place.",
    stage: "build",
    stageLabel: "Getting Stable",
    stageColor: "blue",
    readTime: 7,
    publishedAt: "2026-03-08",
    keywords: ["quarterly estimated taxes freelancer", "how to pay quarterly taxes self employed", "estimated tax payment deadlines 2026"],
  },
  {
    slug: "health-insurance-for-freelancers",
    title: "Health Insurance for Freelancers: Your Actual Options",
    description: "Leaving employer health insurance is one of the scariest parts of going solo. Here's every real option, what they cost, and how to choose.",
    stage: "build",
    stageLabel: "Getting Stable",
    stageColor: "blue",
    readTime: 8,
    publishedAt: "2026-03-08",
    keywords: ["health insurance for freelancers", "self employed health insurance options", "ACA marketplace freelancer"],
  },
  {
    slug: "home-office-deduction",
    title: "The Home Office Deduction: What Actually Qualifies",
    description: "The home office deduction is one of the most valuable available to freelancers and one of the most misunderstood. Here's exactly what qualifies and how to calculate it.",
    stage: "build",
    stageLabel: "Getting Stable",
    stageColor: "blue",
    readTime: 6,
    publishedAt: "2026-03-08",
    keywords: ["home office deduction self employed", "home office tax deduction rules", "can i deduct my home office freelancer"],
  },
  {
    slug: "self-employed-health-insurance-deduction",
    title: "The Self-Employed Health Insurance Deduction",
    description: "Self-employed people can deduct 100% of their health insurance premiums. Here's exactly how it works, what qualifies, and how to claim it correctly.",
    stage: "build",
    stageLabel: "Getting Stable",
    stageColor: "blue",
    readTime: 5,
    publishedAt: "2026-03-08",
    keywords: ["self-employed health insurance deduction", "health insurance deduction 1099", "deduct health insurance premiums self employed"],
  },
  {
    slug: "how-to-pay-yourself-llc",
    title: "How to Pay Yourself as a Freelancer or LLC Owner",
    description: "Owner's draw, salary, distributions: what they mean, how they work, and the right way to move money from your business to your personal account without surprises.",
    stage: "build",
    stageLabel: "Getting Stable",
    stageColor: "blue",
    readTime: 5,
    publishedAt: "2026-03-08",
    keywords: ["how to pay yourself llc", "owner's draw vs salary self employed", "paying yourself single member llc"],
  },
  {
    slug: "freelance-contracts-101",
    title: "Freelance Contracts 101: What to Include Before You Start Any Project",
    description: "You don't need a lawyer to have a good freelance contract. Here's what every agreement should cover and the clauses that will save you from the most common disasters.",
    stage: "build",
    stageLabel: "Getting Stable",
    stageColor: "blue",
    readTime: 7,
    publishedAt: "2026-03-08",
    keywords: ["freelance contract template", "what to include in freelance contract", "freelance agreement basics"],
  },
  {
    slug: "when-to-hire-a-cpa",
    title: "When to Hire a CPA (Signs You've Outgrown TurboTax)",
    description: "TurboTax is fine until it isn't. Here's how to know when your taxes have gotten complicated enough to need a real professional, and how to find one.",
    stage: "build",
    stageLabel: "Getting Stable",
    stageColor: "blue",
    readTime: 6,
    publishedAt: "2026-03-08",
    keywords: ["when to hire a cpa self employed", "do i need an accountant freelancer", "cpa vs turbotax self employed"],
  },
  // ── Building Wealth ─────────────────────────────────────────────────────────
  {
    slug: "sep-ira-vs-solo-401k",
    title: "SEP IRA vs Solo 401(k): Which One Should You Open?",
    description: "Both let self-employed people save seriously for retirement with big tax deductions. Here's the actual difference and which one makes sense for your situation.",
    stage: "grow",
    stageLabel: "Building Wealth",
    stageColor: "amber",
    readTime: 8,
    publishedAt: "2026-03-08",
    keywords: ["sep ira vs solo 401k self employed", "best retirement account freelancer", "solo 401k self employed"],
  },
  {
    slug: "how-to-build-business-credit",
    title: "How to Build Business Credit From Zero",
    description: "Business credit is separate from personal credit and takes time to build. Here's the step-by-step process for establishing it as a freelancer or small business owner.",
    stage: "grow",
    stageLabel: "Building Wealth",
    stageColor: "amber",
    readTime: 6,
    publishedAt: "2026-03-08",
    keywords: ["how to build business credit", "business credit for freelancers", "separate business credit personal credit"],
  },
  {
    slug: "qbi-deduction-explained",
    title: "The QBI Deduction: The Pass-Through Tax Break Most Freelancers Miss",
    description: "The Qualified Business Income deduction lets eligible self-employed people deduct up to 20% of business income. Here's who qualifies, who doesn't, and how to calculate it.",
    stage: "grow",
    stageLabel: "Building Wealth",
    stageColor: "amber",
    readTime: 7,
    publishedAt: "2026-03-08",
    keywords: ["qualified business income deduction self employed", "qbi deduction freelancer", "section 199a deduction"],
  },
  // ── Playing Offense ─────────────────────────────────────────────────────────
  {
    slug: "the-augusta-rule",
    title: "The Augusta Rule: Rent Your Home to Your Business Tax-Free",
    description: "Section 280A lets you rent your home to your business for up to 14 days a year, collect the rental income tax-free, and let the business deduct it.",
    stage: "optimize",
    stageLabel: "Playing Offense",
    stageColor: "red",
    readTime: 6,
    publishedAt: "2026-03-08",
    keywords: ["augusta rule tax strategy", "section 280a tax strategy", "rent home to business self employed"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const stageColors: Record<string, string> = {
  emerald: "bg-emerald-950/60 border-emerald-800/50 text-emerald-300",
  blue: "bg-blue-950/60 border-blue-800/50 text-blue-300",
  amber: "bg-amber-950/60 border-amber-800/50 text-amber-300",
  red: "bg-red-950/60 border-red-800/50 text-red-300",
};

export const stageLabels: Record<string, string> = {
  start: "Starting Out",
  build: "Getting Stable",
  grow: "Building Wealth",
  optimize: "Playing Offense",
};
