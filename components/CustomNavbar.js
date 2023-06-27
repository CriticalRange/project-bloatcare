"use client";
import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
import Image from "next/image";
import { siteTitle } from "../pages/_document";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useAuthModalStore } from "../pages/api/stores";
import { shallow } from "zustand/shallow";

export default function CustomNavbar() {
  const { isModalOpen, toggleModalOpen } = useAuthModalStore(
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
      <Navbar>
        <Navbar.Brand className="cursor-pointer" onClick={brandClickHandler}>
          <Image
            src="/images/profile.jpg"
            className={`${utilStyles.borderCircle} mr-3`}
            height={44}
            width={44}
            alt="Profile picture"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {siteTitle}
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 flex-row">
          <DarkThemeToggle
            className="mr-5"
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
          />
          <Button onClick={() => toggleModalOpen(!isModalOpen)}>Login</Button>
        </div>
      </Navbar>
    </Flowbite>
  );
}
