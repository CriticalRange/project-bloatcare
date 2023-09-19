"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityLoadingCard from "../CommunityBody/CommunityLoadingCard";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../atoms/modalAtoms";
import dynamic from "next/dynamic";
import { userAtom } from "../../atoms/authAtom";
import useRandomPosts from "../../hooks/Posts/useRandomPosts";
import { postsState } from "../../atoms/postsAtom";
import CommunityCards from "../CommunityBody/CommunityCards";

const Posts = () => {
  const router = useRouter();
  const toast = useToast();
  const params = useParams();
  const communityIdParam = params.communityId;
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
    setPostsLoading(true);
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
      const mergedPostsArray = posts.posts.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.Post_Id === item.Post_Id &&
              t.creatorDisplayName === item.creatorDisplayName
          )
      );
      console.log("Merged Posts Array is: ", mergedPostsArray);
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
            Looks like no more post left.
          </Text>
          <Button aria-label="Go up" onClick={scrollToTop}>
            Go up
          </Button>
        </Flex>
      ) : (
        posts.posts.map((post) => {
          return (
            <CommunityCards
              post={post}
              key={`${post.Post_Id}-${post.creatorDisplayName}`}
            />
          );
        })
      )}

      {/* <Flex direction="column" justify="center" align="center">
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
          </Flex> */}
    </Box>
  );
};

export default Posts;
