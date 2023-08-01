"use client";

import { useRecoilState } from "recoil";
import { postsLoadingAtom, postsState } from "../components/atoms/postsAtom";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { auth, firestore, storage } from "../components/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useCommunityData from "./useCommunityData";

const usePosts = () => {
  const params = useParams();
  const communityIdParam = params.communityId;
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(null);
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();
  const [postState, setPostState] = useRecoilState(postsState);

  const getPosts = async () => {
    const batchSize = 10; // Number of posts to fetch in each batch
    const postQuery = lastPost
      ? query(
          collection(firestore, "posts"),
          where("communityId", "==", communityIdParam),
          orderBy("createdAt", "desc"),
          startAfter(lastPost.createdAt),
          limit(batchSize) // Limit the number of posts fetched per batch
        )
      : query(
          collection(firestore, "posts"),
          where("communityId", "==", communityIdParam),
          orderBy("createdAt", "desc"),
          limit(batchSize)
        );
    const postDocs = await getDocs(postQuery);
    if (postDocs.empty) {
      setLastPost(null);
      setLoading(false);
      return;
    }
    const newPosts = postDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostState((prev) => ({
      ...prev,
      posts: newPosts,
    }));
    console.log("Post state posts: ", postState.posts);
  };

  const onSelectPost = () => {};

  const onDeletePost = async (post) => {
    try {
      // Check if it has an image, delete if exists
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);

        try {
          // Check if the image exists before attempting to delete it
          await getDownloadURL(imageRef);
          // If the image exists, delete it
          await deleteObject(imageRef);
        } catch (error) {
          if (error.code === "object-not-found") {
            console.log("Image not found in storage:", error);
          } else {
            console.error("Error while deleting the image:", error);
          }
        }
      }

      // Delete post document (firestore)
      const postDocRef = doc(firestore, "posts", post.id);
      await deleteDoc(postDocRef);

      // Update recoil state
      console.log(postState.posts);
      setPostState((prev) => ({
        ...prev,
        posts: prev.posts.filter((item) => item.id !== post.id),
      }));
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    getPosts,
    postState,
    setPostState,
    onSelectPost,
    onDeletePost,
  };
};

export default usePosts;
