import { NextRequest, NextResponse } from "next/server";
import { getCategoryArticles } from "@/features/category/queries";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const slug = searchParams.get("slug");
  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = Number(searchParams.get("offset") ?? "0");
  const search = searchParams.get("search") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const result = await getCategoryArticles(slug, limit, offset, search, sort);

  return NextResponse.json(result);
}