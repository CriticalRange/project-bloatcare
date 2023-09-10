import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState } from "recoil";
import { SocialOnboardingModalAtom } from "../../../../atoms/modalAtoms";
import {
  CustomAnimatedTwitchIcon,
  DiscordIcon,
  FacebookIcon,
  GoogleIcon,
  MicrosoftIcon,
  TwitterIcon,
  YahooIcon,
} from "../../../../Icons/Components/IconComponents";
import { socialOnboardingAtom } from "../../../../atoms/authAtom";
import Image from "next/image";

const SocialOnboarding = () => {
  const [socialOnboardingModal, setSocialOnboardingModal] = useRecoilState(
    SocialOnboardingModalAtom
  );
  const [socialOnboarding, setSocialOnboarding] =
    useRecoilState(socialOnboardingAtom);

  const handleSocialOnboardingModal = () => {
    setSocialOnboardingModal((prev) => ({
      ...prev,
      openSocialOnboardingModal: false,
    }));
  };

  return (
    <Modal
      isOpen={socialOnboardingModal.openSocialOnboardingModal}
      onClose={handleSocialOnboardingModal}
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Social Onboarding</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" align="center" mb="4">
            <Text fontSize="xl">Creating your account with </Text>
            {socialOnboarding.provider === "google" ? (
              <IconButton
                aria-label="Google"
                icon={<GoogleIcon w="8" h="8" />}
              />
            ) : null}

            {/* <IconButton
              aria-label="Select Google"
              icon={<YahooIcon w="10" h="10" fill="#5f01d3" />}
            />
            <IconButton
              aria-label="Select Google"
              icon={<DiscordIcon h="10" w="10" color="#5562ea" />}
            />
            <IconButton
              aria-label="Select Google"
              icon={<MicrosoftIcon w="8" h="8" />}
            />
            <IconButton
              aria-label="Select Google"
              icon={<TwitterIcon h="10" w="10" color="#1d9bf0" />}
            />
            <IconButton
              aria-label="Select Google"
              icon={<FacebookIcon h="10" w="10" color="#1877f2" />}
            />
            <IconButton
              aria-label="Select Google"
              icon={<CustomAnimatedTwitchIcon w="10" h="10" fill="#a970ff" />}
            /> */}
          </Flex>
          <Flex direction="column">
            <label>
              <Box
                bgImage={socialOnboarding.userInfo.picture}
                bgPos="center"
                bgSize="cover"
                bgRepeat="no-repeat"
                boxSize="100px"
                borderRadius="md"
                my="2"
              ></Box>
            </label>
            <label>
              <Text>Username</Text>
              <Input
                my="2"
                name="SocialUsername"
                key="SocialUsernameInput"
                required
                placeholder="Your new social Username"
                autoComplete="on"
                defaultValue={socialOnboarding.userInfo.name}
              />
            </label>
            <label>
              <Text>Email</Text>
              <Input
                my="2"
                name="SocialUsername"
                key="SocialUsernameInput"
                required
                isDisabled
                placeholder="Your new social Username"
                autoComplete="on"
                defaultValue={socialOnboarding.userInfo.email}
                borderRadius="0.375rem"
              />
            </label>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button>Create the BloatCare Account</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SocialOnboarding;
