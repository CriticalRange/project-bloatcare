"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import CommunityLoadingCard from "../Community/CommunityBody/CommunityLoadingCard";
import MainSorter from "./MainView/MainSorter";
import MainViewCommunityCard from "./MainView/MainViewCommunityCard";
import { useEffect, useState } from "react";
import SplashScreen from "./splash/SplashScreen";

const MainViewPage = () => {
  const DynamicPostModal = dynamic(() => import("../Modal/Posts/PostModal"));
  const DynamicMainPostPage = dynamic(() => import("./MainView/MainPostPage"), {
    loading: () => <CommunityLoadingCard />,
  });

  const [showSplash, setShowSplash] = useState(
    localStorage.getItem("splashShown") !== "true"
  );

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("splashShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <Box>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Box
          bgColor="colors.brand.secondary"
          _dark={{ bgColor: "colors.customGray" }}
        >
          <Flex justify="center">
            <Text fontSize="4xl" my="2">
              Unleash Your Passions, Ignite Discussions
            </Text>
          </Flex>
          <Flex direction="row">
            <Flex
              w={{ base: "100%", md: "60%" }}
              ml={{ base: "0%", md: "2%" }}
              direction="column"
            >
              <MainSorter />
              <DynamicMainPostPage />
            </Flex>{" "}
            <Flex
              w={{ base: "0%", md: "35%" }}
              mx="2%"
              direction="column"
              align="center"
            >
              <Text display={{ base: "none", md: "block" }} fontSize="3xl">
                Communities (Beta)
              </Text>
              <MainViewCommunityCard />
              <MainViewCommunityCard />
              <MainViewCommunityCard />
              <MainViewCommunityCard />
              <MainViewCommunityCard />
              <MainViewCommunityCard />
              <MainViewCommunityCard />
            </Flex>
            <DynamicPostModal />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default MainViewPage;
