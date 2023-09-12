"use client";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../components/atoms/communitiesAtom";
import CommunityHeader from "../../components/Community/CommunityHeader/CommunityHeader";
import CommunityBody from "../../components/Community/CommunityBody/CommunityBody";
import { useParams } from "next/navigation";
import { Box, Button, Center, Flex, Text, useToast } from "@chakra-ui/react";
import CommunitySettingsModal from "../../components/Modal/Community/Settings/CommunitySettingsModal";
import {
  authModalAtom,
  createCommunityModalAtom,
} from "../../components/atoms/modalAtoms";
import axios from "axios";
import { userAtom } from "../atoms/authAtom";

const Community = () => {
  const toast = useToast();
  const [user, setUser] = useRecoilState(userAtom);
  const [communityDataState, setCommunityDataState] =
    useRecoilState(communitiesAtom);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [communityDataExists, setCommunityDataExists] = useState("unknown");
  const [communityCreateModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const params = useParams();
  const communityIdParam = params.communityId;

  return (
    <Box bgColor="gray.300">
      {pageLoaded && communityDataExists === "no" ? (
        <Flex my="10" direction="column">
          <Text fontSize="3xl" fontWeight="semibold">
            No community called {communityIdParam} is created yet!
          </Text>

          <Button
            aria-label="Create One button"
            onClick={() =>
              user.length !== 0
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
      ) : pageLoaded && communityDataExists === "yes" ? (
        <>
          <CommunityHeader />
          <CommunityBody />
        </>
      ) : null}
    </Box>
  );
};

export default Community;
