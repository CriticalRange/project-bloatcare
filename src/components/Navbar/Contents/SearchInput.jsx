import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  useBreakpointValue,
} from "@chakra-ui/react";

const SearchInput = () => {
  const searchPlaceholder = useBreakpointValue({
    base: "Search",
    md: "Search on BloatCare",
  });
  return (
    <Flex mr="2" w={{ base: "240px", md: "auto" }}>
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="search"
          _placeholder={{
            color: "gray.500",
            _dark: { color: "gray.300" },
          }}
          placeholder={searchPlaceholder}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
