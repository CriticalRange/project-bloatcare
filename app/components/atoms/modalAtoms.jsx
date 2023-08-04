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

// Atom that controls create community modal opening
export const createCommunityModalAtom = atom({
  key: "createCommunityModalAtom",
  default: {
    openCreateCommunityModal: false,
    defaultTitle: "",
  },
});

// Atom that controls auth modal opening
export const confirmationModalAtom = atom({
  key: "confirmationModalAtom",
  default: {
    openConfirmationModal: false,
    confirmationModalView: "signin",
  },
  dangerouslyAllowMutability: true,
});

export const communitySettingsModalAtom = atom({
  key: "communitySettingsModalAtom",
  default: {
    openCommunitySettingsModal: false,
    communitySettingsModalView: "unknown",
  },
});
