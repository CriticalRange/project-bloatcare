"use client";

import {
  Avatar,
  Button,
  Flex,
  Icon,
  IconButton,
  ListItem,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  createIcon,
  useToast,
} from "@chakra-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import useCommunityData from "../../../../hooks/useCommunityData";
import {
  CustomAddCommunityIcon,
  CustomAnimatedDescriptionIcon,
  CustomPLusIcon,
} from "../../../Icons/IconComponents/IconComponents";
import CreateCommunityModal from "../../../Modal/Community/Create/CommunityCreateModal";
import {
  authModalAtom,
  createCommunityModalAtom,
} from "../../../atoms/modalAtoms";
import { auth } from "../../../firebase/clientApp";
import useCommunities from "../../../../hooks/useCommunities";
import CommunityImage from "../../../Community/CommunityHeader/CommunityImage";
import CustomAnimatedUserSvg from "../../../Icons/CustomAnimatedUserSvg";
import { Link } from "@chakra-ui/next-js";
import { useEffect, useState } from "react";
import CustomAnimatedDescriptionSvg from "../../../Icons/CustomAnimatedDescriptionSvg";
import CustomAddCommunitySvg from "../../../Icons/CustomAddCommunitySvg";

const CommunityDropdown = () => {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [user] = useAuthState(auth);

  const redirectToNewPostPage = () => {
    const currentUrl = pathname;
    if (currentUrl !== `/communities/${params.communityId}`) {
      console.log("Please make a decent posts selection page");
      // Make a decent posts selection page later
      return;
    }

    const postsUrl = `/communities/${communityData.communityId}/new`;
    router.push(postsUrl);
  };

  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [createCommunityModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );
  const { communityData } = useCommunities();

  return (
    <Flex mr="2">
      <Menu isLazy preventOverflow size="lg">
        <MenuButton as={Button}>
          <Flex direction="row" align="center">
            <Text display={{ base: "none", sm: "block" }}>Communities</Text>
            <CustomPLusIcon w="6" h="6" ml="2" />
          </Flex>
        </MenuButton>

        <MenuDivider />
        <MenuList
          bg="white"
          textColor="black"
          _dark={{ bg: "black", textColor: "white" }}
        >
          <MenuGroup title="Communities">
            <MenuList
              overflow={user ? "scroll" : "hidden"}
              overflowX="hidden"
              bg="white"
              h={user ? "300" : "inherit"}
              _dark={{ bg: "black" }}
            >
              {user ? (
                communityData.userSnippets.length !== 0 ? (
                  communityData.userSnippets.map((snippet) => {
                    if (snippet.isJoined === true) {
                      return (
                        <Link
                          display={user ? "block" : "none"}
                          key={snippet.communityId}
                          href={`/communities/${snippet.communityId}`}
                        >
                          <MenuItem
                            bg="white"
                            textColor="black"
                            _dark={{ bg: "black", textColor: "white" }}
                          >
                            <Avatar
                              icon={
                                <Icon
                                  as={CustomAnimatedUserSvg}
                                  color="black"
                                  _dark={{ color: "white" }}
                                  w="8"
                                  h="8"
                                />
                              }
                              bg="transparent"
                              size="sm"
                            />
                            <Text ml="3">{snippet.communityId}</Text>
                          </MenuItem>
                        </Link>
                      );
                    }
                  })
                ) : null
              ) : (
                <MenuItem
                  bg="white"
                  textColor="black"
                  _dark={{ bg: "black", textColor: "white" }}
                  onClick={() => {
                    setAuthModalState({
                      openAuthModal: true,
                      authModalView: "signin",
                    });
                  }}
                >
                  <Flex
                    h="10"
                    align="center"
                    borderRadius="md"
                    bg="colors.brand.primary"
                  >
                    <Text
                      fontSize="md"
                      fontWeight="semibold"
                      mx="3"
                      color="white"
                    >
                      You are not logged in. Click to login
                    </Text>
                  </Flex>
                </MenuItem>
              )}
            </MenuList>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Create">
            <MenuItem
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
              icon={<CustomAnimatedDescriptionIcon w="8" h="8" />}
              onClick={() => {
                if (user) {
                  redirectToNewPostPage();
                } else {
                  {
                    setAuthModalState({
                      openAuthModal: true,
                      authModalView: "signin",
                    });
                    toast({
                      title: "You are not logged in!",
                      description:
                        "You are not allowed to create posts unless you log in",
                      status: "error",
                      duration: 2500,
                      position: "bottom-left",
                      isClosable: true,
                    });
                  }
                }
              }}
            >
              <Text>Create Post</Text>
            </MenuItem>
            <MenuItem
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
              icon={<CustomAddCommunityIcon w="8" h="8" />}
              onClick={() => {
                if (user) {
                  setCreateCommunityModal((prev) => ({
                    ...prev,
                    openCreateCommunityModal: true,
                  }));
                } else {
                  {
                    setAuthModalState({
                      openAuthModal: true,
                      authModalView: "signin",
                    });
                    toast({
                      title: "You are not logged in!",
                      description:
                        "You are not allowed to create communities unless you log in",
                      status: "error",
                      duration: 2500,
                      position: "bottom-left",
                      isClosable: true,
                    });
                  }
                }
              }}
            >
              <Text>Create a Community</Text>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <CreateCommunityModal />
    </Flex>
  );
};

export default CommunityDropdown;
