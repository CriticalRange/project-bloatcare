// Things applied to this page (especially Component) will be applied to every single page
import "../../recoil";
import { RecoilRoot } from "recoil";
import { Chakra } from "../Chakra";
import Layout from "../components/Layout/Layout";
import { StrictMode } from "react";

export default function App({ Component, pageProps }) {
  return (
    <StrictMode>
      <RecoilRoot>
        <Chakra cookies={pageProps.cookies}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Chakra>
      </RecoilRoot>
    </StrictMode>
  );
}
