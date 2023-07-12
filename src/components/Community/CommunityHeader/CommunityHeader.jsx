"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../../atoms/communitiesAtom";
import { auth, firestore } from "../../../firebase/clientApp";
import CommunityImage from "./CommunityImage";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Header = () => {
  const [user] = useAuthState(auth);
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);

  const getSnippets = async () => {
    // Get the required user snippet
    const snippetDocs = await getDocs(
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    // Print the snippet info to communityData atom
    const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
    setCommunityData((prev) => ({
      ...prev,
      userSnippets: snippets,
    }));
  };

  const onJoinChange = async () => {
    // REFERENCE
    const joinedRef = doc(
      firestore,
      `users/${user?.uid}/communitySnippets`,
      communityData.communityId
    );
    // Check if user joined
    if (
      communityData.userSnippets.find(
        (item) => item.communityId === communityData.communityId
      )
    ) {
      await deleteDoc(joinedRef);
      ("Snippet delete complete");
    } else if (
      communityData.userSnippets.find(
        (item) => item.communityId !== communityData.communityId
      )
    ) {
      await setDoc(joinedRef, {
        communityId: communityData.communityId,
        isModerator: false,
      });
    }
  };

  useEffect(() => {
    if (!user) {
      setCommunityData((prev) => ({ ...prev, userSnippets: [] }));
      return;
    }
    getSnippets();
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
            <Button
              bg="brand.primary"
              color="white"
              size="lg"
              onClick={onJoinChange}
            >
              {communityData.userSnippets.length <= 0 ? (
                <Heading fontSize="md">Join</Heading>
              ) : communityData.userSnippets.find(
                  (item) => item.communityId === communityData.communityId
                ) ? (
                <Heading fontSize="md">Joined</Heading>
              ) : (
                <Heading fontSize="md">Join</Heading>
              )}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
