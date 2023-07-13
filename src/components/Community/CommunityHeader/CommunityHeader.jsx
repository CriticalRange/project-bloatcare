"use client";
import { Button, Flex, Heading } from "@chakra-ui/react";
import CommunityImage from "./CommunityImage";
import useCommunityData from "../../../hooks/useCommunityData";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../../atoms/authModalAtom";

const Header = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();

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
          <Flex flex="1" mt="12" mr="10" justify="flex-end">
            <Button
              bg="brand.primary"
              color="white"
              _dark={{ bg: "black" }}
              _hover={{
                bg: "brand.secondary",
              }}
              size="lg"
              onClick={() => onJoinOrLeaveCommunity()}
              isLoading={loading}
            >
              {communityData.isJoined ? (
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
