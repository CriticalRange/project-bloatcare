"use client";

import React, { StrictMode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import theme from "./components/theme/index";

const Providers = ({ children }) => {
  return (
    <StrictMode>
      <RecoilRoot>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </RecoilRoot>
    </StrictMode>
  );
};

export default Providers;
