import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Quarterly Estimated Taxes: The Complete Guide for Freelancers",
  description: "How quarterly estimated tax payments work, when they're due, how much to pay, and how to avoid underpayment penalties. Everything you need in one place.",
  keywords: ["quarterly estimated taxes freelancer", "how to pay quarterly taxes self employed", "estimated tax payment deadlines 2026", "1040-ES instructions"],
  alternates: { canonical: "https://selfemployedfyi.com/field/quarterly-estimated-taxes-guide" },
};

const article = getArticle("quarterly-estimated-taxes-guide")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        When you have a regular job, your employer withholds taxes from every paycheck and sends
        them to the IRS on your behalf. By the time April arrives, most of your tax bill is already
        paid. You file, maybe get a small refund, move on.
      </p>

      <p>
        When you work for yourself, none of that happens automatically. The IRS still wants their
        money throughout the year. They just need you to send it yourself, four times a year.
        These are quarterly estimated tax payments.
      </p>

      <h2>Who has to pay them</h2>

      <p>
        You are required to make estimated payments if you expect to owe at least $1,000 in federal
        taxes for the year AND your withholding and credits will cover less than 90% of this
        year's tax (or less than 100% of last year's tax).
      </p>

      <p>
        In practice: if you are self-employed and making meaningful money, you almost certainly
        need to pay estimated taxes. The threshold is low enough that even a solid side hustle
        can push you over it.
      </p>

      <h2>The 2026 deadlines</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2">
        <div className="space-y-3">
          {[
            { q: "Q1", period: "Income earned Jan 1 – Mar 31", due: "April 15, 2026", urgent: true },
            { q: "Q2", period: "Income earned Apr 1 – May 31", due: "June 16, 2026", urgent: false },
            { q: "Q3", period: "Income earned Jun 1 – Aug 31", due: "September 15, 2026", urgent: false },
            { q: "Q4", period: "Income earned Sep 1 – Dec 31", due: "January 15, 2027", urgent: false },
          ].map(({ q, period, due, urgent }) => (
            <div key={q} className={`flex items-center justify-between p-3 rounded-lg ${urgent ? "bg-amber-950/40 border border-amber-800/40" : "bg-slate-700/30"}`}>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${urgent ? "text-amber-400" : "text-slate-500"}`}>{q}</span>
                <p className="text-sm text-slate-300 mt-0.5">{period}</p>
              </div>
              <p className={`text-sm font-semibold ${urgent ? "text-amber-300" : "text-white"}`}>{due}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">Note: Q2 covers only 2 months, not 3. This confuses everyone.</p>
      </div>

      <p>
        Q2's two-month window (April and May only) trips people up every year. You are not behind
        if you think April, June, September, January does not divide evenly into quarters.
        You are correct. It does not. The IRS named them wrong.
      </p>

      <h2>How much to pay</h2>

      <p>
        You have two options for calculating your quarterly payments, and one of them is much easier:
      </p>

      <h3>Option 1: Safe harbor (the easy way)</h3>

      <p>
        Pay 100% of last year's total tax liability, divided by 4. If your adjusted gross income
        last year was over $150,000, the threshold is 110% of last year's tax.
      </p>

      <p>
        Find your number: pull up last year's Form 1040 and look at line 24 (total tax). Divide by 4.
        Pay that amount each quarter. You cannot be penalized for underpayment as long as you hit
        this number, even if you end up owing more in April.
      </p>

      <p>
        This is the method most freelancers with variable income should use. It is predictable,
        protects you from penalties, and does not require you to estimate this year's income accurately.
      </p>

      <h3>Option 2: Estimate this year's actual tax</h3>

      <p>
        Calculate what you expect to earn, subtract deductions, apply the tax rates, divide by 4.
        This is more accurate but requires you to know roughly what you will make this year.
        If your income varies a lot, safe harbor is usually the better call.
      </p>

      <h2>How to actually send the payment</h2>

      <p>
        Three options, all easy:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-3">
        <div>
          <p className="text-sm font-semibold text-white">IRS Direct Pay (free)</p>
          <p className="text-sm text-slate-400 mt-0.5">Pay directly from your bank account at irs.gov/payments. No account needed. Confirm payment immediately. This is the cleanest option.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">EFTPS (free, requires enrollment)</p>
          <p className="text-sm text-slate-400 mt-0.5">The IRS's Electronic Federal Tax Payment System. Takes a few days to set up but lets you schedule payments in advance. Good if you want to set it and forget it.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Mail Form 1040-ES with a check</p>
          <p className="text-sm text-slate-400 mt-0.5">It still works. Most people do not use it. The IRS accepts it. Use certified mail if you go this route.</p>
        </div>
      </div>

      <h2>What happens if you miss a payment</h2>

      <p>
        An underpayment penalty. Currently around 8% annualized on the amount you should have paid,
        calculated from the due date until you pay. On a $3,000 quarterly payment missed by
        three months, the penalty is roughly $60. Not the end of the world, but not nothing.
      </p>

      <p>
        You report and calculate underpayment penalties using Form 2210 when you file your taxes.
        Your tax software should handle this automatically.
      </p>

      <h2>State estimated taxes</h2>

      <p>
        Most states with income tax also require quarterly estimated payments, on their own schedule
        and through their own system. California uses FTB.ca.gov. New York uses the state tax portal.
        Check your state's revenue department for the specifics.
      </p>

      <p>
        State payments are separate from federal payments. Missing one does not affect the other.
        Both have their own penalty systems.
      </p>

      <h2>The practical system</h2>

      <p>
        Put the four deadlines in your calendar right now. Set a reminder two weeks before each one.
        Keep your tax savings in a separate account (the 25-35% you are setting aside from each
        payment). When the deadline approaches, run the calculator, confirm the number, pay via
        IRS Direct Pay. Takes about 10 minutes.
      </p>

      <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-5 my-2">
        <p className="text-emerald-300 font-semibold text-sm mb-2">Calculate exactly what you owe right now</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Enter your expected income and expenses and get your Q1 payment amount, the full 2026 schedule, and your set-aside percentage.
        </p>
        <Link href="/calculators/quarterly-taxes" className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          Open quarterly tax calculator
        </Link>
      </div>

    </ArticleLayout>
  );
}
