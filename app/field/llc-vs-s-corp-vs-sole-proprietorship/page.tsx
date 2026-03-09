import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "LLC vs S-Corp vs Sole Prop: An Honest Breakdown",
  description:
    "Do you actually need an LLC? When does an S-corp make sense? The real answers for freelancers and independent business owners, without the YouTube hype.",
  keywords: ["llc vs s corp vs sole proprietorship freelancer", "do i need an llc self employed", "s corp election when", "sole proprietor vs llc tax difference"],
  alternates: { canonical: "https://selfemployedfyi.com/field/llc-vs-s-corp-vs-sole-proprietorship" },
};

const article = getArticle("llc-vs-s-corp-vs-sole-proprietorship")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        The most common question every new freelancer Googles: "do I need an LLC?"
      </p>

      <p>
        The honest answer is: probably not yet, and you have been watching too many YouTube videos
        from people who make money selling courses about business formation.
      </p>

      <p>
        Here is what each structure actually is, what it does, and who actually needs it.
      </p>

      <h2>Sole Proprietorship: the default you already are</h2>

      <p>
        If you freelance and have not done any formal business setup, you are already a sole proprietor.
        It is automatic. No paperwork, no fees, no waiting on the state. Your business income flows
        directly to your personal tax return on Schedule C.
      </p>

      <p>
        The real downside is liability. If someone sues your business, they can go after your personal
        assets. Your car, your savings account, your apartment (if you own it). There is no legal wall
        between you and your business.
      </p>

      <p>
        For most freelancers (designers, writers, developers, consultants, photographers), the actual
        probability of a lawsuit that pierces that wall is pretty low. Your contracts should already
        be limiting liability. If you are a freelance copywriter, the chances that a client sues you
        for more than you have in your business account are slim.
      </p>

      <p>
        If your work can go sideways in expensive ways (you build things that fail and hurt people,
        you give advice that causes financial harm, you work with significant physical risks), the
        liability protection of an LLC starts to make real sense.
      </p>

      <h2>LLC: liability protection, not a tax magic trick</h2>

      <p>
        This is where the most confusion lives. An LLC is a legal structure, not a tax election.
        By default, a single-member LLC is taxed exactly the same as a sole proprietorship.
        Same Schedule C. Same self-employment tax. Same everything.
      </p>

      <p>
        The thing you are buying with an LLC is a legal wall between you and your business.
        Your personal assets are protected from business liabilities. It also signals to bigger clients
        that you are a legitimate operation, which is not nothing when you are trying to win a $50,000
        contract.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2">
        <p className="text-sm font-semibold text-white mb-3">What an LLC actually costs</p>
        <div className="space-y-2 text-sm text-slate-400">
          <div className="flex justify-between"><span>State filing fee (one-time)</span><span className="text-white">$50-500 depending on state</span></div>
          <div className="flex justify-between"><span>Annual report fee (some states)</span><span className="text-white">$0-300/year</span></div>
          <div className="flex justify-between"><span>Registered agent (optional)</span><span className="text-white">$50-150/year</span></div>
          <div className="flex justify-between"><span>California, specifically</span><span className="text-white">$800 minimum annual franchise tax</span></div>
        </div>
      </div>

      <p>
        California's $800 minimum franchise tax is worth calling out separately because it catches
        people off guard. If you are in California making $30,000 as a freelancer, you are paying
        $800 just for the privilege of having an LLC. That is a real cost to weigh.
      </p>

      <p>
        When an LLC makes sense: you are doing meaningful revenue (somewhere around $50,000 and up),
        your work carries genuine liability exposure, or you want the legitimacy signal for bigger clients.
        Forming an LLC for a side project that earns $8,000 a year is generally overkill.
      </p>

      <h2>S-Corp: where the actual tax savings live</h2>

      <p>
        An S-corp is not a business entity type. It is a tax election you make with the IRS by filing
        Form 2553. You can have an LLC taxed as an S-corp, or a corporation taxed as an S-corp.
        The entity and the tax treatment are separate decisions.
      </p>

      <p>
        The reason people pursue S-corp status is to reduce self-employment tax. Here is how it works:
        instead of all your net profit being subject to SE tax, you split your income into a salary
        and distributions. You pay SE tax only on the salary portion.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-3">
        <p className="text-sm font-semibold text-white">Example: $150,000 net profit</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-slate-400">
            <span>Without S-corp (SE tax on full $150K)</span>
            <span className="text-red-400">~$21,240 SE tax</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>With S-corp ($70K salary, $80K distributions)</span>
            <span className="text-emerald-400">~$9,912 SE tax</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-slate-700 pt-2 mt-2">
            <span className="text-white">Annual savings</span>
            <span className="text-emerald-300">~$11,328</span>
          </div>
        </div>
      </div>

      <p>
        The catch: the IRS requires you to pay yourself a "reasonable salary" for the work you do in
        the business. You cannot pay yourself $1 and take everything as distributions. If they audit you
        and your salary is clearly unreasonable, they will reclassify your distributions as wages
        and you will owe back SE tax plus penalties.
      </p>

      <p>
        On top of that, running an S-corp requires: quarterly payroll, an annual corporate tax return
        (Form 1120-S), and probably an accountant if you are not one. Those admin costs typically
        run $3,000 to $5,000 per year in software and professional fees.
      </p>

      <p>
        The break-even point: most people find S-corp election makes sense somewhere between
        $60,000 and $80,000 in net profit. Below that threshold, the savings do not cover
        the overhead. Above it, you are probably leaving money on the table if you are not doing it.
      </p>

      <h2>The order of operations</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-4">
        {[
          { step: "1", label: "Start as a sole proprietor", detail: "Ship things. Make money. The IRS does not care about your entity structure when you are making $20K a year." },
          { step: "2", label: "Form an LLC when liability becomes real", detail: "Meaningful revenue, real liability exposure, or you want the legitimacy for bigger clients. Somewhere around $50K+ is a reasonable trigger." },
          { step: "3", label: "Look at S-corp when profit hits $80K+", detail: "Run the actual numbers with a CPA. The savings can be significant, but so is the admin overhead." },
          { step: "4", label: "Talk to a CPA who works with self-employed clients", detail: "Not a general tax preparer. Someone who specializes in small business and freelancers. The difference in advice quality is real." },
        ].map(({ step, label, detail }) => (
          <div key={step} className="flex gap-4">
            <div className="w-7 h-7 rounded-full bg-emerald-900/50 border border-emerald-800/50 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-emerald-400">{step}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="text-sm text-slate-400 mt-0.5">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>The two most common mistakes</h2>

      <p>
        The first: spending $500 forming an LLC for a side project making $12,000 a year.
        The liability protection is worth something, but you are paying a real annual cost for protection
        against a risk that probably does not exist at that revenue level.
      </p>

      <p>
        The second: making $180,000 in net profit as a sole proprietor or standard LLC and handing
        the IRS an extra $15,000 in SE tax annually because nobody mentioned S-corp election.
        This one is more expensive. A good CPA catches it. The internet does not always.
      </p>

      <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-5 my-2">
        <p className="text-emerald-300 font-semibold text-sm mb-2">Know what you actually owe right now</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          Whatever structure you are in, the quarterly tax calculator shows your current tax bill
          and what to set aside before the next deadline.
        </p>
        <Link
          href="/calculators/quarterly-taxes"
          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Calculate my quarterly taxes
        </Link>
      </div>

    </ArticleLayout>
  );
}
