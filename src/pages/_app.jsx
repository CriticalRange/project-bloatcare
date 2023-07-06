"use client";
import { Chakra } from "../Chakra";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Chakra cookies={pageProps.cookies}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Chakra>
    </RecoilRoot>
  );
}
