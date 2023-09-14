"use client";

import { atom } from "recoil";

// Atom for communities
export const communitiesAtom = atom({
  key: "communitiesAtom",
  default: {
    CommunityCreatedAt: "",
    CommunityDescription: "",
    CommunityId: "",
    CommunityName: "",
    CommunityType: "",
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

// Atom for user's info on community
export const userCommunityInfoAtom = atom({
  key: "userCommunityInfoAtom",
  default: {
    name: "",
    id: "",
    isJoined: false,
    isModerator: false,
  },
});
