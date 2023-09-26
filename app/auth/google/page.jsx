"use client";

import { Center, Divider, Flex } from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
// @ts-ignore
import React, { useEffect, useState } from "react";
import {
  BloatcareIcon,
  CustomAnimatedLoadingSpinnerIcon,
  GoogleIcon,
} from "../../components/Icons/Components/IconComponents";

const GoogleAuthPage = () => {
  // Getting the access token from the URL
  const url = window.location.hash.substring(1);
  const hashParams = new URLSearchParams(url);
  const accessToken = hashParams.get("access_token");

  // Google API userinfo endpoint URL
  const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

  const getUserInfo = async () => {
    try {
      const socialInfo = await axios.get(userInfoUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Social info is: ", socialInfo);
      await axios
        .post("/auth/login", {
          Auth_Type: "google",
          // @ts-ignore
          Email: socialInfo.data.email,
          // @ts-ignore
          Display_Name: socialInfo.data.name,
          // @ts-ignore
          Photo_URL: socialInfo.data.picture,
          // @ts-ignore
          Email_Verified: socialInfo.data.Verified_Email,
          // @ts-ignore
          GoogleId: socialInfo.data.id,
          // @ts-ignore
          locale: socialInfo.data.locale,
        })
        .then((response) => {
          // Return the userInfo to popup opener
          window.opener.postMessage(
            {
              userInfo: {
                Auth_Type: "google",
                // @ts-ignore
                Email: socialInfo.data.email,
                // @ts-ignore
                Display_Name: socialInfo.data.name,
                // @ts-ignore
                Photo_URL: socialInfo.data.picture,
                // @ts-ignore
                Email_Verified: socialInfo.data.verified_email,
                // @ts-ignore
                GoogleId: socialInfo.data.id,
                // @ts-ignore
                locale: socialInfo.data.locale,
                accessToken: response.data.accessToken,
                refreshToken: response.data.refreshToken,
              },
            },
            window.opener.location.href
          );
          // Close the popup
          window.close();
        });
    } catch (error) {
      window.opener.postMessage(
        {
          error: error,
        },
        window.opener.location.href
      );
    }
    // Try to make a GET request to the endpoint with the accessToken
  };

  // Make the request when page loads
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Center h="100%">
        <Flex direction="column" align="center">
          <Flex direction="row" align="center">
            <BloatcareIcon w="14" h="14" fill="#107cf1" cursor="pointer" />
            <Flex height="50px" mx="4" align="center">
              <Divider
                orientation="vertical"
                borderColor="black"
                _dark={{ borderColor: "white" }}
                borderWidth="2px"
              />
              <GoogleIcon mx="4" w="10" h="10" />
            </Flex>
          </Flex>
          <CustomAnimatedLoadingSpinnerIcon my="6" w="10" h="10" />
        </Flex>
      </Center>
    </motion.div>
  );
};

export default GoogleAuthPage;
