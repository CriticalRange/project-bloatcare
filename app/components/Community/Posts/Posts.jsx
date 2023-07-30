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
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import { postsLoadingAtom, postsState } from "../../atoms/postsAtom";
import { auth, firestore } from "../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";
import CommunityCards from "../CommunityBody/CommunityCards";
import CommunityLoadingCard from "../CommunityBody/CommunityLoadingCard";

const Posts = () => {
  const params = useParams();
  const communityIdParam = params.communityId;
  const router = useRouter();
  const [postsLoading, setPostsLoading] = useRecoilState(postsLoadingAtom);
  const [user] = useAuthState(auth);
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();
  const [postState, setPostState] = useRecoilState(postsState); // All the post info will be here
  const [startAfterDoc, setStartAfterDoc] = useState(null); // State to keep track of the last fetched document

  const getPosts = async () => {
    const batchSize = 10; // Number of posts to fetch in each batch
    console.log("Setting posts loading state");
    setPostsLoading({ postsLoading: true, postsLoadingMore: true });
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
    console.log("Getting docs");
    const postDocs = await getDocs(postQuery);
    console.log("If empty, setting posts loading states");
    if (postDocs.empty) {
      setPostsLoading({ postsLoading: false, postsLoadingMore: false });
      return;
    }

    const newPosts = (await postDocs).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredPosts = newPosts.filter(
      (post) =>
        !postState.posts?.some((existingPost) => existingPost.id === post.id)
    );
    console.log("Setting posts loading state 2nd");
    await setPostState((prev) => ({
      ...prev,
      posts: startAfterDoc ? [...prev.posts, ...filteredPosts] : filteredPosts,
    }));
    setStartAfterDoc(postDocs.docs[postDocs.docs.length - 1]);
    console.log("Finishing up");
    setPostsLoading({ postsLoading: false, postsLoadingMore: true });
  };

  useEffect(() => {
    if (communityIdParam === communityData.communityId) {
      getPosts();
      console.log("Conditial get posts working");
    }
    setStartAfterDoc(null);
    if (!user) {
      return;
    }
  }, [communityIdParam]);
  return (
    <Box my="3" h={postsLoading ? "1000px" : "inherit"} w="inherit">
      <InfiniteScroll
        dataLength={postState.posts ? postState.posts.length : 0} //This is important field to render the next data
        next={getPosts}
        hasMore={postsLoading.postsLoadingMore}
        loader={
          postState.posts ? (
            postState.posts.length !== 0 ? (
              <Flex
                direction="column"
                mx="8"
                mt="2"
                mb="3"
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <CommunityLoadingCard />
                <Center p="5">
                  <Spinner />
                </Center>
              </Flex>
            ) : null
          ) : null
        }
        endMessage={
          postState.posts ? (
            postState.posts.length !== 0 && !postsLoading.postsLoading ? (
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
                onClick={() =>
                  router.push(`/communities/${communityIdParam}/new`)
                }
              >
                Create One
              </Button>
            </Center>
          ) : (
            postState.posts.map((post) => {
              if (post.communityId === communityData.communityId) {
                // Generate a unique key for each post using post.id and communityData.communityId
                const uniqueKey = `${post.id}-${communityData.communityId}`;
                return <CommunityCards key={uniqueKey} post={post} />;
              }
            })
          )
        ) : null}
      </InfiniteScroll>
    </Box>
  );
};

export default Posts;
