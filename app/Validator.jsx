"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import * as jose from "jose";
import { useRecoilState } from "recoil";
import { userAtom } from "./components/atoms/authAtom";

const Validator = () => {
  const [userData, setUserData] = useRecoilState(userAtom);
  const getUserData = async () => {
    try {
      const accessSecret = new TextEncoder().encode(
        `${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY}`
      );
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        return;
      }
      const decodedAccessToken = await jose.jwtVerify(
        accessToken,
        accessSecret
      );
      // @ts-ignore
      setUserData(decodedAccessToken.payload);
    } catch (error) {
      if (error.code === "ERR_JWT_EXPIRED") {
        console.log(
          "Access token is expired. Getting a new one using the refresh token"
        );
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return <div></div>;
};

export default Validator;
