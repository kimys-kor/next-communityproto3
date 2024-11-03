import { create } from "zustand";

type UserState = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

export const useAuthStore = create<UserState>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn) => set({ loggedIn }),
}));
