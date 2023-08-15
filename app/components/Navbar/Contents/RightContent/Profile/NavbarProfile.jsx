"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Avatar,
  Flex,
  Hide,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useResetRecoilState } from "recoil";
import { CustomUserEmptyIcon } from "../../../../Icons/IconComponents/IconComponents";
import { communitiesAtom } from "../../../../atoms/communitiesAtom";
import { auth } from "../../../../firebase/clientApp";

export default function NavbarProfile() {
  const resetCommunityState = useResetRecoilState(communitiesAtom);
  const toast = useToast();
  const [user, userLoading, userError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  return (
    <Flex mr="2">
      <Menu preventOverflow isLazy>
        <MenuButton
          as={IconButton}
          textColor="black"
          _dark={{
            textColor: "white",
          }}
          icon={
            user?.photoURL === null ? <CustomUserEmptyIcon w="8" h="8" /> : null
          }
          textOverflow="ellipsis"
        >
          <Stack gap={2} align="center" direction="row" mx="3">
            <Hide below="sm">
              <Text textOverflow="ellipsis" overflow="hidden" maxWidth="100">
                {user?.displayName}
              </Text>
            </Hide>
            <Avatar src={user?.photoURL !== null ? user.photoURL : ""} />
          </Stack>
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
