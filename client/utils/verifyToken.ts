import { jwtVerify, JWTPayload } from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required.");
}

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

// User Roles Data
const roles: Record<string, string[]> = {
  admin: ["/dashboard", "/courses", "/past-papers", "/solutions"],
  student: ["/courses", "/past-papers", "/solutions"],
};

// Verify and decode JWT
export const verifyToken = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Check if user has access based on role
export const hasAccess = (userRole: string, pathname: string): boolean => {
  const allowedRoutes = roles[userRole];
  if (!allowedRoutes) {
    console.warn(`No routes configured for role: ${userRole}`);
    return false;
  }
  return allowedRoutes.some(route => pathname.startsWith(route));
};
