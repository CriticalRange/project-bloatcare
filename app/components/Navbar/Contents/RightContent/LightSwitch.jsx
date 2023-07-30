"use client";

import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";
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
            <Icon
              icon="line-md:moon-filled-alt-to-sunny-filled-loop-transition"
              width="32"
              height="32"
            />
          ) : (
            <Icon icon="line-md:moon-loop" width="32" height="32" />
          )
        }
      />{" "}
    </Flex>
  );
};

export default LightSwitch;
