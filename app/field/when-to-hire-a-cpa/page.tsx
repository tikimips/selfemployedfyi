import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "When to Hire a CPA (Signs You've Outgrown TurboTax)",
  description: "TurboTax is fine until it isn't. Here's how to know when your taxes have gotten complicated enough to need a real professional, and how to find one who actually knows self-employment.",
  keywords: ["when to hire a cpa self employed", "do i need an accountant freelancer", "cpa vs turbotax self employed", "find cpa for freelancers"],
  alternates: { canonical: "https://selfemployedfyi.com/field/when-to-hire-a-cpa" },
};

const article = getArticle("when-to-hire-a-cpa")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        TurboTax and H&R Block work fine for a lot of freelancers, especially when you are
        just starting out and your taxes are a Schedule C attached to a pretty simple return.
        They are cheap, fast, and good enough for straightforward situations.
      </p>

      <p>
        At some point, most self-employed people's taxes stop being straightforward.
        Here is how to know when you have hit that point.
      </p>

      <h2>Signs you have outgrown DIY taxes</h2>

      <div className="space-y-3 my-2">
        {[
          { signal: "You are considering S-corp election", why: "The payroll setup, reasonable salary calculation, and corporate tax return (Form 1120-S) are genuinely complex. Getting this wrong costs more than a CPA." },
          { signal: "Your net profit is over $80-100K", why: "At this income level, advanced strategies (retirement account maximization, S-corp, QBI deduction, Augusta Rule) can save you $5,000-20,000 annually. A CPA who knows these pays for themselves many times over." },
          { signal: "You have employees or 1099 contractors", why: "Payroll tax filings, 1099 issuance, worker classification rules. The compliance requirements get real fast." },
          { signal: "You own rental property", why: "Depreciation schedules, passive activity rules, 1031 exchanges. This layer alone complicates a return significantly." },
          { signal: "You sold a business asset or equity", why: "Capital gains treatment, basis calculations, installment sales. These have big tax implications and real complexity." },
          { signal: "You are paying more in taxes than you paid for a car last year", why: "At some amount, the professional advice is worth it. $800-2,000 for a CPA who saves you $5,000+ is an obvious trade." },
          { signal: "You got a letter from the IRS", why: "Just hire someone. Today." },
        ].map(({ signal, why }) => (
          <div key={signal} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-sm font-semibold text-white mb-1">{signal}</p>
            <p className="text-sm text-slate-400">{why}</p>
          </div>
        ))}
      </div>

      <h2>What a good CPA actually does for you</h2>

      <p>
        A CPA who works with self-employed clients is not just filing your taxes. They are:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-2 text-sm text-slate-400">
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Proactively telling you about strategies before year-end when there is still time to act</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Running the actual numbers on S-corp election vs. staying a sole prop for your specific situation</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Maximizing retirement contributions correctly (the SEP IRA vs. Solo 401k math is not trivial)</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Catching deductions you missed because you did not know they existed</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Representing you if you are ever audited</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Helping you plan for big financial moves (buying property, selling the business, large equipment purchases)</div>
      </div>

      <h2>What to look for in a CPA</h2>

      <p>
        Not all CPAs work with self-employed people. The tax issues for a small business owner
        are different from those of a W2 employee or a large corporation. Look specifically for
        someone who:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-2 text-sm text-slate-400">
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Works primarily with self-employed people, freelancers, or small business owners</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Has clients in your income range (a CPA who handles $10M companies charges differently and may not focus on your needs)</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Communicates proactively, not just at tax time</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Can explain things in plain English without making you feel dumb for asking</div>
      </div>

      <h2>How to find one</h2>

      <p>
        Ask other freelancers in your field who they use. A referral from someone in a similar
        situation is worth ten Google searches. Freelancer communities on Reddit (r/freelance,
        r/selfemployed), Slack groups, and Discord servers are good places to ask.
      </p>

      <p>
        The AICPA (aicpa-cima.com) and NATP (natptax.com) have directories. NATP specifically
        certifies tax professionals. Search for "enrolled agent" or "CPA" plus your location
        and "small business" or "self-employed."
      </p>

      <h2>What it costs</h2>

      <p>
        A freelancer tax return with Schedule C typically runs $400-1,200 depending on complexity
        and location. An S-corp return (Form 1120-S) adds $500-1,500 on top. Year-round advisory
        services run $1,500-5,000 annually for most solo operators.
      </p>

      <p>
        If your CPA saves you more than they cost, they are worth it. Most self-employed people
        with income over $80K find this to be true within the first year. Ask any CPA you are
        considering: "what is the most common thing you catch that clients were doing wrong on
        their own?" If they have a good answer, that tells you something.
      </p>

      <h2>The middle option: bookkeeper plus tax professional</h2>

      <p>
        A CPA handles tax strategy and filing. A bookkeeper handles the ongoing categorization and
        reconciliation of your transactions. They are different skills. Many self-employed people
        hire a bookkeeper (typically $150-400/month) to keep their books clean year-round, then
        hand clean records to a CPA for tax preparation. The CPA charges less because the books
        are already organized, and the total cost is often lower than paying a CPA to do both.
      </p>

    </ArticleLayout>
  );
}
