"use client";
import React from "react";
import { useToggleStore, useCredentialsStore } from "../pages/api/stores";
import SignupForm from "./SingupForm";
import SigninForm from "./SigninForm";
import { shallow } from "zustand/shallow";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import GoogleSigninButton from "./GoogleSigninButton";

export default function AuthModal() {
  const { isModalOpen, toggleModalOpen } = useToggleStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      toggleModalOpen: state.toggleModalOpen,
    }),
    shallow
  );

  const { authType, setAuthType } = useCredentialsStore(
    (state) => ({
      authType: state.authType,
      setAuthType: state.setAuthType,
    }),
    shallow
  );

  return (
    <Modal
      isOpen={isModalOpen && 1}
      onClose={() => {
        toggleModalOpen(!isModalOpen);
      }}
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
          {authType === "signin" ? "Sign in to BloatCare" : "Sign up"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody key="signupModalBody">
          {authType === "signin" ? <SigninForm /> : <SignupForm />}
          <hr className="w-56 h-1 m-auto mt-0 bg-gray-400 rounded md:my-3 dark:bg-gray-700" />
          <div className="flex justify-around space-y-6">
            <Button
              textColor="white"
              bg="brand.primary"
              _hover={{
                bg: "brand.secondary",
              }}
              onClick={() => {
                authType === "signup"
                  ? setAuthType("signin")
                  : setAuthType("signup");
              }}
            >
              {authType === "signin" ? "Not signed up?" : "Already signed up?"}
            </Button>
            <GoogleSigninButton />
          </div>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
