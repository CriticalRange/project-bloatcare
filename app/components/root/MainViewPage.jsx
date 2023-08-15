"use client";

import { Flex, Button, Text, Box, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../atoms/modalAtoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import MainCards from "./MainView/MainCards";
import InfiniteScroll from "react-infinite-scroll-component";
import useMainPosts from "../../hooks/useMainPosts";
import CommunityLoadingCard from "../Community/CommunityBody/CommunityLoadingCard";
import useCommunityData from "../../hooks/useCommunityData";
import MainSorter from "./MainView/MainSorter";
import MainViewCommunityCard from "./MainView/MainViewCommunityCard";
import PostModal from "../Modal/Posts/PostModal";

const MainViewPage = () => {
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const {
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
  } = useMainPosts();
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();

  useEffect(() => {
    setPostState((prev) => ({
      ...prev,
      posts: [],
    }));
    if (!user) {
      getPostsNoLogin();
      return;
    }
    getPostsLogin();
  }, [user]);

  const fetchMoreData = () => {
    if (!user) {
      getPostsNoLogin().then(() => {
        // Check if there are more posts to fetch, if not, set hasMore to false
        // This will disable further loading
        if (postState.posts?.length === 0) {
          setHasMore(false);
        }
      });
      return;
    }
    getPostsLogin().then(() => {
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
    <Box
      bgColor="colors.brand.secondary"
      _dark={{ bgColor: "colors.customGray" }}
    >
      <Flex justify="center">
        <Text fontSize="4xl" my="2">
          Unleash Your Passions, Ignite Discussions
        </Text>
      </Flex>
      <Flex direction="row">
        <Flex
          w={{ base: "100%", md: "60%" }}
          ml={{ base: "0%", md: "2%" }}
          direction="column"
        >
          <MainSorter />
          <InfiniteScroll
            dataLength={postState.posts?.length || 0}
            next={fetchMoreData}
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
                  <Button aria-label="go up button" onClick={scrollToTop}>
                    Go up
                  </Button>
                </Flex>
              )
            }
          >
            {postState.posts?.length === 0 && !loading && !hasMore && (
              <Flex direction="column" justify="center" align="center">
                <Text fontSize="3xl" my="2">
                  Looks like there are no posts yet.
                </Text>
                <Button aria-label="create one button">Create one</Button>
              </Flex>
            )}

            {postState.posts?.map((post, index) => {
              // Generate a unique key for each post using post.id and communityData.communityId
              const uniqueKey = `${post.id}-${communityData.communityId}-${post.createdAt}-${index}`;
              return <MainCards key={uniqueKey} post={post} />;
            })}
          </InfiniteScroll>
        </Flex>{" "}
        <Flex
          w={{ base: "0%", md: "35%" }}
          mx="2%"
          direction="column"
          align="center"
        >
          <Text display={{ base: "none", md: "block" }} fontSize="3xl">
            Communities (Beta)
          </Text>
          <MainViewCommunityCard />
          <MainViewCommunityCard />
          <MainViewCommunityCard />
          <MainViewCommunityCard />
          <MainViewCommunityCard />
          <MainViewCommunityCard />
          <MainViewCommunityCard />
        </Flex>
        <PostModal />
      </Flex>
    </Box>
  );
};

export default MainViewPage;
