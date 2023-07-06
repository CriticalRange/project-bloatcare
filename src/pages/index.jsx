"use client";
//Main Page
import { Box, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <Flex bg="white" w="100%" _dark={{ bg: "black" }} direction="row">
      <Head>
        <title>BloatCare</title>
      </Head>
      <Box>
        <Text
          fontSize="6xl"
          textColor="blue"
          _dark={{ textColor: "brand.secondary" }}
          fontWeight="bold"
          p="0"
          ml="10"
        >
          A website that has blogs in it
        </Text>
        <Text fontSize="4xl" textColor="brand.primary">
          Some text
        </Text>
      </Box>
    </Flex>
  );
}

// re-export the reusable `getServerSideProps` function
export { getServerSideProps } from "../Chakra";
