"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import CustomSortAzSvg from "../../Icons/CustomSortAzSvg";
import CustomSortZaSvg from "../../Icons/CustomSortZaSvg";
import { CustomRefreshIcon } from "../../Icons/IconComponents/IconComponents";

const CommunitySorter = () => {
  return (
    <Flex flex="1" justify="flex-end" mt="3" mr="14" align="center">
      <Button mr="2">
        {" "}
        {/* Refresh function */}
        <Icon as={CustomRefreshIcon} w="8" h="10" />
      </Button>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort By
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Icon as={CustomSortAzSvg} w="10" h="10" />
          </MenuItem>
          <MenuItem>
            <Icon as={CustomSortZaSvg} w="10" h="10" />
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default CommunitySorter;
