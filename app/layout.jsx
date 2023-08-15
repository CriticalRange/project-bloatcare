import dynamic from "next/dynamic";
import CustomNavbar from "./CustomNavbar";
import NextTopLoader from "nextjs-toploader";
const Providers = dynamic(() => import("./providers"), { ssr: false });

export const metadata = {
  metadataBase: new URL("https://project-bloatcare.vercel.app/"),
  manifest: "/manifest.json",
  ServiceWorker: "/register-sw.js",
  alternates: {
    manifest: "/manifest.json",
  },
  title: {
    default: "BloatCare",
  },
  themeColor: "#60a5fa",
  display: "standalone",
  applicationName: "BloatCare",
  referrer: "no-referrer",
  keywords: ["Next.js", "React", "JavaScript", "BloatCare"],
  authors: [{ name: "CriticalRange" }],
  creator: "CriticalRange",
  publisher: "Vercel",
  description: "Unleash Your Passions, Ignite Discussions",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <NextTopLoader showSpinner={false} color="#1e40af" shadow={false} />
        <Providers>
          <CustomNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
