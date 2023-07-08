import { atom } from "recoil";

export const communityDataStateAtom = atom({
  key: "communityDataAtom",
  default: {
    id: "",
  },
});
