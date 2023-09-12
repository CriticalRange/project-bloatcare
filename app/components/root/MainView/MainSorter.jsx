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
import { CustomRefreshIcon } from "../../Icons/Components/IconComponents";
import CustomSortAzSvg from "../../Icons/Custom/CustomIcons/CustomSortAzSvg";
import CustomSortZaSvg from "../../Icons/Custom/CustomIcons/CustomSortZaSvg";
import { useRecoilState } from "recoil";
import { userAtom } from "../../atoms/authAtom";

const MainSorter = () => {
  const [user, setUser] = useRecoilState(userAtom);

  return (
    <Flex
      borderRadius="5px"
      direction="row"
      my="2"
      flex="1"
      alignItems="center"
      justify="flex-end"
    >
      <Button
        mr="2"
        aria-label="refresh button" /* onClick={refreshMechanism} */
      >
        {" "}
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

export default MainSorter;
