"use client";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import CommunityLoadingCard from "../../Loading/Posts/Cards/PostCardLoading";
import CommunityCards from "../../Posts/Card/PostCard";
import { userAtom } from "../../atoms/authAtom";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import { postsState } from "../../atoms/postsAtom";
import usePostInfo from "../../hooks/Posts/usePostInfo";
import PostNotFound from "./PostNotFound";
import { CustomAnimatedArrowRightIcon } from "../../Icons/Components/IconComponents";
import PostCards from "../../Posts/Card/PostCard";
import PostCardLoading from "../../Loading/Posts/Cards/PostCardLoading";

const CommunityBody = () => {
  const params = useParams();
  const communityIdParam = params.communityId;

  // States
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [posts, setPosts] = useRecoilState(postsState);

  const { getCommunityPosts } = usePostInfo();

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
      console.log(randomPostResponse);
      // We can find out if no community found bu just checking if response is undefined
      if (randomPostResponse === undefined) {
        setPosts((prev) => ({
          isEmpty: true,
          posts: [],
          selectedPost: null,
          isLoaded: true,
        }));
        return;
      }
      console.log("posts are: ", randomPostResponse);
      randomPostResponse.forEach((post) => {
        setPosts((prev) => ({
          ...prev,
          isEmpty: false,
          isLoaded: true,
          posts: [...prev.posts, post],
        }));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCommunityPosts();
  }, []);

  return (
    <Box>
      {!posts.isLoaded ? (
        <PostCardLoading />
      ) : posts.isEmpty ? (
        <Flex flex="1" mt="10" direction={{ base: "column", md: "row" }}>
          <Text fontSize="3xl">No posts created by anyone... yet</Text>
          <Link href={`/communities/${communityIdParam}/new`}>
            <Text fontSize="2xl">Be the first</Text>
            <IconButton
              aria-label="Be the first"
              icon={<CustomAnimatedArrowRightIcon w="8" h="8" />}
            />
          </Link>
        </Flex>
      ) : (
        <Flex flex="1" direction="column">
          <Box my="3">
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
              {posts.posts.map((post, index) => (
                <PostCards
                  key={`${post.postId}-${post.createdAt}-${index}`}
                  post={post}
                />
              ))}
            </InfiniteScroll>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default CommunityBody;
