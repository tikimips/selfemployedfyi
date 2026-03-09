import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "How to Pay Yourself as a Freelancer or LLC Owner",
  description: "Owner's draw, salary, distributions: what they mean, how they work, and the right way to move money from your business to your personal account without tax surprises.",
  keywords: ["how to pay yourself llc", "owner's draw vs salary self employed", "how to pay yourself freelancer", "paying yourself single member llc"],
  alternates: { canonical: "https://selfemployedfyi.com/field/how-to-pay-yourself-llc" },
};

const article = getArticle("how-to-pay-yourself-llc")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        One of the weirdest transitions when you go from employee to self-employed: you have to
        figure out how to pay yourself. There is no payroll department. No direct deposit schedule.
        Just you, your business account, and a question that feels like it should have an obvious answer.
      </p>

      <p>
        It depends on your business structure. Here is how it works for each.
      </p>

      <h2>Sole proprietor or single-member LLC (default tax treatment)</h2>

      <p>
        If you are a sole proprietor or a single-member LLC taxed as a sole proprietor (which is
        the default), your business and personal finances are legally distinct but treated as one
        for tax purposes. All business profit is already your income.
      </p>

      <p>
        Paying yourself is simply a transfer from your business account to your personal account.
        This is called an owner's draw. There is no formal process. No paycheck. No withholding.
        You transfer money whenever you want, in whatever amounts you want.
      </p>

      <p>
        The tax implication: you owe income tax and self-employment tax on your business profit,
        not on how much you drew. Whether you transferred $50,000 or $80,000 to your personal
        account does not change your tax bill. Your taxable income is your net profit.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2">
        <p className="text-sm font-semibold text-white mb-2">The system that works</p>
        <p className="text-sm text-slate-400 leading-relaxed">Set a recurring transfer from your business account to your personal account, like a paycheck. Weekly or bi-weekly. An amount that covers your personal expenses comfortably without draining the business. Keep the rest in the business account as operating buffer and tax savings. This creates a predictable personal cash flow without requiring formal payroll.</p>
      </div>

      <h2>Multi-member LLC</h2>

      <p>
        A multi-member LLC is taxed as a partnership by default. Each member pays taxes on their
        share of profits as reported on Schedule K-1. Members take money out as distributions.
        The distribution amount does not change the tax owed, only the partnership agreement
        determines each member's profit share.
      </p>

      <h2>S-corp (the one with actual payroll)</h2>

      <p>
        If you have elected S-corp tax treatment, the rules change significantly. You are required
        to pay yourself a "reasonable salary" as a W2 employee of your own company. The remaining
        profit can be taken as distributions.
      </p>

      <p>
        Reasonable salary is the thing people agonize over. The IRS does not define it precisely.
        The standard is what you would pay someone else to do the work you do. For a designer
        billing $200K in revenue, paying yourself $45,000 is probably not defensible.
        $80,000 to $120,000 is more defensible. When in doubt, consult a CPA.
      </p>

      <p>
        The mechanics: you set up payroll (QuickBooks Payroll, Gusto, or a similar service),
        run payroll on a regular schedule, withhold income taxes and the employee portion of
        FICA, and remit those to the IRS. The company also pays the employer portion.
        The remaining profit after salary and expenses comes out as a distribution, which is
        not subject to SE tax.
      </p>

      <h2>How much to actually transfer</h2>

      <p>
        Regardless of structure, the practical question is: how much of my business revenue can
        I personally spend?
      </p>

      <p>
        A useful framework for sole props and single-member LLCs:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-2">
        {[
          ["Taxes", "25-35% of revenue (into tax savings account)"],
          ["Business operating expenses", "Whatever is needed — software, insurance, etc."],
          ["Business buffer", "1-3 months of operating expenses in business account"],
          ["Personal draw", "The rest"],
        ].map(([category, note]) => (
          <div key={category as string} className="flex justify-between items-start gap-4">
            <span className="text-sm font-semibold text-white shrink-0">{category as string}</span>
            <span className="text-sm text-slate-400 text-right">{note as string}</span>
          </div>
        ))}
      </div>

      <p>
        Most freelancers under-buffer. A slow month hits, they have no runway, and they panic.
        One month of operating expenses as a buffer is minimum. Three months lets you sleep.
      </p>

      <h2>Do not mix personal and business</h2>

      <p>
        This bears repeating. Keep your business income in your business account. Pay yourself
        from there via explicit transfers. Do not pay personal bills directly from the business
        account unless you are recording them as a draw. The cleaner the separation, the easier
        taxes are, and the clearer your picture of business profitability.
      </p>

    </ArticleLayout>
  );
}
