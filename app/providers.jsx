"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import theme from "./components/theme/index";

const Providers = ({ children }) => {
  return (
    <RecoilRoot>
      <CacheProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  );
};

export default Providers;
