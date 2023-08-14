"use client";

import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export const postsAtom = atom({
  key: "postsAtom",
  default: {
    id: "",
    communityId: "",
    communityImageUrl: "",
    creatorId: "",
    creatorDisplayName: "",
    title: "",
    description: "",
    numberOfComments: "",
    imageUrl: "",
    createdAt: Timestamp,
  },
});

export const selectedFileAtom = atom({
  key: "selectedFileAtom",
  default: "",
});

export const postsState = atom({
  key: "postsState",
  default: {
    selectedPost: null,
    posts: [],
    isEmpty: false,
  },
});

export const postsLoadingAtom = atom({
  key: "postsLoadingAtom",
  default: {
    postsLoading: false,
    postsLoadingMore: false,
  },
});

export const commentsAtom = atom({
  key: "commentsAtom",
  default: {
    comments: [],
    isEmpty: true,
  },
});
