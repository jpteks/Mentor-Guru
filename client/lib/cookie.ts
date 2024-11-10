import { cookies } from "next/headers";

export const useCookies = (payload: { role: string }) => {
  cookies().set("role", payload?.role as string);
};
