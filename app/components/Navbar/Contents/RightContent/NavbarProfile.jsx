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
import { useRecoilState, useResetRecoilState } from "recoil";
import { CustomUserEmptyIcon } from "../../../Icons/Components/IconComponents";
import { communitiesAtom } from "../../../atoms/communitiesAtom";
import Cookies from "js-cookie";
import { userAtom } from "../../../atoms/authAtom";

export default function NavbarProfile() {
  const resetCommunityState = useResetRecoilState(communitiesAtom);
  const toast = useToast();
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const resetUserInfo = useResetRecoilState(userAtom);

  return (
    <Flex mr="2">
      <Menu preventOverflow isLazy>
        <MenuButton
          as={IconButton}
          aria-label="Profile"
          textColor="black"
          _dark={{
            textColor: "white",
          }}
          icon={
            // @ts-ignore
            userInfo.photoURL === null ? (
              <CustomUserEmptyIcon w="8" h="8" />
            ) : null
          }
          textOverflow="ellipsis"
        >
          <Stack gap={2} align="center" direction="row" mx="3">
            <Hide below="sm">
              <Text
                textOverflow="ellipsis"
                overflow="hidden"
                maxWidth="100"
                className="notranslate"
              >
                {
                  // @ts-ignore
                  userInfo.Display_Name
                }
              </Text>
            </Hide>

            <Avatar
              src={
                // @ts-ignore
                userInfo.photoURL !== ""
                  ? // @ts-ignore
                    userInfo.photoURL
                  : ""
              }
            />
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
          <Link
            href={`/profile/${
              // @ts-ignore
              userInfo.Display_Name
            }`}
          >
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
              document.cookie = "";
              Cookies.remove("accessToken");
              Cookies.remove("refreshToken");
              resetCommunityState;
              resetUserInfo;
              setUserInfo((prev) => ({
                ...prev,
                authenticated: false,
              }));
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
