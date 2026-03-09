import { NextResponse } from "next/server";
import { getRecentLiveBlogPosts } from "@/lib/supabase";

export const runtime = "edge";
export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "5", 10);

  try {
    const posts = await getRecentLiveBlogPosts(limit);
    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch (error) {
    console.error("Live blog API error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
