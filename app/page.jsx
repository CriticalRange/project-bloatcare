//Root Page
import MainViewPage from "./components/root/MainViewPage";

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

export default function Home() {
  return (
    <div>
      <MainViewPage />
    </div>
  );
}
