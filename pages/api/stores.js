import { create } from "zustand";

export const useBrowserLoadedStore = create((set) => ({
  isBrowserLoaded: false,
  setBrowserLoaded: () =>
    set((state) => ({ isBrowserLoaded: !state.isBrowserLoaded })),
}));

export const useLoginModalStore = create((set) => ({
  isModalOpen: 0,
  toggleModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

export const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: () => set((newTheme) => ({ theme: newTheme })),
}));

export const useLoadedStore = create((set) => ({
  loaded: false,
  setLoaded: () => set((state) => ({ loaded: !state.loaded })),
}));

export const useLoginProfileStore = create((set) => ({
  loggedInProfile: null,
  setLoggedInProfile: () =>
    set(
      (loggedInProfileUpdate) => (
        { loggedInProfile: loggedInProfileUpdate }, true
      )
    ),
}));
export const useLoginProviderStore = create((set) => ({
  loggedInProvider: null,
  setLoggedInProvider: () =>
    set(
      (loggedInProviderUpdate) => (
        { loggedInProvider: loggedInProviderUpdate }, true
      )
    ),
}));
