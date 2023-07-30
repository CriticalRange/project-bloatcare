"use client";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../components/atoms/communitiesAtom";
import CommunityHeader from "../../components/Community/CommunityHeader/CommunityHeader";
import { firestore } from "../../components/firebase/clientApp";
import CommunityBody from "../../components/Community/CommunityBody/CommunityBody";
import { useParams } from "next/navigation";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const CommunityPage = () => {
  const router = useRouter();
  const [communityDataState, setCommunityDataState] =
    useRecoilState(communitiesAtom);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [communityDataExists, setCommunityDataExists] = useState("unknown");
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
  }, [communityIdParam]);
  return (
    <Box>
      {pageLoaded && communityDataExists === "no" ? (
        <Flex my="10" direction="column">
          <Text fontSize="3xl" fontWeight="semibold">
            This community called {communityIdParam} is not created yet!
          </Text>

          <Button
            onClick={() => router.push(`/communities/${communityIdParam}/new`)}
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
