"use client";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../../atoms/atoms";
import SigninForm from "./Forms/SigninForm";
import SignupForm from "./Forms/SingupForm";
import OAuthButtons from "./OAuthButtons";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import ResetPasswordForm from "./Forms/ResetPasswordForm";

export default function AuthModal() {
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [user, loading, error] = useAuthState(auth);

  console.log("Modal state's view value is: ", authModalState.authModalView);
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
            : "Reset Password"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody key="signupModalBody">
          {authModalState.authModalView === "signin" ? (
            <SigninForm />
          ) : authModalState.authModalView === "signup" ? (
            <SignupForm />
          ) : (
            <ResetPasswordForm />
          )}
          <hr className="w-56 h-1 m-auto mt-0 bg-gray-400 rounded md:my-3 dark:bg-gray-700" />
          <Flex
            justify="space-around"
            direction="column"
            className="space-y-6"
            mt={{ base: "3" }}
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
              <OAuthButtons />
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
