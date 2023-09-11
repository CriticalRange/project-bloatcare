"use client";

import { atom } from "recoil";

// Atom for communities
export const communitiesAtom = atom({
  key: "communitiesAtom",
  default: {
    communityInfo: {},
  },
});

// Atom that check the community name when focused
export const communityNameCheckerAtom = atom({
  key: "communityNameCheckerAtom",
  default: {
    showCommunityNameChecker: false,
    remainingChars: "21",
  },
});
