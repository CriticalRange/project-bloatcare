import { atom } from "recoil";

// Show/hide password
export const showPasswordAtom = atom({
  key: "showPasswordAtom",
  default: {
    showPassword: false,
    showConfirmPassword: false,
  },
});
