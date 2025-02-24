// AuthStore.ts
import { create } from "zustand";
import { User } from "../types";

type State = {
  isLoggedIn: boolean;
  userData: User | null;
};

type Actions = {
  login: (user: User) => void;
  logout: () => void;
  setUserData: (user: User) => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  isLoggedIn: false,
  userData: null,
  login: (user: User) => set({ isLoggedIn: true, userData: user }),
  logout: () => set({ isLoggedIn: false, userData: null }),
  setUserData: (user: User) => set({ userData: user }),
}));
