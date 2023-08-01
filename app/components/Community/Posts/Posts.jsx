"use client";

import { Box, Button, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecoilState } from "recoil";
import { postsLoadingAtom, postsState } from "../../atoms/postsAtom";
import { auth, firestore } from "../../firebase/clientApp";
import useCommunityData from "../../../hooks/useCommunityData";
import CommunityCards from "../CommunityBody/CommunityCards";
import CommunityLoadingCard from "../CommunityBody/CommunityLoadingCard";
import usePosts from "../../../hooks/usePosts";

const Posts = () => {
  const { getPosts, postState, setPostState, onSelectPost, onDeletePost } =
    usePosts();
  const [user] = useAuthState(auth);
  const [postsLoading, setPostsLoading] = useRecoilState(postsLoadingAtom);

  const params = useParams();
  const communityIdParam = params.communityId;
  const { communityData, onJoinOrLeaveCommunity, communityLoading } =
    useCommunityData();

  useEffect(() => {
    console.log("UseEffect working");
    setPostState((prev) => ({
      ...prev,
      posts: null,
    }));
    getPosts();
    if (!user) {
      return;
    }
  }, []);

  return (
    <Box my="3" h={postsLoading ? "1000px" : "inherit"} w="inherit">
      {postState.posts?.map((post) => {
        // Generate a unique key for each post using post.id and communityData.communityId
        const uniqueKey = `${post.id}-${communityData.communityId}`;
        return <CommunityCards key={uniqueKey} post={post} />;
      })}
    </Box>
  );
};

export default Posts;
