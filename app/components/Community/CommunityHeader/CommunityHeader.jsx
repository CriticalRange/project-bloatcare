"use client";

import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { CustomCommunitySettingsIcon } from "../../Icons/Components/IconComponents";
import {
  authModalAtom,
  communitySettingsModalAtom,
} from "../../atoms/modalAtoms";
import CommunityImage from "./CommunityImage";
import CommunitySettingsModal from "../../Modal/Community/Settings/CommunitySettingsModal";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import { userAtom, userCommunityInfoAtom } from "../../atoms/authAtom";
import { useEffect } from "react";

const Header = () => {
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [userCommunityInfo, setUserCommunityInfo] = useRecoilState(
    userCommunityInfoAtom
  );
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const [communityDataState, setCommunityDataState] =
    useRecoilState(communitiesAtom);
  const [communitySettingsModal, setcommunitySettingsModal] = useRecoilState(
    communitySettingsModalAtom
  );

  useEffect(() => {
    if (userInfo.length !== 0) {
      const userCommunityInfo = [];
      // @ts-ignore
      const communities = Object.values(JSON.parse(userInfo.Communities));

      for (const value of communities) {
        if (value.name === communityDataState.communityInfo.Display_Name) {
          userCommunityInfo.push(value);
        }
      }
      setUserCommunityInfo(userCommunityInfo[0]);
    }
  }, []);

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
                {communityDataState.communityInfo.Display_Name}
              </Text>
              <Text
                maxW="200px"
                noOfLines={1}
                fontSize="sm"
                fontWeight="thin"
                ml="3"
              >
                {communityDataState.communityInfo.Display_Name}
              </Text>
            </Flex>
            <Flex flex="1" mr="10" justify="flex-end" align="center">
              {
                // @ts-ignore
                userCommunityInfo.isJoined ? (
                  <>
                    <CommunitySettingsModal />
                    <IconButton
                      onClick={() =>
                        setcommunitySettingsModal((prev) => ({
                          ...prev,
                          openCommunitySettingsModal: true,
                        }))
                      }
                      aria-label="Community Settings"
                      mr="3"
                      size="md"
                      icon={<CustomCommunitySettingsIcon />}
                    />
                  </>
                ) : null
              }

              <Button
                aria-label={
                  userInfo.length !== 0 &&
                  // @ts-ignore
                  userCommunityInfo.isJoined
                    ? "Joined"
                    : "Join"
                }
                bg="brand.primary"
                _dark={{ bg: "black" }}
                _hover={{
                  bg: "brand.secondary",
                }}
                size="lg"
                /* onClick={() => onJoinOrLeaveCommunity()}
                isLoading={loading} */
              >
                {
                  // @ts-ignore
                  userCommunityInfo.isJoined && userInfo.length !== 0 ? (
                    <Text fontSize="md">Joined</Text>
                  ) : (
                    <Text fontSize="md">Join</Text>
                  )
                }
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
