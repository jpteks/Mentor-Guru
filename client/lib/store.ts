import { create } from "zustand";
import { getCookie } from "cookies-next";
import { verifyTokenAction } from "@/actions/verifyTokenAction";

// Define the Auth type
export type Auth = {
  accessToken: string | null;
  role: string | null;
  avatarUrl?: string | null;
  id: string | null;
};

// Define the store's state and actions types
type State = {
  auth: Auth;
};

type Actions = {
  setAuth: (auth: Auth) => void;
  fetchAuth: () => Promise<void>;
};

// Zustand store
export const useAuth = create<State & Actions>(set => ({
  auth: {
    accessToken: null,
    role: null,
    id: null,
  },
  setAuth: (auth: Auth) =>
    set(() => ({
      auth,
    })),
  fetchAuth: async () => {
    const at = getCookie("accessToken") as string | undefined;
    if (at) {
      try {
        const payload = await verifyTokenAction(at);
        set(() => ({
          auth: {
            accessToken: at,
            role: payload?.role ?? null,
            id: payload?.id ?? null,
          },
        }));
      } catch (error) {
        console.error("Failed to verify token:", error);
        set(() => ({
          auth: {
            accessToken: null,
            role: null,
            id: null,
          },
        }));
      }
    }
  },
}));
