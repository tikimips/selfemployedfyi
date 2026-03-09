import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "How to Build Business Credit From Zero",
  description: "Business credit is separate from personal credit and takes time to build. Here's the step-by-step process for establishing real business credit as a freelancer or small business owner.",
  keywords: ["how to build business credit", "business credit for freelancers", "separate business credit personal credit", "dun bradstreet small business"],
  alternates: { canonical: "https://propped.org/field/how-to-build-business-credit" },
};

const article = getArticle("how-to-build-business-credit")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        Business credit is a financial identity for your business that is separate from your
        personal credit. Built correctly, it lets your business qualify for financing, vendor
        accounts, and better rates without touching your personal credit score.
        Most freelancers and small business owners never build it. Then they need capital and
        have no options that do not involve a personal guarantee.
      </p>

      <p>
        Here is how to build it from scratch.
      </p>

      <h2>Step 1: Establish your business as a real entity</h2>

      <p>
        Business credit bureaus (Dun and Bradstreet, Experian Business, Equifax Business) track
        businesses by their legal name, EIN, and other identifiers. Before anything else, your
        business needs to exist formally.
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-2 text-sm text-zinc-400">
        <div className="flex items-start gap-2"><span className="text-brand-400 shrink-0">1</span>Form an LLC or corporation (sole proprietors can build some business credit but have limits)</div>
        <div className="flex items-start gap-2"><span className="text-brand-400 shrink-0">2</span>Get an EIN from irs.gov (free, takes 10 minutes)</div>
        <div className="flex items-start gap-2"><span className="text-brand-400 shrink-0">3</span>Open a dedicated business bank account in the business's name</div>
        <div className="flex items-start gap-2"><span className="text-brand-400 shrink-0">4</span>Get a business phone number (even a Google Voice number) listed publicly</div>
        <div className="flex items-start gap-2"><span className="text-brand-400 shrink-0">5</span>Get a DUNS number from Dun and Bradstreet (free at dnb.com/duns-number)</div>
      </div>

      <p>
        The DUNS number is D and B's unique identifier for your business. Many vendor credit
        accounts and larger contracts require it. Register for it early because it can take
        a few weeks to process.
      </p>

      <h2>Step 2: Open vendor credit accounts that report</h2>

      <p>
        The fastest way to start building business credit is through vendor or "trade" accounts:
        businesses that extend credit on net terms (Net 30, Net 60) and report payment history
        to business credit bureaus.
      </p>

      <p>
        These are typically easy to qualify for because they do not check personal credit and
        do not require established business credit. You apply, get a small credit line, buy
        products or services, and pay on time.
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-3">
        <p className="text-sm font-semibold text-white">Starter vendor accounts that report to D and B</p>
        {[
          { name: "Uline", desc: "Shipping and packaging supplies. Easy to get. Reports to D&B." },
          { name: "Quill", desc: "Office supplies. Staples subsidiary. Reports to business bureaus." },
          { name: "Grainger", desc: "Industrial supplies. Good if relevant to your business." },
          { name: "Amazon Business", desc: "Business Prime with net terms. Widely useful." },
          { name: "Brex or Ramp (charge cards)", desc: "Business charge cards that do not require personal credit checks at certain revenue levels." },
        ].map(({ name, desc }) => (
          <div key={name}>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-sm text-zinc-400">{desc}</p>
          </div>
        ))}
      </div>

      <h2>Step 3: Open a secured or EIN-only business credit card</h2>

      <p>
        After a few months of vendor account history, look for business credit cards. Early options:
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-3 text-sm">
        <div>
          <p className="font-semibold text-white">Secured business credit card</p>
          <p className="text-zinc-400 mt-0.5">You put down a deposit that becomes your credit limit. Builds credit with use. Good starting point if you have limited personal credit too.</p>
        </div>
        <div>
          <p className="font-semibold text-white">Credit union business cards</p>
          <p className="text-zinc-400 mt-0.5">Local credit unions often have more flexible underwriting for small business cards. Worth checking with whichever credit union you bank with.</p>
        </div>
        <div>
          <p className="font-semibold text-white">Brex or Ramp (charge cards)</p>
          <p className="text-zinc-400 mt-0.5">These underwrite based on business bank account balance, not personal credit. Good if you have revenue but limited credit history. No personal guarantee at standard tiers.</p>
        </div>
      </div>

      <h2>Step 4: Pay early, not just on time</h2>

      <p>
        Business credit scoring is different from personal credit. Dun and Bradstreet's Paydex
        score (0-100) rewards paying before the due date. A company that consistently pays
        30 days early scores higher than one that pays on the due date. Pay early.
      </p>

      <h2>Step 5: Monitor your business credit reports</h2>

      <p>
        Check your business credit reports periodically:
      </p>

      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 my-2 space-y-2 text-sm text-zinc-400">
        <div className="flex justify-between"><span>Dun and Bradstreet</span><span className="text-white">dnb.com (Paydex score)</span></div>
        <div className="flex justify-between"><span>Experian Business</span><span className="text-white">experian.com/business</span></div>
        <div className="flex justify-between"><span>Equifax Business</span><span className="text-white">equifax.com/business</span></div>
        <div className="flex justify-between"><span>Nav.com</span><span className="text-white">Free monitoring across bureaus</span></div>
      </div>

      <h2>How long does it take</h2>

      <p>
        Building a solid business credit profile takes 12-24 months of consistent positive payment
        history. There are no shortcuts. The "business credit secrets" courses promising to build
        $100,000 in business credit in 90 days are selling something that does not work that way.
      </p>

      <p>
        Start now. Even if you do not need business credit today, you will eventually.
        And credit that took two years to build is available immediately when you need it.
        Credit that you start building the week you need it is not.
      </p>

    </ArticleLayout>
  );
}
