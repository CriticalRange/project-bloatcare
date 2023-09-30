"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";

const CustomNavbar = () => {
  const pathname = usePathname();
  return (
    <>
      {/* With this dynamic check, we don't show Navbar on twitch, discord and google auth pages */}
      {pathname === "/auth/twitch" ||
      pathname === "/auth/discord" ||
      pathname === "/auth/google" ? null : (
        <Navbar />
      )}
    </>
  );
};

export default CustomNavbar;
