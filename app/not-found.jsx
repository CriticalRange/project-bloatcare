"use client";

import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BloatcareIcon,
  CustomAnimatedLoadingSpinnerIcon,
} from "./components/Icons/Components/IconComponents";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
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
          <Heading color="white">404 - Not Found</Heading>
          <Text mt="2" color="white">
            Could not find the requested page
          </Text>
          <Box mt="4">
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </Box>
        </Flex>
      </Center>
    </motion.div>
  );
}
