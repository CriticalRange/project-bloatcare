"use client";

// Main Providers are held here
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RecoilRoot, useRecoilState } from "recoil";
import theme from "./components/theme/index";
import { StrictMode } from "react";

const Providers = ({ children }) => {
  return (
    <StrictMode>
      <RecoilRoot>
        <CacheProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </RecoilRoot>
    </StrictMode>
  );
};

export default Providers;
