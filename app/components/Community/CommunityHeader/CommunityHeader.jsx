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
import { useEffect, useState } from "react";
import axios from "axios";
import CommunityNotFound from "./CommunityNotFound";
import CommunityPageLoading from "../../Loading/Communities/CommunityPage/CommunityPageLoading";

const Header = ({ communityExists }) => {
  const toast = useToast();

  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [userCommunityInfo, setUserCommunityInfo] = useRecoilState(
    userCommunityInfoAtom
  );
  const [localCommunityJoined, setLocalCommunityJoined] = useState(false);
  const [localCommunityLoading, setLocalCommunityLoading] = useState(false);
  const communityData = useRecoilValue(communitiesAtom);
  const setcommunitySettingsModal = useSetRecoilState(
    communitySettingsModalAtom
  );
  const setAuthModal = useSetRecoilState(authModalAtom);
  const getUserCommunityInfo = async () => {
    // If user is authenticated gets the community info for the user
    if (user.authenticated) {
      const matchingCommunity = user.Communities.find((value) => {
        return value.name === communityData.CommunityName;
      });
      if (!matchingCommunity) {
        console.log("no matching community");
        setLocalCommunityJoined(false);
        // adds community to user if not visited before
        const newCommunityData = {
          name: communityData.CommunityName,
          isJoined: false,
          isModerator: false,
          id: communityData.CommunityId,
        };
        await axios
          .patch("/api/users", {
            Uid: user.Uid,
            Communities: newCommunityData,
          })
          .then((response) => {
            console.log(response);
          });
        // @ts-ignore
        setUser((prev) => ({
          ...prev,
          Communities: [...prev.Communities, newCommunityData],
        }));
        setUserCommunityInfo({
          id: newCommunityData.id,
          isJoined: newCommunityData.isJoined,
          name: newCommunityData.name,
          isModerator: newCommunityData.isModerator,
        });
        return;
      }
      console.log(matchingCommunity);
      setLocalCommunityJoined(matchingCommunity.isJoined);
      setUserCommunityInfo({
        id: matchingCommunity.id,
        isJoined: matchingCommunity.isJoined,
        name: matchingCommunity.name,
        isModerator: matchingCommunity.isModerator,
      });
    }
  };

  const handleJoinCommunity = async () => {
    console.log("handleJoinCommunity");
    setLocalCommunityLoading(true);
    try {
      // Make an axios post call to /api/joinCommunity
      await axios
        .post("/api/joinCommunity", {
          communityId: communityData.CommunityId,
          Uid: user.Uid,
        })
        .then((response) => {
          console.log(response);
        });
      // If user is authenticated joins the community
      const updatedCommunities = user.Communities.map((value) => {
        if (value.name === communityData.CommunityName) {
          return {
            ...value,
            isJoined: !value.isJoined,
          };
        } else {
          return value;
        }
      });

      const tempCommunities = localStorage.getItem("tempCommunities");
      const resultArray = Object.assign(
        JSON.parse(tempCommunities),
        // @ts-ignore
        updatedCommunities
      );
      localStorage.setItem("tempCommunities", JSON.stringify(resultArray));

      // @ts-ignore
      setUserCommunityInfo(updatedCommunities);
      setLocalCommunityJoined(!localCommunityJoined);
      setLocalCommunityLoading(false);
    } catch (error) {
      console.log(error);
      setLocalCommunityLoading(false);
    }
  };

  // Only runs when user is changed
  useEffect(() => {
    getUserCommunityInfo();
  }, [user.authenticated]);

  return (
    <>
      {communityExists === "yes" ? (
        <Flex direction="row">
          <Flex
            _dark={{ bg: "customGray" }}
            borderBottomRadius="0"
            w="full"
            h="160px"
          >
            <Flex flex="1" align="center" mb="8">
              <Flex
                flex="1"
                mt="10"
                direction="row"
                justify="flex-start"
                ml="8"
              >
                <CommunityImage />
                <Flex
                  display={{ base: "none", sm: "block" }}
                  direction="column"
                >
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
                      user.authenticated && localCommunityJoined
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
                    isLoading={localCommunityLoading}
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
                        : handleJoinCommunity();
                    }}
                  >
                    {user.authenticated ? (
                      localCommunityJoined ? (
                        <Text fontSize="md">Joined</Text>
                      ) : (
                        <Text fontSize="md">Join</Text>
                      )
                    ) : (
                      <Text fontSize="md">Join</Text>
                    )}
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : communityExists === "no" ? (
        <CommunityNotFound />
      ) : communityExists === "unknown" ? (
        <CommunityPageLoading />
      ) : null}
    </>
  );
};

export default Header;
