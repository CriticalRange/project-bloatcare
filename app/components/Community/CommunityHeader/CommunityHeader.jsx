"use client";

import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { CustomCommunitySettingsIcon } from "../../Icons/Components/IconComponents";
import CommunitySettingsModal from "../../Modal/Community/Settings/CommunitySettingsModal";
import { userAtom } from "../../atoms/authAtom";
import { userCommunityInfoAtom } from "../../atoms/communitiesAtom";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import { communitySettingsModalAtom } from "../../atoms/modalAtoms";
import CommunityImage from "./CommunityImage";
import { useEffect } from "react";

const Header = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [userCommunityInfo, setUserCommunityInfo] = useRecoilState(
    userCommunityInfoAtom
  );
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const [communitySettingsModal, setcommunitySettingsModal] = useRecoilState(
    communitySettingsModalAtom
  );

  const getUserCommunityInfo = () => {
    if (user.authenticated) {
      user.Communities.map((value) => {
        if (value.name === communityData.CommunityName) {
          console.log("Value is: ", value);
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
                  user.authenticated &&
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
                  userCommunityInfo.isJoined && user.authenticated ? (
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
