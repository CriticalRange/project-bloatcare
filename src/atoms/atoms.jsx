import { atom } from "recoil";

export const authModalAtom = atom({
  key: "authModalState",
  default: {
    openAuthModal: false,
    authModalView: "signin",
  },
});

export const createCommunityModalAtom = atom({
  key: "authModalState",
  default: {
    openCreateCommunityModal: false,
  },
});
