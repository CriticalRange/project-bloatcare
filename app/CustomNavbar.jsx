"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";

const CustomNavbar = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/auth/twitch" || pathname === "/auth/discord" ? null : (
        <Navbar />
      )}
    </>
  );
};

export default CustomNavbar;
