import { Button, DarkThemeToggle, Flowbite, Navbar } from "flowbite-react";
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

  console.log(theme);
  const brandClickHandler = () => {
    isHomePage ? null : router.push("/");
  };
  return (
    <Flowbite>
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
          <DarkThemeToggle
            className="mr-5"
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
          />
          <Button>Login</Button>
        </div>
      </Navbar>
    </Flowbite>
  );
}
