import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //console.log("🔥 Middleware is running on:", request.nextUrl.pathname);

  const token = request.cookies.get("access_token")?.value;
  //console.log("🎯 Token from cookie:", token);

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    //console.log("❌ No token, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
