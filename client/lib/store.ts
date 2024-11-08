import { create } from "zustand";
import { getCookie } from "cookies-next";
import { verifyToken } from "@/utils/verifyToken";

const at = getCookie("accessToken");
const payload = at && verifyToken(at as string);
export type Auth = {
  accessToken: string | null;
  role: string | null;
  avatarUrl?: string | null;
  id: string | null;
};

type State = {
  auth: Auth;
};

type Actions = {
  setAuth: (auth: Auth) => void;
};

export const useAuth = create<State & Actions>(set => ({
  auth: {
    accessToken: at ?? null,
    role: payload?.role ?? null,
    id: payload?.id ?? null,
  },
  setAuth: (auth: Auth) =>
    set(state => ({
      ...state,
      auth: {
        accessToken: auth.accessToken,
        role: auth.role,
        id: auth.id,
      },
    })),
}));
