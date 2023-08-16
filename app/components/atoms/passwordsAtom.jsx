"use client";

import { atom } from "recoil";

// Show/hide password
export const showPasswordAtom = atom({
  key: "showPasswordAtom",
  default: {
    showPassword: false,
    showConfirmPassword: false,
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
