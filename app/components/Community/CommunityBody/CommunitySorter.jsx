"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
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

const CommunitySorter = () => {
  return (
    <Flex flex="1" justify="flex-end" mt="3" mr="14" align="center">
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

export default CommunitySorter;
