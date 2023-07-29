"use client";

import { atom } from "recoil";

export const createPostTabAtom = atom({
  key: "createPostTabAtom",
  default: "post",
});
