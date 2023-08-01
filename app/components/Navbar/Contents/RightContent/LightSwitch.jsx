"use client";

import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import {
  CustomMoonIcon,
  CustomSunIcon,
} from "../../../Icons/IconComponents/IconComponents";
import { Icon } from "@iconify/react";

const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <IconButton
        mr="2"
        onClick={toggleColorMode}
        aria-label="Change theme"
        icon={
          colorMode === "light" ? (
            <Icon icon="line-md:sun-rising-loop" width="24" height="24" />
          ) : (
            <Icon icon="line-md:moon-filled-loop" width="24" height="24" />
          )
        }
      />{" "}
    </Flex>
  );
};

export default LightSwitch;
