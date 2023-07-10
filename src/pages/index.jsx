"use client";
//Main Page
import { Flex, Stack } from "@chakra-ui/react";
import MainHeading from "../components/index/MainView/MainHeading";
import MainCards from "../components/index/MainView/MainCards";

export default function Home() {
  return (
    <div>
      <Flex bg="white" _dark={{ bg: "black" }}>
        <Flex maxW={{ base: "100%", sm: "850px" }} mx="auto" h="auto" mt="5%">
          <Flex flex="1" direction="column">
            <MainHeading />
            <Stack spacing="3">
              <MainCards />
              <MainCards />
              <MainCards />
              <MainCards />
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
