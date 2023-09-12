"use client";

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
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../atoms/modalAtoms";
import ResetPasswordForm from "./Forms/ResetPasswordForm";
import SigninForm from "./Forms/SigninForm";
import SignupForm from "./Forms/SignupForm";
import OAuthButtons from "./Oauth/OAuthButtons";
import { userAtom } from "../../atoms/authAtom";

export default function AuthModal() {
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const authModalInitialFocus = useRef(null);

  const handleAuthModalClose = () => {
    setAuthModalState((prev) => ({
      ...prev,
      openAuthModal: false,
    }));
  };

  return (
    <Modal
      isOpen={authModalState.openAuthModal}
      initialFocusRef={authModalInitialFocus}
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
            <SigninForm InitialFocusRef={authModalInitialFocus} />
          ) : authModalState.authModalView === "signup" ? (
            <SignupForm />
          ) : authModalState.authModalView === "passwordReset" ? (
            <ResetPasswordForm />
          ) : null}
          <Divider
            orientation="horizontal"
            width="100%"
            h="1"
            mx="auto"
            bg="colors.customGray"
            borderRadius="5px"
            my={{ base: "3", md: "3" }}
            _dark={{ bg: "gray.700" }}
          />
          <Flex justify="space-around" direction="column" my="2">
            <Button
              aria-label={`${
                authModalState.authModalView === "signin"
                  ? "Sign in"
                  : authModalState.authModalView === "signin"
                  ? "Sign up"
                  : "Sign in Button"
              }`}
              textColor="white"
              mb="3"
              bg="colors.brand.primary"
              _hover={{
                bg: "colors.brand.secondary",
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
