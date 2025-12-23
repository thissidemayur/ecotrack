import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {

  // 1. Get refresh token from http only cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const { pathname } = request.nextUrl;



  // Define auth paths where logged-in users should not go
  const authPaths = ["/login", "/register", "/forgot-password", "/verify-otp"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Define protected routes where only logged-in users can go
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // If user is authenticated and tries to visit authPaths (like /login)
  // Redirect them to dashboard since they're already logged in
  if (refreshToken && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is NOT authenticated and tries to visit protected routes
  // Redirect them to login page
  if (!refreshToken && isProtectedPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to proceed if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
  ],
};
