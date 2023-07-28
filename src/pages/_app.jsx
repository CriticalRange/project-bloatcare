// Things applied to this page (especially Component) will be applied to every single page
import "../../recoil";
import { RecoilRoot } from "recoil";
import { Chakra } from "../Chakra";
import Layout from "../components/Layout/Layout";
import { StrictMode, useEffect, useState } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export default function App({ Component, pageProps }) {
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    setPageLoaded(true);
  }, []);
  return (
    <StrictMode>
      <RecoilRoot>
        {pageLoaded ? (
          <Auth0Provider
            domain="dev-54mkge1n0twzi1d4.us.auth0.com"
            clientId="VB5WYTBBQ9zycLBcqGr6lquMfFxZ07Mx"
            authorizationParams={{
              redirect_uri: window.location.origin,
            }}
          >
            <Chakra cookies={pageProps.cookies}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </Chakra>
          </Auth0Provider>
        ) : null}
      </RecoilRoot>
    </StrictMode>
  );
}
