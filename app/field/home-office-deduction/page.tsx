import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The Home Office Deduction: What Actually Qualifies",
  description: "The home office deduction is one of the most valuable available to freelancers and one of the most misunderstood. Here's exactly what qualifies and how to calculate it.",
  keywords: ["home office deduction self employed", "home office tax deduction rules", "can i deduct my home office freelancer", "schedule c home office"],
  alternates: { canonical: "https://propped.org/field/home-office-deduction" },
};

const article = getArticle("home-office-deduction")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        The home office deduction is one of the best available to self-employed people and also
        one of the most misunderstood. People either skip it entirely because they think it is
        complicated, or they claim it incorrectly and create audit risk. Neither is ideal.
      </p>

      <p>
        Here is the actual story.
      </p>

      <h2>The two requirements</h2>

      <p>
        To claim a home office deduction, the space must meet two tests:
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-4">
        <div>
          <p className="text-sm font-semibold text-white">1. Regular and exclusive use</p>
          <p className="text-sm text-zinc-400 mt-1">The space must be used regularly for business AND only for business. A dedicated spare room used only as your office qualifies. Your kitchen table where you also eat and the kids do homework does not. Your bedroom where you sometimes open a laptop does not.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">2. Principal place of business</p>
          <p className="text-sm text-zinc-400 mt-1">The home office must be your principal place of business, OR a place where you regularly meet clients, OR a separate structure (detached garage, studio, etc.) used for business. For most freelancers working from home, principal place of business is the relevant test.</p>
        </div>
      </div>

      <p>
        The exclusive use requirement is where people get tripped up. The IRS means it literally.
        If your home office is also a guest room with a bed in it, it does not qualify under
        the regular rules. A space that is 100% work, 100% of the time.
      </p>

      <h2>What counts as the office space</h2>

      <p>
        You do not need an entire room. A clearly defined area of a room can qualify if it is
        used exclusively for work. A partitioned corner, a built-out alcove, or a dedicated desk
        area in a studio apartment can work, though documenting and defending a partial-room
        deduction is harder than a full room.
      </p>

      <p>
        A full dedicated room is cleaner and easier to substantiate if you are ever questioned.
        If you have the option, use a full room.
      </p>

      <h2>Calculating the deduction: two methods</h2>

      <h3>Method 1: Simplified</h3>

      <p>
        $5 per square foot of office space, up to 300 square feet maximum. Maximum deduction: $1,500.
      </p>

      <p>
        This is easy to calculate and requires minimal record-keeping. For a 150 square foot office,
        that is $750/year. Not huge, but straightforward.
      </p>

      <h3>Method 2: Regular (actual expenses)</h3>

      <p>
        Calculate the percentage of your home used for business (office square footage divided by
        total home square footage), then apply that percentage to your home expenses.
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2">
        <p className="text-sm font-semibold text-white mb-3">Example: 200 sq ft office in a 1,400 sq ft home (14.3%)</p>
        <div className="space-y-2 text-sm">
          {[
            ["Annual rent", "$24,000", "$3,429"],
            ["Utilities", "$2,400", "$343"],
            ["Renter's insurance", "$300", "$43"],
            ["Internet (100% if home = office)", "$1,200", "$1,200"],
          ].map(([item, total, deduction]) => (
            <div key={item as string} className="flex justify-between text-zinc-400">
              <span>{item as string}</span>
              <div className="flex gap-6">
                <span className="text-zinc-600">{total as string} total</span>
                <span className="text-brand-300 w-16 text-right">{deduction as string}</span>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t border-zinc-700 pt-2 mt-1">
            <span className="text-white">Total deduction</span>
            <span className="text-brand-300">~$5,015</span>
          </div>
        </div>
        <p className="text-xs text-zinc-600 mt-2">vs. $1,000 with the simplified method for the same space</p>
      </div>

      <p>
        The regular method is almost always larger for people who rent or have significant home
        expenses. It requires more record-keeping (receipts for utilities, rent, insurance) but
        the difference can be substantial.
      </p>

      <p>
        If you own your home, the regular method can include mortgage interest (prorated), property
        taxes (prorated), homeowner's insurance (prorated), and depreciation on the home. The
        depreciation piece adds complexity but also value.
      </p>

      <h2>Expenses that are fully deductible regardless</h2>

      <p>
        Some home office-related expenses are 100% deductible without the square footage proration.
        Internet service is the big one: if your home internet is primarily for work, you can
        deduct a large percentage or all of it directly as a business expense on Schedule C,
        separate from the home office calculation.
      </p>

      <p>
        Office furniture and equipment (desk, chair, monitor, printer) purchased for the office are
        deductible as regular business equipment, not through the home office calculation.
      </p>

      <h2>Can you claim it if you also sometimes work at a co-working space?</h2>

      <p>
        Yes. The home office needs to be your principal place of business. You can work elsewhere
        sometimes. The question is where you do the administrative and management activities of
        your business and where you primarily work. If that is your home office, you qualify.
      </p>

      <h2>The audit risk question</h2>

      <p>
        Home office deductions are not the audit magnet they once were. The IRS reformed their
        audit approach, and legitimate home offices are expected and accepted. The risk comes from
        claiming spaces that do not genuinely meet the exclusive use test, or claiming percentages
        that seem unreasonably high relative to your home size.
      </p>

      <p>
        Document it. Photos of your office. A note in your records showing the square footage.
        Receipts for the expenses you are claiming. That is all you need to substantiate it.
      </p>

    </ArticleLayout>
  );
}
