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
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
  CustomExitIcon,
  CustomUserEmptyIcon,
  CustomUserSettingsIcon,
} from "../../../Icons/Components/IconComponents";
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
                {userInfo.Display_Name}
              </Text>
            </Hide>
            <Avatar src={`${userInfo.Photo_Url}`} />
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
              <Flex direction="row" align="center">
                <Avatar
                  icon={
                    <CustomUserSettingsIcon
                      color="black"
                      _dark={{ color: "white" }}
                    />
                  }
                  w="8"
                  h="8"
                  backgroundColor="transparent"
                />
                <Text ml="2">Account</Text>
              </Flex>
            </MenuItem>
          </Link>
          <Link href={`/profile/${userInfo.Display_Name}`}>
            <MenuItem
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
            >
              <Flex direction="row" align="center">
                <Avatar
                  icon={
                    <CustomUserEmptyIcon
                      color="black"
                      _dark={{ color: "white" }}
                    />
                  }
                  w="8"
                  h="8"
                  backgroundColor="transparent"
                />
                <Text ml="2">Profile</Text>
              </Flex>
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
              localStorage.removeItem("tempCommunities");
              resetCommunityState;
              resetUserInfo;
              setUserInfo((prev) => ({
                ...prev,
                authenticated: false,
                authType: "",
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
            <Flex direction="row" align="center">
              <Avatar
                icon={
                  <CustomExitIcon color="black" _dark={{ color: "white" }} />
                }
                w="8"
                h="8"
                backgroundColor="transparent"
              />
              <Text ml="2">Sign out</Text>
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
