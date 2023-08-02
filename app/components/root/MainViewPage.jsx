"use client";

import { Flex, Button, Text, Box } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";

const MainViewPage = () => {
  const [user] = useAuthState(auth);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="center"
      overflowX="hidden"
    >
      <Flex mx="10" mt="12" align="center" direction="column">
        <Text
          bgGradient="linear(to-l, colors.softCyan, colors.hardCyan)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="bold"
        >
          Bloatcare
        </Text>
        <Text fontSize="2xl">Unleash Your Passions, Ignite Discussions</Text>
        <Flex direction="row" mt="3">
          {!user ? (
            <Box>
              <Button
                aria-label="Sign in"
                borderRadius="12"
                bg="colors.customYellow"
                onClick={() => {
                  setAuthModal({
                    authModalView: "signin",
                    openAuthModal: true,
                  });
                }}
              >
                Login
              </Button>
              <Button
                borderRadius="12"
                ml="1"
                bg="colors.hardCyan"
                onClick={() => {
                  setAuthModal({
                    authModalView: "signup",
                    openAuthModal: true,
                  });
                }}
              >
                Sign up
              </Button>
            </Box>
          ) : (
            <Text
              fontSize="2xl"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              maxWidth="xs"
            >
              Hello {user.displayName ? user.displayName : user.email}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainViewPage;
