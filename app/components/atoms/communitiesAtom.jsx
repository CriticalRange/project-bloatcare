"use client";

import { atom } from "recoil";

// Atom for communities
export const communitiesAtom = atom({
  key: "communitiesAtom",
  default: {
    communityId: "",
    isModerator: false,
    isJoined: false,
    imageURL: "",
    userSnippets: [],
  },
});

// Atom for community loading
export const communityLoading = atom({
  key: "communityLoading",
  default: false,
});

// Atom that check the community name when focused
export const communityNameCheckerAtom = atom({
  key: "communityNameCheckerAtom",
  default: {
    showCommunityNameChecker: false,
    remainingChars: "21",
  },
});
