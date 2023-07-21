"use client";
import { Box, Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { postsState } from "../../../atoms/postsAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";
import CommunityCards from "../CommunityBody/CommunityCards";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

const Posts = () => {
  const router = useRouter();
  const { communityId } = router.query;
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();
  const [postState, setPostState] = useRecoilState(postsState); // All the post info will be here
  const [startAfterDoc, setStartAfterDoc] = useState(null); // State to keep track of the last fetched document

  const batchSize = 10; // Number of posts to fetch in each batch

  const getPosts = async () => {
    setLoading(true);

    const postQuery = startAfterDoc
      ? query(
          collection(firestore, "posts"),
          where("communityId", "==", communityData.communityId),
          orderBy("createdAt", "desc"),
          startAfter(startAfterDoc),
          limit(batchSize) // Limit the number of posts fetched per batch
        )
      : query(
          collection(firestore, "posts"),
          where("communityId", "==", communityData.communityId),
          orderBy("createdAt", "desc"),
          limit(batchSize) // Limit the number of posts fetched per batch
        );

    const postDocs = await getDocs(postQuery);

    if (postDocs.empty) {
      setLoading(false);
      return;
    }

    const newPosts = (await postDocs).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("New posts: ", newPosts);
    await setPostState((prev) => ({
      ...prev,
      posts: startAfterDoc ? [...prev.posts, ...newPosts] : newPosts,
    }));
    setStartAfterDoc(postDocs.docs[postDocs.docs.length - 1]);
    setLoading(false);
    console.log("PostState's posts: ", postState.posts);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    setStartAfterDoc(null);
    console.log("Get posts executes");
    getPosts();
  }, [user, communityData.communityId]);
  return (
    <Box my="3" h={loading ? "1000px" : "inherit"} w="inherit">
      <InfiniteScroll
        dataLength={postState.posts ? postState.posts.length : 0} //This is important field to render the next data
        next={getPosts}
        hasMore={postState.posts?.length % batchSize === 0 && !loading}
        loader={
          postState.posts ? (
            postState.posts.length !== 0 ? (
              <Center p="5">
                <Spinner />
              </Center>
            ) : null
          ) : null
        }
        endMessage={
          postState.posts ? (
            postState.posts.length !== 0 && !loading ? (
              <Center my="10">
                <Text>Yay! You have seen it all</Text>
              </Center>
            ) : null
          ) : null
        }
      >
        {" "}
        {postState.posts ? (
          postState.posts.length === 0 ? (
            <Center key={postState.posts} my="10">
              <Text fontSize="3xl" fontWeight="semibold">
                You haven&apos;t created any communities yet!
              </Text>
              <Button
                onClick={() => router.push(`/communities/${communityId}/new`)}
              >
                Create One
              </Button>
            </Center>
          ) : (
            postState.posts.map((post) => {
              if (post.communityId === communityData.communityId) {
                console.log(post.id);
                return <CommunityCards key={post.id} post={post} />;
              }
            })
          )
        ) : null}
      </InfiniteScroll>
    </Box>
  );
};

export default Posts;
