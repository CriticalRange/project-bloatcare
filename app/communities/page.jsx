"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import CommunityImage from "../components/Community/CommunityHeader/CommunityImage";
import { CustomUserSettingsIcon } from "../components/Icons/Components/IconComponents";
import { useRecoilState } from "recoil";
import { userAtom } from "../components/atoms/authAtom";
import { useEffect, useState } from "react";
import { authModalAtom } from "../components/atoms/modalAtoms";

const Communities = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [communityListLoaded, setCommunityListLoaded] = useState(false);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);

  const getUserCommunityInfo = async () => {
    if (user.authenticated) {
      setCommunityListLoaded(true);
    }
  };

  useEffect(() => {
    getUserCommunityInfo();
  }, [user.authenticated]);

  return (
    <Box>
      <Flex direction="column">
        {/* <CommunitiesSearch /> */}
        <Center>
          <Heading mt="4">Joined communities:</Heading>
        </Center>
        {communityListLoaded ? (
          <Flex mt="2" ml="4">
            <Stack
              spacing={2}
              divider={
                <StackDivider
                  borderRadius="10"
                  borderColor="gray.500"
                  _dark={{ borderColor: "gray.200" }}
                />
              }
            >
              {user.authenticated ? (
                user.Communities.map((community) => {
                  if (community.isJoined === true) {
                    return (
                      <Flex
                        key={`${community.id}-${community.name}`}
                        direction="row"
                        align="center"
                      >
                        <Link href={`communities/${community.name}`}>
                          <Flex
                            w={{ base: "400px", md: "600px" }}
                            direction="row"
                            align="center"
                          >
                            <Box mr="4">
                              <CommunityImage />
                            </Box>
                            <Text
                              maxW="340px"
                              textOverflow="ellipsis"
                              noOfLines={1}
                              fontSize="xl"
                            >
                              {community.name}
                            </Text>
                            <Flex justify="flex-end">
                              {community.isModerator === true ? (
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
                <Flex flex="1">
                  <Center gap={2}>
                    <Text>
                      Please sign in to be able to see your joined Communities
                    </Text>
                    <Button
                      aria-label="Sign in"
                      onClick={() =>
                        setAuthModal((prev) => ({
                          ...prev,
                          openAuthModal: true,
                        }))
                      }
                    >
                      Sign in
                    </Button>
                  </Center>
                </Flex>
              )}
            </Stack>
          </Flex>
        ) : (
          <div>Loading...</div>
        )}
      </Flex>
    </Box>
  );
};

export default Communities;
