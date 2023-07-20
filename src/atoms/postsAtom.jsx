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
