import { Image } from "@chakra-ui/react";
import Link from "next/link";
import SearchInput from "./SearchInput";

const LeftContent = () => {
  return (
    <>
      <Image
        marginLeft="3"
        src="/favicon.ico"
        borderRadius="9999px"
        className="mr-3"
        height="12"
        width="12"
        alt="Profile picture"
      />
      <Link href="/">
        <Image
          src="/BloatCareText.png"
          cursor="pointer"
          marginRight="3"
          height="20"
          width="28"
          alt="Profile picture"
          display={{ base: "none", md: "unset" }}
        />
      </Link>
      <SearchInput />
    </>
  );
};

export default LeftContent;
