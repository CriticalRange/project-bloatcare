"use client";

import { Button, Flex, IconButton, Text, useToast } from "@chakra-ui/react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { CustomCommunitySettingsIcon } from "../../Icons/Components/IconComponents";
import CommunitySettingsModal from "../../Modal/Community/Settings/CommunitySettingsModal";
import { userAtom } from "../../atoms/authAtom";
import { userCommunityInfoAtom } from "../../atoms/communitiesAtom";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import {
  authModalAtom,
  communitySettingsModalAtom,
} from "../../atoms/modalAtoms";
import CommunityImage from "./CommunityImage";
import { useEffect } from "react";

const Header = () => {
  const toast = useToast();

  // States
  const user = useRecoilValue(userAtom);
  const [userCommunityInfo, setUserCommunityInfo] = useRecoilState(
    userCommunityInfoAtom
  );
  const communityData = useRecoilValue(communitiesAtom);
  const setcommunitySettingsModal = useSetRecoilState(
    communitySettingsModalAtom
  );
  const setAuthModal = useSetRecoilState(authModalAtom);

  const getUserCommunityInfo = () => {
    // If user is authenticated gets the community info for the userP-Ü,İ
    if (user.authenticated) {
      user.Communities.map((value) => {
        if (value.name === communityData.CommunityName) {
          setUserCommunityInfo({
            id: value.id,
            isJoined: value.isJoined,
            name: value.name,
            isModerator: value.isModerator,
          });
        }
      });
    }
  };

  // Only runs when user is changed
  useEffect(() => {
    getUserCommunityInfo();
  }, [user.authenticated]);

  return (
    <Flex direction="row">
      <Flex
        _dark={{ bg: "customGray" }}
        borderBottomRadius="0"
        w="full"
        h="160px"
      >
        <Flex flex="1" align="center" mb="8">
          <Flex flex="1" mt="10" direction="row" justify="flex-start" ml="8">
            <CommunityImage />
            <Flex display={{ base: "none", sm: "block" }} direction="column">
              <Text
                fontSize="xl"
                ml="2"
                mb="1"
                maxW={{ base: "200px", md: "400px", lg: "none" }}
                noOfLines={2}
                textOverflow="ellipsis"
              >
                {communityData.CommunityName}
              </Text>
              <Text
                maxW="200px"
                noOfLines={1}
                fontSize="sm"
                fontWeight="thin"
                ml="3"
              >
                {communityData.CommunityName}
              </Text>
            </Flex>
            <Flex flex="1" mr="10" justify="flex-end" align="center">
              {user.authenticated && userCommunityInfo.isJoined ? (
                <>
                  <CommunitySettingsModal />
                  <IconButton
                    onClick={() => {
                      setcommunitySettingsModal((prev) => ({
                        ...prev,
                        openCommunitySettingsModal: true,
                      }));
                    }}
                    aria-label="Community Settings"
                    mr="3"
                    size="md"
                    icon={<CustomCommunitySettingsIcon />}
                  />
                </>
              ) : null}

              <Button
                aria-label={
                  user.authenticated &&
                  // @ts-ignore
                  userCommunityInfo.isJoined
                    ? "Joined"
                    : "Join"
                }
                color="white"
                bg="black"
                _dark={{ bg: "white", color: "black" }}
                _hover={{
                  bg: "brand.secondary",
                }}
                size="lg"
                onClick={() => {
                  !user.authenticated
                    ? (setAuthModal((prev) => ({
                        ...prev,
                        openAuthModal: true,
                      })),
                      toast({
                        title: "You are not logged in!",
                        description:
                          "You are not allowed to join communities unless you log in",
                        status: "error",
                        duration: 2500,
                        position: "bottom-left",
                        isClosable: true,
                      }))
                    : null;
                }}
                /* onClick={() => onJoinOrLeaveCommunity()}
                isLoading={loading} */
              >
                {user.authenticated ? (
                  userCommunityInfo.isJoined ? (
                    <Text fontSize="md">Joined</Text>
                  ) : (
                    <Text fontSize="md">Join</Text>
                  )
                ) : (
                  <Text fontSize="md" onClick={() => {}}>
                    Join
                  </Text>
                )}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
