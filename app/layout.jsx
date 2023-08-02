import dynamic from "next/dynamic";
import CustomNavbar from "./CustomNavbar";
const Providers = dynamic(() => import("./providers"), { ssr: false });

export const metadata = {
  metadataBase: new URL("https://project-bloatcare.vercel.app/"),
  alternates: {
    manifest: "/manifest.json",
  },
  title: {
    default: "BloatCare",
  },
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
      <body>
        <Providers>
          <CustomNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
