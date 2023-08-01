"use client";

import {
  Avatar,
  Button,
  Flex,
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
import { CustomPLusIcon } from "../../../Icons/IconComponents/IconComponents";
import CreateCommunityModal from "../../../Modal/Community/Create/CommunityCreateModal";
import { authModalAtom } from "../../../atoms/authModalAtom";
import { createCommunityModalAtom } from "../../../atoms/createCommunityModalAtom";
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

  const CustomAnimatedDescriptionIcon = createIcon({
    displayName: "CustomAnimatedDescriptionIcon",
    viewBox: "0 0 24 24",
    path: <CustomAnimatedDescriptionSvg />,
  });

  const CustomAddCommunityIcon = createIcon({
    displayName: "CustomAddCommunityIcon",
    viewBox: "0 0 24 24",
    path: <CustomAddCommunitySvg />,
  });

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
      <Menu isLazy size="xl">
        <MenuButton as={Button} rightIcon={<CustomPLusIcon w="6" h="6" />}>
          <Text display={{ base: "none", sm: "block" }}>Communities</Text>
        </MenuButton>
        <MenuDivider />
        <MenuList
          bg="white"
          textColor="black"
          _dark={{ bg: "black", textColor: "white" }}
        >
          <MenuGroup title="Communities">
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
                            icon={<CustomAnimatedUserSvg />}
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
                <Button bg="colors.brand.primary">
                  You are not logged in. Click to login
                </Button>
              </MenuItem>
            )}
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
              Create Post
            </MenuItem>
            <MenuItem
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
              icon={<CustomAddCommunityIcon w="8" h="8" />}
              onClick={() => {
                if (user) {
                  setCreateCommunityModal({ openCreateCommunityModal: true });
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
              Create a Community
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
      <CreateCommunityModal />
    </Flex>
  );
};

export default CommunityDropdown;
