"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Flex } from "@chakra-ui/react";
import { BloatcareIcon } from "../../../Icons/Components/IconComponents";
import dynamic from "next/dynamic";

const LeftContent = () => {
  const DynamicSearchInput = dynamic(() => import("./SearchInput"));
  return (
    <Flex align="center">
      <Box mx="5">
        <Link href="/" aria-label="BloatCare icon">
          <BloatcareIcon w="10" h="10" fill="#107cf1" cursor="pointer" />
        </Link>
      </Box>
      <DynamicSearchInput />
    </Flex>
  );
};

export default LeftContent;
