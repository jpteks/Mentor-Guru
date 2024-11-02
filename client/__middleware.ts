import { NextRequest, NextResponse } from "next/server";
import { verifyToken, hasAccess } from "@/utils/verifyToken";

const protectedRoutes = [
  "/dashboard",
  "/courses",
  "/past-papers",
  "/solutions",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Retrieve token from cookies
  const token = request.cookies.get("refreshToken")?.value;

  // Verify token and extract user role from it
  const user = token ? verifyToken(token as string) : null;

  const userRole = user ? user?.role : null;

  // Redirect to /signin if user is not authenticated on protected routes
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  // Role-based access control for protected routes
  if (isProtectedRoute && user) {
    const isAllowed = hasAccess(userRole as string, pathname);
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
