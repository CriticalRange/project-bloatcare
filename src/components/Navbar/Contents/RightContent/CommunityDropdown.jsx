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

const CommunityDropdown = () => {
  const toast = useToast();

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
