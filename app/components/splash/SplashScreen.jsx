import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  BloatcareIcon,
  CustomAnimatedLoadingSpinnerIcon,
} from "../Icons/IconComponents/IconComponents";

const SplashScreen = () => {
  const controls = useAnimation();
  const showSplash = true;

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        controls.start({ opacity: 0 });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={controls}
      transition={{ duration: 1 }}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 1)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <Center h="100%">
        <Flex direction="column" align="center">
          <BloatcareIcon w="14" h="14" fill="#107cf1" cursor="pointer" />
          <CustomAnimatedLoadingSpinnerIcon w="10" h="10" />
        </Flex>
      </Center>
    </motion.div>
  );
};

export default SplashScreen;
