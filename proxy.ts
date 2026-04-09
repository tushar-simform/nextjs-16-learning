import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy function for authentication and route protection.
 * Runs on Edge Runtime for optimal performance.
 *
 * Protects routes:
 * - /dashboard, /employees, /departments require authentication
 * - /departments additionally requires admin role
 * - /login redirects to /dashboard if already authenticated
 */

// Define protected routes
const protectedRoutes = ["/dashboard", "/employees", "/departments"];
const adminOnlyRoutes = ["/departments"];

/**
 * Helper function to check if a route is protected
 */
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Helper function to check if a route requires admin access
 */
function isAdminOnlyRoute(pathname: string): boolean {
  return adminOnlyRoutes.some((route) => pathname.startsWith(route));
}

/**
 * Parse and validate auth token from cookie.
 * Inline implementation for Edge Runtime compatibility.
 */
function parseAuthToken(
  token: string,
): { email: string; role: string; timestamp: number } | null {
  try {
    const parsed = JSON.parse(token);

    // Validate token structure
    if (!parsed.email || !parsed.role || !parsed.timestamp) {
      return null;
    }

    // Check if token is expired (24 hours = 86400000 ms)
    const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;
    const age = Date.now() - parsed.timestamp;

    if (age > TWENTY_FOUR_HOURS_MS) {
      return null;
    }

    // Validate role
    if (parsed.role !== "admin" && parsed.role !== "manager") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookies
  const authTokenCookie = request.cookies.get("auth-token");
  const authToken = authTokenCookie?.value;

  // Parse and validate token
  const parsedToken = authToken ? parseAuthToken(authToken) : null;
  const isAuthenticated = parsedToken !== null;

  // If user is on /login and already authenticated, redirect to dashboard
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If route is protected and user is not authenticated, redirect to login
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If route requires admin access and user is not admin, redirect to unauthorized
  if (
    isAdminOnlyRoute(pathname) &&
    isAuthenticated &&
    parsedToken.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Configure which routes should trigger the proxy
export const config = {
  matcher: ["/dashboard", "/employees", "/departments", "/login"],
};
