"use client";
//Main Page
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Flex
        w="100%"
        h="100%"
        bg="brand.bg"
        direction="column"
        alignItems="center"
      >
        <Head>
          <title>BloatCare</title>
        </Head>
        <Flex direction="column" mt="12" w="100%" h="200px" alignItems="center">
          <Heading
            bgGradient="linear(to-tl, brand.primary, softCyan)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="bold"
          >
            A website with Blogs
          </Heading>
          <Text fontSize="4xl" textColor="brand.primary">
            Some text
          </Text>
        </Flex>
      </Flex>
    </div>
  );
}
