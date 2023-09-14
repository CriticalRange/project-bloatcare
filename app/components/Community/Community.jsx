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
import { userCommunityInfoAtom } from "../../components/atoms/communitiesAtom";
import useCommunityInfo from "../hooks/Community/useCommunityInfo";

const Community = () => {
  const toast = useToast();
  const [user, setUser] = useRecoilState(userAtom);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [communityExists, setCommunityExists] = useState("unknown");
  const [communityCreateModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );
  const [userCommunityInfo, setUserCommunityInfo] = useRecoilState(
    userCommunityInfoAtom
  );
  const { fetchCommunityInfo } = useCommunityInfo();
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const params = useParams();
  const communityIdParam = params.communityId;

  const getCommunityInfo = async () => {
    const response = await fetchCommunityInfo(communityIdParam);
    console.log(response);
    if (response === undefined) {
      setCommunityExists("no");
      setPageLoaded(true);
      return;
    }
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

  useEffect(() => {
    getCommunityInfo();
  }, []);

  return (
    <Box bgColor="gray.300">
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
        <>
          <CommunityHeader />
          <CommunityBody />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default Community;
