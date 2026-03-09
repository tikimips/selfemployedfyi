import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Self-Employment Tax: The Bill Nobody Warned You About",
  description:
    "You're now both the employer and the employee, which means you pay both sides of Social Security and Medicare. Here's exactly how the math works and what to do about it.",
  keywords: ["self-employment tax", "how does self employment tax work", "se tax 15.3%", "self employed taxes explained"],
  alternates: { canonical: "https://propped.org/field/how-self-employment-tax-works" },
};

const article = getArticle("how-self-employment-tax-works")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        When you were an employee, your pay stub had two neat deductions: Social Security and Medicare.
        Half came out of your paycheck. Your employer quietly paid the other half in the background.
        You probably barely noticed it was happening.
      </p>

      <p>
        Now you work for yourself. Congratulations. You are both the employee and the employer now.
        Which means you pay both halves. All of it. Every dollar.
      </p>

      <p>
        This is self-employment tax. It is not the same as income tax (that comes later, separately,
        as a bonus surprise). It is the bill that hits every freelancer, contractor, and independent
        business owner who did not know to budget for it during their first year.
      </p>

      <h2>The actual math</h2>

      <p>Self-employment tax is made up of two pieces:</p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-300">Social Security</span>
          <span className="font-mono text-white">12.4% (on first $176,100 of net income)</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-300">Medicare</span>
          <span className="font-mono text-white">2.9% (on all net income)</span>
        </div>
        <div className="flex justify-between text-sm font-semibold border-t border-zinc-700 pt-2 mt-2">
          <span className="text-white">Total</span>
          <span className="font-mono text-brand-300">15.3%</span>
        </div>
      </div>

      <p>
        There is one wrinkle. The IRS lets you calculate SE tax on 92.35% of your net income, not 100%.
        The reasoning is genuinely strange: it is meant to account for the fact that an employer's share
        of payroll taxes is a deductible business expense, and since you are your own employer, you get
        a partial adjustment. If this feels circular, you are not wrong. Just accept it and move on.
      </p>

      <p>Here is what that looks like for someone with $100,000 in net self-employment income:</p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-2 font-mono text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-400">Net SE income</span>
          <span className="text-white">$100,000</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">x 92.35%</span>
          <span className="text-white">$92,350</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-400">x 15.3% SE tax rate</span>
          <span className="text-white">$14,130</span>
        </div>
        <div className="flex justify-between font-semibold border-t border-zinc-700 pt-2 mt-2">
          <span className="text-zinc-200">SE tax owed</span>
          <span className="text-brand-300">$14,130</span>
        </div>
      </div>

      <p>
        Not a rounding error. That is a real bill, due in addition to income tax.
      </p>

      <h2>Then income tax shows up</h2>

      <p>
        SE tax and federal income tax are calculated separately. You do not just add 15.3% to your income
        tax bracket and call it a day. They stack.
      </p>

      <p>
        The one break: you can deduct half of your SE tax from your gross income before calculating income tax.
        The IRS acknowledges that employers deduct their share of payroll taxes as a business expense,
        so you get to do the same for your half.
      </p>

      <p>
        Here is the full picture for that same $100K earner, filing single in 2025:
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-2 font-mono text-sm">
        <div className="flex justify-between"><span className="text-zinc-400">Net SE income</span><span className="text-white">$100,000</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">SE tax</span><span className="text-white">($14,130)</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Deductible SE (half)</span><span className="text-white">($7,065)</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Adjusted gross income</span><span className="text-white">$92,935</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Standard deduction</span><span className="text-white">($15,000)</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Federal taxable income</span><span className="text-white">$77,935</span></div>
        <div className="flex justify-between"><span className="text-zinc-400">Federal income tax</span><span className="text-white">($13,241)</span></div>
        <div className="flex justify-between font-semibold border-t border-zinc-700 pt-2 mt-2">
          <span className="text-zinc-200">Total federal tax</span>
          <span className="text-red-400">$27,371</span>
        </div>
        <div className="flex justify-between text-xs text-zinc-500 mt-1">
          <span>Effective rate</span>
          <span>27.4% of net income</span>
        </div>
      </div>

      <p>
        And that is before state income tax. California residents, add another 7-9% on top of that.
        Texas and Florida residents, enjoy your zero.
      </p>

      <h2>Why nobody warned you</h2>

      <p>
        When you were on payroll, your employer was silently paying half your Social Security and Medicare
        out of their operating budget. You never saw it. It never appeared on your pay stub. It was just
        part of the cost of having you as an employee.
      </p>

      <p>
        Now that you work for yourself, you see the full cost clearly for the first time.
        The effective tax rate on freelance income is often 10-15 percentage points higher than
        what the same person paid as an employee at the same income level. The first tax April
        as a freelancer is a rite of passage nobody talks about enough.
      </p>

      <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-5 my-2">
        <p className="text-amber-200 font-semibold text-sm mb-1">The first-year trap</p>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Most people who start freelancing do not realize they owe SE tax until April of the following year.
          By then, the money has been spent. This is how people end up owing $20,000 they do not have.
          Do not be that person. Set aside the money as it comes in.
        </p>
      </div>

      <h2>The quarterly thing</h2>

      <p>
        The IRS does not want to wait until April to get paid. They want money throughout the year via
        quarterly estimated tax payments. The deadlines for 2026 are April 15, June 16, September 15,
        and January 15.
      </p>

      <p>
        Miss them and you get hit with an underpayment penalty. It is not catastrophic (currently around
        8% annualized on the unpaid amount) but it is annoying and completely avoidable.
      </p>

      <h2>The one long-term move worth knowing about</h2>

      <p>
        Once your net profit clears around $80,000, there is a tax structure worth looking at:
        S-corp election. The short version is that an S-corp lets you split your income into a
        salary and distributions. You pay SE tax only on the salary, not the distributions.
        On $150,000 net profit, this can save $10,000 to $15,000 in SE tax annually.
      </p>

      <p>
        It comes with admin overhead (payroll, corporate tax returns, probably an accountant),
        so it only makes sense above a certain income level. There is a full guide on this in the
        Building Wealth section. For now, just understand where this tax comes from and make sure
        you are setting enough aside.
      </p>

      <div className="bg-brand-950/40 border border-brand-800/40 rounded-xl p-5 my-2">
        <p className="text-brand-300 font-semibold text-sm mb-2">Run the numbers for your income</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          The quarterly tax calculator figures out exactly how much you owe and when,
          based on your actual revenue, expenses, and filing status.
        </p>
        <Link
          href="/calculators/quarterly-taxes"
          className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Calculate my quarterly taxes
        </Link>
      </div>

    </ArticleLayout>
  );
}
