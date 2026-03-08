import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://selfemployedfyi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "SelfEmployedFYI — Mortgage Calculator for the Self-Employed",
    template: "%s | SelfEmployedFYI",
  },
  description:
    "Free mortgage qualification calculator for freelancers and self-employed. See exactly what lenders calculate from your tax returns — and close the gap between what you earn and what you qualify for.",
  keywords: [
    "self-employed mortgage calculator",
    "freelancer mortgage qualifying income",
    "1099 mortgage calculator",
    "schedule c mortgage income",
    "non-QM mortgage self-employed",
    "self-employed home loan",
    "mortgage qualifying income calculator",
    "bank statement loan calculator",
    "self-employed turned down mortgage",
    "how do lenders calculate self-employed income",
  ],
  authors: [{ name: "SelfEmployedFYI" }],
  creator: "SelfEmployedFYI",
  publisher: "SelfEmployedFYI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "SelfEmployedFYI",
    title: "SelfEmployedFYI — Mortgage Calculator for the Self-Employed",
    description:
      "You make $200K. The bank thinks you make $60K. Find out your real mortgage-qualifying income in 2 minutes — free.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SelfEmployedFYI — Know Your Mortgage-Ready Income",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SelfEmployedFYI — Mortgage Calculator for the Self-Employed",
    description:
      "You make $200K. The bank thinks you make $60K. See your real mortgage-qualifying income in 2 minutes.",
    images: [`${BASE_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "SelfEmployedFYI",
                  description:
                    "Free mortgage qualification calculator for freelancers and self-employed people.",
                  publisher: {
                    "@id": `${BASE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#organization`,
                  name: "SelfEmployedFYI",
                  url: BASE_URL,
                  description:
                    "Tools to help self-employed people understand and navigate mortgage qualification.",
                },
                {
                  "@type": "WebApplication",
                  "@id": `${BASE_URL}/#app`,
                  name: "Self-Employed Mortgage Qualifying Income Calculator",
                  url: BASE_URL,
                  description:
                    "Calculate your exact mortgage-qualifying income as a self-employed person. See your Schedule C qualifying income, deduction gap, and whether conventional or Non-QM loans are right for you.",
                  applicationCategory: "FinanceApplication",
                  operatingSystem: "Web",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                    availability: "https://schema.org/InStock",
                  },
                  featureList: [
                    "Schedule C qualifying income calculation",
                    "Conventional vs Non-QM loan recommendation",
                    "Deduction gap analysis",
                    "Downloadable PDF report",
                    "Real-time results",
                  ],
                  publisher: {
                    "@id": `${BASE_URL}/#organization`,
                  },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "How do lenders calculate income for self-employed borrowers?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Conventional lenders average your last 2 years of Schedule C net income from your 1040 tax returns — after all business deductions. They do not use bank statements or gross revenue. This often results in a qualifying income far below your actual earnings.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "What is a Non-QM loan and is it right for self-employed borrowers?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "A Non-QM (Non-Qualified Mortgage) bank statement loan qualifies you based on 12-24 months of average monthly bank deposits rather than your tax returns. This is ideal for self-employed borrowers who write off large business expenses. The tradeoff is a slightly higher interest rate (typically 0.5-2% above conventional rates).",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Why do my tax deductions hurt my mortgage application?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Lenders use your Schedule C net income — the number after all your business write-offs. The same deductions that reduce your tax bill also reduce the income figure lenders use to calculate how much you can borrow. A freelancer making $200K gross with $120K in deductions appears to earn only $80K to a conventional lender.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
