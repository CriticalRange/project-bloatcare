"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityLoadingCard from "../CommunityBody/CommunityLoadingCard";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../atoms/modalAtoms";
import dynamic from "next/dynamic";
import { userAtom } from "../../atoms/authAtom";
import useRandomPosts from "../../hooks/Posts/useRandomPosts";

const Posts = () => {
  const router = useRouter();
  const toast = useToast();
  const params = useParams();
  const communityIdParam = params.communityId;
  const [user, setUser] = useRecoilState(userAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const { getRandomPosts } = useRandomPosts();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }; // scroll to top button action

  const fetchRandomPosts = async () => {
    const communityIds = user.Communities.map((value) => value.name);
    console.log("CommunityIds are (local): ", communityIds);
    const randomPostResponse = await getRandomPosts(10, user.authenticated, communityIds);
    console.log(randomPostResponse);
  };

  useEffect(() => {
    if (user.authenticated) {
      fetchRandomPosts();
    }
  }, []);

  return (
    <Box my="3" /* h={loading ? "1000px" : "inherit"} */>
      {/* <Flex direction="column" justify="center" align="center">
              <Text fontSize="3xl" my="2">
                Looks like no more post left.
              </Text>
              <Button aria-label="Go up" onClick={scrollToTop}>
                Go up
              </Button>
            </Flex> */}
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
