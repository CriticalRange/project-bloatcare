"use client";

import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import useCommunityData from "../../../../hooks/useCommunityData";
import { CustomPLusIcon } from "../../../Icons/IconComponents/IconComponents";
import { authModalAtom } from "../../../atoms/authModalAtom";
import { createCommunityModalAtom } from "../../../atoms/createCommunityModalAtom";
import { auth } from "../../../firebase/clientApp";

const CommunityDropdown = () => {
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

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

  const [user] = useAuthState(auth);

  return (
    <Flex mr="2">
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<CustomPLusIcon w="6" h="6" />}
        ></MenuButton>
        <MenuList
          bg="white"
          textColor="black"
          _dark={{ bg: "black", textColor: "white" }}
        >
          <MenuItem
            bg="white"
            textColor="black"
            _dark={{ bg: "black", textColor: "white" }}
            onClick={redirectToNewPostPage}
          >
            Create Post
          </MenuItem>
          <MenuItem
            bg="white"
            textColor="black"
            _dark={{ bg: "black", textColor: "white" }}
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
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CommunityDropdown;
