"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import CommunityImage from "../components/Community/CommunityHeader/CommunityImage";
import { CustomUserSettingsIcon } from "../components/Icons/Components/IconComponents";
import { auth } from "../components/firebase/clientApp";
import useCommunities from "../hooks/Communities/useCommunities";

const Communities = () => {
  const [user] = useAuthState(auth);
  const { communityData } = useCommunities();

  return (
    <Flex
      bg="white"
      _dark={{ bg: "black" }}
      w="full"
      borderBottomLeftRadius="85"
      borderBottomRightRadius="85"
    >
      <Flex flex="1" direction="column" align="center">
        {/* <CommunitiesSearch /> */}
        <Heading>Joined communities:</Heading>
        <Flex mt="5">
          <Stack
            my="5"
            spacing={2}
            divider={
              <StackDivider
                borderColor="gray.500"
                _dark={{ borderColor: "gray.200" }}
              />
            }
          >
            {user ? (
              communityData.userSnippets.map((snippet) => {
                if (snippet.isJoined === true) {
                  return (
                    <Flex
                      key={snippet.communityId}
                      direction="row"
                      align="center"
                    >
                      <Link href={`communities/${snippet.communityId}`}>
                        <Flex
                          w={{ base: "400px", md: "600px" }}
                          direction="row"
                          align="center"
                        >
                          <Box mr="6">
                            <CommunityImage />
                          </Box>
                          <Text
                            maxW="340px"
                            textOverflow="ellipsis"
                            noOfLines={1}
                            fontSize="3xl"
                          >
                            {snippet.communityId}
                          </Text>
                          <Flex flex="1" justify="flex-end">
                            {snippet.isModerator === true ? (
                              <CustomUserSettingsIcon w="10" h="10" />
                            ) : null}
                          </Flex>
                        </Flex>
                      </Link>
                    </Flex>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <Flex>
                You haven&apos;t joined any communities
                <Link href="/communities/Dummy">
                  <Button aria-label="Go to Dummy">Go to Dummy</Button>
                </Link>
              </Flex>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Communities;
