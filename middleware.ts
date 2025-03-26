import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("token")?.value;
  console.log("Token from cookies:", token);

  if (!token) {
    console.warn("No authentication found. Redirecting to /login.");
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Proceed if checks pass
  console.log("All checks passed. Proceeding with request.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
