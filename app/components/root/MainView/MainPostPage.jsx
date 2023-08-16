import { Flex, Button, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import CommunityLoadingCard from "../../Community/CommunityBody/CommunityLoadingCard";
import useMainPosts from "../../../hooks/Posts/useMainPosts";
import useCommunityData from "../../../hooks/Communities/useCommunityData";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../atoms/modalAtoms";
import { auth } from "../../firebase/clientApp";

const MainPostPage = () => {
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();
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
        const DynamicMainCards = dynamic(() => import("./MainCards"), {
          loading: () => <CommunityLoadingCard />,
        });
        // Generate a unique key for each post using post.id and communityData.communityId
        const uniqueKey = `${post.id}-${communityData.communityId}-${post.createdAt}-${index}`;
        return <DynamicMainCards key={uniqueKey} post={post} />;
      })}
    </InfiniteScroll>
  );
};

export default MainPostPage;
