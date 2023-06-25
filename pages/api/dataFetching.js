import { useEffect } from "react";
import { create } from "zustand";

const useLoadedStore = create((set) => ({
  loaded: false,
  setLoaded: () => set((state) => ({ loaded: !state.loaded })),
}));

const useThemeStore = create((set) => ({
  theme: "light",
  setTheme: () => set((newTheme) => ({ theme: newTheme })),
}));
export const useLoaded = () => {
  const loaded = useLoadedStore((state) => state.loaded);
  const setLoaded = useLoadedStore((state) => state.setLoaded);
  useEffect(() => setLoaded(loaded), []);
  return loaded;
};
