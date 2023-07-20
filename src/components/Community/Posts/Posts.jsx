import { Box, Text } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { postsState } from "../../../atoms/postsAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";
import CommunityCards from "../CommunityBody/CommunityCards";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();
  const [postState, setPostState] = useRecoilState(postsState);

  const getPosts = async () => {
    const postQuery = query(
      collection(firestore, "posts"),
      where("communityId", "==", communityData.communityId),
      orderBy("createdAt", "desc")
    );
    const postDocs = await getDocs(postQuery);
    const posts = (await postDocs).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    await setPostState((prev) => ({
      ...prev,
      posts: posts,
    }));
    console.log(postState.posts);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    getPosts();
  }, [user]);
  return (
    <InfiniteScroll
      dataLength={postState.posts ? postState.posts.length : 0} //This is important field to render the next data
      next={getPosts}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {/* {postState.posts.length === 0 ? (
        <Box key={postState.posts} p="14">
          <Text fontSize="3xl" fontWeight="semibold">
            You haven&apos;t created any communities yet!
          </Text>
        </Box>
      ) : null} */}
      {postState.posts?.map((post) => {
        if (post.communityId === communityData.communityId) {
          return (
            <CommunityCards
              key={post.id}
              id={post.id}
              communityId={post.communityId}
              communityImageUrl={undefined}
              creatorId={post.creatorId}
              creatorDisplayName={post.creatorDisplayName}
              title={post.title}
              description={post.description}
              numberOfComments={post.numberOfComments}
              numberOfLikes={post.numberOfLikes}
              imageURL={post.imageURL}
              createdAt={post.createdAt}
            />
          );
        }
      })}
    </InfiniteScroll>
  );
};

export default Posts;
