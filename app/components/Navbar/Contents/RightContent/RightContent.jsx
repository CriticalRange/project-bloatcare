"use client";

import { Button, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalAtom } from "../../../atoms/modalAtoms";
import { auth } from "../../../firebase/clientApp";
import NavbarProfile from "./NavbarProfile";
import LightSwitch from "./LightSwitch";
import { Suspense, useEffect, useState } from "react";
import AuthModal from "../../../Modal/Auth/AuthModal";
import dynamic from "next/dynamic";
import CommunitiesDropdown from "./CommunitiesDropdown";
import { userAtom } from "../../../atoms/authAtom";

const DynamicEmailConfirmationModal = dynamic(
  () => import("../../../Modal/Auth/Email/Confirmation/EmailConfirmationModal"),
  {
    ssr: false,
  }
);

const DynamicSocialOnboardingModal = dynamic(
  () => import("../../../Modal/Auth/Social/Onboarding/SocialOnboardingModal"),
  {
    ssr: false,
  }
);

const RightContent = () => {
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [userInfo, setUserInfo] = useRecoilState(userAtom);

  const [userIsLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    setUserLoaded(true);
  }, []);

  return (
    <Flex flex="1" justify="flex-end">
      <LightSwitch />
      <CommunitiesDropdown />
      {userInfo.length !== 0 ? (
        <NavbarProfile />
      ) : (
        <Button
          aria-label="Login button"
          marginRight="3"
          color="white"
          bg="#1e40af"
          textColor="white"
          _hover={{
            bg: "#60a5fa",
          }}
          _dark={{
            textColor: "white",
          }}
          onClick={() =>
            setAuthModalState({
              openAuthModal: true,
              authModalView: "signin",
            })
          }
        >
          Login
        </Button>
      )}
      <AuthModal />
      <DynamicEmailConfirmationModal />
      <DynamicSocialOnboardingModal />
    </Flex>
  );
};

export default RightContent;
