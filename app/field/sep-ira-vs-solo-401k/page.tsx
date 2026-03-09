import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "SEP IRA vs Solo 401(k): Which One Should You Open?",
  description: "Both let self-employed people save serious money for retirement with significant tax deductions. Here's the actual difference and which one makes sense for your situation.",
  keywords: ["sep ira vs solo 401k self employed", "best retirement account freelancer", "sep ira contribution limits 2024", "solo 401k self employed"],
  alternates: { canonical: "https://selfemployedfyi.com/field/sep-ira-vs-solo-401k" },
};

const article = getArticle("sep-ira-vs-solo-401k")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        One of the real advantages of working for yourself: the retirement accounts available to
        you are significantly better than what most employers offer. The contribution limits are higher.
        The tax savings are larger. And you are in control.
      </p>

      <p>
        Two accounts come up constantly for self-employed people: the SEP IRA and the Solo 401(k).
        Both are excellent. They are not identical. Here is how to think through which one fits.
      </p>

      <h2>SEP IRA: the simple one</h2>

      <p>
        SEP stands for Simplified Employee Pension. The name is accurate. It is straightforward
        to set up (open at any major brokerage in about 15 minutes) and requires almost no ongoing
        administration.
      </p>

      <p>
        Contribution limit: up to 25% of your net self-employment income, with a maximum of
        $69,000 for 2024. Net SE income means after the SE tax deduction adjustment, so in practice
        the effective rate is closer to 20% of gross self-employment income.
      </p>

      <p>
        All contributions are from the "employer" side (you, in this case). There is no employee
        contribution component. You can contribute any amount up to the limit, or nothing at all,
        each year. This flexibility is useful if your income varies significantly year to year.
      </p>

      <p>
        You have until your tax filing deadline (including extensions) to make contributions for the
        prior year. Filed an extension to October? You have until October to contribute for last year.
      </p>

      <h2>Solo 401(k): the powerful one</h2>

      <p>
        The Solo 401(k) (also called an Individual 401(k) or One-Participant 401(k)) is designed
        for self-employed people with no full-time employees other than a spouse.
      </p>

      <p>
        It has two contribution components:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">Employee contribution (elective deferral)</p>
          <p className="text-sm text-slate-400 mt-1">Up to $23,000 in 2024 ($30,500 if you are 50 or older). This is the same limit as a regular 401(k). The entire amount can be contributed regardless of how much you earn, as long as you have at least that much in compensation.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Employer contribution (profit sharing)</p>
          <p className="text-sm text-slate-400 mt-1">Up to 25% of net self-employment income (same as SEP IRA math). This is on top of the employee contribution.</p>
        </div>
        <div className="border-t border-slate-700 pt-3">
          <p className="text-sm font-semibold text-white">Combined maximum</p>
          <p className="text-sm text-slate-400 mt-1">$69,000 in 2024 ($76,500 if 50+). At lower income levels, the Solo 401(k) lets you contribute significantly more than a SEP IRA due to the flat employee contribution floor.</p>
        </div>
      </div>

      <h2>Where the Solo 401(k) wins</h2>

      <p>
        The math difference matters most at lower income levels. Here is a comparison for someone
        with $60,000 in net self-employment income:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2">
        <div className="space-y-3">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-white">SEP IRA</p>
              <p className="text-xs text-slate-500">25% of ~$56,470 net SE income</p>
            </div>
            <p className="text-sm font-bold text-white">~$14,000</p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Solo 401(k)</p>
              <p className="text-xs text-slate-500">$23,000 employee + ~$14,000 employer</p>
            </div>
            <p className="text-sm font-bold text-emerald-300">~$37,000</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-3">Same income. Very different contribution room.</p>
      </div>

      <p>
        At higher income levels (above roughly $200,000), the SEP IRA and Solo 401(k) employer
        contributions converge. The employee contribution still gives the Solo 401(k) an edge,
        but it is less dramatic.
      </p>

      <h2>The Roth option</h2>

      <p>
        Solo 401(k)s can have a Roth component, allowing after-tax contributions that grow
        tax-free and are withdrawn tax-free in retirement. SEP IRAs are traditional only (pre-tax).
        If you think your tax rate will be higher in retirement, the Roth Solo 401(k) option
        is valuable.
      </p>

      <h2>Loans</h2>

      <p>
        Solo 401(k) plans can allow loans (up to $50,000 or 50% of vested balance). SEP IRAs do not.
        This is rarely the deciding factor, but it exists.
      </p>

      <h2>The administration tradeoff</h2>

      <p>
        SEP IRA: basically no paperwork. Open, contribute, done. No annual filings unless the
        plan exceeds $250,000 (then a simple Form 5500-EZ is required).
      </p>

      <p>
        Solo 401(k): slightly more setup. You need to establish the plan by December 31 of the
        tax year (not your filing deadline). Most major brokerages (Fidelity, Vanguard, Schwab)
        offer free Solo 401(k) plans with straightforward setup. Once open, contributions
        and record-keeping are simple.
      </p>

      <h2>Which one should you open</h2>

      <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-5 my-2 space-y-3">
        <div>
          <p className="text-sm font-semibold text-emerald-300">Open a Solo 401(k) if:</p>
          <ul className="text-sm text-slate-400 space-y-1 mt-1 list-disc list-inside">
            <li>Your net SE income is under $150,000 (the contribution difference is significant)</li>
            <li>You want a Roth option</li>
            <li>You want to maximize contributions even in lower-income years</li>
            <li>You have no full-time employees (besides a spouse)</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Open a SEP IRA if:</p>
          <ul className="text-sm text-slate-400 space-y-1 mt-1 list-disc list-inside">
            <li>You want the simplest possible setup</li>
            <li>Your income is high (above $200K) and the contribution difference is minimal</li>
            <li>You missed the December 31 deadline to establish a Solo 401(k) for this year</li>
            <li>You have employees (Solo 401(k) is only for owner-only businesses)</li>
          </ul>
        </div>
      </div>

      <p>
        Both accounts are available at Fidelity, Vanguard, and Schwab with no account fees.
        If you are not sure, the Solo 401(k) wins for most freelancers under $200K in income.
        Open it before December 31 if you want to contribute for the current tax year.
      </p>

    </ArticleLayout>
  );
}
