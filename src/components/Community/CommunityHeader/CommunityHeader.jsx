"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../../atoms/communitiesAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import CommunityImage from "./CommunityImage";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import safeJsonStringify from "safe-json-stringify";

const Header = () => {
  const [user] = useAuthState(auth);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);

  const onClickSnippets = async () => {
    const snippetDocs = await getDocs(
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
    snippets.map((snippet) => {
      setCommunityData((prev) => ({
        ...prev,
        userSnippets: JSON.parse(JSON.stringify(snippet)),
      }));
      console.log(JSON.parse(JSON.stringify(snippet)));
    });
  };

  useEffect(() => {
    if (!user) {
      setCommunityData((prev) => ({ ...prev, userSnippets: [] }));
      return;
    }
    onClickSnippets();
  }, [user]);

  return (
    <Flex direction="column">
      <Flex
        bg="white"
        _dark={{ bg: "black" }}
        borderBottomLeftRadius="85"
        borderBottomRightRadius="85"
        w="full"
        h="160px"
      >
        <Flex flex="1" alignContent="center">
          <Flex mt="10" direction="row" justify="flex-start" ml="10">
            <CommunityImage />
            <Flex direction="column">
              <Heading
                ml="4"
                maxW={{ base: "200px", md: "400px", lg: "none" }}
                noOfLines={1}
              >
                {communityData.communityId}
              </Heading>
              <Heading
                maxW="200px"
                noOfLines={1}
                fontSize="xs"
                fontWeight="thin"
                ml="6"
                mt="1"
              >
                {communityData.communityId}
              </Heading>
            </Flex>
          </Flex>
          <Flex flex="1" mt="10" mr="10" justify="flex-end">
            <Button bg="brand.primary" color="white" size="lg">
              Join
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
