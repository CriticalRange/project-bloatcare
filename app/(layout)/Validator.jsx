"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import * as jose from "jose";
import { useRecoilState } from "recoil";
import { userAtom } from "../components/atoms/authAtom";
import axios from "axios";

const Validator = () => {
  const [userData, setUserData] = useRecoilState(userAtom);
  const accessSecret = new TextEncoder().encode(
    `${process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_KEY}`
  );
  const getUserData = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        return;
      }

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
        const refreshToken = Cookies.get("refreshToken");
        await axios
          .post("/api/auth/token", {
            refresh_token: refreshToken,
          })
          .then(async (response) => {
            Cookies.set("accessToken", response.data.access_token, {
              expires: 1 / 48,
              secure: true,
              sameSite: "strict",
            });
            const newAccessToken = await jose.jwtVerify(
              response.data.access_token,
              accessSecret
            );
            // @ts-ignore
            setUserData(newAccessToken.payload);
          });
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return <div></div>;
};

export default Validator;
