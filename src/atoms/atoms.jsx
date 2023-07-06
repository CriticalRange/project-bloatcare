import { atom } from "recoil";

// Atom that controls auth modal opening
export const authModalAtom = atom({
  key: "authModalAtom",
  default: {
    openAuthModal: false,
    authModalView: "signin",
  },
});

// Atom that controls create community modal opening
export const createCommunityModalAtom = atom({
  key: "createCommunityModalAtom",
  default: {
    openCreateCommunityModal: false,
  },
});

// Atom that checks the password when password input is focused
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

// Oauth Error Atom that slides in
export const oauthErrorAtom = atom({
  key: "oauthErrorAtom",
  default: {
    showOauthError: false,
  },
});

// Show/hide password
export const showPasswordAtom = atom({
  key: "showPasswordAtom",
  default: {
    showPassword: false,
    showConfirmPassword: false,
  },
});
