import {
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import CommunityImage from "../../components/Community/CommunityHeader/CommunityImage";
import { auth } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";
import { LiaUsersCogSolid } from "react-icons/lia";

const Communities = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const { communityData, onJoinOrLeaveCommunity, isJoined, loading } =
    useCommunityData();

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
                    <Flex key={snippet.communityId} direction="row">
                      <Link href={`/communities/${snippet.communityId}`}>
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
                              <Icon as={LiaUsersCogSolid} />
                            ) : null}
                          </Flex>
                        </Flex>
                      </Link>
                    </Flex>
                  );
                } else {
                  return (
                    <Flex key="isJoinedFalse">
                      You haven&apos;t joined any communities
                    </Flex>
                  );
                }
              })
            ) : (
              <Flex>You are not logged in</Flex>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Communities;
