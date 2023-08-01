"use client";

import {
  Box,
  Flex,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import CommunityImage from "../components/Community/CommunityHeader/CommunityImage";
import { CustomUserSettingsIcon } from "../components/Icons/IconComponents/IconComponents";

const loading = () => {
  return (
    <Flex
      bg="white"
      _dark={{ bg: "black" }}
      w="full"
      borderBottomLeftRadius="85"
      borderBottomRightRadius="85"
    >
      <Flex flex="1" direction="column" align="center">
        {/* <CommunitiesSearch /> */}
        <Heading>Joined communities:</Heading>
        <Flex mt="5">
          <Stack
            my="5"
            spacing={2}
            divider={
              <StackDivider
                borderColor="gray.500"
                _dark={{ borderColor: "gray.200" }}
              />
            }
          >
            <Flex direction="row" align="center">
              <Flex
                w={{ base: "400px", md: "600px" }}
                direction="row"
                align="center"
              >
                <Box mr="6">
                  <SkeletonCircle />
                </Box>
                <SkeletonText
                  maxW="340px"
                  textOverflow="ellipsis"
                  noOfLines={1}
                  fontSize="3xl"
                ></SkeletonText>
                <Flex flex="1" justify="flex-end">
                  <CustomUserSettingsIcon w="10" h="10" />
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default loading;
