import { Flex, Heading, Text } from "@chakra-ui/react";
import CommunityCards from "./CommunityCards";
import CommunitySorter from "./CommunitySorter";
import useCommunityData from "../../../hooks/useCommunityData";
import Posts from "../Posts/Posts";

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
