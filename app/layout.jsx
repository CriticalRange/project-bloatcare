"use client";

import { ColorModeScript } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";
import theme from "./components/theme/index";
const Providers = dynamic(() => import("./providers"), { ssr: false });

const RootLayout = ({ children }) => {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <Providers>
          {pathname === "/auth/discord" ? null : pathname ===
            "/auth/twitch" ? null : (
            <Navbar />
          )}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
