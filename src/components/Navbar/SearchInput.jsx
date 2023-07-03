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
    <Flex>
      <InputGroup size="md">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="search" placeholder={searchPlaceholder} />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
