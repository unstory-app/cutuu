import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Playwright starts the dev server and requires a 200 status to
   * begin the tests, so this ensures that the tests can start
   */
  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  /*
   * Auth logic is handled by Stack Auth in the layout and pages.
   * This proxy can still handle specific redirects if needed,
   * but we should avoid using process.env.AUTH_SECRET.
   */

  if (["/login", "/register", "/landing"].includes(pathname)) {
    return NextResponse.next();
  }

  // Basic check: if not a protected route and not logged in, pages will handle redirect.
  // For API routes, they check for the user session internally.
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat/:id",
    "/api/:path*",
    "/login",
    "/register",

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
