"use client";

import { atom } from "recoil";

// Atom that controls auth modal opening
export const authModalAtom = atom({
  key: "authModalAtom",
  default: {
    openAuthModal: false,
    authModalView: "signin",
  },
  dangerouslyAllowMutability: true,
});
