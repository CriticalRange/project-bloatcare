import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import theme from "../../theme";
import Layout from "../components/Layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}
