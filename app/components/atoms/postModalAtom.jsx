import { atom } from "recoil";

export const postModalAtom = atom({
  key: "postModalAtom",
  default: {
    openPostModal: false,
    postModalView: "signin",
    postInfo: {},
  },
});
