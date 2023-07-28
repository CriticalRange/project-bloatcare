import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <IconButton
        mr="2"
        onClick={toggleColorMode}
        aria-label="Change theme"
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      />{" "}
    </Flex>
  );
};

export default LightSwitch;
