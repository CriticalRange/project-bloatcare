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
import { firestore } from "../components/firebase/clientApp";
import { useRecoilState } from "recoil";
import { useParams } from "next/navigation";
import { postsState } from "../components/atoms/postsAtom";

const useMainPosts = () => {
  const params = useParams();
  const [hasMore, setHasMore] = useState(true);
  const communityIdParam = params.communityId;
  const [loading, setLoading] = useState(false);
  const [lastPost, setLastPost] = useState(undefined);
  const [postState, setPostState] = useRecoilState(postsState);

  const getRandomPostIndices = (totalPosts, batchSize) => {
    const randomIndices = [];
    while (randomIndices.length < batchSize) {
      const randomIndex = Math.floor(Math.random() * totalPosts);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    return randomIndices;
  };

  const getPosts = async () => {
    try {
      console.log("getposts working");
      setLoading(true);
      const batchSize = 10; // Number of posts to fetch in each batch

      const postsCollection = collection(firestore, "posts");
      const totalPostsData = await getCountFromServer(postsCollection);
      const totalPosts = totalPostsData.data().count;
      console.log(totalPosts);
      const randomIndices = getRandomPostIndices(totalPosts, batchSize);
      console.log("Random indices: ", randomIndices);
      const postQuery = lastPost
        ? query(
            collection(firestore, "posts"),
            where("postId", "in", randomIndices),
            orderBy("createdAt", "desc"),
            limit(batchSize) // Limit the number of posts fetched per batch
          )
        : query(
            collection(firestore, "posts"),
            where("postId", "in", randomIndices),
            orderBy("createdAt", "desc"),
            limit(batchSize)
          );
      const postDocs = await getDocs(postQuery);
      console.log(postDocs);
      if (postDocs.empty) {
        console.log("It returns empty");
        setHasMore(false);
        setPostState((prev) => ({
          ...prev,
          posts: [],
        }));
        setLastPost(null); // Reset lastPost when there are no more posts to fetch
        setLoading(false);
        return;
      }
      postDocs.docs.map((doc, index) =>
        console.log("doc ", index, " is: ", doc.data())
      );
      const newPosts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("New posts: ", newPosts);
      setPostState((prev) => ({
        ...prev,
        posts: lastPost ? [...prev.posts, ...newPosts] : newPosts,
      }));
      console.log("Posts are: ", postState.posts);
      setLoading(false);

      // Update the lastPost to the last fetched post
      setLastPost(newPosts[newPosts.length - 1]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getPosts,
    postState,
    setPostState,
    loading,
    hasMore,
    setHasMore,
  };
};

export default useMainPosts;
