"use client";

import React, { StrictMode } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const Providers = ({ children }) => {
  return (
    <RecoilRoot>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </RecoilRoot>
  );
};

export default Providers;
