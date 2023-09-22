"use client";

import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import CustomAnimatedUserSvg from "../../../Icons/Custom/CustomAnimatedIcons/CustomAnimatedUserSvg";
import {
  CustomAddCommunityIcon,
  CustomAnimatedDescriptionIcon,
  CustomPLusIcon,
} from "../../../Icons/Components/IconComponents";
import CreateCommunityModal from "../../../Modal/Community/Create/CommunityCreateModal";
import {
  authModalAtom,
  createCommunityModalAtom,
} from "../../../atoms/modalAtoms";
import { userAtom } from "../../../atoms/authAtom";
import { Link } from "@chakra-ui/next-js";

const CommunitiesDropdown = () => {
  const toast = useToast();

  // Next navigation
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  // States
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [authModalState, setAuthModalState] = useRecoilState(authModalAtom);
  const [createCommunityModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );

  return (
    <Flex mr="2">
      <Menu isLazy preventOverflow size="lg">
        <MenuButton as={Button} aria-label="Communities Dropdown">
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
              overflow={userInfo.authenticated === true ? "scroll" : "hidden"}
              overflowX="hidden"
              bg="white"
              h={userInfo.authenticated === true ? "300" : "inherit"}
              _dark={{ bg: "black" }}
            >
              {userInfo.authenticated === true ? (
                userInfo.Communities.map((value) => {
                  if (value?.name === undefined) {
                    return;
                  }
                  if (value.id === "Unknown") {
                    return;
                  }
                  if (value.isJoined === false) {
                    return;
                  }
                  return (
                    <Link
                      display={
                        userInfo.authenticated === true ? "block" : "none"
                      }
                      key={`${value.name}-${value.id}`}
                      href={`/communities/${value.name}`}
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
                        <Text ml="3">{value.name}</Text>
                      </MenuItem>
                    </Link>
                  );
                })
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
                  <Flex h="10" align="center" borderRadius="md" bg="#1e40af">
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
          <MenuGroup title="Create">
            <Link href={`/communities/${params.communityId}/new`}>
              <MenuItem
                bg="white"
                textColor="black"
                _dark={{ bg: "black", textColor: "white" }}
                icon={<CustomAnimatedDescriptionIcon w="8" h="8" />}
                onClick={() => {
                  if (!userInfo.authenticated) {
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
            </Link>
            <MenuItem
              bg="white"
              textColor="black"
              _dark={{ bg: "black", textColor: "white" }}
              icon={<CustomAddCommunityIcon w="8" h="8" />}
              onClick={() => {
                if (userInfo.authenticated === true) {
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

export default CommunitiesDropdown;
