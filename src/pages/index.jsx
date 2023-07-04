import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex bg="white" _dark={{ bg: "black" }}>
      <Head>
        <title>BloatCare</title>
      </Head>
      <Flex direction="row" justify="space-around" mt="0" p="10">
        <Text
          fontSize="6xl"
          textColor="blue"
          _dark={{ textColor: "blue.500" }}
          fontWeight="bold"
          p="0"
          ml="10"
        >
          A website that has blogs in it
        </Text>
        <Text
          fontSize="3xl"
          textColor="black"
          _dark={{ textColor: "white" }}
          m="10"
        >
          {`A very "never thought of before" idea right?`}{" "}
        </Text>
      </Flex>
    </Flex>
  );
}
