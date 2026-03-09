import type { Metadata } from "next";
import Link from "next/link";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "What Business Expenses Can I Deduct? The Real List",
  description: "A plain-English guide to self-employed tax deductions. What counts, what doesn't, and how to make sure you're not leaving money on the table every April.",
  keywords: ["self employed tax deductions list", "what can i deduct as a freelancer", "business expenses tax deductible", "schedule c deductions"],
  alternates: { canonical: "https://selfemployedfyi.com/field/what-business-expenses-can-i-deduct" },
};

const article = getArticle("what-business-expenses-can-i-deduct")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        The general rule for a business deduction is simple: if an expense is ordinary and necessary
        for your business, you can deduct it. "Ordinary" means common in your field.
        "Necessary" means helpful for doing your work. That is the whole test.
      </p>

      <p>
        The IRS is not trying to trick you here. They genuinely allow a wide range of deductions for
        self-employed people. The problem is that most freelancers either do not know what qualifies
        or do not bother tracking expenses carefully enough to claim them.
      </p>

      <p>
        Here is the real list, organized by category.
      </p>

      <h2>Home office</h2>

      <p>
        If you use part of your home regularly and exclusively for business, you can deduct it.
        The key word is "exclusively." Your kitchen table where you also eat breakfast does not qualify.
        A dedicated room or clearly defined space that is only used for work does.
      </p>

      <p>
        Two methods: the simplified method ($5 per square foot, up to 300 sq ft, max $1,500/year)
        or the regular method (actual percentage of home expenses based on square footage).
        The regular method is more work but usually larger. Most people with a real home office
        benefit from calculating both.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2">
        <p className="text-sm font-semibold text-white mb-3">Home office regular method includes:</p>
        <div className="grid grid-cols-2 gap-1 text-sm text-slate-400">
          {["Rent (prorated %)", "Mortgage interest (prorated %)", "Utilities (prorated %)", "Renter's/homeowner's insurance", "Home repairs affecting office", "Internet (prorated %)"].map(item => (
            <div key={item} className="flex items-center gap-2"><span className="text-emerald-500">+</span>{item}</div>
          ))}
        </div>
      </div>

      <h2>Technology and software</h2>

      <p>
        This is the easiest category for most freelancers because the expenses are obvious and
        the receipts exist automatically.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 grid grid-cols-2 gap-2">
        {[
          "Laptop, monitor, keyboard", "Software subscriptions (Adobe, Figma, Notion)", "Cloud storage (Dropbox, iCloud business)", "Project management tools", "Video conferencing tools", "Domain names and hosting", "Security software", "External drives and peripherals", "Phone (business-use portion)", "Internet service (business portion)",
        ].map(item => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="text-emerald-500 shrink-0">+</span>{item}
          </div>
        ))}
      </div>

      <p>
        For your phone and internet, deduct only the business-use percentage. If you use your phone
        70% for work, deduct 70% of the bill. Keep it defensible.
      </p>

      <h2>Professional development</h2>

      <p>
        Courses, books, conferences, and certifications that maintain or improve skills required in
        your current work are deductible. The word "current" matters. A course to learn a skill for
        a completely new career is not deductible.
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 grid grid-cols-2 gap-2">
        {["Online courses and tutorials", "Industry books and publications", "Professional conferences", "Certifications and licenses", "Professional memberships", "Industry newsletters (paid)"].map(item => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="text-emerald-500 shrink-0">+</span>{item}
          </div>
        ))}
      </div>

      <h2>Travel and transportation</h2>

      <p>
        Business travel is deductible. Commuting is not. The line is whether the travel is to a
        specific business destination rather than to your regular workplace (which for many freelancers
        is their home office).
      </p>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-2">
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-emerald-500 shrink-0">+</span>Mileage for client meetings (67 cents/mile in 2024)</div>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-emerald-500 shrink-0">+</span>Flights, hotels, meals for business trips (meals at 50%)</div>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-emerald-500 shrink-0">+</span>Parking and tolls for client visits</div>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-emerald-500 shrink-0">+</span>Rideshare to client meetings or the airport</div>
        <div className="flex items-start gap-2 text-sm text-red-400"><span className="text-red-500 shrink-0">-</span>Daily commute to a co-working space you go to every day</div>
        <div className="flex items-start gap-2 text-sm text-red-400"><span className="text-red-500 shrink-0">-</span>Personal vacations with one business meeting attached</div>
      </div>

      <h2>Marketing and client acquisition</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 grid grid-cols-2 gap-2">
        {["Website hosting and design", "Business cards", "Paid advertising (Google, social)", "Portfolio platform subscriptions", "Client gifts (up to $25/person/year)", "Meals with clients (50% deductible)"].map(item => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="text-emerald-500 shrink-0">+</span>{item}
          </div>
        ))}
      </div>

      <h2>Professional services</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 grid grid-cols-2 gap-2">
        {["CPA and tax preparation fees", "Attorney fees (business matters)", "Contract review", "Business coaching", "Bookkeeping services", "Payroll processing fees"].map(item => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="text-emerald-500 shrink-0">+</span>{item}
          </div>
        ))}
      </div>

      <h2>Insurance</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 grid grid-cols-2 gap-2">
        {["Professional liability (E&O) insurance", "General liability insurance", "Business property insurance", "Self-employed health insurance (separate deduction)", "Cyber liability insurance", "Business interruption insurance"].map(item => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="text-emerald-500 shrink-0">+</span>{item}
          </div>
        ))}
      </div>

      <h2>Retirement contributions</h2>

      <p>
        Contributions to a SEP IRA or Solo 401(k) are deductible from your gross income, reducing
        both income tax and, in some configurations, self-employment tax. This is one of the most
        valuable deductions available to self-employed people.
      </p>

      <p>
        SEP IRA: up to 25% of net self-employment income, max $69,000 for 2024.
        Solo 401(k): up to $23,000 employee contribution plus up to 25% employer contribution,
        max $69,000 total. Both are legitimate deductions and worth the paperwork.
      </p>

      <h2>The things that do not count</h2>

      <div className="bg-amber-950/40 border border-amber-800/40 rounded-xl p-5 my-2 space-y-2">
        <p className="text-amber-300 font-semibold text-sm mb-2">Common mistakes</p>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-red-400 shrink-0">-</span>Clothing you could wear outside of work (suits, business casual)</div>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-red-400 shrink-0">-</span>Groceries and meals at home, even if you work from home</div>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-red-400 shrink-0">-</span>Personal entertainment that tangentially relates to your field</div>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-red-400 shrink-0">-</span>Your own salary or draw (not an expense)</div>
        <div className="flex items-start gap-2 text-sm text-slate-400"><span className="text-red-400 shrink-0">-</span>Capital expenses in the year of purchase (depreciate instead, or use Section 179)</div>
      </div>

      <h2>The actual move: track everything</h2>

      <p>
        None of this matters if you do not have records. The IRS expects you to substantiate deductions
        with receipts, bank statements, or other documentation. The bar for an audit is usually
        "can you show me a receipt and explain what this was for?"
      </p>

      <p>
        The cheapest and easiest system: a dedicated business bank account and credit card.
        Every business expense runs through those accounts. At tax time, you export the statements.
        Done. The separation alone eliminates 80% of the headache.
      </p>

      <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-5 my-2">
        <p className="text-emerald-300 font-semibold text-sm mb-2">See how deductions affect your tax bill</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          The quarterly tax calculator lets you enter your expected expenses and see exactly
          how they reduce what you owe.
        </p>
        <Link href="/calculators/quarterly-taxes" className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          Calculate my taxes
        </Link>
      </div>

    </ArticleLayout>
  );
}
