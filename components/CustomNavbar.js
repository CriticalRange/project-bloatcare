"use client";
import { DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import Image from "next/image";
import { siteTitle } from "../pages/_document";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Button, IconButton, useColorMode } from "@chakra-ui/react";
import { useToggleStore, useCredentialsStore } from "../pages/api/stores";
import { shallow } from "zustand/shallow";
import NavbarProfile from "./NavbarProfile";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function CustomNavbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userInfo, setUserInfo } = useCredentialsStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));
  const { isModalOpen, toggleModalOpen } = useToggleStore(
    (state) => ({
      isModalOpen: state.isModalOpen,
      toggleModalOpen: state.toggleModalOpen,
    }),
    shallow
  );

  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const brandClickHandler = () => {
    isHomePage ? null : router.push("/");
  };

  return (
    <Flowbite>
      <Navbar className="bg-white dark:bg-black">
        <Navbar.Brand className="cursor-pointer" onClick={brandClickHandler}>
          <Image
            src="/favicon.ico"
            className={`${utilStyles.borderCircle} mr-3`}
            height={44}
            width={44}
            alt="Profile picture"
          />
          <span className="self-center whitespace-nowrap text-xl text-[#1e40af] font-bold dark:hover:bg-[#60a5fa]">
            {siteTitle}
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 flex-row">
          <DarkThemeToggle className="mr-5" onClick={toggleColorMode} />
          {userInfo ? (
            <NavbarProfile />
          ) : (
            <Button
              color="white"
              bg="#1e40af"
              textColor="white"
              _hover={{
                bg: "#60a5fa",
              }}
              _dark={{
                textColor: "white",
              }}
              onClick={() => toggleModalOpen(!isModalOpen)}
            >
              Login
            </Button>
          )}
        </div>
      </Navbar>
    </Flowbite>
  );
}
