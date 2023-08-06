import {
  query,
  collection,
  where,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getCountFromServer,
  getDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { auth, firestore } from "../components/firebase/clientApp";
import { useRecoilState } from "recoil";
import { useParams } from "next/navigation";
import { postsState } from "../components/atoms/postsAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import useCommunityData from "./useCommunityData";

const useMainPosts = () => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const [hasMore, setHasMore] = useState(true);
  const communityIdParam = params.communityId;
  const [loading, setLoading] = useState(false);
  const [communityIds, setCommunityIds] = useState([]);
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();
  const [lastPost, setLastPost] = useState(undefined);
  const [postState, setPostState] = useRecoilState(postsState);

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

  return {
    getPostsNoLogin,
    getPostsLogin,
    postState,
    setPostState,
    loading,
    hasMore,
    setHasMore,
  };
};

export default useMainPosts;
