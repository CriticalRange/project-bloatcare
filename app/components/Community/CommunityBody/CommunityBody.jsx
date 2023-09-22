"use client";

import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import CommunityLoadingCard from "../../Loading/Posts/Cards/PostCardLoading";
import CommunityCards from "../../Posts/Card/PostCard";
import { userAtom } from "../../atoms/authAtom";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import { postsState } from "../../atoms/postsAtom";
import useRandomPosts from "../../hooks/Posts/useRandomPosts";
import PostNotFound from "./PostNotFound";

const CommunityBody = ({ communityExists }) => {
  const params = useParams();
  const communityIdParam = params.communityId;

  // States
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  const [postState, setPostState] = useRecoilState(postsState);
  const [postsLoading, setPostsLoading] = useState(true);
  const [user, setUser] = useRecoilState(userAtom);
  const [posts, setPosts] = useRecoilState(postsState);

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
    <>
      {communityExists === "unknown" ? (
        <CommunityLoadingCard />
      ) : communityExists === "no" ? (
        <PostNotFound />
      ) : communityExists === "yes" ? (
        <Box my="3" h={postsLoading ? "1000px" : "inherit"}>
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
              <CommunityCards
                key={`${post.id}-${post.createdAt}-${post.creatorDisplayName}`}
                post={post}
              />
            ))}
          </InfiniteScroll>
        </Box>
      ) : null}
    </>
  );
};

export default CommunityBody;
