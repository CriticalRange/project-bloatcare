"use client";
import { useEffect } from "react";
import { useCredentialsStore } from "./api/stores";
import { shallow } from "zustand/shallow";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import Head from "next/head";

export default function Settings() {
  const toast = useToast();
  const router = useRouter();

  const { userInfo, setUserInfo } = useCredentialsStore(
    (state) => ({
      userInfo: state.userInfo,
      setUserInfo: state.setUserInfo,
    }),
    shallow
  );

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    }

    if (!userInfo) {
      router.push("/");
      const timeout = setTimeout(() => {
        router.push("/");
        toast({
          title: "You are not logged in!",
          description: "You can't view that page unless you log in.",
          status: "info",
          duration: 1600,
          isClosable: true,
          position: "bottom-left",
        });
      }, 1000);
    }
  }, [userInfo, router, toast]);

  return (
    <div className="p-10">
      <Head>
        <title>Settings ← BloatCare</title>
      </Head>
      {!userInfo ? (
        <h1>You are not signed in. Redirecting to home page...</h1>
      ) : (
        <h1>
          Welcome,{" "}
          {userInfo.user.displayName === null
            ? userInfo.user.email + "Add Username"
            : userInfo.user.displayName}
        </h1>
      )}
    </div>
  );
}
