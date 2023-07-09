import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { LiaPlusSolid } from "react-icons/lia";
import { IconButton } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { createCommunityModalAtom } from "../../../../atoms/createCommunityModalAtom";

const CommunityDropdown = () => {
  const [createCommunityModal, setCreateCommunityModal] = useRecoilState(
    createCommunityModalAtom
  );
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
            onClick={() =>
              setCreateCommunityModal({ openCreateCommunityModal: true })
            }
          >
            Create a Community
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CommunityDropdown;
