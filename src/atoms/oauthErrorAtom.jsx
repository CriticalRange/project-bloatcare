import { atom } from "recoil";

// Oauth Error Atom that slides in
export const oauthErrorAtom = atom({
  key: "oauthErrorAtom",
  default: {
    showOauthError: false,
  },
});
