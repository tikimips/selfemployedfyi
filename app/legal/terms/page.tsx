import { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Freehold",
  description: "Terms of Service for Freehold, a product of General Public.",
  robots: { index: true, follow: false },
};

const EFFECTIVE_DATE = "March 1, 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Nav />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Legal</p>
          <h1 className="text-3xl font-black text-white mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-slate-300 leading-relaxed">

          <section>
            <p className="text-slate-400 text-sm leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of Freehold ("Service"),
              a product operated by General Public, Inc. ("General Public," "we," "us," or "our"),
              accessible at selfemployedfyi.com and associated domains. By creating an account or using
              the Service, you agree to these Terms. If you don't agree, don't use the Service.
            </p>
          </section>

          {[
            {
              title: "1. About Freehold and General Public",
              content: `Freehold is a financial tools and information platform designed for freelancers, founders, and self-employed individuals. It is operated by General Public, Inc., a technology company. General Public builds platforms and tools for independent operators.

Freehold provides calculators, guides, live news aggregation, and account features to help self-employed people understand their finances. Nothing on this Service constitutes financial, tax, legal, mortgage, or investment advice. All content is for informational and educational purposes only.`,
            },
            {
              title: "2. Eligibility",
              content: `You must be at least 18 years old to create an account or use the Service. By using Freehold, you represent and warrant that you meet this age requirement and have the legal capacity to enter into a binding agreement. The Service is intended for personal, non-commercial use unless otherwise agreed in writing with General Public.`,
            },
            {
              title: "3. Your Account",
              content: `You may create an account using Google, Apple, or email/password authentication. You are responsible for maintaining the security of your account credentials. Do not share your password. You are responsible for all activity that occurs under your account.

If you believe your account has been compromised, contact us immediately at privacy@generalpublic.ai. We reserve the right to suspend or terminate accounts that we believe have been compromised or that violate these Terms.`,
            },
            {
              title: "4. Acceptable Use",
              content: `You agree not to:

- Violate any applicable law or regulation
- Attempt to gain unauthorized access to any part of the Service or its infrastructure
- Reverse engineer, decompile, or disassemble any part of the Service
- Scrape, crawl, or spider any page of the Service in a way that places unreasonable load on our servers
- Use the Service to transmit spam, malware, or other harmful content
- Impersonate any person or entity or misrepresent your affiliation with any person or entity
- Use the Service for any fraudulent, deceptive, or abusive purposes
- Resell, sublicense, or otherwise commercialize access to the Service without our written consent

We reserve the right to terminate your access for any violation of these rules, at our sole discretion.`,
            },
            {
              title: "5. Intellectual Property",
              content: `All content on Freehold — including text, calculations, graphics, code, data, and design — is owned by General Public, Inc. or its licensors and is protected by U.S. and international copyright, trademark, and other intellectual property laws.

You may access and use the Service for your personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content from the Service without our express prior written consent.

User-provided content (such as data you enter into calculators) remains yours. By entering data into the Service, you grant us a limited, non-exclusive, royalty-free license to process that data solely for the purpose of providing the Service to you.`,
            },
            {
              title: "6. Third-Party Content and Links",
              content: `Freehold's Live Blog and other features may display content sourced, aggregated, or rewritten from third-party publications. Such content is attributed to its source and is provided for informational purposes. We do not endorse any third-party source, and we are not responsible for the accuracy, completeness, or timeliness of third-party content.

The Service may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites. Links do not constitute endorsement.`,
            },
            {
              title: "7. Not Financial, Tax, or Legal Advice",
              content: `FREEHOLD IS NOT A FINANCIAL ADVISOR, TAX ADVISOR, MORTGAGE BROKER, INVESTMENT ADVISOR, OR ATTORNEY. NOTHING ON THE SERVICE CONSTITUTES FINANCIAL, TAX, LEGAL, MORTGAGE, OR INVESTMENT ADVICE.

Calculator results, guides, live blog posts, and all other content are for informational and educational purposes only. Numbers produced by our calculators are estimates and should not be relied upon for financial decisions without consulting a licensed professional. Always consult a qualified CPA, tax attorney, financial advisor, or mortgage professional before making financial decisions.`,
            },
            {
              title: "8. Disclaimer of Warranties",
              content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, GENERAL PUBLIC DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or usefulness of any information on the Service.`,
            },
            {
              title: "9. Limitation of Liability",
              content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL GENERAL PUBLIC, INC., ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOST PROFITS, LOST DATA, BUSINESS INTERRUPTION, OR LOSS OF GOODWILL — ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

IN NO EVENT WILL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.

Some jurisdictions do not allow the limitation of liability for consequential damages, so the above limitation may not apply to you.`,
            },
            {
              title: "10. Indemnification",
              content: `You agree to indemnify, defend, and hold harmless General Public, Inc. and its officers, directors, employees, and agents from any claims, liabilities, damages, judgments, awards, costs, or expenses (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Service.`,
            },
            {
              title: "11. Privacy",
              content: `Your use of the Service is subject to our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data practices. By using the Service, you consent to our data practices as described in the Privacy Policy.`,
            },
            {
              title: "12. Modifications to the Service and Terms",
              content: `We reserve the right to modify or discontinue the Service (or any part of it) at any time, with or without notice. We may update these Terms from time to time. When we do, we'll update the effective date at the top. For material changes, we'll make reasonable efforts to notify you via email or a notice on the Service. Your continued use after changes become effective constitutes your acceptance of the updated Terms.`,
            },
            {
              title: "13. Termination",
              content: `You may stop using the Service and delete your account at any time from Settings > Account. We may suspend or terminate your account at any time, for any reason, including if we believe you have violated these Terms.

Upon termination, your right to use the Service ceases immediately. Sections of these Terms that by their nature should survive termination will survive, including disclaimers, limitations of liability, and indemnification.`,
            },
            {
              title: "14. Governing Law and Dispute Resolution",
              content: `These Terms are governed by the laws of the State of California, without regard to its conflict of law principles. You agree that any dispute arising from these Terms or your use of the Service will be resolved in the state or federal courts located in Los Angeles County, California, and you consent to personal jurisdiction in those courts.

PLEASE READ THIS: YOU AND GENERAL PUBLIC AGREE THAT EACH PARTY MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.`,
            },
            {
              title: "15. General",
              content: `These Terms constitute the entire agreement between you and General Public regarding the Service and supersede all prior agreements. If any provision is found to be invalid or unenforceable, the remaining provisions will remain in full force. Our failure to enforce any right or provision does not constitute a waiver of that right.

You may not assign your rights or obligations under these Terms without our prior written consent. We may freely assign our rights and obligations.`,
            },
            {
              title: "16. Contact",
              content: `Questions about these Terms? Reach us at:

General Public, Inc.
Los Angeles, California
legal@generalpublic.ai`,
            },
          ].map(({ title, content }) => (
            <section key={title}>
              <h2 className="text-base font-bold text-white mb-3">{title}</h2>
              <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{content}</div>
            </section>
          ))}

          <div className="border-t border-slate-800 pt-8">
            <p className="text-xs text-slate-600">
              Freehold is operated by General Public, Inc. &middot; Los Angeles, CA &middot;{" "}
              <a href="https://generalpublic.ai" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400">
                generalpublic.ai
              </a>
            </p>
            <p className="text-xs text-slate-600 mt-2">
              See also:{" "}
              <Link href="/legal/privacy" className="hover:text-slate-400">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
