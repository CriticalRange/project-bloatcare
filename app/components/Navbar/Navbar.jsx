"use client";

import { Flex } from "@chakra-ui/react";
import LeftContent from "./Contents/LeftContent/LeftContent";
import RightContent from "./Contents/RightContent/RightContent";

export default function Navbar() {
  return (
    <Flex bg="colors.navbarLight" _dark={{ bg: "black" }} height="50px">
      <Flex flexDirection="row" flex="1" align="center" justify="space-between">
        <LeftContent />
        <RightContent />
      </Flex>
    </Flex>
  );
}
