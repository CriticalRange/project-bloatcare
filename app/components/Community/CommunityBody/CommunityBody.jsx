"use client";

import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { communitiesAtom } from "../../atoms/communitiesAtom";
import Posts from "../Posts/Posts";
import CommunitySorter from "./CommunitySorter";

const CommunityBody = () => {
  const [communityData, setCommunityData] = useRecoilState(communitiesAtom);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex direction="column" _dark={{ bg: "customGray" }}>
      <Flex
        align="center"
        maxW={{ base: "100%", sm: "850px" }}
        mt="3"
        mx="3"
        h="auto"
        borderRadius={
          colorMode === "light" ? "65" : colorMode === "dark" ? "0" : null
        }
      >
        <Flex flex="1" direction="column">
          <Flex flex="1" direction="row" justify="flex-start">
            <Text fontSize="2xl" fontWeight="bold" mt="3" ml="14">
              Posts on {communityData.communityId}
            </Text>
            <CommunitySorter />
          </Flex>
          <Flex flex="1" direction="column">
            <Posts />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityBody;
