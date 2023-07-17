"use client";
// The most broken yet, Auth Modal
import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import ResetPasswordForm from "./Forms/ResetPasswordForm";
import SigninForm from "./Forms/SigninForm";
import SignupForm from "./Forms/SignupForm";
import OAuthButtons from "./OAuthButtons";

export default function AuthModal() {
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [user, loading, error] = useAuthState(auth);

  const handleAuthModalClose = () => {
    setAuthModalState((prev) => ({
      ...prev,
      openAuthModal: false,
    }));
  };

  useEffect(() => {
    if (user) handleAuthModalClose();
  }, [user]);

  return (
    <Modal
      isOpen={authModalState.openAuthModal}
      onClose={handleAuthModalClose}
      size="sm"
      key="signupModal"
    >
      <ModalOverlay />
      <ModalContent
        textColor="black"
        bg="white"
        _dark={{
          textColor: "white",
          bg: "black",
        }}
      >
        <ModalHeader>
          {authModalState.authModalView === "signin"
            ? "Sign in to BloatCare"
            : authModalState.authModalView === "signup"
            ? "Sign up"
            : authModalState.authModalView === "passwordReset"
            ? "Reset Password"
            : null}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody key="signupModalBody">
          {authModalState.authModalView === "signin" ? (
            <SigninForm />
          ) : authModalState.authModalView === "signup" ? (
            <SignupForm />
          ) : authModalState.authModalView === "passwordReset" ? (
            <ResetPasswordForm />
          ) : null}
          <Divider
            orientation="horizontal"
            width="56"
            h="1"
            mx="auto"
            bg="gray.400"
            borderRadius="5px"
            my={{ base: "3", md: "3" }}
            _dark={{ bg: "gray.700" }}
          />
          <Flex
            justify="space-around"
            direction="column"
            mt={{ base: "3", md: "1rem" }}
          >
            <Button
              textColor="white"
              bg="brand.primary"
              _hover={{
                bg: "brand.secondary",
              }}
              onClick={() => {
                authModalState.authModalView === "signin"
                  ? setAuthModalState((prev) => ({
                      ...prev,
                      authModalView: "signup",
                    }))
                  : setAuthModalState((prev) => ({
                      ...prev,
                      authModalView: "signin",
                    }));
              }}
            >
              {authModalState.authModalView === "signin"
                ? "Not signed up?"
                : "Already signed up?"}
            </Button>
            {authModalState.authModalView === "signin" ? (
              <Flex my="3">
                <OAuthButtons />
              </Flex>
            ) : null}
          </Flex>
        </ModalBody>
        {authModalState.authModalView === "signup" ? (
          <ModalFooter></ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
}
