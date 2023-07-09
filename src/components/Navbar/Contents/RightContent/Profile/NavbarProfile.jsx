"use client";
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonText,
  Text,
  useToast,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase/clientApp";
import ProfileIcon from "./ProfileIcon";

export default function NavbarProfile() {
  const toast = useToast();
  const [user, userLoading, userError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  return (
    <Flex>
      <Menu>
        <MenuButton
          as={Button}
          textColor="black"
          _dark={{
            textColor: "white",
          }}
          rightIcon={<ProfileIcon />}
        >
          <SkeletonText
            isLoaded={!userLoading}
            noOfLines={1}
            textOverflow="ellipsis"
            display={{ base: "none", md: "unset" }}
          >
            {user?.displayName === null ? user.email : user?.displayName}
          </SkeletonText>
        </MenuButton>
        <MenuList bg="white" _dark={{ bg: "black" }}>
          <Link href="/account">
            <MenuItem
              title="Account"
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
            >
              Account
            </MenuItem>
          </Link>
          <Link href="/profile">
            <MenuItem
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
            >
              Profile
            </MenuItem>
          </Link>
          <MenuItem
            bg="white"
            textColor="black"
            _dark={{ bg: "black", textColor: "white" }}
            onClick={async () => {
              await signOut();
              toast({
                title: "Successfully logged out!.",
                description: "Logged out of your account.",
                status: "info",
                duration: 1600,
                isClosable: true,
                position: "bottom-left",
              });
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
