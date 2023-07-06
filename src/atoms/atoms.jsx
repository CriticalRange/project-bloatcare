import { atom } from "recoil";

export const authModalAtom = atom({
  key: "authModalAtom",
  default: {
    openAuthModal: false,
    authModalView: "signin",
  },
});

export const createCommunityModalAtom = atom({
  key: "createCommunityModalAtom",
  default: {
    openCreateCommunityModal: false,
  },
});

export const passwordCheckerAtom = atom({
  key: "passwordCheckerAtom",
  default: {
    showPasswordChecker: false,
    showConfirmPasswordChecker: false,
    passwordsMatch: false,
    testIsLowercase: false,
    testIsUppercase: false,
    testIsNumbers: false,
    testIsSpecialChars: false,
    testPasswordLength: false,
  },
});

export const showPasswordAtom = atom({
  key: "showPasswordAtom",
  default: {
    showPassword: false,
  },
});