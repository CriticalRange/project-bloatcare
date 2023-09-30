"use client";

import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/authAtom";
import {
  authModalAtom,
  createCommunityModalAtom,
} from "../../atoms/modalAtoms";
import { useParams } from "next/navigation";

const CommunityNotFound = () => {
  const toast = useToast();
  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [communityCreateModal, setCommunityCreateModal] = useRecoilState(
    createCommunityModalAtom
  );
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  const params = useParams();
  const communityIdParam = params.communityId;

  return (
    <Flex my="10" direction="column">
      <Text fontSize="3xl" fontWeight="semibold">
        No community called {communityIdParam} is created yet!
      </Text>

      <Button
        aria-label="Create One button"
        onClick={() =>
          user.authenticated
            ? setCommunityCreateModal((prev) => ({
                ...prev,
                openCreateCommunityModal: true,
                defaultTitle: `${communityIdParam}`,
              }))
            : (setAuthModal((prev) => ({
                ...prev,
                openAuthModal: true,
              })),
              toast({
                title: "You are not logged in!",
                description:
                  "You are not allowed to create communities unless you log in",
                status: "error",
                duration: 2500,
                position: "bottom-left",
                isClosable: true,
              }))
        }
      >
        Create One
      </Button>
    </Flex>
  );
};

export default CommunityNotFound;
