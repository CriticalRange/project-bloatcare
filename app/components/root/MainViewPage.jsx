"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CommunityLoadingCard from "../Loading/Posts/Cards/PostCardLoading";
import SplashScreen from "../Loading/splash/SplashScreen";
import MainSorter from "./MainView/MainSorter";
import CommunitiesSection from "./MainView/CommunitiesSection/CommunitiesSection";
import MainPostsPage from "./MainView/MainPostPage";

const MainViewPage = () => {
  // Dynamically loading post modal and post page to decrease initial page load time
  const DynamicPostModal = dynamic(() => import("../Modal/Posts/PostModal"));

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
            <Box w={{ base: "100%", md: "60%" }} ml={{ base: "0%", md: "2%" }}>
              <MainSorter />
              <MainPostsPage />
            </Box>{" "}
            <Flex
              w={{ base: "0%", md: "35%" }}
              mt="1"
              mx="2%"
              direction="column"
              align="center"
            >
              <Text display={{ base: "none", md: "block" }} fontSize="3xl">
                Bloat Communities (Beta)
              </Text>
              <CommunitiesSection />
            </Flex>
            <DynamicPostModal />
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default MainViewPage;
