import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://selfemployedfyi.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Freehold — Tools & Guides for People Who Work for Themselves",
    template: "%s | Freehold",
  },
  description:
    "Freehold is the platform for freelancers, founders, and the self-employed. Calculators, guides, and tools to help you understand your taxes, mortgage, finances, and business — at every stage.",
  keywords: [
    "self-employed tools",
    "freelancer resources",
    "self-employed mortgage calculator",
    "freelancer tax calculator",
    "self-employed tax deductions",
    "solo business tools",
    "1099 mortgage calculator",
    "non-QM mortgage self-employed",
    "quarterly tax estimator",
    "freelancer financial tools",
  ],
  authors: [{ name: "Freehold" }],
  creator: "Freehold",
  publisher: "Freehold",
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
    siteName: "Freehold",
    title: "Freehold — Tools & Guides for People Who Work for Themselves",
    description:
      "Calculators, guides, and tools for freelancers and the self-employed. Know your numbers. Own your future.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Freehold — The Platform for Independent Operators",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freehold — Tools & Guides for People Who Work for Themselves",
    description:
      "Calculators, guides, and tools for freelancers and the self-employed. Know your numbers. Own your future.",
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
                  name: "Freehold",
                  description:
                    "The platform for freelancers, founders, and the self-employed. Tools, calculators, and guides at every stage of building your independent business.",
                  publisher: {
                    "@id": `${BASE_URL}/#organization`,
                  },
                },
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#organization`,
                  name: "Freehold",
                  url: BASE_URL,
                  description:
                    "Freehold builds tools and resources for people who work for themselves.",
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
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
