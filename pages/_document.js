import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";
import { Html, Head, Main, NextScript } from "next/document";

export const name = "BloatCare";
export const siteTitle = "BloatCare";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <Main />
        <NextScript />
        <Footer>
          <div className="w-full bg-[#1e40af]">
            <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
              <div>
                <Footer.Title className="text-white" title="Company" />
                <Footer.LinkGroup className="text-white" col>
                  <Footer.Link href="#">About</Footer.Link>
                  <Footer.Link href="#">Careers</Footer.Link>
                  <Footer.Link href="#">Brand Center</Footer.Link>
                  <Footer.Link href="#">Blog</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title className="text-white" title="help center" />
                <Footer.LinkGroup className="text-white" col>
                  <Footer.Link href="#">Discord Server</Footer.Link>
                  <Footer.Link href="#">Twitter</Footer.Link>
                  <Footer.Link href="#">Facebook</Footer.Link>
                  <Footer.Link href="#">Contact Us</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title className="text-white" title="legal" />
                <Footer.LinkGroup className="text-white" col>
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Licensing</Footer.Link>
                  <Footer.Link href="#">Terms & Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title className="text-white" title="download" />
                <Footer.LinkGroup className="text-white" col>
                  <Footer.Link href="#">iOS</Footer.Link>
                  <Footer.Link href="#">Android</Footer.Link>
                  <Footer.Link href="#">Windows</Footer.Link>
                  <Footer.Link href="#">MacOS</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
            <hr className="border-white dark:border-black border-2" />
            <div className="w-full bg-[#1e40af] px-4 py-6 sm:flex sm:items-center sm:justify-between">
              <Footer.Copyright
                className="text-white"
                by="BloatCare™"
                href="#"
                year={2023}
              />
              <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook} />
                <Footer.Icon href="#" icon={BsInstagram} />
                <Footer.Icon href="#" icon={BsTwitter} />
                <Footer.Icon href="#" icon={BsGithub} />
                <Footer.Icon href="#" icon={BsDribbble} />
              </div>
            </div>
          </div>
        </Footer>
      </body>
    </Html>
  );
}
