import { NextResponse, type NextRequest } from "next/server";

// Lightweight middleware: avoid importing the full Supabase SSR SDK here
// to keep Turbopack/dev server fast. We only need a quick check for an
// auth cookie for protected routes; detailed user resolution happens in
// server-side code where the Supabase client is appropriate.

const PROTECTED_PREFIXES = ["/studio", "/my-account", "/preview"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  // Quick heuristic: Supabase auth cookies use a project-prefixed key that
  // starts with "sb-" (see Supabase defaults). Check if any cookie name
  // starts with "sb-" — if so, assume the user may be authenticated and
  // allow the request to continue. This avoids requiring the full SDK in
  // the middleware and speeds up dev server cold starts.
  const cookies = request.cookies.getAll();
  const hasSupabaseCookie = cookies.some((c) => c.name.startsWith("sb-"));

  if (!hasSupabaseCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};