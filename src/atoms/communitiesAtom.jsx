import { atom } from "recoil";

export const communitiesAtom = atom({
  key: "communitiesAtom",
  default: {
    communityId: "",
    isModerator: false,
    imageURL: "",
    userSnippets: [],
  },
});
