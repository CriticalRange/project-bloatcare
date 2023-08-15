"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../components/atoms/communitiesAtom";
import CommunityHeader from "../../components/Community/CommunityHeader/CommunityHeader";
import { auth, firestore } from "../../components/firebase/clientApp";
import CommunityBody from "../../components/Community/CommunityBody/CommunityBody";
import { useParams } from "next/navigation";
import { Box, Button, Center, Flex, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import CommunitySettingsModal from "../../components/Modal/Community/Settings/CommunitySettingsModal";
import {
  authModalAtom,
  createCommunityModalAtom,
} from "../../components/atoms/modalAtoms";
import { useAuthState } from "react-firebase-hooks/auth";

const CommunityPage = () => {
  const toast = useToast();
  const [user] = useAuthState(auth);
  const router = useRouter();
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

  const getCommunityDocuments = async () => {
    try {
      // @ts-ignore
      const communityDocRef = doc(firestore, "communities", communityIdParam);
      const communityDoc = await getDoc(communityDocRef);
      if (communityDoc.exists()) {
        // @ts-ignore
        setCommunityDataState((prev) => ({
          ...prev,
          communityId: communityIdParam,
          userSnippets: [...prev.userSnippets, communityDoc.data()],
        }));
        setCommunityDataExists("yes");
        return;
      } else {
        setCommunityDataExists("no");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommunityDocuments();
    setPageLoaded(true);
  }, []);
  return (
    <Box>
      {pageLoaded && communityDataExists === "no" ? (
        <Flex my="10" direction="column">
          <Text fontSize="3xl" fontWeight="semibold">
            No community called {communityIdParam} is created yet!
          </Text>

          <Button
            aria-label="Create One button"
            onClick={() =>
              user
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

export default CommunityPage;
