"use client";

import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: {
    authenticated: false,
    authType: "",
    Custom_Claims: {},
    Disabled: false,
    Display_Name: "",
    Email: "",
    Email_Verified: false,
    Metadata: {},
    Photo_Url: "",
    Provider_Data: {},
    Uid: "",
    Password_Hash: "",
    Phone_Number: "",
    Password_Salt: "",
    Tokens_Valid_After_Time: "",
    Verification_Code: "",
    Communities: [],
  },
});

export const profileInfoAtom = atom({
  key: "profileInfoAtom",
  default: {
    Custom_Claims: {},
    Disabled: false,
    Display_Name: "",
    Email: "",
    Photo_URL: "",
    Metadata: {},
    Photo_Url: "",
    Provider_Data: {},
    Uid: "",
    Phone_Number: "",
    Communities: [],
    disabled: false,
  },
});
