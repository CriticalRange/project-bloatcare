"use client";

import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";

const SearchInput = () => {
  return (
    <Flex
      mr="2"
      w={{ base: "240px", md: "auto" }}
      display={{ base: "none", md: "block" }}
    >
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          name="CommunitiesSearch"
          type="search"
          _placeholder={{
            color: "gray.500",
            _dark: { color: "gray.300" },
          }}
          placeholder={useBreakpointValue({
            base: "Search",
            md: "Search on BloatCare",
          })}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
