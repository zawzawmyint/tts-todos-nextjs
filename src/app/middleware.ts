import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("better-auth.session_token");

  console.log("Middleware cookies session", session);

  // Protect routes that start with /dashboard
  if (request.nextUrl.pathname.startsWith("/todos")) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todos/:path*"],
};
