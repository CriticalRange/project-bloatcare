"use client";
import { Flex } from "@chakra-ui/react";
import LeftContent from "./Contents/LeftContent";
import RightContent from "./Contents/RightContent";

export default function CustomNavbar() {
  return (
    <Flex bg="white" _dark={{ bg: "black" }} height="50px">
      <Flex flexDirection="row" flex="1" align="center" justify="space-between">
        <LeftContent />
        <RightContent />
      </Flex>
    </Flex>
  );
}
