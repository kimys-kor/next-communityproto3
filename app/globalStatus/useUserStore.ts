import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { UserInfo } from "../types";

type UserStore = {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  clearUserInfo: () => void;
};

export const useUserStore = create(
  subscribeWithSelector<UserStore>((set) => ({
    userInfo: null,
    setUserInfo: (userInfo) => set({ userInfo }),
    clearUserInfo: () => set({ userInfo: null }),
  }))
);
