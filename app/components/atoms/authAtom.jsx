"use client";

import { atom } from "recoil";

// Not sure why I keep this

export const discordButtonLoading = atom({
  key: "discordButtonLoading",
  default: false,
});

export const twitchButtonLoading = atom({
  key: "twitchButtonLoading",
  default: false,
});
