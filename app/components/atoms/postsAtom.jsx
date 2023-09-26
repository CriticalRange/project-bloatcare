"use client";

import { atom } from "recoil";

// Posts Atom
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
    createdAt: new Date(),
    /* this might be a problem later */
  },
});

// Selected File of the post creation held here
export const selectedFileAtom = atom({
  key: "selectedFileAtom",
  default: "",
});

// All the posts held here
export const postsState = atom({
  key: "postsState",
  default: {
    selectedPost: null,
    posts: [],
    isEmpty: false,
    isLoaded: false,
  },
});

// Posts loading atom
export const postsLoadingAtom = atom({
  key: "postsLoadingAtom",
  default: {
    postsLoading: false,
    postsLoadingMore: false,
  },
});

// Atom for comments
export const commentsAtom = atom({
  key: "commentsAtom",
  default: {
    comments: [],
    isEmpty: true,
  },
});

// Atom to create posts
export const createPostTabAtom = atom({
  key: "createPostTabAtom",
  default: "post",
});

// Atom for post modal
export const postModalAtom = atom({
  key: "postModalAtom",
  default: {
    openPostModal: false,
    postModalView: "signin",
    postInfo: {},
  },
});

export const profileInfoAtom = atom({
  key: "profileInfoAtom",
  default: [],
});
