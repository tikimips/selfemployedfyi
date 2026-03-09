export interface Article {
  slug: string;
  title: string;
  description: string;
  stage: "start" | "build" | "grow" | "optimize";
  stageLabel: string;
  stageColor: string;
  readTime: number;
  publishedAt: string;
  keywords: string[];
}

export const articles: Article[] = [
  {
    slug: "how-self-employment-tax-works",
    title: "Self-Employment Tax: The Bill Nobody Warned You About",
    description: "You're now both the employer and the employee, which means you pay both sides of Social Security and Medicare. Here's exactly how the math works.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 6,
    publishedAt: "2026-03-08",
    keywords: ["self-employment tax", "how does self employment tax work", "se tax 15.3%"],
  },
  {
    slug: "how-much-to-set-aside-for-taxes",
    title: "The 30% Rule for Freelancers (And When It's Wrong)",
    description: "Everyone says set aside 30%. Here's when that's right, when it's not enough, and the actual math behind picking your number.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 5,
    publishedAt: "2026-03-08",
    keywords: ["how much to set aside for taxes self employed", "freelancer tax savings", "30 percent rule freelancer"],
  },
  {
    slug: "llc-vs-s-corp-vs-sole-proprietorship",
    title: "LLC vs S-Corp vs Sole Prop: An Honest Breakdown",
    description: "Do you actually need an LLC? When does an S-corp make sense? The real answers, without the YouTube hype.",
    stage: "start",
    stageLabel: "Starting Out",
    stageColor: "emerald",
    readTime: 7,
    publishedAt: "2026-03-08",
    keywords: ["llc vs s corp vs sole proprietorship", "do i need an llc freelancer", "s corp election threshold"],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const stageLabels: Record<string, string> = {
  start: "Starting Out",
  build: "Getting Stable",
  grow: "Building Wealth",
  optimize: "Playing Offense",
};
