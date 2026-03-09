import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Health Insurance for Freelancers: Your Actual Options",
  description: "Leaving employer health insurance is one of the scariest parts of going solo. Here's every real option for freelancers, what they cost, and how to choose.",
  keywords: ["health insurance for freelancers", "self employed health insurance options", "ACA marketplace freelancer", "health insurance independent contractor"],
  alternates: { canonical: "https://propped.org/field/health-insurance-for-freelancers" },
};

const article = getArticle("health-insurance-for-freelancers")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        Health insurance is the thing that keeps a lot of people from going freelance.
        On a W2, your employer absorbs most of the cost and you barely notice it.
        On your own, you are looking at $400 to $700+ per month for an individual plan
        before you have used it for anything.
      </p>

      <p>
        There are real options. Some are better than people realize. Here is how to think through them.
      </p>

      <h2>The ACA Marketplace (usually the starting point)</h2>

      <p>
        The Affordable Care Act marketplace (healthcare.gov) lets you buy individual health insurance
        on your own. Plans are organized into metal tiers: Bronze, Silver, Gold, Platinum.
        Bronze has the lowest premium and highest deductible. Platinum is the opposite.
        Silver is usually the sweet spot for most people.
      </p>

      <p>
        The part most freelancers do not know: if your income is below 400% of the federal poverty
        level (roughly $58,000 for a single person in 2024), you likely qualify for premium tax
        credits that significantly reduce your monthly cost. At some income levels, you can get
        solid coverage for under $100/month.
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2">
        <p className="text-sm font-semibold text-white mb-3">2024 income thresholds for premium tax credits (single person)</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-zinc-400"><span>Under $21,870 (138% FPL)</span><span className="text-brand-400">Medicaid eligible (most states)</span></div>
          <div className="flex justify-between text-zinc-400"><span>$21,870 to $58,320</span><span className="text-brand-400">Significant premium subsidies</span></div>
          <div className="flex justify-between text-zinc-400"><span>$58,320 to $87,480</span><span className="text-brand-400">Reduced subsidies</span></div>
          <div className="flex justify-between text-zinc-400"><span>Above $87,480</span><span className="text-white">Full cost (but still deductible)</span></div>
        </div>
        <p className="text-xs text-zinc-600 mt-3">These thresholds adjust annually. Check healthcare.gov for current year numbers.</p>
      </div>

      <p>
        One important detail: marketplace income is based on your modified adjusted gross income,
        which means after your self-employment deductions and retirement contributions.
        If you contribute significantly to a SEP IRA or Solo 401(k), your reported income could
        be lower, increasing your subsidy eligibility.
      </p>

      <h2>COBRA (short-term bridge)</h2>

      <p>
        When you leave an employer, you can continue your employer-sponsored coverage through COBRA
        for up to 18 months. The catch: you pay the full premium including the portion your employer
        used to cover. COBRA is often $600-1,200+ per month for an individual.
      </p>

      <p>
        COBRA is useful as a bridge while you figure out your permanent solution.
        It is rarely a long-term answer because the cost is brutal.
      </p>

      <p>
        Timing note: you have 60 days from losing coverage to elect COBRA. If you miss the window,
        you cannot go back. And you can drop COBRA at any time without penalty if you find
        a better option.
      </p>

      <h2>A spouse's or partner's plan</h2>

      <p>
        If you have a spouse or domestic partner with employer-sponsored insurance, joining their
        plan is almost always the best option. You lose employment or your hours drop as a qualifying
        life event that lets them add you mid-year. Employer-sponsored plans are typically subsidized
        more heavily than anything you can get on the individual market.
      </p>

      <h2>Professional associations and groups</h2>

      <p>
        Some industries have associations that offer group health insurance to members.
        Freelancers Union (freelancersunion.org) is one option open to many independent workers.
        National Association for the Self-Employed (NASE) is another.
      </p>

      <p>
        The coverage and pricing vary significantly. Worth comparing to the marketplace.
        Not always better, but sometimes is.
      </p>

      <h2>Health sharing ministries</h2>

      <p>
        These are not insurance in the traditional sense. Members share costs with each other
        when someone has a medical need. Examples include Sedera and Liberty HealthShare.
        They are significantly cheaper than traditional insurance (often $200-300/month for an
        individual) but come with important caveats.
      </p>

      <p>
        Limitations: they typically exclude pre-existing conditions for a period of time, have
        sharing guidelines (rather than guaranteed coverage), and are not subject to ACA protections.
        They work well for healthy people who want catastrophic protection and are comfortable with
        the model. They are not for everyone.
      </p>

      <h2>HSA-eligible plans</h2>

      <p>
        If you choose a high-deductible health plan (HDHP) on the marketplace or elsewhere,
        you can open a Health Savings Account (HSA). An HSA lets you contribute pre-tax money
        for medical expenses. For 2024: up to $4,150 for individuals, $8,300 for families.
      </p>

      <p>
        HSA contributions are one of the few triple-tax-advantaged accounts available: tax-deductible
        contributions, tax-free growth, tax-free withdrawals for qualified medical expenses.
        If you are healthy and do not use much healthcare, an HDHP plus HSA can be a strong combination.
      </p>

      <h2>The self-employed health insurance deduction</h2>

      <p>
        The IRS lets self-employed people deduct 100% of health insurance premiums paid for
        themselves, their spouse, and dependents. This deduction comes off your gross income before
        calculating income tax (though not self-employment tax). It can be significant.
      </p>

      <p>
        At $600/month in premiums, that is $7,200 per year deducted. If you are in the 22% bracket,
        that saves you about $1,584 in income tax annually. This is a meaningful offset to the cost.
      </p>

      <h2>How to actually choose</h2>

      <p>
        Start at healthcare.gov during open enrollment (November 1 to January 15 for most states).
        Put in your expected income for the year and see what you qualify for. Compare the Silver plans.
        If the premiums after subsidy are reasonable and the network includes your doctors, that is
        probably your answer.
      </p>

      <p>
        If you are healthy and want lower premiums, look at Bronze or HDHP options paired with an HSA.
        If you use healthcare regularly, Gold or Platinum's higher premiums but lower deductibles
        can be worth the cost.
      </p>

      <p>
        Special enrollment periods apply when you lose other coverage (COBRA, employer plan),
        so you are not stuck waiting for November if you go freelance mid-year.
      </p>

    </ArticleLayout>
  );
}
