import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        mr="2"
        onClick={toggleColorMode}
        aria-label="Change theme"
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      />{" "}
    </>
  );
};

export default LightSwitch;
