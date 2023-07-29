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
import { Link } from "@chakra-ui/next-js";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";
import ProfileIcon from "./ProfileIcon";
import { useResetRecoilState } from "recoil";
import { communitiesAtom } from "../../../../atoms/communitiesAtom";

export default function NavbarProfile() {
  const resetCommunityState = useResetRecoilState(communitiesAtom);
  const toast = useToast();
  const [user, userLoading, userError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  return (
    <Flex mr="2">
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
              document.cookie = "";
              resetCommunityState;
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
