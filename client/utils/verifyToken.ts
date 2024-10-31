import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;
if (!SECRET_KEY)
  throw new Error("JWT_SECRET environment variable is required.");

// Mocked User Roles Data
const roles: Record<string, string[]> = {
  admin: ["/dashboard", "/courses", "/past-papers", "/solutions"],
  student: ["/courses", "/past-papers", "/solutions"],
};
// Verify and decode JWT
export const verifyToken = (token: string): { id: string; role: string } => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload as { id: string; role: string };
  } catch (error) {
    console.error("Error decoding token:", error);
    return { id: "", role: "" };
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
