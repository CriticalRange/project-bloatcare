"use client";

import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: [],
});

export const userCommunityInfoAtom = atom({
  key: "userCommunityInfoAtom",
  default: {},
});

export const socialOnboardingAtom = atom({
  key: "socialOnboardingAtom",
  default: {
    provider: "",
    receivedToken: "",
    tokenExpiresAt: "",
    userInfo: {},
  },
});
