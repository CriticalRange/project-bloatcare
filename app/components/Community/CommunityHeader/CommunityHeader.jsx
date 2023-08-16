"use client";

import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import useCommunityData from "../../../hooks/Communities/useCommunityData";
import { CustomCommunitySettingsIcon } from "../../Icons/Components/IconComponents";
import {
  authModalAtom,
  communitySettingsModalAtom,
} from "../../atoms/modalAtoms";
import { auth } from "../../firebase/clientApp";
import CommunityImage from "./CommunityImage";
import CommunitySettingsModal from "../../Modal/Community/Settings/CommunitySettingsModal";

const Header = () => {
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();
  const [communitySettingsModal, setcommunitySettingsModal] = useRecoilState(
    communitySettingsModalAtom
  );

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
                {communityData.communityId}
              </Text>
              <Text
                maxW="200px"
                noOfLines={1}
                fontSize="sm"
                fontWeight="thin"
                ml="3"
              >
                {communityData.communityId}
              </Text>
            </Flex>
            <Flex flex="1" mr="10" justify="flex-end" align="center">
              {communityData.isModerator ? (
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
              ) : null}

              <Button
                aria-label={user && communityData.isJoined ? "Joined" : "Join"}
                bg="brand.primary"
                _dark={{ bg: "black" }}
                _hover={{
                  bg: "brand.secondary",
                }}
                size="lg"
                onClick={() => onJoinOrLeaveCommunity()}
                isLoading={loading}
              >
                {communityData.isJoined && user ? (
                  <Text fontSize="md">Joined</Text>
                ) : (
                  <Text fontSize="md">Join</Text>
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
