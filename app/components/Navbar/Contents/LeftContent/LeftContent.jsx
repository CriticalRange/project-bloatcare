"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Flex } from "@chakra-ui/react";
import { BloatcareIcon } from "../../../Icons/IconComponents/IconComponents";
import SearchInput from "./SearchInput";

const LeftContent = () => {
  return (
    <Flex align="center">
      <Box mx="5">
        <Link href="/" aria-label="BloatCare icon">
          <BloatcareIcon w="10" h="10" fill="#107cf1" cursor="pointer" />
        </Link>
      </Box>
      <SearchInput />
    </Flex>
  );
};

export default LeftContent;
