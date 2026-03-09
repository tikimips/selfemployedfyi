import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The Augusta Rule: Rent Your Home to Your Business Tax-Free",
  description: "Section 280A lets you rent your home to your business for up to 14 days a year, collect the rental income tax-free, and let the business deduct it. Most self-employed people have never heard of it.",
  keywords: ["augusta rule tax strategy", "section 280a tax strategy", "rent home to business self employed", "14 day home rental tax free"],
  alternates: { canonical: "https://selfemployedfyi.com/field/the-augusta-rule" },
};

const article = getArticle("the-augusta-rule")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        The Augusta Rule is a provision in the tax code (Section 280A(g)) that lets you rent
        your personal residence to your business for up to 14 days per year. The rental income
        is completely tax-free to you personally. Your business deducts the rental expense.
        You move money from your business to yourself without it being treated as ordinary income.
      </p>

      <p>
        It is named after Augusta, Georgia, where homeowners near the Masters golf tournament
        rent their homes for Masters week at premium rates and pay zero tax on that income.
        The rule has been in the tax code since 1976 and it applies to ordinary business owners too.
      </p>

      <h2>How it works</h2>

      <p>
        Your business (S-corp, LLC taxed as S-corp, or even a separate entity you control) pays
        you rent to use your home for legitimate business meetings, retreats, or other business
        activities. The rent is a deductible business expense. The income you receive as the
        homeowner is excluded from your gross income on your personal return.
      </p>

      <p>
        The limit is 14 days per year. Day 15 changes the tax treatment entirely (the income
        becomes taxable and you enter rental property rules). Stay at 14 days.
      </p>

      <h2>The math</h2>

      <p>
        The fair market rental rate is what a comparable venue in your area would charge for
        a similar use. This is important: you cannot invent a number. Document it.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2">
        <p className="text-sm font-semibold text-white mb-3">Example for someone in Los Angeles</p>
        <div className="space-y-2 text-sm text-slate-400">
          <div className="flex justify-between"><span>Fair market rate for home meeting space</span><span className="text-white">$1,500/day</span></div>
          <div className="flex justify-between"><span>Days rented to business (max 14)</span><span className="text-white">14 days</span></div>
          <div className="flex justify-between font-semibold border-t border-slate-700 pt-2 mt-2">
            <span className="text-white">Total rental income (tax-free)</span><span className="text-emerald-300">$21,000</span>
          </div>
          <div className="flex justify-between"><span>Business deduction (if S-corp in 24% bracket)</span><span className="text-white">~$5,040 tax savings</span></div>
        </div>
      </div>

      <p>
        The business deducts $21,000. You receive $21,000 personally tax-free. The effective
        benefit is the tax on $21,000 that you do not pay (plus the deduction at the business level).
        In a 32% combined federal and state bracket, that is roughly $6,700 in tax savings.
      </p>

      <h2>What makes this legitimate</h2>

      <p>
        The business activity must actually occur at your home. Board meetings, strategy sessions,
        team retreats, executive planning meetings. The activity has to be real and documented.
      </p>

      <p>
        Document everything:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-2 text-sm text-slate-400">
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>A written rental agreement between you and your business</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>An agenda for each meeting/activity held at your home</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Comparable venue pricing documentation (Airbnb or event space rates in your area)</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Proof of payment from the business to you (actual transfers, not just entries)</div>
        <div className="flex items-start gap-2"><span className="text-emerald-400 shrink-0">+</span>Attendee lists or minutes for meetings</div>
      </div>

      <h2>Who can use this</h2>

      <p>
        This works best for people with an S-corp or C-corp structure where the business is
        a genuinely separate entity from you personally. A sole proprietor paying "rent" to
        themselves from the same pool of money is circular and does not achieve the same result.
      </p>

      <p>
        To get the full benefit, you need: a business entity (S-corp or C-corp), legitimate
        business activities occurring at your home, fair market rental rates, and clean documentation.
      </p>

      <p>
        This is a strategy to discuss with your CPA. It is well-established in the tax code and
        used by thousands of business owners. It is not a gray area when done correctly.
        The documentation is what keeps it clean.
      </p>

      <h2>The QBI interaction</h2>

      <p>
        If your business qualifies for the Qualified Business Income (QBI) deduction (more on that
        in the QBI guide), rental income from the Augusta Rule does not count as QBI income.
        The deduction still works, but the two strategies are separate.
      </p>

      <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-5 my-2">
        <p className="text-amber-300 font-semibold text-sm mb-1">Do this with your CPA</p>
        <p className="text-slate-400 text-sm leading-relaxed">
          The Augusta Rule is legitimate and powerful but requires proper documentation and
          setup to survive scrutiny. Do not implement it without walking through the specifics
          with a CPA who has done it before. The structure matters.
        </p>
      </div>

    </ArticleLayout>
  );
}
