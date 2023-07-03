"use client";
import { Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { authModalState } from "../../atoms/AuthModalAtom";
import SearchInput from "./SearchInput";

export default function CustomNavbar() {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const brandClickHandler = () => {
    isHomePage ? null : router.push("/");
  };

  return (
    <Flex bg="white" height="50px">
      <Flex flexDirection="row" flex="1" align="center" justify="space-between">
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
        <Flex flex="1" justify="flex-end">
          <Button
            marginRight="3"
            color="white"
            bg="#1e40af"
            textColor="white"
            _hover={{
              bg: "#60a5fa",
            }}
            _dark={{
              textColor: "white",
            }}
            onClick={() => setModalState({ open: true, view: "signin" })}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
