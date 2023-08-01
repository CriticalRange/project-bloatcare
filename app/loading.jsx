"use client";

import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "./components/atoms/authModalAtom";
import MainCards from "./components/root/MainView/MainCards";
import React from "react";

const Loading = () => {
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);

  return (
    <div>
      <Flex direction={{ base: "column", md: "row" }} overflowX="hidden">
        <Flex w="auto" h="auto" mx="10" mt="12" direction="column">
          <Text
            position="sticky"
            bgGradient="linear(to-l, colors.softCyan, colors.hardCyan)"
            bgClip="text"
            fontSize="5xl"
            fontWeight="bold"
          >
            Bloatcare
          </Text>
          <Text fontSize="2xl">Unleash Your Passions, Ignite Discussions</Text>
          <Flex direction="row" mt="3">
            <Box>
              <Button
                isLoading
                aria-label="Sign in"
                borderRadius="12"
                bg="colors.customYellow"
              >
                Login
              </Button>
              <Button isLoading borderRadius="12" ml="1" bg="colors.hardCyan">
                Sign up
              </Button>
            </Box>
          </Flex>
        </Flex>
        <Flex maxW="850px" mt="3" direction="column">
          <Text ml="4" fontSize="3xl" mb="2">
            Most popular posts
          </Text>
          <Stack>
            <MainCards />
            <MainCards />
            <MainCards />
            <MainCards />
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};
export default Loading;
