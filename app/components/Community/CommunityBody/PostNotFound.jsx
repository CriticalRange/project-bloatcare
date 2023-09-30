import { Flex, Button, Text, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import router from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/authAtom";
import { authModalAtom } from "../../atoms/modalAtoms";

const PostNotFound = () => {
  const toast = useToast();
  const params = useParams();
  const communityIdParam = params.communityId;

  // States
  const [user, setUser] = useRecoilState(userAtom);
  const [authModal, setAuthModal] = useRecoilState(authModalAtom);
  return (
    <Flex direction="column" justify="center" align="center">
      <Text fontSize="3xl" my="2">
        Looks like there are no posts yet.
      </Text>
      <Button
        aria-label="Create one button"
        onClick={() =>
          !user
            ? (setAuthModal((prev) => ({
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
            : router.push(`/communities/${communityIdParam}/new`)
        }
      >
        Create one
      </Button>
    </Flex>
  );
};

export default PostNotFound;
