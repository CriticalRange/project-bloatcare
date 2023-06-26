"use client";

import { useEffect, useRef } from "react";
import { Button, HelperText, Modal, TextInput } from "flowbite-react";
import dynamic from "next/dynamic";
import {
  useLoginModalStore,
  useLoginProfileStore,
  useLoginProviderStore,
  useBrowserLoadedStore,
} from "../pages/api/stores";

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

export default function LoginModal() {
  const { isModalOpen, toggleModalOpen } = useLoginModalStore();
  const { loggedInprofile, setLoggedInProfile } = useLoginProfileStore();
  const { loggedInProvider, setLoggedInProvider } = useLoginProviderStore();

  const REDIRECT_URI =
    "http://https://project-bloatcare.vercel.app/account/login";
  const googleRef = useRef();

  return (
    <Modal
      show={isModalOpen && 1}
      onClose={() => {
        toggleModalOpen(!isModalOpen);
      }}
    >
      <div>
        <Modal.Header className="text-center">Login</Modal.Header>
      </div>
      <Modal.Body>
        <div className="flex justify-center"></div>
        <form>
          <h4 className="text-center">Username/Email</h4>
          <TextInput className="overflow-y-hidden text-center block w-48 m-auto h-12 border-block resize-none rounded-md"></TextInput>
          <h4 className="text-center">Password</h4>
          <TextInput
            type="password"
            name="password"
            autoComplete="on"
            className="overflow-y-hidden text-center block w-48 m-auto h-12 resize-none rounded-md"
          ></TextInput>
          <HelperText className="text-center block mt-0 mr-16 underline text-blue-500 dark:text-blue-500 hover:no-underline cursor-pointer">
            Forgot Password?
          </HelperText>
          <Button className="block m-auto mt-2">Login</Button>
        </form>
        <hr className="w-56 h-1 m-auto mt-0 bg-gray-400 rounded md:my-3 dark:bg-gray-700" />
        <div className="flex flex-row justify-around border-box">
          <LoginSocialGoogle
            isOnlyGetCode
            ref={googleRef}
            client_id="940521357118-6ugthop4d06i1l9hurg1vdtph1qc9bm0.apps.googleusercontent.com"
            redirect_uri={REDIRECT_URI}
            scope={"profile email"}
            onResolve={({ provider, data }) => {
              setLoggedInProvider(provider);
              setLoggedInProfile(data);
              console.log("data: ", data);
              toggleModalOpen(isModalOpen);
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
  );
}
