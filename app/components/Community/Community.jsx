"use client";

import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CommunityBody from "../../components/Community/CommunityBody/CommunityBody";
import CommunityHeader from "../../components/Community/CommunityHeader/CommunityHeader";
import { communitiesAtom } from "../../components/atoms/communitiesAtom";
import CommunityPageLoading from "../Loading/Communities/CommunityPage/CommunityPageLoading";
import useCommunityInfo from "../hooks/Community/useCommunityInfo";
import { postsState } from "../atoms/postsAtom";

const Community = () => {
  const { fetchCommunityInfo } = useCommunityInfo();
  const params = useParams();
  const communityIdParam = params.communityId;

  // States
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [communityExists, setCommunityExists] = useState("unknown");
  const [posts, setPosts] = useRecoilState(postsState);

  const getCommunityInfo = async () => {
    // Fetches custom hook
    const response = await fetchCommunityInfo(communityIdParam);
    // We can find out if no community found bu just checking if response is undefined
    if (response === undefined) {
      setCommunityExists("no");
      return;
    }
    // Update the community data with the new community info
    setCommunityData({
      CommunityCreatedAt: response.CommunityCreatedAt,
      CommunityDescription: response.CommunityDescription,
      CommunityId: response.CommunityId,
      CommunityName: response.CommunityName,
      CommunityType: response.CommunityType,
    });
    setCommunityExists("yes");
    setPosts((prev) => ({
      isEmpty: false,
      posts: [],
      selectedPost: null,
    }));
  };

  // Runs for one time when page loads
  useEffect(() => {
    getCommunityInfo();
  }, []);

  return (
    <Box>
      <CommunityHeader communityExists={communityExists} />
      <CommunityBody communityExists={communityExists} />
    </Box>
  );
};

export default Community;
