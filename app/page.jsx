"use client";

//Root Page
import { Flex, Stack } from "@chakra-ui/react";
import MainSorter from "./components/root/MainView/MainSorter";
import MainCards from "./components/root/MainView/MainCards";

export default function Home() {
  return (
    <div>
      <Flex>
        <Flex maxW={{ base: "100%", sm: "850px" }} mx="auto" h="auto" mt="3">
          <Flex flex="1" direction="column">
            <MainSorter />
            {/* 
            <Stack spacing="3">
              <MainCards />
              <MainCards />
              <MainCards />
              <MainCards />
            </Stack> */}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

/* export { getServerSideProps } from "../components/Chakra"; */
