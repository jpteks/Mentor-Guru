import { NextRequest, NextResponse } from "next/server";
import axios from "axios"; // Import axios
import { backend_url } from "./app/constant";

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

  // Retrieve tokens from cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Redirect to /signin if user is not authenticated on protected routes
  if (isProtectedRoute && !accessToken) {
    if (refreshToken) {
      try {
        // Try refreshing the access token using the refresh token
        const response = await axios.get(`${backend_url}/auth/refresh-token`, {
          headers: {
            Cookie: `refreshToken=${refreshToken}`, // Send refreshToken in headers
          },
          withCredentials: true,
        });

        // Check if we got a new access token
        const newAccessToken = response.data.accessToken;
        if (newAccessToken) {
          // Set the new access token in cookies
          const nextResponse = NextResponse.next();
          nextResponse.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          });

          console.log("New access token fetched and set.");

          return nextResponse;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        return NextResponse.redirect(new URL("/signin", request.nextUrl));
      }
    } else {
      // No access or refresh token available, redirect to signin
      return NextResponse.redirect(new URL("/signin", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
