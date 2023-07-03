import React from "react";
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: () => set((newTheme) => ({ theme: newTheme })),
}));

export const useCredentialsStore = create((set) => ({
  username: "",
  email: "",
  password: "",
  authType: "signin",
  userInfo: null,
  loading: true,
  userUid: "",
  error: "",
  setUsername: (newValue) => set((state) => ({ username: newValue })),
  setEmail: (newValue) => set((state) => ({ email: newValue })),
  setPassword: (newValue) => set((state) => ({ password: newValue })),
  setAuthType: (newValue) => set((state) => ({ authType: newValue })),
  setUserInfo: (newValue) => set((state) => ({ userInfo: newValue })),
  setLoading: (newValue) => set((state) => ({ loading: newValue })),
  setUserUid: (newValue) => set((state) => ({ userUid: newValue })),
  setError: (newValue) => set((state) => ({ error: newValue })),
}));
