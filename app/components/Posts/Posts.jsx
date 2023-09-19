"use client";

import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import CommunityCards from "./Card/PostCard";
import CommunityLoadingCard from "../Loading/Posts/Cards/PostCardLoading";
import { userAtom } from "../atoms/authAtom";
import { authModalAtom } from "../atoms/modalAtoms";
import { postsState } from "../atoms/postsAtom";
import useRandomPosts from "../hooks/Posts/useRandomPosts";

const Posts = () => {
  const toast = useToast();

  // Next Navigation
  const router = useRouter();
  const params = useParams();
  const communityIdParam = params.communityId;

  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [posts, setPosts] = useRecoilState(postsState);
  const [postsLoading, setPostsLoading] = useState(true);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const { getCommunityPosts } = useRandomPosts();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }; // scroll to top button action

  const fetchCommunityPosts = async () => {
    const communityId = params.communityId;
    try {
      const randomPostResponse = await getCommunityPosts(
        10,
        user.authenticated,
        communityId
      );
      randomPostResponse.forEach((post) => {
        setPosts((prev) => ({ ...prev, posts: [...prev.posts, post] }));
      });
      console.log("Random Post response is: ", randomPostResponse);
      setPostsLoading(false);
    } catch (error) {
      console.log(error);
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  return (
    <Box my="3" h={postsLoading ? "1000px" : "inherit"}>
      {postsLoading ? (
        <CommunityLoadingCard />
      ) : posts.posts.length === 0 ? (
        <Flex direction="column" justify="center" align="center">
          <Text fontSize="3xl" my="2">
            Looks like there are no posts yet.
          </Text>
          <Button
            aria-label="Create one button"
            onClick={() =>
              !user
                ? (setAuthModal((prev) => ({
                    ...prev,
                    openAuthModal: true,
                  })),
                  toast({
                    title: "You are not logged in!",
                    description:
                      "You are not allowed to create communities unless you log in",
                    status: "error",
                    duration: 2500,
                    position: "bottom-left",
                    isClosable: true,
                  }))
                : router.push(`/communities/${communityIdParam}/new`)
            }
          >
            Create one
          </Button>
        </Flex>
      ) : (
        <InfiniteScroll
          dataLength={posts.posts.length}
          next={fetchCommunityPosts}
          hasMore={true}
          loader={<CommunityLoadingCard />}
          endMessage={
            <Flex direction="column" justify="center" align="center">
              <Text fontSize="3xl" my="2">
                Looks like no more post left.
              </Text>
              <Button aria-label="Go up" onClick={scrollToTop}>
                Go up
              </Button>
            </Flex>
          }
          /* // below props only if you need pull down functionality
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          } */
        >
          {posts.posts.map((post) => (
            <CommunityCards key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default Posts;
