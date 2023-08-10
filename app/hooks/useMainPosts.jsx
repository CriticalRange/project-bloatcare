"use client";

import {
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { postsState } from "../components/atoms/postsAtom";
import { auth, firestore, storage } from "../components/firebase/clientApp";

const useMainPosts = () => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const [hasMore, setHasMore] = useState(true);
  const communityIdParam = params.communityId;
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(undefined);
  const [postState, setPostState] = useRecoilState(postsState);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const getRandomPostIndices = (totalPosts, batchSize) => {
    const randomIndices = [];
    const availableIndices = Array.from({ length: totalPosts }, (_, i) => i);

    while (randomIndices.length < batchSize && availableIndices.length > 0) {
      const randomIndex = Math.floor(
        (crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32) *
          availableIndices.length
      );
      randomIndices.push(availableIndices[randomIndex]);
      availableIndices.splice(randomIndex, 1);
    }

    return randomIndices;
  };

  const getPostsNoLogin = async () => {
    console.log("Get posts no login works");
    try {
      setLoading(true);
      const batchSize = 10; // Number of posts to fetch in each batch

      const postsCollection = collection(firestore, "posts");
      const totalPostsData = await getCountFromServer(postsCollection);
      const totalPosts = totalPostsData.data().count;
      const randomIndices = getRandomPostIndices(totalPosts, batchSize);
      console.log(randomIndices);
      const postQuery = lastPost
        ? query(
            collection(firestore, "posts"),
            where("postId", "in", randomIndices),
            limit(batchSize) // Limit the number of posts fetched per batch
          )
        : query(
            collection(firestore, "posts"),
            where("postId", "in", randomIndices),
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
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsLogin = async () => {
    console.log("Get posts login works");
    console.log(`Changes for ${user?.displayName} `);
    try {
      setLoading(true);
      const batchSize = 10; // Number of posts to fetch in each batch

      const postsCollection = collection(firestore, "posts");
      const totalPostsData = await getCountFromServer(postsCollection);
      const totalPosts = totalPostsData.data().count;
      const randomIndices = getRandomPostIndices(totalPosts, batchSize);
      console.log(randomIndices);

      const userCommunitySnippetsRef = collection(
        firestore,
        `users/${user.uid}/communitySnippets`
      );

      const userCommunitySnippetsDoc = await getDocs(userCommunitySnippetsRef);
      const userCommunitySnippets = userCommunitySnippetsDoc.docs.map(
        (snippet) => snippet.data().communityId
      );
      console.log("User community snippets: ", userCommunitySnippets);
      const postQuery = lastPost
        ? query(
            collection(firestore, "posts"),
            where("communityId", "in", userCommunitySnippets),
            limit(batchSize) // Limit the number of posts fetched per batch
          )
        : query(
            collection(firestore, "posts"),
            where("communityId", "in", userCommunitySnippets),
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
    } catch (error) {
      console.log(error);
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

  const onLikePost = async (post, isLikedLocal, isDislikedLocal) => {
    try {
      const userPostSnippetRef = doc(
        firestore,
        "users",
        user?.uid,
        "postSnippets",
        post.id
      );
      const postDocRef = doc(firestore, "posts", post.id);
      const userPostSnippetDoc = await getDoc(userPostSnippetRef);
      if (!userPostSnippetDoc.exists()) {
        console.error(
          "User snippet document doesn't exist, setting liked to true"
        );
        await setDoc(userPostSnippetRef, {
          isLiked: true,
          isDisliked: false,
        });
        setIsLiked(true);
        setIsDisliked(false);

        return true;
      }
      const postDoc = await getDoc(postDocRef);
      if (!postDoc.data().isLiked && !isLikedLocal) {
        if (!postDoc.data().isDisliked && !isDislikedLocal) {
          await setDoc(userPostSnippetRef, {
            isLiked: !isLikedLocal,
            isDisliked: false,
          });
          setIsLiked(true);
          setIsDisliked(false);
          await updateDoc(postDocRef, {
            numberOfLikes: isLikedLocal
              ? postDoc.data().numberOfLikes - 1
              : postDoc.data().numberOfLikes + 1,
          });
          return true;
        } else if (postDoc.data().isDisliked && isDislikedLocal) {
          console.warn("Already disliked, removing dislike adding like");
          await setDoc(userPostSnippetRef, {
            isLiked: true,
            isDisliked: false,
          });
          setIsLiked(true);
          setIsDisliked(false);
          await updateDoc(postDocRef, {
            numberOfLikes: postDoc.data().numberOfDislikes + 1,
            numberOfDislikes: postDoc.data().numberOfDislikes - 1,
          });
          return true;
        } else if (
          postDoc.data().isDisliked &&
          postDoc.data().isLiked &&
          !isLikedLocal &&
          !isDislikedLocal
        ) {
          await setDoc(userPostSnippetRef, {
            isLiked: true,
            isDisliked: false,
          });
          console.warn("Nothing selected, just liking");
          setIsLiked(true);
          setIsDisliked(false);
          await updateDoc(postDocRef, {
            numberOfLikes: postDoc.data().numberOfLikes + 1,
          });
          return true;
        }
      } else if (userPostSnippetDoc.data().isLiked && isLikedLocal) {
        await setDoc(userPostSnippetRef, {
          isLiked: false,
          isDisliked: false,
        });
        console.warn("Already liked, removing like");
        setIsLiked(false);
        setIsDisliked(false);
        await updateDoc(postDocRef, {
          numberOfLikes: postDoc.data().numberOfLikes - 1,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const onDislikePost = async (post) => {
    try {
      const userPostSnippetRef = doc(
        firestore,
        "users",
        user?.uid,
        "postSnippets",
        post.id
      );
      const postDocRef = doc(firestore, "posts", post.id);
      const userPostSnippetDoc = await getDoc(userPostSnippetRef);
      const postDoc = await getDoc(postDocRef);
      if (!userPostSnippetDoc.exists()) {
        console.warn("Dislike document doesn't exist, adding dislike");
        await setDoc(userPostSnippetRef, {
          isLiked: false,
          isDisliked: true,
        });
        setIsLiked(false);
        setIsDisliked(true);
        await updateDoc(postDocRef, {
          numberOfLikes: postDoc.data().numberOfDislikes + 1,
        });
        return true;
      }
      if (!userPostSnippetDoc.data().isLiked) {
        console.warn("Not liked, adding dislike");
        if (!userPostSnippetDoc.data().isDisliked) {
          console.warn("Not disliked and not liked, adding dislike");
          await setDoc(userPostSnippetRef, {
            isLiked: false,
            isDisliked: true,
          });
          setIsLiked(false);
          setIsDisliked(true);
          await updateDoc(postDocRef, {
            numberOfDislikes: postDoc.data().numberOfDislikes + 1,
          });
          return true;
        } else if (userPostSnippetDoc.data().isDisliked) {
          console.warn("Disliked but not liked, removing dislike");
          await setDoc(userPostSnippetRef, {
            isLiked: false,
            isDisliked: false,
          });
          setIsLiked(false);
          setIsDisliked(false);
          await updateDoc(postDocRef, {
            numberOfDislikes: postDoc.data().numberOfDislikes - 1,
          });
          return true;
        }
      } else if (userPostSnippetDoc.data().isLiked) {
        console.warn("Already liked, removing like adding dislke");
        await setDoc(userPostSnippetRef, {
          isLiked: false,
          isDisliked: true,
        });
        setIsLiked(false);
        setIsDisliked(true);
        await updateDoc(postDocRef, {
          numberOfLikes: postDoc.data().numberOfLikes - 1,
          numberOfDislikes: postDoc.data().numberOfDislikes + 1,
        });
      }
    } catch (error) {
      return false;
    }
  };

  return {
    getPostsLogin,
    getPostsNoLogin,
    postState,
    setPostState,
    onSelectPost,
    onDeletePost,
    onLikePost,
    onDislikePost,
    loading,
    hasMore,
    setHasMore,
    isLiked,
    isDisliked,
  };
};
export default useMainPosts;
