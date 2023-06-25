import { useEffect } from "react";
import { Button, Navbar } from "flowbite-react";
import Image from "next/image";
import { siteTitle } from "./layout";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "next-themes";

export default function CustomNavbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const brandClickHandler = () => {
    isHomePage ? null : router.push("/");
  };

  return (
    <Navbar>
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
      <div className="flex md:order-2 flex-row">
        <div>
          <FontAwesomeIcon
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
            className="text-4xl mr-5 mt-1"
            icon={theme === "light" ? faSun : faCloudMoon}
            color={theme === "light" ? "black" : "white"}
          />
        </div>

        <Button>Login</Button>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
