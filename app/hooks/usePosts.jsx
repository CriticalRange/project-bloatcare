"use client";

import { useRecoilState } from "recoil";
import { postsState } from "../components/atoms/postsAtom";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "../components/firebase/clientApp";
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

const usePosts = () => {
  const params = useParams();
  const [hasMore, setHasMore] = useState(true);
  const communityIdParam = params.communityId;
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(undefined);
  const [postState, setPostState] = useRecoilState(postsState);

  const getPosts = async () => {
    setLoading(true);
    const batchSize = 10; // Number of posts to fetch in each batch
    const postQuery = lastPost
      ? query(
          collection(firestore, "posts"),
          where("communityId", "==", communityIdParam),
          orderBy("createdAt", "desc"),
          startAfter(lastPost.createdAt), // Start after the last fetched post's createdAt
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
      setHasMore(false);
      setPostState((prev) => ({
        ...prev,
        posts: [],
      }));
      setLastPost(null); // Reset lastPost when there are no more posts to fetch
      setLoading(false);
      return;
    }
    const newPosts = postDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPostState((prev) => ({
      ...prev,
      posts: lastPost ? [...prev.posts, ...newPosts] : newPosts,
    }));
    setLoading(false);

    // Update the lastPost to the last fetched post
    setLastPost(newPosts[newPosts.length - 1]);
    if (postDocs.size < batchSize) {
      setHasMore(false);
    }
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
    loading,
    hasMore,
    setHasMore,
  };
};

export default usePosts;
