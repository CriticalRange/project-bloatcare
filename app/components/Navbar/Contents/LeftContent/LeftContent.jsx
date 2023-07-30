"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Flex, SkeletonText, Text } from "@chakra-ui/react";
import useCommunityData from "../../../../hooks/useCommunityData";
import { BloatcareIcon } from "../../../Icons/IconComponents/IconComponents";
import SearchInput from "./SearchInput";

const LeftContent = () => {
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();

  return (
    <Flex align="center">
      <Box>
        <Link href="/">
          <BloatcareIcon w="10" h="10" fill="#107cf1" cursor="pointer" mx="5" />
        </Link>
      </Box>
      <Link href="/">
        <Box
          display={{ base: "block", sm: "none" }}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          <SkeletonText noOfLines={1} isLoaded={!loading}>
            <Text fontSize="md" color="blue.500" fontWeight="bold">
              {communityData.communityId}
            </Text>
          </SkeletonText>
        </Box>
      </Link>
      <SearchInput />
    </Flex>
  );
};

export default LeftContent;
