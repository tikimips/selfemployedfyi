import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The 30% Rule for Freelancers (And When It's Wrong)",
  description:
    "Everyone says set aside 30% of your freelance income for taxes. Here's when that's right, when it's not enough, and how to actually pick your number.",
  keywords: ["how much to set aside for taxes self employed", "freelancer tax savings percentage", "30 percent rule taxes freelancer"],
  alternates: { canonical: "https://propped.org/field/how-much-to-set-aside-for-taxes" },
};

const article = getArticle("how-much-to-set-aside-for-taxes")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        Everyone has heard the 30% rule. Set aside 30% of every payment you receive, and you will be fine.
      </p>

      <p>
        The rule is mostly right. But it is also a little like "eat healthy and exercise" as nutrition advice.
        Technically accurate, not that useful without specifics.
      </p>

      <p>
        Here is a more useful breakdown of where the 30% comes from, when it is wrong,
        and how to pick the number that actually works for your situation.
      </p>

      <h2>Where the 30% comes from</h2>

      <p>The rule is trying to cover three things at once:</p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-white">Self-employment tax</p>
            <p className="text-xs text-zinc-500">Social Security + Medicare, both sides</p>
          </div>
          <span className="font-mono text-sm text-zinc-300">~14-15%</span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-white">Federal income tax</p>
            <p className="text-xs text-zinc-500">Depends on your bracket and deductions</p>
          </div>
          <span className="font-mono text-sm text-zinc-300">10-24%+</span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-semibold text-white">State income tax</p>
            <p className="text-xs text-zinc-500">Zero in Texas and Florida. Eye-watering in California.</p>
          </div>
          <span className="font-mono text-sm text-zinc-300">0-13%</span>
        </div>
      </div>

      <p>
        At around $75,000 to $100,000 net income in a mid-tax state, the combined rate lands right around 28-32%.
        So 30% is a reasonable middle-of-the-road guess.
      </p>

      <p>
        But for someone making $40,000 net in Texas with a home office deduction and good bookkeeping,
        25% might be fine. For someone making $200,000 net in California, 40% is probably the right
        number. The difference between those two scenarios is real money.
      </p>

      <h2>Calibrate for your actual situation</h2>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-3">
        {[
          ["Under $50K net, low-tax state", "20-25%"],
          ["$50-100K net, average state", "25-30%"],
          ["$100K+ net", "30-35%"],
          ["California, New York, Oregon, New Jersey", "Add 5-10% on top of federal"],
          ["Well-organized deductions, S-corp election", "You can shade down a few points"],
          ["First year of freelancing", "Just go 35% until you know your numbers"],
        ].map(([scenario, rate]) => (
          <div key={scenario as string} className="flex justify-between items-center gap-4">
            <span className="text-sm text-zinc-300">{scenario as string}</span>
            <span className="font-mono text-sm text-brand-300 shrink-0">{rate as string}</span>
          </div>
        ))}
      </div>

      <p>
        The honest answer for most people in their first one or two years: set aside 30%, do not touch it,
        and reconcile when you file. If you over-save, you get a tax refund. If you under-save at 30%,
        you probably needed to be at 32-35% anyway. Erring high is cheaper than owing money you do not have.
      </p>

      <h2>The practical system that actually works</h2>

      <p>
        Pick your percentage. Move that amount into a separate account the day you get paid.
        Not the end of the month. Not before the quarterly deadline. The day the payment arrives.
      </p>

      <p>
        A high-yield savings account works well for this. Some people name the account "The IRS's Money"
        which is a bit dramatic but psychologically effective. The point is to treat the money as
        already gone. It is not your emergency fund. It is not for a slow month. It is sitting there
        waiting to be sent to the government.
      </p>

      <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-5 my-2">
        <p className="text-amber-200 font-semibold text-sm mb-1">The timing matters more than the amount</p>
        <p className="text-zinc-400 text-sm leading-relaxed">
          The most common way people end up in trouble is not saving too little per payment.
          It is spending the money before they move it. Setting aside 30% immediately when paid
          is more important than whether it is 28% or 32%. Move it first. Adjust later.
        </p>
      </div>

      <h2>The safe harbor hack</h2>

      <p>
        There is a legal way to avoid underpayment penalties even if your quarterly payments end up
        too low. Pay at least 100% of last year's total tax liability across your quarterly payments,
        and the IRS cannot penalize you for underpayment.
      </p>

      <p>
        If your adjusted gross income was over $150,000 last year, the threshold goes up to 110%.
        You might still owe a chunk in April, but you will not get hit with penalties. This is called
        the safe harbor rule, and it is one of the genuinely useful tools in the tax code.
      </p>

      <p>
        To use it: find your total tax from last year's Form 1040 (line 24). Divide by 4.
        Pay that amount each quarter. Done.
      </p>

      <h2>One bonus reason to park it in savings</h2>

      <p>
        A high-yield savings account currently earns 4-5% APY. If you are setting aside quarterly
        tax payments for 3-4 months at a time before sending them to the IRS, you earn real interest
        on that money in the meantime. The government does not get that interest. You do.
      </p>

      <p>
        It is a small thing but it adds up. On $20,000 parked for three months, you earn around $250.
        Best feeling in April is moving the money out and realizing you kept a little extra.
      </p>

      <div className="bg-brand-950/40 border border-brand-800/40 rounded-xl p-5 my-2">
        <p className="text-brand-300 font-semibold text-sm mb-2">Figure out your actual number</p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          The quarterly tax calculator works out exactly what you owe based on your income,
          expenses, filing status, and when the next deadline is.
        </p>
        <Link
          href="/calculators/quarterly-taxes"
          className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Calculate my quarterly payment
        </Link>
      </div>

    </ArticleLayout>
  );
}
