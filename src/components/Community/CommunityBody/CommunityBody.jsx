import { Flex, Heading } from "@chakra-ui/react";
import CommunityCards from "./CommunityCards";
import CommunitySorter from "./CommunitySorter";
import useCommunityData from "../../../hooks/useCommunityData";

const CommunityBody = () => {
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();

  return (
    <Flex direction="column">
      <Flex
        align="center"
        bg="white"
        maxW={{ base: "100%", sm: "850px" }}
        _dark={{ bg: "black" }}
        mt="3"
        mx="3"
        h="auto"
        borderRadius="65"
      >
        <Flex flex="1" direction="column">
          <CommunitySorter />
          <Flex flex="1" direction="column">
            <CommunityCards />
            <CommunityCards />
            <CommunityCards />
            <CommunityCards />
            <CommunityCards />
            <CommunityCards />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityBody;
