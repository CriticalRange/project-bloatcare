"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import useCommunityData from "../../../hooks/useCommunityData";
import usePosts from "../../../hooks/usePosts";
import { auth } from "../../firebase/clientApp";
import CommunityCards from "../CommunityBody/CommunityCards";
import CommunityLoadingCard from "../CommunityBody/CommunityLoadingCard";

const Posts = () => {
  const {
    getPosts,
    postState,
    setPostState,
    onSelectPost,
    onDeletePost,
    loading,
    hasMore,
    setHasMore,
  } = usePosts();
  const params = useParams();
  const communityIdParam = params.communityId;
  const [user] = useAuthState(auth);

  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();

  useEffect(() => {
    console.log("UseEffect working");
    console.log("Empty? ", postState.isEmpty);
    setPostState((prev) => ({
      ...prev,
      posts: null,
    }));
    getPosts();
    if (!user) {
      return;
    }
    return;
  }, [communityIdParam]);

  const fetchMoreData = () => {
    getPosts().then(() => {
      // Check if there are more posts to fetch, if not, set hasMore to false
      // This will disable further loading
      if (postState.posts?.length === 0) {
        console.log("no more");
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
    <Box my="3" h={loading ? "1000px" : "inherit"} w="inherit">
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
            <Link href={`/communities/${communityIdParam}/new`}>
              <Button>Create one</Button>
            </Link>
          </Flex>
        )}
        {postState.posts?.map((post, index) => {
          // Generate a unique key for each post using post.id and communityData.communityId
          const uniqueKey = `${post.id}-${communityData.communityId}-${post.createdAt}-${index}`;
          return <CommunityCards key={uniqueKey} post={post} />;
        })}
      </InfiniteScroll>
    </Box>
  );
};

export default Posts;
