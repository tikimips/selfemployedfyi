import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Live Blog Types ─────────────────────────────────────────────────────────

export interface LiveBlogCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  is_live: boolean;
  last_updated: string;
  created_at: string;
  post_count?: number;
}

export interface LiveBlogPost {
  id: string;
  category_slug: string;
  title: string;
  summary: string;
  content: string;
  image_url: string;
  image_alt: string;
  source_url: string;
  source_name: string;
  tags: string[];
  published_at: string;
  created_at: string;
  category?: LiveBlogCategory;
}

export async function getLiveBlogCategories(): Promise<LiveBlogCategory[]> {
  const { data, error } = await supabase
    .from("live_blog_categories")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getLiveBlogPosts(
  categorySlug?: string,
  limit = 20
): Promise<LiveBlogPost[]> {
  let query = supabase
    .from("live_blog_posts")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (categorySlug) {
    query = query.eq("category_slug", categorySlug);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getRecentLiveBlogPosts(limit = 5): Promise<LiveBlogPost[]> {
  const { data, error } = await supabase
    .from("live_blog_posts")
    .select("*, live_blog_categories!live_blog_posts_category_slug_fkey(*)")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  // Flatten joined category
  return (data || []).map((row: any) => ({
    ...row,
    category: row.live_blog_categories,
  }));
}

export interface LeadData {
  email: string;
  gross_revenue?: number;
  qualifying_income?: number;
  target_home_price?: number;
  recommendation?: string;
  created_at?: string;
}

export async function saveLead(data: LeadData): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.from("leads").insert([
      {
        email: data.email,
        gross_revenue: data.gross_revenue,
        qualifying_income: data.qualifying_income,
        target_home_price: data.target_home_price,
        recommendation: data.recommendation,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return { error: new Error(error.message) };
    }

    return { error: null };
  } catch (err) {
    console.error("Failed to save lead:", err);
    return { error: err as Error };
  }
}
