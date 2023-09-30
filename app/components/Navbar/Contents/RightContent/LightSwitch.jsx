"use client";

import { Box, Button, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const switchKey = colorMode === "light" ? "light" : "dark"; // Dinamik bir key oluşturun

  return (
    <Box>
      <Button
        key={switchKey}
        mr="2"
        onClick={toggleColorMode}
        aria-label="Change theme"
      >
        {
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
      </Button>
    </Box>
  );
};

export default LightSwitch;
