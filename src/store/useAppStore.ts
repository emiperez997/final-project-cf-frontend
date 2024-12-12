import { create } from "zustand";
import { UserToken } from "./types";
import { persist } from "zustand/middleware";

interface AppState {
  user: UserToken | null;
  isAuth: boolean;
  setUser: (user: UserToken) => void;
  logout: () => void;
  initializeUser: () => void;
}

export const useAppStore = create(
  persist<AppState>(
    (set) => ({
      user: null,
      isAuth: false,
      setUser: (user: UserToken) => {
        set({ user, isAuth: true });
      },
      logout: () => {
        set({ user: null, isAuth: false });
        localStorage.removeItem("user");
      },
      initializeUser: () => {
        const state = localStorage.getItem("app-storage");

        if (state) {
          const {
            state: { user },
          } = JSON.parse(state);

          if (user) {
            if (user.exp * 1000 > Date.now()) {
              set({ user, isAuth: true });
            } else {
              set({ user: null, isAuth: false });
              localStorage.removeItem("user");
            }
          }
        }
      },
    }),
    { name: "app-storage" }
  )
);
