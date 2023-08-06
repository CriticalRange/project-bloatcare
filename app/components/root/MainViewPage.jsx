"use client";

import { Flex, Button, Text, Box, Center } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../atoms/modalAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import MainCards from "./MainView/MainCards";
import InfiniteScroll from "react-infinite-scroll-component";
import useMainPosts from "../../hooks/useMainPosts";
import CommunityLoadingCard from "../Community/CommunityBody/CommunityLoadingCard";
import { Link } from "@chakra-ui/next-js";
import useCommunityData from "../../hooks/useCommunityData";
import MainSorter from "./MainView/MainSorter";

const MainViewPage = () => {
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const { getPosts, postState, setPostState, loading, hasMore, setHasMore } =
    useMainPosts();
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();

  useEffect(() => {
    setPostState((prev) => ({
      ...prev,
      posts: null,
    }));
    getPosts();
    if (!user) {
      return;
    }
  }, []);

  const fetchMoreData = () => {
    getPosts().then(() => {
      // Check if there are more posts to fetch, if not, set hasMore to false
      // This will disable further loading
      if (postState.posts?.length === 0) {
        setHasMore(false);
      }
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }; // scroll to top button action

  return (
    <Box>
      <Flex justify="center">
        <Text fontSize="2xl" mt="4">
          Unleash Your Passions, Ignite Discussions
        </Text>
      </Flex>
      <Flex mx={{ base: "4", md: "16" }} mt="6">
        <MainSorter />
      </Flex>
      <Flex mx={{ base: "4", md: "16" }} mt="6">
        <InfiniteScroll
          dataLength={postState.posts?.length || 0}
          next={getPosts}
          hasMore={hasMore}
          loader={loading && <CommunityLoadingCard />}
          endMessage={
            !loading &&
            postState.posts &&
            postState.posts?.length !== 0 && (
              <Flex direction="column" justify="center" align="center">
                <Text fontSize="3xl" my="2">
                  Looks like no more post left.
                </Text>
                <Button onClick={scrollToTop}>Go up</Button>
              </Flex>
            )
          }
        >
          {postState.posts?.length === 0 && !loading && !hasMore && (
            <Flex direction="column" justify="center" align="center">
              <Text fontSize="3xl" my="2">
                Looks like there are no posts yet.
              </Text>
              <Button>Create one</Button>
            </Flex>
          )}

          {postState.posts?.map((post, index) => {
            // Generate a unique key for each post using post.id and communityData.communityId
            const uniqueKey = `${post.id}-${communityData.communityId}-${post.createdAt}-${index}`;
            return <MainCards key={uniqueKey} post={post} />;
          })}
        </InfiniteScroll>
      </Flex>
    </Box>
  );
};

export default MainViewPage;
