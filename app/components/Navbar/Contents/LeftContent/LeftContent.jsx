"use client";

import { Box, Image, SkeletonText, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import SearchInput from "./SearchInput";
import useCommunityData from "../../../../hooks/useCommunityData";

const LeftContent = () => {
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();

  return (
    <>
      <Link href="/">
        <Image
          src="/favicon.ico"
          cursor="pointer"
          marginLeft="3"
          borderRadius="9999px"
          mr={{ base: "2", md: "3" }}
          height="12"
          width="12"
          alt="Profile picture"
        />
      </Link>

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
    </>
  );
};

export default LeftContent;
