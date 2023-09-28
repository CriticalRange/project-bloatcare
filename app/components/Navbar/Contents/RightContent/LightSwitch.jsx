"use client";

import { Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const switchKey = colorMode === "light" ? "light" : "dark"; // Dinamik bir key oluşturun

  return (
    <Flex>
      <IconButton
        key={switchKey}
        mr="2"
        isRound
        onClick={toggleColorMode}
        aria-label="Change theme"
        icon={
          <Icon
            icon={
              colorMode === "light"
                ? "line-md:moon-filled-to-sunny-filled-loop-transition"
                : "line-md:moon-filled-alt-loop"
            }
            width="24"
            height="24"
          />
        }
      />{" "}
    </Flex>
  );
};

export default LightSwitch;
