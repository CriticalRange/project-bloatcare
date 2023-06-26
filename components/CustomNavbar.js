"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  Button,
  DarkThemeToggle,
  Flowbite,
  Navbar,
  Modal,
  TextInput,
  HelperText,
} from "flowbite-react";
import Image from "next/image";
import { siteTitle } from "./layout";
import utilStyles from "../styles/utils.module.css";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import {
  useLoginModalStore,
  useLoginProfileStore,
  useLoginProviderStore,
  useBrowserLoadedStore,
} from "../pages/api/stores";
import dynamic from "next/dynamic";

const LoginSocialGoogle = dynamic(
  () =>
    import("reactjs-social-login").then((module) => module.LoginSocialGoogle),
  { ssr: false }
);

const GoogleLoginButton = dynamic(
  () =>
    import("react-social-login-buttons").then(
      (module) => module.GoogleLoginButton
    ),
  { ssr: false }
);

export default function CustomNavbar() {
  const { isModalOpen, toggleModalOpen } = useLoginModalStore();
  const { profile, setProfile } = useLoginProfileStore();
  const { provider, setProvider } = useLoginProviderStore();
  const { isBrowserLoaded, setBrowserLoaded } = useBrowserLoadedStore();

  const REDIRECT_URI = "https://project-bloatcare.vercel.app/account/login";
  const googleRef = useRef();

  useEffect(() => {
    setBrowserLoaded(isBrowserLoaded);
  }, []);

  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const brandClickHandler = () => {
    isHomePage ? null : router.push("/");
  };

  const onLogoutFailure = useCallback(() => {
    alert("logout failed");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  return (
    <Flowbite>
      <Navbar>
        <Navbar.Brand className="cursor-pointer" onClick={brandClickHandler}>
          <Image
            priority
            src="/images/profile.jpg"
            className={`${utilStyles.borderCircle} mr-3 h-6 sm:h-9`}
            height={44}
            width={44}
            alt="Profile picture"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {siteTitle}
          </span>
        </Navbar.Brand>

        <div className="flex md:order-2 flex-row">
          <DarkThemeToggle
            className="mr-5"
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
          />
          <Button onClick={toggleModalOpen}>Login</Button>
        </div>
      </Navbar>
      <Modal
        show={isModalOpen && 1}
        onClose={() => toggleModalOpen(isModalOpen)}
      >
        <div>
          <Modal.Header className="text-center">Login</Modal.Header>
        </div>
        <Modal.Body>
          <div className="flex justify-center"></div>
          <h4 className="text-center">Username/Email</h4>
          <TextInput className="overflow-y-hidden text-center block w-48 m-auto h-12 border-block resize-none rounded-md"></TextInput>
          <h4 className="text-center">Password</h4>
          <TextInput
            type="password"
            name="password"
            className="overflow-y-hidden text-center block w-48 m-auto h-12 resize-none rounded-md"
          ></TextInput>
          <HelperText className="text-center block mt-0 mr-16 underline text-blue-500 dark:text-blue-500 hover:no-underline cursor-pointer">
            Forgot Password?
          </HelperText>
          <Button className="block m-auto mt-2">Login</Button>
          <hr className="w-56 h-1 m-auto mt-0 bg-gray-400 rounded md:my-3 dark:bg-gray-700" />
          <div className="flex flex-row justify-around border-box">
            <LoginSocialGoogle
              ref={googleRef}
              client_id="940521357118-6ugthop4d06i1l9hurg1vdtph1qc9bm0.apps.googleusercontent.com"
              redirect_uri={REDIRECT_URI}
              onLogoutFailure={onLogoutFailure}
              onLogoutSuccess={onLogoutSuccess}
              scope={"profile email"}
              onResolve={({ provider, data }) => {
                setProvider(provider);
                setProfile(data);
                console.log(data, "data");
                console.log(provider, "provider");
              }}
              onReject={(err) => {
                console.log("Got rejected:", err);
              }}
            >
              <GoogleLoginButton />
            </LoginSocialGoogle>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
}
