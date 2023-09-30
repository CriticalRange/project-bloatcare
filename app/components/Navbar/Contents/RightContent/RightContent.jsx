"use client";

import { Button, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AuthModal from "../../../Modal/Auth/AuthModal";
import { userAtom } from "../../../atoms/authAtom";
import { authModalAtom } from "../../../atoms/modalAtoms";
import CommunitiesDropdown from "./CommunitiesDropdown";
import LightSwitch from "./LightSwitch";
import NavbarProfile from "./NavbarProfile";

const DynamicEmailConfirmationModal = dynamic(
  () => import("../../../Modal/Auth/Email/Confirmation/EmailConfirmationModal"),
  {
    ssr: false,
  }
);

const RightContent = () => {
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const userInfo = useRecoilValue(userAtom);

  return (
    <Flex flex="1" justify="flex-end">
      <LightSwitch />
      <CommunitiesDropdown />
      {userInfo.authenticated === true ? (
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
    </Flex>
  );
};

export default RightContent;
