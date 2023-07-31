"use client";

import { atom } from "recoil";

// Atom that controls auth modal opening
export const confirmationModalAtom = atom({
  key: "confirmationModalAtom",
  default: {
    openConfirmationModal: false,
    confirmationModalView: "signin",
  },
  dangerouslyAllowMutability: true,
});
