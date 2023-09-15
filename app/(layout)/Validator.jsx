"use client";

import axios from "axios";
import * as jose from "jose";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../components/atoms/authAtom";

const Validator = () => {
  const setUserData = useSetRecoilState(userAtom);
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
      const tempCommunities = localStorage.getItem("tempCommunities");

      const communitiesArray = [
        ...JSON.parse(tempCommunities),
        // @ts-ignore
        ...JSON.parse(decodedAccessToken.payload.Communities),
      ];

      const resultArray = communitiesArray.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.name === item.name && t.id === item.id)
      );

      // @ts-ignore
      setUserData({
        authenticated: true,
        Custom_Claims: decodedAccessToken.payload.Custom_Claims,
        Disabled: !!decodedAccessToken.payload.Disabled,
        // @ts-ignore
        Display_Name: decodedAccessToken.payload.Display_Name,
        // @ts-ignore
        Email: decodedAccessToken.payload.Email,
        // @ts-ignore
        Email_Verified: decodedAccessToken.payload.Email_Verified,
        // @ts-ignore
        Metadata: JSON.parse(decodedAccessToken.payload.Metadata),
        // @ts-ignore
        Photo_Url: decodedAccessToken.payload.Photo_Url,
        // @ts-ignore
        Provider_Data: JSON.parse(decodedAccessToken.payload.Provider_Data),
        // @ts-ignore
        Uid: decodedAccessToken.payload.Uid,
        // @ts-ignore
        Password_Hash: decodedAccessToken.payload.Password_Hash,
        // @ts-ignore
        Phone_Number: decodedAccessToken.payload.Phone_Number,
        // @ts-ignore
        Password_Salt: decodedAccessToken.payload.Password_Salt,
        // @ts-ignore
        Tokens_Valid_After_Time:
          decodedAccessToken.payload.Tokens_Valid_After_Time,
        // @ts-ignore
        Verification_Code: decodedAccessToken.payload.Verification_Code,
        Communities:
          tempCommunities !== null
            ? resultArray
            : // @ts-ignore
              JSON.parse(decodedAccessToken.payload.Communities),
      });
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_JWT_EXPIRED") {
        console.log("Token is expired, getting a new one");
        // If the access token expires, get a new access token using refresh token
        const refreshToken = Cookies.get("refreshToken");
        await axios
          .post("/auth/token", {
            refresh_token: refreshToken,
          })
          .then(async (response) => {
            console.log("Got a new one: ", response.data.access_token);
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
            setUserData({
              authenticated: true,
              Custom_Claims: newAccessToken.payload.Custom_Claims,
              Disabled: !!newAccessToken.payload.Disabled,
              // @ts-ignore
              Display_Name: newAccessToken.payload.Display_Name,
              // @ts-ignore
              Email: newAccessToken.payload.Email,
              // @ts-ignore
              Email_Verified: newAccessToken.payload.Email_Verified,
              // @ts-ignore
              Metadata: JSON.parse(newAccessToken.payload.Metadata),
              // @ts-ignore
              Photo_Url: newAccessToken.payload.Photo_Url,
              // @ts-ignore
              Provider_Data: JSON.parse(newAccessToken.payload.Provider_Data),
              // @ts-ignore
              Uid: newAccessToken.payload.Uid,
              // @ts-ignore
              Password_Hash: newAccessToken.payload.Password_Hash,
              // @ts-ignore
              Phone_Number: newAccessToken.payload.Phone_Number,
              // @ts-ignore
              Password_Salt: newAccessToken.payload.Password_Salt,
              // @ts-ignore
              Tokens_Valid_After_Time:
                newAccessToken.payload.Tokens_Valid_After_Time,
              // @ts-ignore
              Verification_Code: newAccessToken.payload.Verification_Code,
              // @ts-ignore
              Communities: tempCommunitiesParsed,
            });
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
