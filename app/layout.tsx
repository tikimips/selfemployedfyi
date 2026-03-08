import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SelfEmployedFYI — Know Your Mortgage-Ready Income",
  description:
    "Self-employed? Find out what lenders actually see on your income — and how to close the gap between your tax returns and your dream home.",
  keywords: [
    "self-employed mortgage",
    "freelancer home loan",
    "schedule c income",
    "non-QM mortgage",
    "mortgage qualifying income",
    "self-employed tax deductions",
  ],
  openGraph: {
    title: "SelfEmployedFYI — Know Your Mortgage-Ready Income",
    description:
      "You make $200K. The bank thinks you make $60K. Find out your real mortgage-qualifying income in 2 minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
