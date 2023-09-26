"use client";

import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import PostCardLoading from "../../Loading/Posts/Cards/PostCardLoading";
import PostCards from "../../Posts/Card/PostCard";
import { userAtom } from "../../atoms/authAtom";
import { postsState } from "../../atoms/postsAtom";
import usePostInfo from "../../hooks/Posts/usePostInfo";
import MainSorter from "./MainSorter";

const MainPostsPage = () => {
  const { getHomePosts } = usePostInfo();
  const params = useParams();
  const communityIdParam = params.communityId;

  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [communityExists, setCommunityExists] = useState("unknown");
  const [posts, setPosts] = useRecoilState(postsState);

  const getFirstPosts = async () => {
    // Getst the posts when page loads
    setPosts((prev) => ({
      ...prev,
      posts: [],
    }));
    // Fetches custom hook
    const response = await getHomePosts(10, user.authenticated);
    // We can find out if no community found bu just checking if response is undefined
    if (response === undefined) {
      setPosts((prev) => ({
        isEmpty: true,
        posts: [],
        selectedPost: null,
        isLoaded: true,
      }));
      return;
    }
    // Update the posts atom with the new posts
    setPosts((prev) => ({
      isEmpty: false,
      posts: [...prev.posts, ...response],
      selectedPost: null,
      isLoaded: true,
    }));
  };

  const getNewPosts = async () => {
    // Fetches whenever user scrolls deep enough
    const response = await getHomePosts(10, user.authenticated);
    // We can find out if no community found bu just checking if response is undefined
    if (response === undefined) {
      setPosts((prev) => ({
        isEmpty: true,
        posts: [],
        selectedPost: null,
        isLoaded: true,
      }));
      return;
    }
    // Update the posts atom with the new posts
    setPosts((prev) => ({
      isEmpty: false,
      posts: [...prev.posts, ...response],
      selectedPost: null,
      isLoaded: true,
    }));
  };

  // Runs for one time when page loads
  useEffect(() => {
    getFirstPosts();
  }, []);

  return (
    <>
      {!posts.isLoaded ? (
        <PostCardLoading />
      ) : (
        <>
          <MainSorter />
          <InfiniteScroll
            dataLength={posts.posts.length}
            next={getNewPosts}
            hasMore={true}
            loader={<PostCardLoading />}
          >
            {posts.posts.map((post, index) => (
              <PostCards
                key={`${post.postId}-${post.createdAt}-${index}`}
                post={post}
              />
            ))}
          </InfiniteScroll>
        </>
      )}
    </>
  );
};

export default MainPostsPage;
