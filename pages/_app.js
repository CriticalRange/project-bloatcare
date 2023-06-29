import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";
import AuthModal from "../components/AuthModal";
import CustomNavbar from "../components/CustomNavbar";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <CacheProvider>
        <ChakraProvider>
          <CustomNavbar />
          <AuthModal />
          <Component {...pageProps} />
        </ChakraProvider>
      </CacheProvider>
    </ThemeProvider>
  );
}
