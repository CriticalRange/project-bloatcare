"use client";

import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import CommunityBody from "../../components/Community/CommunityBody/CommunityBody";
import CommunityHeader from "../../components/Community/CommunityHeader/CommunityHeader";
import { communitiesAtom } from "../../components/atoms/communitiesAtom";
import {
  authModalAtom,
  createCommunityModalAtom,
} from "../../components/atoms/modalAtoms";
import { userAtom } from "../atoms/authAtom";
import useCommunityInfo from "../hooks/Community/useCommunityInfo";
import CommunityPageLoading from "../Loading/Communities/CommunityPage/CommunityPageLoading";

const Community = () => {
  const toast = useToast();

  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [communityExists, setCommunityExists] = useState("unknown");
  const [communityCreateModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );
  const { fetchCommunityInfo } = useCommunityInfo();
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const params = useParams();
  const communityIdParam = params.communityId;

  const getCommunityInfo = async () => {
    // Fetches custom hook
    const response = await fetchCommunityInfo(communityIdParam);
    // We can find out if no community found bu just checking if response is undefined
    if (response === undefined) {
      setCommunityExists("no");
      setPageLoaded(true);
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
    setPageLoaded(true);
  };

  // Runs for one time when page loads
  useEffect(() => {
    getCommunityInfo();
  }, []);

  return (
    <Box>
      {pageLoaded && communityExists === "no" ? (
        <Flex my="10" direction="column">
          <Text fontSize="3xl" fontWeight="semibold">
            No community called {communityIdParam} is created yet!
          </Text>

          <Button
            aria-label="Create One button"
            onClick={() =>
              user.authenticated
                ? setCreateCommunityModal((prev) => ({
                    ...prev,
                    openCreateCommunityModal: true,
                    defaultTitle: `${communityIdParam}`,
                  }))
                : (setAuthModal((prev) => ({
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
            }
          >
            Create One
          </Button>
        </Flex>
      ) : pageLoaded && communityExists === "yes" ? (
        <Box>
          <CommunityHeader />
          <CommunityBody />
        </Box>
      ) : (
        <CommunityPageLoading />
      )}
    </Box>
  );
};

export default Community;
