import type { Metadata } from "next";
import ArticleLayout from "@/components/ArticleLayout";
import { getArticle } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Freelance Contracts 101: What to Include Before You Start Any Project",
  description: "You do not need a lawyer to have a good freelance contract. Here's what every agreement should cover and the clauses that will save you from the most common disasters.",
  keywords: ["freelance contract template", "what to include in freelance contract", "freelance agreement basics", "contractor agreement self employed"],
  alternates: { canonical: "https://selfemployedfyi.com/field/freelance-contracts-101" },
};

const article = getArticle("freelance-contracts-101")!;

export default function Article() {
  return (
    <ArticleLayout article={article}>

      <p>
        Most freelancers do their first fifty projects without a real contract. Either they trust
        the client, or the project seems small, or they do not want to seem difficult.
        Then something goes wrong and they learn why contracts exist.
      </p>

      <p>
        A contract is not about distrust. It is about making sure both people are talking about
        the same project, the same deliverables, and the same money. Most disputes come from
        misaligned expectations, not bad actors.
      </p>

      <h2>The non-negotiables</h2>

      <p>
        Every freelance agreement, no matter how small the project, should cover these:
      </p>

      <div className="space-y-4 my-2">
        {[
          {
            title: "Scope of work",
            desc: "Exactly what you are delivering. Not vague. Not \"design work.\" Specific: \"3 website mockups in Figma, 2 rounds of revisions included, delivered as .fig files and PDF exports.\" The more specific the scope, the easier it is to identify what falls outside it.",
          },
          {
            title: "Payment terms",
            desc: "Amount, due dates, and what happens if payment is late. Net 30 means you wait 30 days. Net 7 means you get paid faster. A late fee clause (1.5-2% per month on overdue invoices) is standard and gives you leverage. Include the deposit amount if you require one upfront.",
          },
          {
            title: "Timeline and milestones",
            desc: "When you will deliver what. This protects both parties. You are committing to a schedule. The client is committing to providing feedback and approvals within a reasonable time. \"Client feedback required within 5 business days of delivery or timeline adjusts accordingly\" is a clause worth having.",
          },
          {
            title: "Revision limits",
            desc: "How many rounds of changes are included in the price. Two rounds is common. \"Unlimited revisions\" is how a $5,000 project turns into 6 months of your life.",
          },
          {
            title: "Intellectual property / ownership",
            desc: "Who owns the work when it is done? By default, the creator retains copyright until explicitly transferred. Most clients want a full transfer of ownership upon final payment. Some work (like stock assets or templates) you may want to retain license over. Be explicit.",
          },
          {
            title: "Kill fee",
            desc: "What happens if the client cancels the project after you have started? A kill fee (typically 25-50% of the remaining project value) compensates you for the time already spent and the opportunity cost of blocking out that time.",
          },
        ].map(({ title, desc }) => (
          <div key={title} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <p className="text-sm font-semibold text-white mb-1">{title}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <h2>Clauses worth adding for larger projects</h2>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 my-2 space-y-3">
        <div>
          <p className="text-sm font-semibold text-white">Liability limitation</p>
          <p className="text-sm text-slate-400 mt-0.5">Your liability is limited to the amount paid for the project. You are not responsible for business losses the client claims resulted from your work. Most clients accept this.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Independent contractor status</p>
          <p className="text-sm text-slate-400 mt-0.5">Explicitly states that you are an independent contractor, not an employee. You control your hours, methods, and tools. This matters for tax classification and protects you from misclassification issues.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Confidentiality</p>
          <p className="text-sm text-slate-400 mt-0.5">If you are working with sensitive business information, a mutual NDA or confidentiality clause protects both sides. Basic version: neither party shares confidential information with third parties during or after the engagement.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Portfolio rights</p>
          <p className="text-sm text-slate-400 mt-0.5">You can show the work in your portfolio unless the client explicitly restricts it. Include a clause stating you retain the right to display the work as samples of your work, unless otherwise agreed in writing.</p>
        </div>
      </div>

      <h2>Deposit before you start</h2>

      <p>
        Require a deposit before beginning any project of meaningful size. 25-50% upfront is
        standard. This does two things: it filters out clients who are not serious, and it ensures
        you are compensated for your initial time even if the project falls apart.
      </p>

      <p>
        A client who refuses to pay a deposit is telling you something. Not always bad, but worth noting.
      </p>

      <h2>How to actually use contracts</h2>

      <p>
        You do not need a lawyer to write a solid freelance contract for most projects.
        Templates are available through Freelancers Union (freelancersunion.org) and AND CO (now Fiverr).
        Bonsai, HoneyBook, and Dubsado have built-in contract templates with e-signature.
      </p>

      <p>
        For larger projects (over $20,000) or work involving significant IP or liability exposure,
        having an attorney review your template once is worth the cost. A few hundred dollars for
        a reviewed template you use for years is a good investment.
      </p>

      <p>
        Send it as a PDF or use e-signature software (DocuSign, HelloSign, the tools above).
        Email confirmation can serve as a contract in some jurisdictions but a signed document
        is cleaner and harder to dispute.
      </p>

      <h2>What to do when a client asks to use their contract instead</h2>

      <p>
        Read it. Really read it. Clients with in-house legal teams sometimes sneak in IP assignment
        clauses that give them rights to your methods and processes, not just the deliverables.
        Watch for: unlimited revisions, indemnification clauses that hold you responsible for
        the client's losses, assignment of moral rights, and non-compete provisions that prevent
        you from doing similar work for others.
      </p>

      <p>
        You are allowed to redline a client contract. Most clients expect some negotiation.
        "I am good with most of this, but I need to modify the IP clause and the liability section"
        is a perfectly normal response.
      </p>

    </ArticleLayout>
  );
}
