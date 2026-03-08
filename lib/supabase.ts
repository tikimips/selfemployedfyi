import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
