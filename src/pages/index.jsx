"use client";
//Main Page
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <div>
      <Flex
        w="100%"
        h="100%"
        bg="white"
        _dark={{ bg: "black" }}
        direction="column"
        alignItems="center"
      ></Flex>
    </div>
  );
}
