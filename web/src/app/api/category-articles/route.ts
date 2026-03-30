import { NextRequest, NextResponse } from "next/server";
import { getCategoryArticles } from "@/features/category/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const slug = searchParams.get("slug");
  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = Number(searchParams.get("offset") ?? "0");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const articles = await getCategoryArticles(slug, limit, offset);

  return NextResponse.json(articles);
}