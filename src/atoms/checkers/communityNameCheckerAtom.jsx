import { atom } from "recoil";

// Atom that check the community name when focused
export const communityNameCheckerAtom = atom({
  key: "communityNameCheckerAtom",
  default: {
    showCommunityNameChecker: false,
    remainingChars: "21",
  },
});
