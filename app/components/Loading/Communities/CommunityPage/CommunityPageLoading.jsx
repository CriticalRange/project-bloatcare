import {
  Flex,
  Button,
  Text,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import React from "react";
import CommunityImage from "../../../Community/CommunityHeader/CommunityImage";
import CommunitySorter from "../../../Community/CommunityBody/CommunitySorter";
import Posts from "../../../Community/Posts/Posts";

const CommunityPageLoading = () => {
  return (
    <Flex direction="column">
      <Flex
        direction="row"
        _dark={{ bg: "customGray" }}
        borderBottomRadius="0"
        w="full"
        h="160px"
      >
        <Flex flex="1" align="center" mb="8">
          <Flex flex="1" mt="10" direction="row" justify="flex-start" ml="8">
            <SkeletonCircle w="12" h="12" />
            <Flex display={{ base: "none", sm: "block" }} direction="column">
              <SkeletonText
                mt="4"
                fontSize="xl"
                ml="2"
                mb="1"
                w="200px"
                noOfLines={1}
                textOverflow="ellipsis"
              ></SkeletonText>
              <SkeletonText
                mt="4"
                w="200px"
                noOfLines={1}
                fontSize="sm"
                fontWeight="thin"
                ml="3"
              ></SkeletonText>
            </Flex>
            <Flex flex="1" mr="10" justify="flex-end" align="center">
              <Button
                aria-label="Join"
                color="white"
                bg="black"
                _dark={{ bg: "white", color: "black" }}
                _hover={{
                  bg: "brand.secondary",
                }}
                size="lg"
              >
                <Text fontSize="md">Join</Text>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" _dark={{ bg: "customGray" }}>
        <Flex
          align="center"
          maxW={{ base: "100%", sm: "850px" }}
          mt="3"
          mx="3"
          h="auto"
        >
          <Flex flex="1" direction="column">
            <Flex flex="1" direction="row" justify="flex-start">
              <Text fontSize="2xl" fontWeight="bold" mt="3">
                Posts
              </Text>
              <CommunitySorter />
            </Flex>
            <Flex flex="1" direction="column">
              <Posts />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommunityPageLoading;
