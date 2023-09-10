"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";

const CustomNavbar = () => {
  const pathname = usePathname();
  return (
    <>
      {/* With this dynamic check, we don't show Navbar on twitch and discord */}
      {pathname === "/auth/twitch" ||
      pathname === "/auth/discord" ||
      pathname === "/auth/google" ? null : (
        <Navbar />
      )}
    </>
  );
};

export default CustomNavbar;
