import React from "react";
import { create } from "zustand";

export const useToggleStore = create((set) => ({
  isModalOpen: 0,
  toggleModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

export const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: () => set((newTheme) => ({ theme: newTheme })),
}));

export const useCredentialsStore = create((set) => ({
  username: "",
  email: "",
  password: "",
  authType: "signin",
  user: null,
  loading: true,
  setUsername: (newValue) => set((state) => ({ username: newValue })),
  setEmail: (newValue) => set((state) => ({ email: newValue })),
  setPassword: (newValue) => set((state) => ({ password: newValue })),
  setAuthType: (newValue) => set((state) => ({ authType: newValue })),
  setUserInfo: (newValue) => set((state) => ({ userInfo: newValue })),
  setLoading: (newValue) => set((state) => ({ loading: newValue })),
}));
