import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The QBI Deduction: The Pass-Through Tax Break Most Freelancers Miss",
  description: "The Qualified Business Income deduction lets eligible self-employed people deduct up to 20% of their business income. Here's who qualifies, who doesn't, and how to calculate it.",
  keywords: ["qualified business income deduction self employed", "qbi deduction freelancer", "20 percent pass-through deduction", "section 199a deduction"],
  alternates: { canonical: "https://selfemployedfyi.com/field/qbi-deduction-explained" },
};

const article = getArticle("qbi-deduction-explained")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        The Tax Cuts and Jobs Act of 2017 created a deduction that a lot of self-employed people
        do not fully understand or take advantage of: the Qualified Business Income (QBI) deduction,
        also called the Section 199A deduction.
      </p>

      <p>
        The short version: eligible self-employed people can deduct up to 20% of their qualified
        business income from their taxable income. On $100,000 in business income, that is a
        $20,000 deduction before applying income tax rates. At the 22% bracket, that saves you
        $4,400 in taxes. It is not nothing.
      </p>

      <h2>The basic mechanics</h2>

      <p>
        QBI is your net profit from self-employment (or other pass-through business income) after
        the standard business deductions. The deduction is 20% of that QBI, subject to several
        limits that depend on your income level and business type.
      </p>

      <p>
        The deduction cannot exceed 20% of your taxable income (after the standard deduction and
        other deductions). This is a ceiling, not a floor.
      </p>

      <h2>The income thresholds</h2>

      <p>
        Below certain income levels, the QBI deduction is straightforward. Above them, it gets complex.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2">
        <div className="space-y-3">
          {[
            { range: "Under $191,950 (single) / $383,900 (MFJ)", desc: "Simple. Deduct 20% of QBI. No additional tests required.", color: "text-emerald-400" },
            { range: "$191,950-$241,950 (single) / $383,900-$483,900 (MFJ)", desc: "Phase-out zone. The W-2 wage limit and SSTB restrictions phase in gradually.", color: "text-amber-400" },
            { range: "Above $241,950 (single) / $483,900 (MFJ)", desc: "Full limitations apply. W-2 wage tests and SSTB rules are fully active.", color: "text-red-400" },
          ].map(({ range, desc, color }) => (
            <div key={range}>
              <p className={`text-sm font-semibold ${color}`}>{range}</p>
              <p className="text-sm text-slate-400 mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">2024 thresholds. Adjust annually for inflation.</p>
      </div>

      <h2>The SSTB problem</h2>

      <p>
        Here is where many freelancers hit a wall. The IRS designates certain businesses as
        "Specified Service Trades or Businesses" (SSTBs). For SSTBs, the QBI deduction phases out
        entirely at higher income levels.
      </p>

      <p>
        SSTB categories include:
      </p>

      <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-5 my-2 grid grid-cols-2 gap-2">
        {["Health (doctors, dentists, therapists)", "Law", "Accounting", "Actuarial science", "Performing arts", "Consulting", "Athletics", "Financial services", "Brokerage services", "Any business where the principal asset is the reputation/skill of its owner"].map(item => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="text-amber-500 shrink-0">!</span>{item}
          </div>
        ))}
      </div>

      <p>
        That last one ("reputation or skill of its owner") is intentionally broad. Consultants,
        coaches, speakers, and certain other service businesses can fall into this bucket.
        If your business is an SSTB and your income is above the phase-out threshold, you may
        not qualify for the deduction at all.
      </p>

      <p>
        However: engineers, architects, and certain tech businesses are specifically excluded from
        SSTB classification. A software developer building products is likely not an SSTB.
        A developer who primarily provides consulting services may be.
      </p>

      <h2>What the deduction actually does</h2>

      <p>
        An example for someone under the income threshold with $100,000 in net business income,
        filing single:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 font-mono text-sm space-y-2">
        <div className="flex justify-between text-slate-400"><span>Net business income (QBI)</span><span>$100,000</span></div>
        <div className="flex justify-between text-slate-400"><span>QBI deduction (20%)</span><span>($20,000)</span></div>
        <div className="flex justify-between text-slate-400"><span>Standard deduction</span><span>($15,000)</span></div>
        <div className="flex justify-between font-semibold text-white border-t border-slate-700 pt-2 mt-2"><span>Taxable income</span><span>$65,000</span></div>
        <div className="flex justify-between text-slate-400"><span>Without QBI, taxable income would be</span><span>$85,000</span></div>
        <div className="flex justify-between text-emerald-300 mt-1"><span>Approximate tax savings (22% bracket)</span><span>~$4,400</span></div>
      </div>

      <h2>Current status</h2>

      <p>
        The QBI deduction is currently set to expire after 2025. Congress has been expected to
        extend it, and legislation to do so has been discussed, but it is worth noting that
        this deduction may change. Your CPA will know the current status when you file.
      </p>

      <h2>What to do</h2>

      <p>
        If your income is under the phase-out threshold and your business is not an SSTB,
        your tax software should calculate and apply the QBI deduction automatically.
        Make sure you are reporting your business income on Schedule C (or your partnership/S-corp
        return) so the software can capture it.
      </p>

      <p>
        If you are near or above the phase-out threshold, or if you are unsure whether your
        business qualifies as an SSTB, this is worth a specific conversation with a CPA.
        The deduction can be significant enough that optimizing for it (through business structure
        or income timing) is worthwhile.
      </p>

    </ArticleLayout>
  );
}
