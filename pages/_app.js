import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../firebase/config/firebase.config";
import { ChakraProvider } from "@chakra-ui/react";
import AuthModal from "../components/AuthModal";
import CustomNavbar from "../components/CustomNavbar";
import theme from "../theme";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthModal />
      <CustomNavbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
