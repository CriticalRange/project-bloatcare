"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcGenericSortingAsc,
  FcGenericSortingDesc,
} from "react-icons/fc";
import { HiOutlineRefresh } from "react-icons/hi";

const MainSorter = () => {
  return (
    <Flex
      borderRadius="5px"
      direction="row"
      my="2"
      flex="1"
      alignItems="center"
      justify="flex-end"
    >
      <Button mr="2">
        {" "}
        {/* Refresh function */}
        <Icon as={HiOutlineRefresh} w="8" h="10" />
      </Button>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort By
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Icon as={FcAlphabeticalSortingAz} w="10" h="10" />
          </MenuItem>
          <MenuItem>
            <Icon as={FcAlphabeticalSortingZa} w="10" h="10" />
          </MenuItem>
          <MenuItem>
            <Icon as={FcGenericSortingAsc} w="10" h="10" />
          </MenuItem>
          <MenuItem>
            <Icon as={FcGenericSortingDesc} w="10" h="10" />
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default MainSorter;
