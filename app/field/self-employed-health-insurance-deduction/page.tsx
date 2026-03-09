import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The Self-Employed Health Insurance Deduction",
  description: "Self-employed people can deduct 100% of their health insurance premiums. Here's exactly how it works, what qualifies, and how to claim it correctly.",
  keywords: ["self-employed health insurance deduction", "health insurance deduction 1099", "deduct health insurance premiums self employed", "schedule c health insurance deduction"],
  alternates: { canonical: "https://selfemployedfyi.com/field/self-employed-health-insurance-deduction" },
};

const article = getArticle("self-employed-health-insurance-deduction")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        Health insurance is expensive when you buy it yourself. The IRS knows this and created a
        deduction specifically for self-employed people: you can deduct 100% of health insurance
        premiums paid for yourself, your spouse, and your dependents.
      </p>

      <p>
        This is one of the better deductions available to freelancers and it is underused,
        either because people do not know about it or because they are claiming it incorrectly
        and losing part of the benefit.
      </p>

      <h2>How it works</h2>

      <p>
        The self-employed health insurance deduction comes off your adjusted gross income (AGI),
        not as a business expense on Schedule C. This distinction matters. It reduces your
        income tax but not your self-employment tax.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 font-mono text-sm space-y-2">
        <div className="flex justify-between text-slate-400"><span>Net business income</span><span>$100,000</span></div>
        <div className="flex justify-between text-slate-400"><span>SE tax deduction (half)</span><span>($7,065)</span></div>
        <div className="flex justify-between text-slate-400"><span>Health insurance premiums</span><span>($8,400)</span></div>
        <div className="flex justify-between font-semibold text-white border-t border-slate-700 pt-2 mt-2"><span>Adjusted gross income</span><span>$84,535</span></div>
        <div className="flex justify-between text-emerald-300 text-xs mt-2"><span>Tax savings vs. not deducting (22% bracket)</span><span>~$1,848</span></div>
      </div>

      <h2>What qualifies</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-2 text-sm text-slate-400">
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Medical insurance premiums (individual, family plans)</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Dental insurance premiums</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Vision insurance premiums</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Long-term care insurance premiums (up to age-based limits)</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Premiums paid for a spouse and dependents</div>
        <div className="flex items-start gap-2"><span className="text-red-400 shrink-0">-</span>Months when you were eligible for employer-subsidized coverage (cannot double dip)</div>
        <div className="flex items-start gap-2"><span className="text-red-400 shrink-0">-</span>Premiums paid through an HSA</div>
      </div>

      <h2>The eligibility limit</h2>

      <p>
        The deduction cannot exceed your net self-employment income. If you had $5,000 in net SE
        income and paid $8,400 in premiums, your deduction is limited to $5,000.
        The excess cannot be carried forward or deducted elsewhere on Schedule C.
      </p>

      <p>
        In a business loss year, you get no deduction from this provision, though you may be able
        to claim some premiums as an itemized medical expense if you itemize.
      </p>

      <h2>The employer-coverage trap</h2>

      <p>
        If you were eligible for coverage through an employer's plan (yours or a spouse's) for any
        month, you cannot deduct premiums for that month under this provision. "Eligible" is the
        key word, not "actually enrolled." If your spouse had employer coverage you could have
        joined but chose not to, you do not get the deduction for those months.
      </p>

      <p>
        This trips people up. Transitioning from employment to freelancing mid-year means you can
        only deduct premiums for the months when you were not eligible for employer coverage.
      </p>

      <h2>S-corp owners: different setup</h2>

      <p>
        If you are an S-corp shareholder-employee (2% or more ownership), the deduction works
        differently. The S-corp pays your health insurance premiums and includes them in your
        W2 wages in Box 1. You then deduct them on Form 1040 as a self-employed health insurance
        deduction. The premiums need to be reported this specific way or you lose the deduction.
        Your accountant should set this up correctly.
      </p>

      <h2>Where to claim it</h2>

      <p>
        Schedule 1 (Form 1040), Part II, Line 17. Your tax software should prompt you for this.
        If you use a CPA, make sure they know about your health insurance premiums.
        It is easy to miss if you are not specifically asked.
      </p>

    </ArticleLayout>
  );
}
