import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { LiaPlusSolid } from "react-icons/lia";
import { IconButton } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { createCommunityModalAtom } from "../../../../atoms/createCommunityModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/clientApp";
import { authModalAtom } from "../../../../atoms/authModalAtom";
import { useRouter } from "next/router";
import useCommunityData from "../../../../hooks/useCommunityData";

const CommunityDropdown = () => {
  const { communityData, onJoinOrLeaveCommunity, loading } = useCommunityData();
  const toast = useToast();
  const router = useRouter();

  const redirectToNewPostPage = () => {
    const currentUrl = router.pathname;
    if (currentUrl !== "/communities/[communityId]") {
      console.log("Please make a decent posts selection page");
      // Make a decent posts selection page later
      return;
    }
    const { communityId } = router.query;

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
        <MenuButton as={IconButton} icon={<LiaPlusSolid />}></MenuButton>
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
