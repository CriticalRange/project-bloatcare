import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { emailConfirmationModalAtom } from "../../../../atoms/modalAtoms";
import Cookies from "js-cookie";
import * as jose from "jose";
import axios from "axios";

const EmailConfirmationModal = () => {
  const toast = useToast();
  const [emailConfirmationModal, setEmailConfirmationModal] = useRecoilState(
    emailConfirmationModalAtom
  );
  const [emailConfirmationLoading, setEmailConfirmationLoading] =
    useState(false);
  const [pin, setPin] = useState("");
  const [verificationMatch, setVerificationMatch] = useState(true);

  const accessSecret = new TextEncoder().encode(
    `${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY}`
  );

  const handleEmailConfirmationModalClose = () => {
    setEmailConfirmationModal((prev) => ({
      ...prev,
      openEmailConfirmationModal: false,
    }));
  };

  const onPinChange = (value) => {
    setPin(value);
    console.log(value);
  };

  const handleEmailVerification = async () => {
    try {
      setEmailConfirmationLoading(true);
      const accessToken = Cookies.get("accessToken");
      const decodedAccessToken = await jose.jwtVerify(
        accessToken,
        accessSecret
      );
      await axios
        .post("/auth/verify", {
          Email: decodedAccessToken.payload.Email,
          verification_code: pin,
        })
        .then(async (response) => {
          if (response.data.matches === false) {
            setVerificationMatch(false);
          } else {
            setVerificationMatch(true);
            setEmailConfirmationModal((prev) => ({
              ...prev,
              openEmailConfirmationModal: false,
            }));
            toast({
              title: "Email verified!",
              description:
                "You successfully verified your email to your account.",
              status: "success",
              duration: 2500,
              position: "bottom-left",
              isClosable: true,
            });
          }
        });

      setEmailConfirmationLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={emailConfirmationModal.openEmailConfirmationModal}
      onClose={handleEmailConfirmationModalClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={"xl"}
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
          <Flex justify="center">Confirm your E-mail</Flex>
        </ModalHeader>
        <ModalBody>
          <Flex direction="column" justify="center" align="center">
            <Text color="green">E-mail verification mail is sent.</Text>{" "}
            <Text>Please check your inbox</Text>
            <HStack gap={4} my="5">
              <PinInput type="alphanumeric" onChange={onPinChange}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            {verificationMatch === false ? (
              <Alert status="error" borderRadius="xl" my="2">
                <AlertIcon />
                <AlertTitle>
                  Verification code doesn&apos;t match. Please try again
                </AlertTitle>
              </Alert>
            ) : null}
            <Button
              isLoading={emailConfirmationLoading}
              onClick={handleEmailVerification}
            >
              Submit
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmailConfirmationModal;
