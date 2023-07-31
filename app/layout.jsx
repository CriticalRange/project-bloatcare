"use client";

import { usePathname } from "next/navigation";
import AuthModal from "./components/Modal/Auth/AuthModal";
import CreateCommunityModal from "./components/Modal/Community/Create/CommunityCreateModal";
import Navbar from "./components/Navbar/Navbar";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./components/theme/index";
const Providers = dynamic(() => import("./providers"), { ssr: false });
import dynamic from "next/dynamic";
import ConfirmationModal from "./components/Modal/Confirmation/ConfirmationModal";

const metadata = {
  title: "BloatCare",
  description: "Unleash Your Passions, Ignite Discussions",
};

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
