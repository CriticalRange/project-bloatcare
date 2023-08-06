"use client";

import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

const SplashScreen = () => {
  console.log("Loading...");
  return (
    <AnimatePresence>
      <Flex w="100%" h="100%">
        <Center>
          <Spinner />
          <Text>BloatCare</Text>
        </Center>
      </Flex>
    </AnimatePresence>
  );
};

export default SplashScreen;
