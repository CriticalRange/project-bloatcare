"use client";

import { Box, Center, Divider, Flex } from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import {
  BloatcareIcon,
  CustomAnimatedLoadingSpinnerIcon,
  GoogleIcon,
} from "../../components/Icons/Components/IconComponents";

const GoogleAuthPage = () => {
  // URL'yi ayrıştırın
  const url = window.location.hash.substring(1); // Tarayıcı penceresinin URL'sinden hash kısmını alın

  // Hash'i parametrelerine ayırın
  const hashParams = new URLSearchParams(url);

  // Access token'ı alın
  const accessToken = hashParams.get("access_token");

  // Google API'ının userinfo endpoint URL'si
  const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

  const getUserInfo = async () => {
    await axios
      .get(userInfoUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        // Token'i pop-up'ı oluşturan sayfanın URL'sine iletmek için postMessage kullanın
        window.opener.postMessage(
          {
            userInfo: {
              Email: response.data.email,
              Display_Name: response.data.name,
              Photo_URL: response.data.picture,
            },
          },
          window.opener.location.href
        );
      })
      .catch((error) => {
        console.log(error);
        // Pop-up'ı kapatın
        window.close();
      });
  };

  useEffect(() => {
    getUserInfo();
  });

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
