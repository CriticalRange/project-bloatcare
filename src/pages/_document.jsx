// The Document that is sent to client before returning SSR document
import { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";

export const name = "BloatCare";
export const siteTitle = "BloatCare";

export default function Document() {
  return (
    <Html lang="en">
      <body>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
        </Head>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
