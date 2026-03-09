import { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Propped",
  description: "Privacy Policy for Propped, a product of General Public.",
  robots: { index: true, follow: false },
};

const EFFECTIVE_DATE = "March 1, 2026";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Nav />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Legal</p>
          <h1 className="text-3xl font-black text-white mb-2">Privacy Policy</h1>
          <p className="text-zinc-500 text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="space-y-8 text-zinc-400 text-sm leading-relaxed">
          <section>
            <p>
              This Privacy Policy explains how General Public, Inc. ("General Public," "we," "us," or "our")
              collects, uses, and protects information when you use Propped ("Service"). We take your privacy
              seriously and are committed to being transparent about our data practices.
            </p>
            <p className="mt-3">
              If you have questions, contact us at <a href="mailto:privacy@generalpublic.ai" className="text-brand-400 hover:text-brand-300">privacy@generalpublic.ai</a>.
            </p>
          </section>

          {[
            {
              title: "1. Information We Collect",
              content: null,
              subsections: [
                {
                  heading: "Information you provide directly",
                  text: `When you create an account, we collect:
- Email address
- Name (optional)
- Password (hashed, never stored in plain text)
- Profile information you choose to add

When you use calculators or other tools, we may collect the data you enter (income figures, expense amounts, etc.) to provide results and, with your consent, to improve the Service.

When you contact us, we collect the information you include in your message.`,
                },
                {
                  heading: "Information collected automatically",
                  text: `When you use the Service, we automatically collect:
- IP address and approximate location (country/state level)
- Browser type and version
- Device type and operating system
- Pages visited, time spent, and navigation patterns
- Referring URL
- Error logs and performance data

We use standard web analytics tools (including server logs and anonymized analytics) to collect this information.`,
                },
                {
                  heading: "Information from third parties",
                  text: `If you sign in with Google or Apple, we receive basic profile information from those services, including your name and email address, as permitted by their privacy policies. We do not receive your Google or Apple passwords.`,
                },
              ],
            },
            {
              title: "2. How We Use Your Information",
              content: `We use the information we collect to:

- Create and manage your account
- Provide, maintain, and improve the Service
- Send transactional emails (verification, password reset, account notices)
- Respond to your inquiries and support requests
- Analyze usage patterns to improve the Service
- Detect and prevent fraud, abuse, and security incidents
- Comply with legal obligations

We do not use your personal information to make automated decisions that significantly affect you.`,
            },
            {
              title: "3. Legal Bases for Processing (EEA/UK Users)",
              content: `If you are in the European Economic Area or United Kingdom, our legal bases for processing your personal data are:

- Contract: To provide the Service you've requested (account creation, tool use)
- Legitimate interests: To improve our Service, ensure security, and for analytics (where these interests are not overridden by your rights)
- Consent: Where you have explicitly opted in (e.g., marketing communications)
- Legal obligation: Where required by law

You have the right to withdraw consent at any time where we rely on consent.`,
            },
            {
              title: "4. How We Share Your Information",
              content: `We do not sell your personal information. Period.

We may share information with:

Service providers: We use third-party vendors to help operate the Service, including Supabase (database and authentication), Vercel (hosting), and analytics providers. These vendors are contractually bound to use data only to provide services to us and to protect your data.

Business transfers: If General Public is acquired, merges with another company, or sells substantially all of its assets, your information may be transferred as part of that transaction. We will provide notice before your information becomes subject to a different privacy policy.

Legal requirements: We may disclose information if required to do so by law or in response to valid legal process (such as a subpoena or court order), or to protect the rights, property, or safety of General Public, our users, or the public.

With your consent: We may share information for other purposes with your explicit consent.`,
            },
            {
              title: "5. Data Retention",
              content: `We retain your account information for as long as your account is active. If you delete your account, we will delete or anonymize your personal information within 30 days, unless we are required to retain it longer for legal reasons.

Log data and analytics are typically retained for 12 months. Aggregated, anonymized data may be retained indefinitely.`,
            },
            {
              title: "6. Cookies and Tracking",
              content: `We use cookies and similar tracking technologies to:

- Maintain your session after you log in
- Remember your preferences
- Analyze how the Service is used

We use session cookies (which expire when you close your browser) and persistent cookies (which remain on your device). You can control cookies through your browser settings. Disabling cookies may affect your ability to use certain features of the Service.

We do not currently use third-party advertising cookies or cross-site tracking.`,
            },
            {
              title: "7. Security",
              content: `We implement reasonable technical and organizational measures to protect your personal information, including:

- Encryption in transit (HTTPS/TLS)
- Hashed passwords (we never store plain-text passwords)
- Row-level security on our database
- Regular security reviews

No system is 100% secure. While we work hard to protect your data, we cannot guarantee the security of information transmitted over the internet. If you believe your account has been compromised, contact us immediately.`,
            },
            {
              title: "8. Your Rights and Choices",
              content: `Depending on your location, you may have the following rights:

Access: Request a copy of the personal information we hold about you.
Correction: Request correction of inaccurate personal information.
Deletion: Request deletion of your personal information (you can also do this directly in Settings > Account).
Portability: Request your data in a machine-readable format.
Opt-out of marketing: Unsubscribe from marketing emails using the link in any email, or contact us.
Object to processing: Object to our use of your data in certain circumstances.

California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information (we do not sell personal information).

To exercise any of these rights, email us at privacy@generalpublic.ai. We will respond within 30 days.`,
            },
            {
              title: "9. Children's Privacy",
              content: `Propped is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete that information promptly.

If you believe we may have information from or about a child under 13, please contact us at privacy@generalpublic.ai.`,
            },
            {
              title: "10. International Data Transfers",
              content: `General Public is based in the United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the U.S. By using the Service, you consent to this transfer.

We ensure that transfers of personal data from the EEA or UK to the U.S. are subject to appropriate safeguards, including standard contractual clauses where required.`,
            },
            {
              title: "11. Third-Party Services",
              content: `The Service may contain links to third-party websites or integrate third-party services. This Privacy Policy does not apply to those third parties. We encourage you to review the privacy policies of any third-party services you use.

Sign-in with Google is subject to Google's Privacy Policy.
Sign-in with Apple is subject to Apple's Privacy Policy.`,
            },
            {
              title: "12. Changes to This Policy",
              content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email or by a prominent notice on the Service, and we will update the effective date. Your continued use of the Service after changes become effective constitutes your acceptance of the updated Policy.`,
            },
            {
              title: "13. Contact Us",
              content: `For questions, requests, or concerns about this Privacy Policy or our data practices:

General Public, Inc.
Los Angeles, California
privacy@generalpublic.ai

We aim to respond to all privacy inquiries within 30 days.`,
            },
          ].map(({ title, content, subsections }: any) => (
            <section key={title}>
              <h2 className="text-base font-bold text-white mb-3">{title}</h2>
              {content && <div className="whitespace-pre-line">{content}</div>}
              {subsections && subsections.map((sub: any) => (
                <div key={sub.heading} className="mb-4">
                  <h3 className="text-sm font-semibold text-zinc-300 mb-2">{sub.heading}</h3>
                  <div className="whitespace-pre-line">{sub.text}</div>
                </div>
              ))}
            </section>
          ))}

          <div className="border-t border-zinc-800 pt-8">
            <p className="text-xs text-zinc-600">
              Propped is operated by General Public, Inc. &middot; Los Angeles, CA &middot;{" "}
              <a href="https://generalpublic.ai" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400">
                generalpublic.ai
              </a>
            </p>
            <p className="text-xs text-zinc-600 mt-2">
              See also:{" "}
              <Link href="/legal/terms" className="hover:text-zinc-400">Terms of Service</Link>
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
