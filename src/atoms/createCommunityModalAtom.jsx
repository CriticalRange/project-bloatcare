import { atom } from "recoil";

// Atom that controls create community modal opening
export const createCommunityModalAtom = atom({
  key: "createCommunityModalAtom",
  default: {
    openCreateCommunityModal: false,
  },
});
