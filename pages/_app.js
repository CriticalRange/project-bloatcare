import "tailwindcss/tailwind.css";
import "../styles/global.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import AuthModal from "../components/AuthModal";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
