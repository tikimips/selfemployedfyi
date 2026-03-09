import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "How to Open a Business Bank Account (And Why You Can't Wait)",
  description: "Mixing personal and business money is the number one bookkeeping mistake freelancers make. Here's how to fix it and what to look for in a business account.",
  keywords: ["business bank account freelancer", "best business checking account self employed", "open business bank account llc", "separate business personal finances"],
  alternates: { canonical: "https://selfemployedfyi.com/field/how-to-open-a-business-bank-account" },
};

const article = getArticle("how-to-open-a-business-bank-account")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        Mixing personal and business money is the single most common financial mistake freelancers make.
        It is not a moral failing. It just makes everything harder: taxes, bookkeeping, understanding
        your actual business income, and your ability to look like a professional to clients.
      </p>

      <p>
        Opening a dedicated business bank account is the fix. It takes about 15 minutes online.
        Here is what you need to know.
      </p>

      <h2>Why it matters more than you think</h2>

      <p>
        When tax season arrives, a mixed account forces you to go through every single transaction
        and categorize it as business or personal. That is hours of work that could be zero work
        if you had kept them separate.
      </p>

      <p>
        It also matters legally. If you have an LLC and you mix personal and business funds regularly,
        a court can decide the LLC is not a real legal entity and hold you personally liable for
        business debts. This is called "piercing the corporate veil." It does not happen often,
        but it happens to people who did not keep clean separation.
      </p>

      <p>
        And practically: you cannot actually tell if your business is profitable when everything
        is in one account. A separate business account makes your financial reality visible.
      </p>

      <h2>What you need to open one</h2>

      <p>
        As a sole proprietor (no LLC), you typically need:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-2 text-sm text-slate-400">
        <div className="flex items-center gap-2"><span className="text-emerald-400">+</span>Government-issued ID</div>
        <div className="flex items-center gap-2"><span className="text-emerald-400">+</span>Social Security Number (or EIN if you have one)</div>
        <div className="flex items-center gap-2"><span className="text-emerald-400">+</span>Business name (your legal name works for sole props)</div>
        <div className="flex items-center gap-2"><span className="text-emerald-400">+</span>Initial deposit (some banks require $25-100, many online banks have no minimum)</div>
      </div>

      <p>
        With an LLC, add: your Articles of Organization and your EIN (Employer Identification Number,
        free from the IRS at irs.gov, takes about 10 minutes).
      </p>

      <h2>Traditional banks vs online banks</h2>

      <p>
        Traditional banks (Chase, Bank of America, Wells Fargo) have business checking accounts
        but often charge monthly fees of $15-30 and have minimums to waive them. They are fine,
        but not optimized for solo operators.
      </p>

      <p>
        Online business banks built for freelancers and small businesses are usually better:
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-4">
        {[
          { name: "Mercury", desc: "Clean interface, no fees, no minimums, great for freelancers and startups. FDIC insured. Strong API if you ever need integrations.", verdict: "Best overall for most freelancers" },
          { name: "Relay", desc: "No fees, multiple sub-accounts (useful for tax savings buckets), solid bookkeeping integrations.", verdict: "Best if you want built-in money separation" },
          { name: "Lili", desc: "Built specifically for freelancers. Automatic tax bucket, simple expense tracking, no fees.", verdict: "Best for absolute beginners" },
          { name: "Found", desc: "Banking plus invoicing plus tax estimates in one app. All-in-one for solo operators.", verdict: "Best if you want everything in one place" },
        ].map(({ name, desc, verdict }) => (
          <div key={name}>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-sm text-slate-400 mt-0.5">{desc}</p>
            <p className="text-xs text-emerald-400 mt-1">{verdict}</p>
          </div>
        ))}
      </div>

      <h2>The tax savings bucket trick</h2>

      <p>
        Once you have a business account, add a second savings account specifically for taxes.
        Every time client money comes in, immediately transfer your tax percentage (25-35%) to
        that savings account.
      </p>

      <p>
        Relay lets you do this with multiple account buckets natively. Mercury lets you open multiple
        accounts under one login. Even a regular savings account at a different bank works.
        The point is that the money is visually and physically separate from operating funds.
      </p>

      <p>
        After a few months of doing this, you stop worrying about quarterly tax payments.
        The money is already there. You are just moving it.
      </p>

      <h2>Do you need a business credit card too?</h2>

      <p>
        Yes, eventually. A business credit card run through your business account creates a clean
        paper trail for expenses, earns rewards on spending you are doing anyway, and helps build
        business credit separate from personal credit.
      </p>

      <p>
        Chase Ink Cash, Capital One Spark, and American Express Blue Business Cash are popular
        starting points with no annual fees or low fees. Apply after you have had your business
        account open for a few months and have some transaction history.
      </p>

      <h2>The move to make tonight</h2>

      <p>
        Open Mercury or Relay. It takes 10 minutes online. You do not need an LLC first.
        You can open a sole proprietor business account today with just your SSN and your name.
      </p>

      <p>
        Then move any incoming client payments to that account going forward.
        Pay business expenses from it. Transfer your paycheck to your personal account periodically.
        That is the whole system.
      </p>

    </ArticleLayout>
  );
}
