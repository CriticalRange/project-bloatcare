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
import { authModalState } from "../../../atoms/AuthModalAtom";
import SigninForm from "./Forms/SigninForm";
import SignupForm from "./Forms/SingupForm";
import OAuthButtons from "./OAuthButtons";

export default function AuthModal() {
  const [modalState, setModalState] = useRecoilState(authModalState);

  console.log("Modal state's view value is: ", modalState.view);
  const handleAuthModalClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Modal
      isOpen={modalState.open}
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
          {modalState.view === "signin" ? "Sign in to BloatCare" : "Sign up"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody key="signupModalBody">
          {modalState.view === "signin" ? <SigninForm /> : <SignupForm />}
          <hr className="w-56 h-1 m-auto mt-0 bg-gray-400 rounded md:my-3 dark:bg-gray-700" />
          <Flex justify="space-around" direction="column" className="space-y-6">
            <Button
              textColor="white"
              bg="brand.primary"
              _hover={{
                bg: "brand.secondary",
              }}
              onClick={() => {
                modalState.view === "signin"
                  ? setModalState((prev) => ({ ...prev, view: "signup" }))
                  : setModalState((prev) => ({ ...prev, view: "signin" }));
              }}
            >
              {modalState.view === "signin"
                ? "Not signed up?"
                : "Already signed up?"}
            </Button>
            <OAuthButtons />
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
