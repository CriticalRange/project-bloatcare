import { atom } from "recoil";

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
