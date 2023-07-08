import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import SearchInput from "../RightContent/SearchInput";

const LeftContent = () => {
  return (
    <Box>
      <Image
        marginLeft="3"
        src="/favicon.ico"
        borderRadius="9999px"
        mr={{ base: "2", md: "3" }}
        height="12"
        width="12"
        alt="Profile picture"
      />
      <Image
        src="/BloatCareText.png"
        cursor="pointer"
        marginRight="3"
        height="20"
        width="28"
        alt="Profile picture"
        display={{ base: "none", md: "unset" }}
      />
      <SearchInput />
    </Box>
  );
};

export default LeftContent;
