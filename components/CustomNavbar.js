"use client";

import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { siteTitle } from "./layout";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";

export default function CustomNavbar() {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const brandClickHandler = () => {
    isHomePage ? null : router.push("/");
  };
  return (
    <Navbar className="!bg-black">
      <Navbar.Brand className="cursor-pointer" onClick={brandClickHandler}>
        <Image
          priority
          src="/images/profile.jpg"
          className={`${utilStyles.borderCircle} mr-3 h-6 sm:h-9`}
          height={44}
          width={44}
          alt="Profile picture"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          {siteTitle}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Login</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
