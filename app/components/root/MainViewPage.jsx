"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import CommunityLoadingCard from "../Community/CommunityBody/CommunityLoadingCard";
import MainSorter from "./MainView/MainSorter";
import MainViewCommunityCard from "./MainView/MainViewCommunityCard";
import { useEffect, useState } from "react";
import SplashScreen from "./splash/SplashScreen";

const MainViewPage = () => {
  // Dynamically loading post modal and post page to decrease initial page load time
  const DynamicPostModal = dynamic(() => import("../Modal/Posts/PostModal"));
  const DynamicMainPostPage = dynamic(() => import("./MainView/MainPostPage"), {
    loading: () => <CommunityLoadingCard />,
  });

  // Gets the local storage splash shown as initial value
  const [showSplash, setShowSplash] = useState(
    localStorage.getItem("splashShown") !== "true"
  );

  // Sets the local storage splash shown as initial value when page loads
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
        <Box>
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
              mt="1"
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
