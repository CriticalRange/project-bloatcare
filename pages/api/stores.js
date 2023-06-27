import { create } from "zustand";

export const useAuthModalStore = create((set) => ({
  isModalOpen: 0,
  toggleModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

export const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: () => set((newTheme) => ({ theme: newTheme })),
}));

export const useCredentialsStore = create((set) => ({
  email: "",
  password: "",
  authType: "signin",
  setEmail: (newValue) => set((state) => ({ email: newValue })),
  setPassword: (newValue) => set((state) => ({ password: newValue })),
  setAuthType: (newValue) => set((state) => ({ authType: newValue })),
}));
