//import { jwtVerify, JWTPayload } from "jose";
import jwt from "jsonwebtoken";

export interface authPayload {
  id: string;
  role: string;
}

//const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);
const SECRET_KEY = process.env.JWT_SECRET;

// User Roles Data
const roles: Record<string, string[]> = {
  admin: ["/dashboard", "/courses", "/past-papers", "/solutions"],
  student: ["/courses", "/past-papers", "/solutions"],
};

// Verify and decode JWT
export const verifyToken = (token: string): authPayload => {
  try {
    const payload = jwt.verify(token, SECRET_KEY as string, {
      algorithms: ["HS256"],
    });

    return payload as authPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return { role: "", id: "" };
  }
};

// Check if user has access based on role
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasAccess = (userRole: any, pathname: string): boolean => {
  const allowedRoutes = roles[userRole];
  if (!allowedRoutes) {
    console.warn(`No routes configured for role: ${userRole}`);
    return false;
  }
  return allowedRoutes.some(route => pathname.startsWith(route));
};
